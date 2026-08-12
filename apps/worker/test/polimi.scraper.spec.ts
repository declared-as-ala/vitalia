import * as fs from 'fs';
import * as path from 'path';
import { PolimiScraper } from '../src/scrapers/polimi.scraper';

describe('PolimiScraper Unit Test (Offline Fixtures)', () => {
  let scraper: PolimiScraper;

  beforeEach(() => {
    scraper = new PolimiScraper();
  });

  it('should parse program details from local HTML fixture without live network call', () => {
    const fixturePath = path.join(__dirname, 'fixtures/polimi_cs.html');
    const html = fs.readFileSync(fixturePath, 'utf8');
    const sourceUrl = 'https://www.polimi.it/en/international-prospective-students';

    const results = scraper.parseHTML(html, sourceUrl);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThanOrEqual(1);

    const firstProgram = results[0];
    expect(firstProgram.universityName).toBe('Politecnico di Milano');
    expect(firstProgram.universityCity).toBe('Milano');
    expect(firstProgram.programName).toBe('Computer Science and Engineering');
    expect(firstProgram.degreeLevel).toBe('MASTER');
    expect(firstProgram.applicationFee).toBe(50.0);
    expect(firstProgram.sourceUrl).toBe(sourceUrl);
  });
});
