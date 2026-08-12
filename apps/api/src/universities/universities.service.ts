import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProgramStatus } from '@viaitalia/types';

@Injectable()
export class UniversitiesService {
  constructor(private prisma: PrismaService) {}

  async searchPrograms(query: { domain?: string; degreeLevel?: string; city?: string; search?: string; page?: number; limit?: number }) {
    const where: any = {
      university: {
        country: 'IT', // Mandatory Rule: STRICTLY ITALIAN UNIVERSITIES
      },
    };

    if (query.domain) {
      where.studyDomain = { contains: query.domain, mode: 'insensitive' };
    }

    if (query.degreeLevel) {
      where.degreeLevel = query.degreeLevel;
    }

    if (query.city) {
      where.university = { ...where.university, city: { contains: query.city, mode: 'insensitive' } };
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { studyDomain: { contains: query.search, mode: 'insensitive' } },
        { university: { name: { contains: query.search, mode: 'insensitive' } } },
        { university: { city: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    const [items, total] = await Promise.all([
      this.prisma.program.findMany({
        where,
        include: {
          university: true,
          intakes: {
            orderBy: { academicYear: 'desc' },
            take: 1,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.program.count({ where }),
    ]);

    return {
      data: items.map((p) => {
        const latestIntake = p.intakes[0];
        return {
          id: p.id,
          universityName: p.university.name,
          universityCity: p.university.city,
          programName: p.name,
          degreeLevel: p.degreeLevel,
          studyDomain: p.studyDomain,
          language: p.language,
          academicYear: latestIntake?.academicYear || '2026/2027',
          openingDate: latestIntake?.openingDate ? latestIntake.openingDate.toISOString().split('T')[0] : 'Not specified',
          closingDate: latestIntake?.closingDate ? latestIntake.closingDate.toISOString().split('T')[0] : 'Not specified',
          applicationFee: latestIntake?.applicationFee ?? null,
          tuitionFee: latestIntake?.tuitionFee ?? null,
          status: latestIntake?.status || ProgramStatus.UNKNOWN,
          officialSourceUrl: latestIntake?.sourceUrl || p.university.website,
          lastVerifiedAt: latestIntake?.verifiedAt.toISOString() || p.createdAt.toISOString(),
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

  async getStats() {
    const totalPrograms = await this.prisma.program.count({
      where: { university: { country: 'IT' } },
    });

    const openPrograms = await this.prisma.programIntake.count({
      where: {
        status: ProgramStatus.OPEN,
        program: { university: { country: 'IT' } },
      },
    });

    const now = new Date();
    const next14Days = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const closingSoon = await this.prisma.programIntake.count({
      where: {
        program: { university: { country: 'IT' } },
        closingDate: {
          gte: now,
          lte: next14Days,
        },
      },
    });

    return {
      totalPrograms,
      openApplications: openPrograms,
      closingSoon,
      countryScope: 'IT (Italy Only)',
    };
  }

  async getUpcomingDeadlines() {
    const now = new Date();
    const intakes = await this.prisma.programIntake.findMany({
      where: {
        program: { university: { country: 'IT' } },
        closingDate: { gte: now },
      },
      include: {
        program: { include: { university: true } },
      },
      orderBy: { closingDate: 'asc' },
      take: 10,
    });

    return intakes.map((i) => ({
      programId: i.programId,
      programName: i.program.name,
      universityName: i.program.university.name,
      degreeLevel: i.program.degreeLevel,
      closingDate: i.closingDate?.toISOString().split('T')[0],
      daysRemaining: i.closingDate ? Math.ceil((i.closingDate.getTime() - now.getTime()) / (1000 * 3600 * 24)) : 0,
      sourceUrl: i.sourceUrl,
    }));
  }
}
