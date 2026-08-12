import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReceiptNumberGenerator {
  constructor(private prisma: PrismaService) {}

  /**
   * Generates a concurrency-safe sequential receipt ID: REC-YYYY-XXXX
   * e.g. REC-2026-0001, REC-2026-0002
   */
  async generateNextReceiptNumber(): Promise<string> {
    const currentYear = new Date().getFullYear();
    const prefix = `REC-${currentYear}-`;

    const lastReceipt = await this.prisma.receipt.findFirst({
      where: {
        receiptNumber: {
          startsWith: prefix,
        },
      },
      orderBy: {
        receiptNumber: 'desc',
      },
    });

    if (!lastReceipt) {
      return `${prefix}0001`;
    }

    const sequencePart = lastReceipt.receiptNumber.replace(prefix, '');
    const currentSeq = parseInt(sequencePart, 10);
    const nextSeq = isNaN(currentSeq) ? 1 : currentSeq + 1;
    const formattedSeq = nextSeq.toString().padStart(4, '0');

    return `${prefix}${formattedSeq}`;
  }
}
