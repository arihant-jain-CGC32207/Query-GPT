import React from 'react';
import { MessageSquare, Database, Zap } from 'lucide-react';

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onSuggestionClick }) => {
  const examples = [
    {
      text: "Get a count of leads based on their status. Only consider leads that have a valid status.",
      icon: <Database size={16} />
    },
    {
      text: "Create a MongoDB aggregation pipeline to retrieve the count of leads grouped by their legal_stage, but only for those leads with a disbursement_status of 'PENDING_AT_CHECKER'.Sort the results in descending order of the count to show the most common legal stages first.",
      icon: <Zap size={16} />
    },
    {
      text: "Give me all leads with bre_bureau_risk value = 'High Bureau Risk' , including their lead_id, loan_eligibility, pd_status",
      icon: <MessageSquare size={16} />
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <MessageSquare size={32} className="text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Welcome to QueryGPT
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Transform your natural language questions into powerful database queries instantly. 
          Ask me anything about your data!
        </p>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 mb-4">Try these examples:</p>
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(example.text)}
              className="w-full p-4 text-left bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="text-blue-500 group-hover:text-blue-600">
                  {example.icon}
                </div>
                <span className="text-gray-800 group-hover:text-blue-800">
                  {example.text}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            <span className="font-medium">💡 Pro tip:</span> Be specific about your data requirements. 
            Mention fields, time ranges, and conditions for better results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;