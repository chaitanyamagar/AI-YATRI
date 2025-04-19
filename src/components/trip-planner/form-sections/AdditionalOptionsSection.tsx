
import React from 'react';
import { Utensils, Map } from 'lucide-react';
import { MedicalCross } from '../icons/MedicalCross';

interface AdditionalOptionsSectionProps {
  includeRestaurants: boolean;
  includeMedicalShops: boolean;
  includeMap: boolean;
  onCheckedChange: (name: string, checked: boolean) => void;
}

const AdditionalOptionsSection = ({ 
  includeRestaurants,
  includeMedicalShops,
  includeMap,
  onCheckedChange
}: AdditionalOptionsSectionProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Additional Options
      </label>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeRestaurants"
            checked={includeRestaurants}
            onChange={(e) => onCheckedChange('includeRestaurants', e.target.checked)}
            className="rounded border-gray-300 text-yatri-blue focus:ring-yatri-blue mr-2"
          />
          <label htmlFor="includeRestaurants" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <Utensils className="w-4 h-4 mr-2 text-yatri-orange" />
            Include restaurant recommendations
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeMedicalShops"
            checked={includeMedicalShops}
            onChange={(e) => onCheckedChange('includeMedicalShops', e.target.checked)}
            className="rounded border-gray-300 text-yatri-blue focus:ring-yatri-blue mr-2"
          />
          <label htmlFor="includeMedicalShops" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <MedicalCross className="w-4 h-4 mr-2 text-red-500" />
            Include nearby medical shops
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeMap"
            checked={includeMap}
            onChange={(e) => onCheckedChange('includeMap', e.target.checked)}
            className="rounded border-gray-300 text-yatri-blue focus:ring-yatri-blue mr-2"
          />
          <label htmlFor="includeMap" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <Map className="w-4 h-4 mr-2 text-blue-500" />
            Include interactive map in itinerary
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdditionalOptionsSection;
