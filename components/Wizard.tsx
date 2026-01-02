import React, { useState } from 'react';
import { BusinessProfile, Industry, Province } from '../types';
import { PROVINCES_LIST } from '../constants';
import { ArrowRight, ArrowLeft, Building2, MapPin, DollarSign, Briefcase, FlaskConical } from 'lucide-react';

interface Props {
  onComplete: (profile: BusinessProfile) => void;
}

const steps = [
  { id: 1, title: 'Basics', icon: Building2 },
  { id: 2, title: 'Location', icon: MapPin },
  { id: 3, title: 'Financials', icon: DollarSign },
  { id: 4, title: 'Project', icon: Briefcase },
];

const TEST_PROFILES = [
  {
    label: "Tech Scale-Up (High Match)",
    data: {
      companyName: "Quantum Logic Inc.",
      industry: Industry.Tech,
      province: Province.ON,
      yearsInBusiness: 4,
      employeeCount: 12,
      annualRevenue: 850000,
      isIncorporated: true,
      projectDescription: "We are conducting R&D to develop a new proprietary machine learning algorithm for logistics optimization. We also need to digitize our internal CRM systems.",
      projectBudget: 150000
    }
  },
  {
    label: "BC Manufacturer (Export)",
    data: {
      companyName: "Pacific Woodworks Ltd.",
      industry: Industry.Mfg,
      province: Province.BC,
      yearsInBusiness: 8,
      employeeCount: 45,
      annualRevenue: 5200000,
      isIncorporated: true,
      projectDescription: "We want to expand our sales to the German market by attending the Munich Trade Fair. We need to translate our marketing materials and protect our IP in Europe.",
      projectBudget: 60000
    }
  },
  {
    label: "New Retail (Low Match)",
    data: {
      companyName: "Jenny's Boutique",
      industry: Industry.Retail,
      province: Province.AB,
      yearsInBusiness: 0,
      employeeCount: 1,
      annualRevenue: 25000,
      isIncorporated: false,
      projectDescription: "I need funding to buy inventory for my new clothing store and pay for a local radio advertisement to get more customers.",
      projectBudget: 5000
    }
  }
];

const Wizard: React.FC<Props> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<Partial<BusinessProfile>>({
    isIncorporated: true,
    yearsInBusiness: 1,
    employeeCount: 1,
    annualRevenue: 0,
    projectBudget: 10000,
  });

  const handleChange = (field: keyof BusinessProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(profile as BusinessProfile);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const loadProfile = (data: Partial<BusinessProfile>) => {
    setProfile(data);
    // Reset to step 1 so user can review the data
    setCurrentStep(1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return profile.companyName && profile.industry;
      case 2: return profile.province;
      case 3: return (profile.annualRevenue ?? -1) >= 0;
      case 4: return profile.projectDescription && (profile.projectDescription.length > 20);
      default: return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Test Data Quick-Fill */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
          <FlaskConical className="w-3 h-3 mr-1" /> Test Data:
        </span>
        {TEST_PROFILES.map((tp, idx) => (
          <button
            key={idx}
            onClick={() => loadProfile(tp.data)}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded-full transition font-medium"
          >
            {tp.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Progress Bar */}
        <div className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex justify-between items-center">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>{step.title}</span>
              </div>
            );
          })}
          {/* Progress Line */}
          <div className="absolute top-[4.5rem] left-0 w-full h-0.5 bg-gray-200 -z-0 hidden md:block" /> 
        </div>

        <div className="p-8 min-h-[400px]">
          {currentStep === 1 && (
            <div className="space-y-6 fade-in">
              <h2 className="text-2xl font-bold text-gray-800">Tell us about your business</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Legal Company Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-500"
                  placeholder="e.g. Acme Innovations Inc."
                  value={profile.companyName || ''}
                  onChange={e => handleChange('companyName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry Sector</label>
                <select 
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={profile.industry || ''}
                  onChange={e => handleChange('industry', e.target.value as Industry)}
                >
                  <option value="">Select Industry...</option>
                  {Object.values(Industry).map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  id="incorp"
                  checked={profile.isIncorporated}
                  onChange={e => handleChange('isIncorporated', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 bg-white border-gray-300"
                />
                <label htmlFor="incorp" className="text-sm text-gray-700">Business is federally or provincially incorporated</label>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 fade-in">
              <h2 className="text-2xl font-bold text-gray-800">Where are you located?</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Province / Territory</label>
                <select 
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={profile.province || ''}
                  onChange={e => handleChange('province', e.target.value as Province)}
                >
                  <option value="">Select Location...</option>
                  {PROVINCES_LIST.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  This helps us filter for provincial-specific funding like the Ontario Regional Development Program or Invest Quebec.
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 fade-in">
              <h2 className="text-2xl font-bold text-gray-800">Financial Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={profile.yearsInBusiness}
                    onChange={e => handleChange('yearsInBusiness', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full-time Employees</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={profile.employeeCount}
                    onChange={e => handleChange('employeeCount', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue (Last Fiscal Year)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input 
                    type="number" 
                    className="w-full pl-7 px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                    placeholder="0.00"
                    value={profile.annualRevenue}
                    onChange={e => handleChange('annualRevenue', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 fade-in">
              <h2 className="text-2xl font-bold text-gray-800">The Ask</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What is your project/need?</label>
                <textarea 
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none placeholder-gray-500"
                  placeholder="e.g. We are looking to hire 2 software developers to build a new AI feature..."
                  value={profile.projectDescription || ''}
                  onChange={e => handleChange('projectDescription', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Be specific. Mention "hiring", "exporting", "R&D", or "software adoption".</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input 
                    type="number" 
                    className="w-full pl-7 px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={profile.projectBudget}
                    onChange={e => handleChange('projectBudget', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button 
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-2 rounded-lg font-medium transition ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <button 
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center px-6 py-2 rounded-lg font-medium text-white transition shadow-sm ${!isStepValid() ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'}`}
          >
            {currentStep === steps.length ? 'Analyze Grants' : 'Next Step'} 
            {currentStep !== steps.length && <ArrowRight className="w-4 h-4 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;