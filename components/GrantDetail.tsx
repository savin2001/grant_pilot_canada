import React from 'react';
import { AggregatedResult } from '../types';
import { X, Check, AlertCircle, FileText, Quote } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface Props {
  data: AggregatedResult;
  onClose: () => void;
}

const GrantDetail: React.FC<Props> = ({ data, onClose }) => {
  const { grant, analysis } = data;

  const scoreData = [
    { name: 'Match', value: analysis.matchScore },
    { name: 'Gap', value: 100 - analysis.matchScore },
  ];
  
  const scoreColor = analysis.matchScore >= 70 ? '#16a34a' : analysis.matchScore >= 40 ? '#ca8a04' : '#dc2626';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{grant.name}</h2>
              <p className="text-sm text-gray-500">{grant.agency}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 bg-white rounded-full p-2 hover:bg-gray-100 transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Left Column: Score & Status */}
              <div className="col-span-1 space-y-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center justify-center">
                   <div className="h-40 w-40 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={scoreData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          startAngle={90}
                          endAngle={-270}
                          dataKey="value"
                        >
                          <Cell key="match" fill={scoreColor} />
                          <Cell key="gap" fill="#f3f4f6" />
                          <Label 
                            value={`${analysis.matchScore}%`} 
                            position="center" 
                            className="text-2xl font-bold fill-gray-900" 
                          />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                   </div>
                   <p className="text-center font-medium text-gray-900 mt-2">Eligibility Confidence</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Funding Details</h4>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Max Amount:</span>
                        <span className="font-medium text-gray-900">${grant.maxFunding.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium text-gray-900">{grant.fundingType}</span>
                    </div>
                </div>
              </div>

              {/* Right Column: Analysis */}
              <div className="col-span-1 md:col-span-2 space-y-6">
                
                {/* Reasoning */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Assessment</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 leading-relaxed text-sm">{analysis.suitabilityReasoning}</p>
                  </div>
                </div>

                {/* Hard Disqualifiers */}
                {analysis.hardDisqualifiers.length > 0 && (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                    <h3 className="flex items-center text-red-800 font-semibold mb-2">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Critical Issues Found
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {analysis.hardDisqualifiers.map((issue, idx) => (
                        <li key={idx} className="text-sm text-red-700">{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Evidence */}
                <div>
                    <h3 className="flex items-center text-gray-900 font-semibold mb-2 text-sm">
                        <Quote className="w-4 h-4 mr-2 text-gray-400" />
                        Criteria Citation
                    </h3>
                    <p className="text-xs text-gray-500 italic border-l-2 border-gray-300 pl-3">
                        "{analysis.citation}"
                    </p>
                </div>

                {/* Document Checklist */}
                {analysis.matchScore > 40 && (
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        Application Kit Checklist
                    </h3>
                    <ul className="space-y-3">
                        {analysis.requiredDocuments.map((doc, idx) => (
                            <li key={idx} className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 rounded border border-gray-300 bg-white flex items-center justify-center mt-0.5">
                                    <div className="h-2.5 w-2.5 rounded-sm bg-blue-600 opacity-20"></div>
                                </div>
                                <span className="ml-3 text-sm text-gray-700">{doc}</span>
                            </li>
                        ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
             <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3">
               Close
             </button>
             {analysis.matchScore > 60 && (
                <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                    Start Application
                </button>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default GrantDetail;
