
import React from 'react';
import SampleItinerary from './SampleItinerary';
import DestinationCostEstimate from './DestinationCostEstimate';
import LocalTransportGuide from './LocalTransportGuide';

interface ConditionalContentProps {
  showItinerary: boolean;
  showBudgetBreakdown: boolean;
  showTransportGuide: boolean;
  destinationName: string;
}

const ConditionalContent = ({
  showItinerary,
  showBudgetBreakdown,
  showTransportGuide,
  destinationName
}: ConditionalContentProps) => {
  return (
    <>
      {showItinerary && (
        <div className="mb-8">
          <SampleItinerary destination={destinationName} />
        </div>
      )}
      
      {showBudgetBreakdown && (
        <div className="mb-8">
          <DestinationCostEstimate destination={destinationName} />
        </div>
      )}
      
      {showTransportGuide && (
        <div className="mb-8">
          <LocalTransportGuide destination={destinationName} />
        </div>
      )}
    </>
  );
};

export default ConditionalContent;
