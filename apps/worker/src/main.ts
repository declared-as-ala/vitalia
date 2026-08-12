import { PolimiScraper } from './scrapers/polimi.scraper';

async function bootstrap() {
  console.log('🚀 ViaItalia Async Background Worker Running...');
  console.log('📦 BullMQ Queue Listener Initialized for Italy University Scraping Jobs & Email Dispatch.');

  const polimiScraper = new PolimiScraper();
  console.log(`✅ Loaded Scraper Source Adapter: ${polimiScraper.sourceName} [${polimiScraper.adapterKey}]`);
}

bootstrap();
