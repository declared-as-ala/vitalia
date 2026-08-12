import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UniversitiesService } from './universities.service';
import { LiveScraperService } from './live-scraper.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@viaitalia/types';

@ApiTags('Italy Universities Research')
@Controller('universities')
export class UniversitiesController {
  constructor(
    private universitiesService: UniversitiesService,
    private liveScraperService: LiveScraperService,
  ) {}

  @ApiOperation({ summary: 'Search Italian university programs by study domain & filters' })
  @Get('search')
  async search(@Query() query: any) {
    return this.universitiesService.searchPrograms(query);
  }

  @ApiOperation({ summary: 'Get Italy university search KPIs & application metrics' })
  @Get('stats')
  async getStats() {
    return this.universitiesService.getStats();
  }

  @ApiOperation({ summary: 'Get upcoming Italian university application deadlines' })
  @Get('deadlines')
  async getDeadlines() {
    return this.universitiesService.getUpcomingDeadlines();
  }

  @ApiOperation({ summary: 'Trigger live background web scraper for Italian universities' })
  @Post('scrape/trigger')
  async triggerScrape() {
    return this.liveScraperService.runLiveScrapeJob();
  }
}
