import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@viaitalia/types';

@ApiTags('Admin Dashboard Reports & KPIs')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @ApiOperation({ summary: 'Get dynamic Admin Home Dashboard KPIs & metrics from database' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get('dashboard')
  async getAdminDashboardKPIs() {
    return this.reportsService.getAdminDashboardKPIs();
  }
}
