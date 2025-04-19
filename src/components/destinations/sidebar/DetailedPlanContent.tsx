import React from 'react';
import { MapPin, Mountain } from 'lucide-react';

interface DetailedPlanContentProps {
  attractions: string[];
  destinationName: string;
}

const DetailedPlanContent = ({ attractions, destinationName }: DetailedPlanContentProps) => {
  return (
    <>
      <h3 className="text-lg font-medium mb-4 dark:text-white">
        {destinationName.toLowerCase().includes('fort') ? 'All Fort Attractions' : 'Top Attractions'}
      </h3>
      <ul className="space-y-3 mb-6">
        {attractions.map((attraction: string, index: number) => (
          <li key={index} className="flex items-start">
            {destinationName.toLowerCase().includes('fort') ? 
              <Mountain className="w-5 h-5 text-yatri-orange mr-2 flex-shrink-0 mt-0.5" /> :
              <MapPin className="w-5 h-5 text-yatri-orange mr-2 flex-shrink-0 mt-0.5" />
            }
            <span className="dark:text-gray-300">{attraction}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DetailedPlanContent;
