
import React from 'react';
import { Compass, Backpack, Utensils, Plane, Hotel } from 'lucide-react';

interface QuickRecommendationsProps {
  planType: 'short' | 'detailed';
  destinationName: string;
  attractions: string[];
}

const QuickRecommendations = ({ planType, destinationName, attractions }: QuickRecommendationsProps) => {
  if (planType !== 'short') {
    return null;
  }

  const name = destinationName.toLowerCase();
  
  // Fort-specific recommendations
  if (name.includes('fort')) {
    return (
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-yatri-orange" />
          <span className="text-sm">Best Entry: Main entrance via {name.includes('sinhagad') ? 'Sinhagad Ghat Road' : name.includes('raigad') ? 'Rope-way' : 'Trek Route'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Backpack className="w-4 h-4 text-yatri-blue" />
          <span className="text-sm">Required: Trekking shoes, water bottle, light snacks</span>
        </div>
        <div className="flex items-center gap-2">
          <Utensils className="w-4 h-4 text-green-600" />
          <span className="text-sm">Local Eats: Try {name.includes('sinhagad') ? 'Pithla Bhakri' : 'Maharashtrian thali'} at fort stalls</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-3 mb-4">
      <div className="flex items-center gap-2">
        <Plane className="w-4 h-4 text-yatri-orange" />
        <span className="text-sm">Nearest Airport: {destinationName} International</span>
      </div>
      <div className="flex items-center gap-2">
        <Hotel className="w-4 h-4 text-yatri-blue" />
        <span className="text-sm">Budget Stay: OYO Rooms near {attractions[0]}</span>
      </div>
      <div className="flex items-center gap-2">
        <Utensils className="w-4 h-4 text-green-600" />
        <span className="text-sm">Quick Eats: Local street food around {attractions[1]}</span>
      </div>
    </div>
  );
};

export default QuickRecommendations;
