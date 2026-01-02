# GrantPilot Canada (MVP)

**GrantPilot Canada** is an AI-powered intelligence platform designed to demystify the Canadian government grant ecosystem for Small and Medium Enterprises (SMEs).

## 🚩 The Problem
The Canadian funding landscape is a "black box" containing over 4,000 active programs across federal, provincial, and municipal levels.
- **Fragmentation:** Grants are scattered across dozens of government websites.
- **Complexity:** Eligibility rules are buried in dense PDFs ("fine print").
- **Wasted Time:** Founders spend 40+ hours searching, often applying to programs they are technically ineligible for due to obscure criteria (e.g., incorporation date or specific NAICS codes).

## 💡 The Solution
GrantPilot acts as a "TurboTax for Grants". Instead of searching keywords, users answer a simple business profile questionnaire.
- **Semantic Matcher:** Our AI engine analyzes the *intent* of a business project against the *objectives* of a grant.
- **Eligibility Validator:** Identifies "Hard Disqualifiers" immediately (e.g., "You need 3 years of financials, but you only have 1").
- **Evidence-Based:** Every "Eligible" or "Ineligible" decision cites the specific section of the official guidelines, preventing AI hallucinations.
- **Actionable Checklists:** Generates a dynamic list of required documents (e.g., T2 Schedule 125, Articles of Incorporation) so founders can apply immediately.

## 🧪 Testing Guide (Dummy Data)

When you run the application, you will see buttons to "Quick-Fill" test profiles in the Wizard. Use these to verify the logic:

### 1. Tech Scale-Up (High Match)
*   **Profile:** "Quantum Logic Inc." from Ontario. High revenue ($850k), incorporated, Tech industry.
*   **Expected Result:** 
    *   **CDAP (Boost Your Business):** High Match (>80%). Fits revenue and employee criteria.
    *   **SR&ED:** High Match. Project describes "R&D" and "algorithms".
    *   **CanExport:** Possible match if export is mentioned, otherwise lower.

### 2. BC Manufacturer (Export)
*   **Profile:** "Pacific Woodworks Ltd." from BC. $5M Revenue, manufacturing.
*   **Expected Result:**
    *   **CanExport SMEs:** High Match (>80%). Project explicitly mentions "German market" and "Trade Fair".
    *   **CDAP:** Eligible.
    *   **Ontario Regional Fund:** **INELIGIBLE**. The company is in BC, but the grant requires Ontario. The AI should catch this location disqualifier.

### 3. New Retail (Low Match)
*   **Profile:** "Jenny's Boutique" from Alberta. Unincorporated, $25k revenue.
*   **Expected Result:**
    *   **CDAP:** **INELIGIBLE**. Requires $500k revenue.
    *   **CanExport:** **INELIGIBLE**. Requires $100k revenue and incorporation.
    *   **SR&ED:** **INELIGIBLE**. Retail inventory is not eligible R&D work.

## 🎯 Target Audience
- **Canadian SME Founders:** Tech startups, manufacturers, and service businesses looking for non-dilutive funding.
- **Grant Consultants:** Professionals seeking to automate the initial screening process for clients.
- **Regional Development Agencies:** Organizations wanting to route businesses to the right local funds.

## 🛠️ Technology Stack (MVP)

### Frontend
- **React (TypeScript):** For a responsive, type-safe user interface.
- **Tailwind CSS:** For rapid, clean styling.
- **Recharts:** To visualize "Match Scores" and data.
- **Lucide React:** For consistent iconography.

### AI & Logic Engine
- **Google Gemini API (`gemini-2.5-flash-latest`):** The core intelligence.
  - Used for **Semantic Matching**: Comparing unstructured project descriptions against grant criteria.
  - Used for **Structured Extraction**: Returning strict JSON responses for "Match Score", "Hard Disqualifiers", and "Document Checklists".
  - **Reasoning**: The model is instructed to act as a "Senior Grant Adjudicator" with a low temperature (0.1) to prioritize factual accuracy over creativity.

### Data
- **Mock Grant Database:** A curated list of real Canadian grants (CDAP, CanExport, SR&ED) stored as structured objects with raw text criteria. In a production environment, this would be replaced by a Vector Database (e.g., Pinecone) indexing scraped government data.

## 🚀 How to Run
1. Obtain a Google Gemini API Key.
2. Set the `API_KEY` in your environment.
3. Serve the application (e.g., using a simple HTTP server or Vite).
