export enum Province {
  AB = 'Alberta',
  BC = 'British Columbia',
  MB = 'Manitoba',
  NB = 'New Brunswick',
  NL = 'Newfoundland and Labrador',
  NS = 'Nova Scotia',
  ON = 'Ontario',
  PE = 'Prince Edward Island',
  QC = 'Quebec',
  SK = 'Saskatchewan',
  NT = 'Northwest Territories',
  NU = 'Nunavut',
  YT = 'Yukon',
}

export enum Industry {
  Tech = 'Technology & Software',
  Mfg = 'Manufacturing',
  Agri = 'Agriculture',
  Retail = 'Retail & E-commerce',
  Health = 'Health & Life Sciences',
  Green = 'Clean Tech & Energy',
  Other = 'Other',
}

export interface BusinessProfile {
  companyName: string;
  industry: Industry;
  province: Province;
  yearsInBusiness: number;
  employeeCount: number;
  annualRevenue: number;
  isIncorporated: boolean;
  projectDescription: string;
  projectBudget: number;
}

export interface Grant {
  id: string;
  name: string;
  agency: string;
  description: string;
  maxFunding: number;
  fundingType: 'Grant' | 'Loan' | 'Tax Credit';
  rawCriteria: string; // The "Source of Truth" for the AI
}

export interface AnalysisResult {
  grantId: string;
  matchScore: number; // 0-100
  eligibilityStatus: 'Eligible' | 'Ineligible' | 'Conditional';
  hardDisqualifiers: string[];
  suitabilityReasoning: string;
  requiredDocuments: string[];
  citation: string; // Specific section of rawCriteria used
}

export interface AggregatedResult {
  grant: Grant;
  analysis: AnalysisResult;
}
