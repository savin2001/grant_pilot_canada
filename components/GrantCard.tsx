import React from 'react';
import { AggregatedResult } from '../types';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight, DollarSign } from 'lucide-react';

interface Props {
  data: AggregatedResult;
  onClick: () => void;
}

const GrantCard: React.FC<Props> = ({ data, onClick }) => {
  const { grant, analysis } = data;

  let StatusIcon = AlertTriangle;
  let statusColor = "text-yellow-600 bg-yellow-50 border-yellow-200";
  
  if (analysis.eligibilityStatus === 'Eligible') {
    StatusIcon = CheckCircle;
    statusColor = "text-green-600 bg-green-50 border-green-200";
  } else if (analysis.eligibilityStatus === 'Ineligible') {
    StatusIcon = XCircle;
    statusColor = "text-red-600 bg-red-50 border-red-200";
  }

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-2 h-full ${analysis.matchScore > 70 ? 'bg-green-500' : analysis.matchScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
      
      <div className="p-6 pl-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{grant.agency}</span>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{grant.name}</h3>
          </div>
          <div className="flex flex-col items-end">
             <div className="text-2xl font-black text-gray-900">{analysis.matchScore}%</div>
             <div className="text-xs text-gray-500">Match Score</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColor}`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {analysis.eligibilityStatus}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            {grant.fundingType}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
             Up to ${grant.maxFunding.toLocaleString()}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {analysis.suitabilityReasoning}
        </p>

        <div className="flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
          View Analysis & Checklist <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default GrantCard;
