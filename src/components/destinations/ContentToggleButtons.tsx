
import React from 'react';
import { Button } from '@/components/ui/button';

interface ContentToggleButtonsProps {
  showItinerary: boolean;
  showBudgetBreakdown: boolean;
  showTransportGuide: boolean;
  planType: 'short' | 'detailed';
  onToggleItinerary: () => void;
  onToggleBudget: () => void;
  onToggleTransport: () => void;
  onChangePlanType: (type: 'short' | 'detailed') => void;
}

const ContentToggleButtons = ({
  showItinerary,
  showBudgetBreakdown,
  showTransportGuide,
  planType,
  onToggleItinerary,
  onToggleBudget,
  onToggleTransport,
  onChangePlanType
}: ContentToggleButtonsProps) => {
  return (
    <div className="space-y-3 mt-4 mb-6">
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={onToggleItinerary}
          variant={showItinerary ? "default" : "secondary"}
          className="flex items-center gap-2"
        >
          {showItinerary ? "Hide AI Trip Plan" : "Get AI Trip Plan"}
        </Button>
        
        <Button 
          onClick={onToggleBudget}
          variant={showBudgetBreakdown ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          {showBudgetBreakdown ? "Hide Budget Breakdown" : "View Budget Breakdown"}
        </Button>
        
        <Button 
          onClick={onToggleTransport}
          variant={showTransportGuide ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          {showTransportGuide ? "Hide Transport Guide" : "View Transport Guide"}
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant={planType === 'short' ? "secondary" : "outline"}
          size="sm"
          onClick={() => onChangePlanType('short')}
        >
          Short Trip Plan (1-2 days)
        </Button>
        <Button
          variant={planType === 'detailed' ? "secondary" : "outline"}
          size="sm"
          onClick={() => onChangePlanType('detailed')}
        >
          Detailed Trip Plan (3+ days)
        </Button>
      </div>
    </div>
  );
};

export default ContentToggleButtons;
