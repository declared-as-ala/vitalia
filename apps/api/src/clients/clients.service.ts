import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientSchema } from '@viaitalia/validation';
import { ClientStatus, Role } from '@viaitalia/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async getClients(query: { search?: string; status?: ClientStatus; page?: number; limit?: number }) {
    const where: any = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        { clientNumber: { contains: query.search, mode: 'insensitive' } },
        { user: { firstName: { contains: query.search, mode: 'insensitive' } } },
        { user: { lastName: { contains: query.search, mode: 'insensitive' } } },
        { user: { email: { contains: query.search, mode: 'insensitive' } } },
        { phone: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    const [items, total] = await Promise.all([
      this.prisma.clientProfile.findMany({
        where,
        include: {
          user: true,
          assignedAgent: true,
          dossiers: true,
          payments: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.clientProfile.count({ where }),
    ]);

    return {
      data: items.map((c) => {
        const totalPaid = c.payments.reduce((acc, p) => acc + p.amount, 0);
        return {
          id: c.id,
          clientNumber: c.clientNumber,
          firstName: c.user.firstName,
          lastName: c.user.lastName,
          email: c.user.email,
          phone: c.phone,
          nationality: c.nationality,
          countryOfResidence: c.countryOfResidence,
          profilePhoto: c.profilePhoto || undefined,
          status: c.status,
          assignedAgentId: c.assignedAgentId || undefined,
          assignedAgentName: c.assignedAgent ? `${c.assignedAgent.firstName} ${c.assignedAgent.lastName}` : undefined,
          dossiersCount: c.dossiers.length,
          totalPaid,
          createdAt: c.createdAt.toISOString(),
        };
      }),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createClient(dto: any) {
    const validated = CreateClientSchema.parse(dto);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      throw new BadRequestException(`A user with email ${validated.email} already exists`);
    }

    const defaultPassword = 'ViaItaliaPassword2026!';
    const passwordHash = await bcrypt.hash(defaultPassword, 10);

    const count = await this.prisma.clientProfile.count();
    const clientNumber = `CL-2026-${(count + 1).toString().padStart(4, '0')}`;

    const createdUser = await this.prisma.user.create({
      data: {
        email: validated.email,
        passwordHash,
        firstName: validated.firstName,
        lastName: validated.lastName,
        role: Role.CLIENT,
      },
    });

    const client = await this.prisma.clientProfile.create({
      data: {
        userId: createdUser.id,
        clientNumber,
        phone: validated.phone,
        nationality: validated.nationality,
        countryOfResidence: validated.countryOfResidence,
        assignedAgentId: validated.assignedAgentId || null,
      },
      include: {
        user: true,
        assignedAgent: true,
      },
    });

    return {
      id: client.id,
      clientNumber: client.clientNumber,
      firstName: client.user.firstName,
      lastName: client.user.lastName,
      email: client.user.email,
      phone: client.phone,
      nationality: client.nationality,
      countryOfResidence: client.countryOfResidence,
      status: client.status,
      assignedAgentName: client.assignedAgent ? `${client.assignedAgent.firstName} ${client.assignedAgent.lastName}` : undefined,
      createdAt: client.createdAt.toISOString(),
    };
  }

  async getClientDetails(id: string) {
    const client = await this.prisma.clientProfile.findUnique({
      where: { id },
      include: {
        user: true,
        assignedAgent: true,
        dossiers: true,
        documents: true,
        appointments: true,
        payments: true,
        receipts: true,
        reviews: true,
        tasks: true,
      },
    });

    if (!client) {
      throw new NotFoundException(`Client profile with ID ${id} not found`);
    }

    const totalPaid = client.payments.reduce((acc, p) => acc + p.amount, 0);

    return {
      profile: {
        id: client.id,
        clientNumber: client.clientNumber,
        firstName: client.user.firstName,
        lastName: client.user.lastName,
        email: client.user.email,
        phone: client.phone,
        nationality: client.nationality,
        countryOfResidence: client.countryOfResidence,
        profilePhoto: client.profilePhoto || undefined,
        status: client.status,
        assignedAgentId: client.assignedAgentId || undefined,
        assignedAgentName: client.assignedAgent ? `${client.assignedAgent.firstName} ${client.assignedAgent.lastName}` : undefined,
        totalPaid,
        createdAt: client.createdAt.toISOString(),
      },
      dossiers: client.dossiers,
      documents: client.documents,
      appointments: client.appointments,
      receipts: client.receipts,
      reviews: client.reviews,
      tasks: client.tasks,
    };
  }
}
