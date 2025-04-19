
import React from 'react';
import { Map, Utensils } from 'lucide-react';

interface FoodSectionHeaderProps {
  userLocation?: string;
}

const FoodSectionHeader: React.FC<FoodSectionHeaderProps> = ({ userLocation }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Add Food & Dining Options</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        Enhance your stay with special dining experiences and food packages
        {userLocation && <span> near <span className="font-medium">{userLocation}</span></span>}
      </p>
      <div className="flex items-center text-sm text-primary mb-2">
        <Map className="h-4 w-4 mr-1" />
        <span>All locations are integrated with Google Maps for accurate restaurant information</span>
      </div>
      {userLocation && (
        <div className="flex items-center text-sm text-green-600">
          <Utensils className="h-4 w-4 mr-1" />
          <span>Showing food options based on your current location: <span className="font-medium">{userLocation}</span></span>
        </div>
      )}
    </div>
  );
};

export default FoodSectionHeader;
