
import React from 'react';
import { IndianRupee } from 'lucide-react';

interface EstimatedCostProps {
  planType: 'short' | 'detailed';
  destinationName: string;
}

const EstimatedCost = ({ planType, destinationName }: EstimatedCostProps) => {
  // Generate estimated budget based on destination and plan type
  const getEstimatedBudget = () => {
    const name = destinationName.toLowerCase();
    
    // Fort-specific budgets
    if (name.includes('sinhagad') || name.includes('fort')) {
      if (planType === 'short') {
        return "₹800 - ₹1,500"; // Day trip to fort
      } else {
        return "₹3,000 - ₹5,000"; // Overnight trip to fort
      }
    }
    
    if (planType === 'short') {
      // Short plan budgets (1-2 days)
      if (name.includes('mumbai')) {
        return "₹5,000 - ₹8,000";
      } else if (name.includes('delhi')) {
        return "₹4,500 - ₹7,500";
      } else if (name.includes('goa')) {
        return "₹6,000 - ₹10,000";
      } else {
        return "₹4,000 - ₹7,000";
      }
    } else {
      // Detailed plan budgets (3+ days)
      if (name.includes('mumbai')) {
        return "₹15,000 - ₹25,000";
      } else if (name.includes('delhi')) {
        return "₹14,000 - ₹22,000";
      } else if (name.includes('goa')) {
        return "₹18,000 - ₹30,000";
      } else {
        return "₹12,000 - ₹20,000";
      }
    }
  };

  return (
    <div className="mb-5 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        <IndianRupee className="w-4 h-4 text-yatri-orange" />
        <span className="font-medium">
          Estimated Cost ({destinationName.toLowerCase().includes('fort') && planType === 'short' ? 'Day Trip' : 
            destinationName.toLowerCase().includes('fort') && planType === 'detailed' ? '1-2 days' : 
            planType === 'short' ? '1-2 days' : '3 days'}, 2 people)
        </span>
      </div>
      <div className="text-lg font-semibold text-yatri-blue">
        {getEstimatedBudget()}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {destinationName.toLowerCase().includes('fort') ? 
          'Includes entry tickets, transport, food & basic activities' : 
          'Includes accommodation, food, local transport & basic activities'}
      </p>
    </div>
  );
};

export default EstimatedCost;
