import { useState } from 'react';
import { IndianRupee } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface CostBreakdownProps {
  costs: {
    accommodation: number;
    transport: number;
    food: number;
    activities: number;
    misc: number;
    total: number;
  }
}

const DetailedCostBreakdown = ({ costs }: CostBreakdownProps) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN');
  };
  
  // Calculate percentage of total for each category
  const getPercentage = (amount: number) => {
    if (costs.total === 0) return 0;
    return Math.round((amount / costs.total) * 100);
  };
  
  // Only show if we have valid total costs
  if (costs.total <= 0) return null;
  
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-medium text-gray-700 dark:text-gray-300">
          Estimated Cost Breakdown
        </h3>
        <button
          type="button"
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showBreakdown ? 'Hide' : 'Show'} Details
        </button>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <IndianRupee className="h-5 w-5 text-yatri-blue mr-2" />
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Total Estimated Cost
            </span>
          </div>
          <span className="text-lg font-semibold text-yatri-blue">
            ₹{formatCurrency(costs.total)}
          </span>
        </div>
        
        {showBreakdown && (
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Accommodation</span>
                <span className="text-gray-700 dark:text-gray-200">
                  ₹{formatCurrency(costs.accommodation)} ({getPercentage(costs.accommodation)}%)
                </span>
              </div>
              <Progress value={getPercentage(costs.accommodation)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Transportation</span>
                <span className="text-gray-700 dark:text-gray-200">
                  ₹{formatCurrency(costs.transport)} ({getPercentage(costs.transport)}%)
                </span>
              </div>
              <Progress value={getPercentage(costs.transport)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Food & Dining</span>
                <span className="text-gray-700 dark:text-gray-200">
                  ₹{formatCurrency(costs.food)} ({getPercentage(costs.food)}%)
                </span>
              </div>
              <Progress value={getPercentage(costs.food)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Activities</span>
                <span className="text-gray-700 dark:text-gray-200">
                  ₹{formatCurrency(costs.activities)} ({getPercentage(costs.activities)}%)
                </span>
              </div>
              <Progress value={getPercentage(costs.activities)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Miscellaneous</span>
                <span className="text-gray-700 dark:text-gray-200">
                  ₹{formatCurrency(costs.misc)} ({getPercentage(costs.misc)}%)
                </span>
              </div>
              <Progress value={getPercentage(costs.misc)} className="h-2" />
            </div>
            
            <div className="pt-2 border-t border-gray-200 dark:border-gray-600 mt-3">
              <div className="text-sm text-gray-600 dark:text-gray-300 italic">
                Note: These are estimated costs based on current rates. Actual prices may vary.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedCostBreakdown;
