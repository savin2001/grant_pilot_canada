import { Grant, Province } from './types';

export const PROVINCES_LIST = Object.values(Province);

// In a real app, this would be a Vector Database (Pinecone/Weaviate)
export const MOCK_GRANTS_DB: Grant[] = [
  {
    id: 'CDAP-BOOST',
    name: 'Canadian Digital Adoption Program (Boost Your Business)',
    agency: 'ISED Canada',
    description: 'Funding to help SMEs adopt new digital technologies.',
    maxFunding: 15000,
    fundingType: 'Grant',
    rawCriteria: `
      Eligibility Criteria:
      - Be incorporated federally or provincially, or be a Canadian resident sole proprietor.
      - Be a for-profit, privately owned business.
      - Have between 1 - 499 full-time equivalent employees.
      - Have at least $500,000 of annual revenue in one of the previous three tax years.
      
      Eligible Activities:
      - Hiring a digital advisor.
      - Creating a digital adoption plan.
      - Acquiring new digital technologies (e.g., e-commerce, back-office solutions).
      
      Ineligible:
      - Corporate chains, franchises, or registered charities.
      - Multi-level marketing companies.
    `
  },
  {
    id: 'CANEXPORT-SME',
    name: 'CanExport SMEs',
    agency: 'Trade Commissioner Service',
    description: 'Funding to help Canadian businesses develop new export opportunities and markets.',
    maxFunding: 50000,
    fundingType: 'Grant',
    rawCriteria: `
      Eligibility Criteria:
      - Be a for-profit company.
      - Be an incorporated legal entity or a limited liability partnership (LLP).
      - Have a CRA business number.
      - Have fewer than 500 full-time equivalent (FTE) employees.
      - Have $100,000 to $100 million in declared revenue in Canada during its last complete tax year.
      
      Eligible Expenses:
      - Travel for meetings with key contacts in target markets.
      - Participation in trade fairs.
      - Adaptation of marketing tools for a new market (translation).
      - IP protection in international markets.
      
      Disqualifiers:
      - Companies in the cannabis, tobacco, or vaping sectors are ineligible.
      - Projects targeting markets where the company already has sales > 10% of total revenue or > $100k.
    `
  },
  {
    id: 'SRED',
    name: 'SR&ED Tax Incentive',
    agency: 'Canada Revenue Agency (CRA)',
    description: 'Tax incentives for businesses conducting research and development in Canada.',
    maxFunding: 1000000, // Conceptually uncapped, but putting a placeholder
    fundingType: 'Tax Credit',
    rawCriteria: `
      Eligibility Criteria:
      - Available to any business operating in Canada.
      - Must conduct "Scientific Research and Experimental Development".
      
      The Work Must Meet the "Why, How, and What" Test:
      1. Scientific or Technological Uncertainty (Why): Standard practice cannot solve the problem.
      2. Scientific or Technological Advancement (How): The work attempts to generate new knowledge or improve existing processes/products significantly.
      3. Technical Content (What): A systematic investigation was undertaken (hypotheses, testing, logs).
      
      Eligible Expenditures:
      - Wages, materials, machinery, overhead related to R&D.
      - Third-party payments to contractors.
    `
  },
  {
    id: 'OG-RDF',
    name: 'Ontario Regional Development Program',
    agency: 'Government of Ontario',
    description: 'Support for eligible SMEs investing in new equipment and expansion in eastern and southwestern Ontario.',
    maxFunding: 500000,
    fundingType: 'Grant',
    rawCriteria: `
      Eligibility Criteria:
      - Must be located in eligible regions of Eastern or Southwestern Ontario.
      - Minimum investment of $500,000.
      - Have at least 3 years of financial statements.
      - Create at least 5 new jobs.
      - Be in advanced manufacturing, ICT, or Life Sciences.
      
      Ineligible:
      - Retail, construction, and primary agriculture production.
      - Projects located in the GTA (Greater Toronto Area) are generally excluded unless specific exceptions apply.
    `
  }
];
