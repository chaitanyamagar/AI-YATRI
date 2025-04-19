
import React from 'react';
import { MapPin, Mountain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ShortPlanContentProps {
  attractions: string[];
  destinationName: string;
}

const ShortPlanContent = ({ attractions, destinationName }: ShortPlanContentProps) => {
  return (
    <>
      <Badge className="mb-3 bg-yatri-orange">
        {destinationName.toLowerCase().includes('fort') ? 'Quick Day Trip' : 'Quick Visit'}
      </Badge>
      <h3 className="text-lg font-medium mb-3 dark:text-white">Must-See Spots</h3>
      <ul className="space-y-2 mb-6">
        {attractions.slice(0, 3).map((attraction: string, index: number) => (
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

export default ShortPlanContent;
