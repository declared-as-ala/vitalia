import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitReviewSchema } from '@viaitalia/validation';
import { ReviewStatus, Role } from '@viaitalia/types';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getPublicReviews() {
    const publishedReviews = await this.prisma.review.findMany({
      where: { status: ReviewStatus.PUBLISHED },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      take: 50,
    });

    const aggregate = await this.prisma.review.aggregate({
      where: { status: ReviewStatus.PUBLISHED },
      _avg: { rating: true },
      _count: { id: true },
    });

    const averageRating = aggregate._avg.rating ? Number(aggregate._avg.rating.toFixed(1)) : 5.0;
    const totalPublishedCount = aggregate._count.id;

    return {
      averageRating,
      totalPublishedCount,
      reviews: publishedReviews.map((r) => ({
        id: r.id,
        authorName: r.authorName,
        authorPhoto: r.authorPhoto || undefined,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        isFeatured: r.isFeatured,
        createdAt: r.createdAt.toISOString(),
      })),
    };
  }

  async submitReview(userId: string | null, body: any) {
    const validated = SubmitReviewSchema.parse(body);

    let clientId: string | undefined;
    if (userId) {
      const client = await this.prisma.clientProfile.findUnique({
        where: { userId },
      });
      if (client) clientId = client.id;
    }

    const review = await this.prisma.review.create({
      data: {
        clientId,
        authorName: validated.authorName,
        rating: validated.rating,
        title: validated.title,
        comment: validated.comment,
        status: ReviewStatus.PENDING,
      },
    });

    return {
      message: 'Thank you! Your review has been submitted and is awaiting admin approval.',
      reviewId: review.id,
      status: review.status,
    };
  }

  async getAdminReviews(query: { status?: ReviewStatus; search?: string; page?: number; limit?: number }) {
    const where: any = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        { authorName: { contains: query.search, mode: 'insensitive' } },
        { title: { contains: query.search, mode: 'insensitive' } },
        { comment: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    const [items, total, pendingCount, publishedCount] = await Promise.all([
      this.prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.review.count({ where }),
      this.prisma.review.count({ where: { status: ReviewStatus.PENDING } }),
      this.prisma.review.count({ where: { status: ReviewStatus.PUBLISHED } }),
    ]);

    return {
      stats: {
        totalReviews: total,
        pendingCount,
        publishedCount,
      },
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async moderateReview(id: string, body: { status?: ReviewStatus; isFeatured?: boolean }) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    const updated = await this.prisma.review.update({
      where: { id },
      data: {
        status: body.status !== undefined ? body.status : review.status,
        isFeatured: body.isFeatured !== undefined ? body.isFeatured : review.isFeatured,
        approvedAt: body.status === ReviewStatus.PUBLISHED ? new Date() : review.approvedAt,
      },
    });

    return updated;
  }
}
