import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReceiptNumberGenerator } from './receipt-number.generator';
import { CreateReceiptSchema } from '@viaitalia/validation';
import { PaymentMethod, Role } from '@viaitalia/types';

@Injectable()
export class FinanceService {
  constructor(
    private prisma: PrismaService,
    private receiptNumberGen: ReceiptNumberGenerator,
  ) {}

  async getStats() {
    const totalPayments = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      _count: { id: true },
    });

    const cashPayments = await this.prisma.payment.aggregate({
      where: { paymentMethod: PaymentMethod.CASH },
      _sum: { amount: true },
      _count: { id: true },
    });

    const bankPayments = await this.prisma.payment.aggregate({
      where: { paymentMethod: PaymentMethod.BANK_TRANSFER },
      _sum: { amount: true },
      _count: { id: true },
    });

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const monthReceipts = await this.prisma.receipt.count({
      where: {
        createdAt: { gte: startOfMonth },
      },
    });

    return {
      totalCollected: totalPayments._sum.amount || 0,
      totalReceiptsCount: totalPayments._count.id || 0,
      cashTotal: cashPayments._sum.amount || 0,
      bankTransferTotal: bankPayments._sum.amount || 0,
      receiptsThisMonth: monthReceipts,
    };
  }

  async getReceipts(user: { id: string; role: Role; clientId?: string }, query: { clientId?: string; search?: string; page?: number; limit?: number }) {
    const where: any = {};

    if (user.role === Role.CLIENT) {
      if (!user.clientId) {
        throw new ForbiddenException('Client user profile not associated');
      }
      where.clientId = user.clientId;
    } else if (query.clientId) {
      where.clientId = query.clientId;
    }

    if (query.search) {
      where.OR = [
        { receiptNumber: { contains: query.search, mode: 'insensitive' } },
        { client: { user: { firstName: { contains: query.search, mode: 'insensitive' } } } },
        { client: { user: { lastName: { contains: query.search, mode: 'insensitive' } } } },
        { client: { clientNumber: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    const [items, total] = await Promise.all([
      this.prisma.receipt.findMany({
        where,
        include: {
          client: {
            include: { user: true },
          },
          createdBy: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.receipt.count({ where }),
    ]);

    return {
      data: items.map((r) => ({
        id: r.id,
        receiptNumber: r.receiptNumber,
        clientId: r.clientId,
        clientName: `${r.client.user.firstName} ${r.client.user.lastName}`,
        clientNumber: r.client.clientNumber,
        amount: r.amount,
        currency: r.currency,
        paymentMethod: r.paymentMethod,
        paymentDate: r.paymentDate.toISOString().split('T')[0],
        createdByName: `${r.createdBy.firstName} ${r.createdBy.lastName}`,
        legalDisclaimer: r.legalDisclaimer,
        createdAt: r.createdAt.toISOString(),
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createReceipt(adminUserId: string, dto: any) {
    const validated = CreateReceiptSchema.parse(dto);

    const client = await this.prisma.clientProfile.findUnique({
      where: { id: validated.clientId },
      include: { user: true },
    });

    if (!client) {
      throw new NotFoundException(`Client profile with ID ${validated.clientId} not found`);
    }

    const receiptNumber = await this.receiptNumberGen.generateNextReceiptNumber();
    const paymentDateObj = new Date(validated.paymentDate);

    // Create payment transaction & receipt atomically
    const result = await this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          clientId: validated.clientId,
          amount: validated.amount,
          currency: validated.currency,
          paymentMethod: validated.paymentMethod as any,
          paymentDate: paymentDateObj,
          notes: validated.notes,
          createdById: adminUserId,
        },
      });

      const receipt = await tx.receipt.create({
        data: {
          receiptNumber,
          clientId: validated.clientId,
          paymentId: payment.id,
          amount: validated.amount,
          currency: validated.currency,
          paymentMethod: validated.paymentMethod as any,
          paymentDate: paymentDateObj,
          createdById: adminUserId,
        },
        include: {
          client: { include: { user: true } },
          createdBy: true,
        },
      });

      // Create internal notification for Client
      await tx.notification.create({
        data: {
          userId: client.userId,
          title: 'New Payment Receipt Issued',
          body: `Receipt ${receiptNumber} of €${validated.amount} has been added to your account.`,
          type: 'RECEIPT_CREATED',
          targetUrl: '/client/receipts',
        },
      });

      return receipt;
    });

    return {
      id: result.id,
      receiptNumber: result.receiptNumber,
      clientId: result.clientId,
      clientName: `${result.client.user.firstName} ${result.client.user.lastName}`,
      clientNumber: result.client.clientNumber,
      amount: result.amount,
      currency: result.currency,
      paymentMethod: result.paymentMethod,
      paymentDate: result.paymentDate.toISOString().split('T')[0],
      createdByName: `${result.createdBy.firstName} ${result.createdBy.lastName}`,
      legalDisclaimer: result.legalDisclaimer,
      createdAt: result.createdAt.toISOString(),
    };
  }

  async getReceiptDetails(id: string, user: { id: string; role: Role; clientId?: string }) {
    const receipt = await this.prisma.receipt.findUnique({
      where: { id },
      include: {
        client: { include: { user: true } },
        createdBy: true,
      },
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt with ID ${id} not found`);
    }

    if (user.role === Role.CLIENT && receipt.clientId !== user.clientId) {
      throw new ForbiddenException('Access denied to private receipt record');
    }

    return {
      id: receipt.id,
      receiptNumber: receipt.receiptNumber,
      clientId: receipt.clientId,
      clientName: `${receipt.client.user.firstName} ${receipt.client.user.lastName}`,
      clientNumber: receipt.client.clientNumber,
      amount: receipt.amount,
      currency: receipt.currency,
      paymentMethod: receipt.paymentMethod,
      paymentDate: receipt.paymentDate.toISOString().split('T')[0],
      createdByName: `${receipt.createdBy.firstName} ${receipt.createdBy.lastName}`,
      legalDisclaimer: receipt.legalDisclaimer,
      createdAt: receipt.createdAt.toISOString(),
    };
  }

  async renderReceiptHTML(id: string, user: any): Promise<string> {
    const r = await this.getReceiptDetails(id, user);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Receipt ${r.receiptNumber} - VIAITALIA</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; margin: 0; padding: 40px; background: #fff; }
          .receipt-box { max-width: 750px; margin: auto; border: 2px solid #064e3b; padding: 40px; border-radius: 8px; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
          .brand { color: #064e3b; font-size: 28px; font-weight: bold; letter-spacing: 2px; }
          .subbrand { color: #059669; font-size: 13px; font-weight: 600; }
          .title-section { text-align: right; }
          .receipt-title { font-size: 20px; font-weight: bold; color: #064e3b; margin: 0; }
          .receipt-num { font-size: 14px; color: #64748b; font-family: monospace; }
          .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
          .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; }
          .value { font-size: 15px; color: #0f172a; font-weight: 600; margin-top: 4px; }
          .amount-box { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 6px; text-align: center; margin: 25px 0; }
          .amount-title { font-size: 12px; color: #166534; font-weight: bold; text-transform: uppercase; }
          .amount-val { font-size: 32px; font-weight: bold; color: #064e3b; }
          .disclaimer { font-size: 11px; color: #64748b; font-style: italic; border-left: 3px solid #d97706; padding-left: 12px; margin: 30px 0; line-height: 1.5; }
          .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 50px; text-align: center; }
          .sig-line { border-top: 1px dashed #cbd5e1; margin-top: 50px; padding-top: 8px; font-size: 12px; color: #475569; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="receipt-box">
          <div class="header">
            <div>
              <div class="brand">VIAITALIA</div>
              <div class="subbrand">STUDY IN ITALY AGENCY</div>
            </div>
            <div class="title-section">
              <h2 class="receipt-title">REÇU DE PAIEMENT / RECEIPT</h2>
              <div class="receipt-num">No: ${r.receiptNumber}</div>
            </div>
          </div>

          <div class="details-grid">
            <div>
              <div class="label">CLIENT FULL NAME</div>
              <div class="value">${r.clientName} (${r.clientNumber})</div>
            </div>
            <div>
              <div class="label">PAYMENT DATE</div>
              <div class="value">${r.paymentDate}</div>
            </div>
            <div>
              <div class="label">PAYMENT METHOD</div>
              <div class="value">${r.paymentMethod}</div>
            </div>
            <div>
              <div class="label">ISSUED BY AGENT</div>
              <div class="value">${r.createdByName}</div>
            </div>
          </div>

          <div class="amount-box">
            <div class="amount-title">AMOUNT RECEIVED / MONTANT VERSÉ</div>
            <div class="amount-val">€${r.amount.toFixed(2)} ${r.currency}</div>
          </div>

          <div class="disclaimer">
            <strong>NOTICE LEGAL:</strong> ${r.legalDisclaimer}
          </div>

          <div class="signatures">
            <div>
              <div class="sig-line">CLIENT SIGNATURE</div>
            </div>
            <div>
              <div class="sig-line">VIAITALIA STAMP & AGENT SIGNATURE</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
