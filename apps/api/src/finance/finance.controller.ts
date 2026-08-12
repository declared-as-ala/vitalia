import { Controller, Get, Post, Body, Param, Query, UseGuards, Req, Res, Header } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { FinanceService } from './finance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@viaitalia/types';

@ApiTags('Finance & Receipts')
@Controller('finance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @ApiOperation({ summary: 'Get financial summary statistics (Admin only)' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get('stats')
  async getStats() {
    return this.financeService.getStats();
  }

  @ApiOperation({ summary: 'Get payment receipts list' })
  @Get('receipts')
  async getReceipts(@Req() req: any, @Query() query: any) {
    return this.financeService.getReceipts(req.user, query);
  }

  @ApiOperation({ summary: 'Create new payment receipt (Admin/Agent only)' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.AGENT)
  @Post('receipts')
  async createReceipt(@Req() req: any, @Body() body: any) {
    return this.financeService.createReceipt(req.user.id, body);
  }

  @ApiOperation({ summary: 'Get receipt details by ID' })
  @Get('receipts/:id')
  async getReceiptDetails(@Req() req: any, @Param('id') id: string) {
    return this.financeService.getReceiptDetails(id, req.user);
  }

  @ApiOperation({ summary: 'View/Download printable PDF HTML receipt' })
  @Get('receipts/:id/pdf')
  async getReceiptPDF(@Req() req: any, @Param('id') id: string, @Res() res: Response) {
    const html = await this.financeService.renderReceiptHTML(id, req.user);
    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }
}
