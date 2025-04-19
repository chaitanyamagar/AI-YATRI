
import React from 'react';
import DestinationHeader from './DestinationHeader';
import DestinationInfo from './DestinationInfo';
import LocalFoodGuide from './LocalFoodGuide';
import WeatherSafetyTips from './WeatherSafetyTips';
import LocalTransportGuide from './LocalTransportGuide';
import NearbyPlaces from './NearbyPlaces';
import DestinationSuggestions from './DestinationSuggestions';
import ContentToggleButtons from './ContentToggleButtons';
import ConditionalContent from './ConditionalContent';

interface DestinationMainContentProps {
  destination: any;
  showItinerary: boolean;
  showBudgetBreakdown: boolean;
  showTransportGuide: boolean;
  planType: 'short' | 'detailed';
  onToggleItinerary: () => void;
  onToggleBudget: () => void;
  onToggleTransport: () => void;
  onChangePlanType: (type: 'short' | 'detailed') => void;
}

const DestinationMainContent = ({
  destination,
  showItinerary,
  showBudgetBreakdown,
  showTransportGuide,
  planType,
  onToggleItinerary,
  onToggleBudget,
  onToggleTransport,
  onChangePlanType
}: DestinationMainContentProps) => {
  return (
    <>
      <DestinationHeader destination={destination} />
      
      <ContentToggleButtons 
        showItinerary={showItinerary}
        showBudgetBreakdown={showBudgetBreakdown}
        showTransportGuide={showTransportGuide}
        planType={planType}
        onToggleItinerary={onToggleItinerary}
        onToggleBudget={onToggleBudget}
        onToggleTransport={onToggleTransport}
        onChangePlanType={onChangePlanType}
      />
      
      <ConditionalContent 
        showItinerary={showItinerary}
        showBudgetBreakdown={showBudgetBreakdown}
        showTransportGuide={showTransportGuide}
        destinationName={destination.name}
      />
      
      <DestinationInfo destination={destination} />
      
      <LocalFoodGuide destination={destination.name} className="my-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <WeatherSafetyTips destination={destination.name} />
        {!showTransportGuide && <LocalTransportGuide destination={destination.name} />}
      </div>
      
      <NearbyPlaces destination={destination.name} className="mb-8" />
      
      <div className="mt-8">
        <h2 className="text-2xl font-display font-bold mb-4 dark:text-white">
          Explore {destination.name}
        </h2>
        <DestinationSuggestions destination={destination.name} />
      </div>
    </>
  );
};

export default DestinationMainContent;
