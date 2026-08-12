import * as cheerio from 'cheerio';
import { SSRFGuard } from './ssrf.guard';

export interface ScrapedProgramResult {
  universityName: string;
  universityCity: string;
  programName: string;
  degreeLevel: 'BACHELOR' | 'MASTER' | 'PHD';
  studyDomain: string;
  language: string;
  academicYear: string;
  openingDate?: Date;
  closingDate?: Date;
  applicationFee?: number;
  tuitionFee?: number;
  sourceUrl: string;
}

export abstract class BaseUniversityScraper {
  abstract readonly sourceName: string;
  abstract readonly adapterKey: string;

  protected loadHTML(htmlContent: string): cheerio.CheerioAPI {
    return cheerio.load(htmlContent);
  }

  protected validateUrl(url: string): void {
    if (!SSRFGuard.validateTargetURL(url)) {
      throw new Error(`SSRF Guard: Scraping URL '${url}' violates security domain allowlist.`);
    }
  }

  abstract parseHTML(htmlContent: string, sourceUrl: string): ScrapedProgramResult[];
}
