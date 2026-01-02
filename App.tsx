import React, { useState, useEffect } from 'react';
import Wizard from './components/Wizard';
import GrantCard from './components/GrantCard';
import GrantDetail from './components/GrantDetail';
import { BusinessProfile, AggregatedResult } from './types';
import { MOCK_GRANTS_DB } from './constants';
import { analyzeGrantMatch } from './services/geminiService';
import { Plane, CheckCircle2, Loader2, Info } from 'lucide-react';

enum AppState {
  LANDING,
  WIZARD,
  PROCESSING,
  DASHBOARD
}

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [results, setResults] = useState<AggregatedResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<AggregatedResult | null>(null);
  const [businessName, setBusinessName] = useState("");

  const handleStart = () => {
    // Check for API key before starting
    if (!process.env.API_KEY) {
      alert("Please provide a valid API_KEY in the environment variables to run this demo.");
      return;
    }
    setAppState(AppState.WIZARD);
  };

  const handleWizardComplete = async (profile: BusinessProfile) => {
    setBusinessName(profile.companyName);
    setAppState(AppState.PROCESSING);
    
    // Simulate AI Processing
    const promises = MOCK_GRANTS_DB.map(grant => analyzeGrantMatch(profile, grant).then(analysis => ({ grant, analysis })));
    
    try {
      const outcomes = await Promise.all(promises);
      // Sort by Match Score (descending)
      const sorted = outcomes.sort((a, b) => b.analysis.matchScore - a.analysis.matchScore);
      setResults(sorted);
      setAppState(AppState.DASHBOARD);
    } catch (e) {
      console.error(e);
      alert("An error occurred during AI analysis. Please check console.");
      setAppState(AppState.LANDING);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setAppState(AppState.LANDING)}>
              <div className="bg-red-600 p-1.5 rounded-lg mr-2">
                <Plane className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">GrantPilot <span className="text-red-600">Canada</span></span>
            </div>
            {appState === AppState.DASHBOARD && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Analyzing for: <span className="font-semibold text-gray-900">{businessName}</span></span>
                <button 
                  onClick={() => setAppState(AppState.WIZARD)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* LANDING PAGE */}
        {appState === AppState.LANDING && (
          <div className="text-center py-20 animate-fade-in">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Stop guessing. Start funding.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              The Canadian grant ecosystem is a "black box". Our AI instantly matches your business with over 4,000 active government funding programs, checks eligibility, and generates your document checklist.
            </p>
            <button 
              onClick={handleStart}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-red-600 hover:bg-red-700 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              Check My Eligibility Free
            </button>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">No Hallucinations</h3>
                <p className="text-gray-600 text-sm">We cite specific sections of official government guidelines for every eligibility decision.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Info className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Privacy First</h3>
                <p className="text-gray-600 text-sm">Your financial data is processed securely. We assess eligibility without storing sensitive files.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-purple-600 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Instant Checklists</h3>
                <p className="text-gray-600 text-sm">Don't just get a match. Get a generated list of exactly what documents (T2, Articles, Budget) you need.</p>
              </div>
            </div>
          </div>
        )}

        {/* WIZARD */}
        {appState === AppState.WIZARD && (
          <div className="animate-fade-in-up">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Let's build your profile</h2>
              <p className="text-gray-500 mt-2">Answer 4 simple questions to unlock funding opportunities.</p>
            </div>
            <Wizard onComplete={handleWizardComplete} />
          </div>
        )}

        {/* PROCESSING */}
        {appState === AppState.PROCESSING && (
          <div className="flex flex-col items-center justify-center py-32 animate-pulse">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing 4,000+ Programs...</h2>
            <p className="text-gray-500">Checking eligibility against federal and provincial databases.</p>
          </div>
        )}

        {/* DASHBOARD */}
        {appState === AppState.DASHBOARD && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Funding Opportunities</h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{results.filter(r => r.analysis.matchScore > 70).length} High Potential Matches</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {results.map((result) => (
                <GrantCard 
                  key={result.grant.id} 
                  data={result} 
                  onClick={() => setSelectedResult(result)} 
                />
              ))}
            </div>

            {results.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No grants found matching your exact criteria. Try adjusting your project description.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal Detail View */}
      {selectedResult && (
        <GrantDetail 
          data={selectedResult} 
          onClose={() => setSelectedResult(null)} 
        />
      )}

    </div>
  );
}

export default App;
