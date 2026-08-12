import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { LiveScraperService } from './live-scraper.service';

@Module({
  controllers: [UniversitiesController],
  providers: [UniversitiesService, LiveScraperService],
  exports: [UniversitiesService, LiveScraperService],
})
export class UniversitiesModule {}
