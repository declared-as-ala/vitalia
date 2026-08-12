import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@viaitalia/types';

@ApiTags('Reviews & Avis')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Get published reviews & aggregate rating for public landing page' })
  @Get('public')
  async getPublicReviews() {
    return this.reviewsService.getPublicReviews();
  }

  @ApiOperation({ summary: 'Submit client testimonial review (Defaults to PENDING)' })
  @Post()
  async submitReview(@Req() req: any, @Body() body: any) {
    const userId = req.user?.id || null;
    return this.reviewsService.submitReview(userId, body);
  }

  @ApiOperation({ summary: 'Get all reviews for admin moderation' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get('admin')
  async getAdminReviews(@Query() query: any) {
    return this.reviewsService.getAdminReviews(query);
  }

  @ApiOperation({ summary: 'Moderate review (Approve/Publish/Reject/Feature)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Patch(':id/status')
  async moderateReview(@Param('id') id: string, @Body() body: any) {
    return this.reviewsService.moderateReview(id, body);
  }
}
