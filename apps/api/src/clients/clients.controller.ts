import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@viaitalia/types';

@ApiTags('Client CRM')
@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Get paginated client list (Admin/Agent only)' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.AGENT)
  @Get()
  async getClients(@Query() query: any) {
    return this.clientsService.getClients(query);
  }

  @ApiOperation({ summary: 'Create new client profile & login credentials' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.AGENT)
  @Post()
  async createClient(@Body() body: any) {
    return this.clientsService.createClient(body);
  }

  @ApiOperation({ summary: 'Get aggregated client profile details & history' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.AGENT)
  @Get(':id')
  async getClientDetails(@Param('id') id: string) {
    return this.clientsService.getClientDetails(id);
  }
}
