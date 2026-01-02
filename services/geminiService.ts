import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BusinessProfile, Grant, AnalysisResult } from '../types';

// NOTE: In a production environment, this key should be proxied through a backend.
// For this MVP demo, we assume the environment variable is set.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    matchScore: { type: Type.NUMBER, description: "A score from 0 to 100 indicating suitability." },
    eligibilityStatus: { type: Type.STRING, enum: ["Eligible", "Ineligible", "Conditional"] },
    hardDisqualifiers: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of specific reasons why the applicant is ineligible based on hard rules (revenue, age, location)."
    },
    suitabilityReasoning: { type: Type.STRING, description: "Explanation of why the project aligns (or doesn't) with the grant goals." },
    requiredDocuments: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "A specific list of documents likely needed based on the grant criteria."
    },
    citation: { type: Type.STRING, description: "The specific text from the provided criteria used to make the decision." }
  },
  required: ["matchScore", "eligibilityStatus", "hardDisqualifiers", "suitabilityReasoning", "requiredDocuments", "citation"]
};

export const analyzeGrantMatch = async (profile: BusinessProfile, grant: Grant): Promise<AnalysisResult> => {
  if (!apiKey) {
    console.error("API Key missing");
    throw new Error("API Key missing");
  }

  // Updated to 'gemini-3-flash-preview' which is a valid model for text tasks
  const model = "gemini-3-flash-preview";

  const prompt = `
    You are a Senior Grant Adjudicator for the Canadian Government.
    
    Evaluate the following BUSINESS PROFILE against the GRANT CRITERIA.
    
    BUSINESS PROFILE:
    - Name: ${profile.companyName}
    - Location: ${profile.province}
    - Years in Business: ${profile.yearsInBusiness}
    - Employees: ${profile.employeeCount}
    - Annual Revenue: $${profile.annualRevenue}
    - Incorporated: ${profile.isIncorporated}
    - Industry: ${profile.industry}
    - Project: ${profile.projectDescription}
    - Budget: $${profile.projectBudget}

    GRANT CRITERIA (Source of Truth):
    ${grant.rawCriteria}

    INSTRUCTIONS:
    1. Check for HARD DISQUALIFIERS first. Examples: Revenue thresholds, incorporation status, location restrictions, excluded industries.
    2. If hard disqualifiers exist, set score < 20 and status "Ineligible".
    3. If eligible, assess SUITABILITY. Does the project description match the grant's intent?
    4. Generate a specific checklist of documents based on standard Canadian grant requirements (e.g. if incorporated, ask for Articles of Incorporation; if financials mentioned, ask for T2 Schedule 100/125).
    5. Be strict but fair. Do not hallucinate criteria not present in the text or standard Canadian business context.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.1, // Low temperature for factual accuracy
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text) as AnalysisResult;
    
    // Inject the ID back for tracking (though not part of the AI response)
    return { ...result, grantId: grant.id };

  } catch (error) {
    console.error(`Error analyzing grant ${grant.id}:`, error);
    // Return a fallback error result so the UI doesn't crash
    return {
      grantId: grant.id,
      matchScore: 0,
      eligibilityStatus: "Ineligible",
      hardDisqualifiers: ["System error during analysis. Please try again later."],
      suitabilityReasoning: "Unable to process due to technical error.",
      requiredDocuments: [],
      citation: "N/A"
    };
  }
};