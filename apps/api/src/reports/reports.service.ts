import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProgramStatus, ReviewStatus } from '@viaitalia/types';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getAdminDashboardKPIs() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const next14Days = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const [
      totalClients,
      activeDossiers,
      upcomingAppointments,
      openTasks,
      totalMoneyCollected,
      receiptsThisMonth,
      pendingReviews,
      upcomingDeadlinesCount,
    ] = await Promise.all([
      this.prisma.clientProfile.count({ where: { status: { not: 'ARCHIVED' } } }),
      this.prisma.dossier.count({ where: { stage: { not: 'ENROLLED' } } }),
      this.prisma.appointment.count({ where: { date: { gte: now }, isCanceled: false } }),
      this.prisma.task.count({ where: { status: { in: ['TODO', 'IN_PROGRESS'] } } }),
      this.prisma.payment.aggregate({ _sum: { amount: true } }),
      this.prisma.receipt.count({ where: { createdAt: { gte: startOfMonth } } }),
      this.prisma.review.count({ where: { status: ReviewStatus.PENDING } }),
      this.prisma.programIntake.count({
        where: {
          program: { university: { country: 'IT' } },
          closingDate: { gte: now, lte: next14Days },
        },
      }),
    ]);

    const recentActivity = await this.prisma.receipt.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { client: { include: { user: true } } },
    });

    return {
      kpis: {
        totalClients,
        activeDossiers,
        upcomingAppointments,
        openTasks,
        totalMoneyCollected: totalMoneyCollected._sum.amount || 0,
        receiptsThisMonth,
        pendingReviews,
        upcomingDeadlinesCount,
      },
      recentActivity: recentActivity.map((a) => ({
        id: a.id,
        type: 'RECEIPT',
        title: `Receipt ${a.receiptNumber} issued for ${a.client.user.firstName} ${a.client.user.lastName}`,
        amount: a.amount,
        date: a.createdAt.toISOString(),
      })),
    };
  }
}
