
import React from 'react';
import { Loader2 } from 'lucide-react';
import FoodCard, { ExtendedFoodOption } from './FoodCard';

interface FoodSelectionGridProps {
  foodOptions: ExtendedFoodOption[];
  selectedFoodOptions: ExtendedFoodOption[];
  onToggleFoodOption: (option: ExtendedFoodOption) => void;
  onViewDetails: (option: ExtendedFoodOption) => void;
  loading: boolean;
}

const FoodSelectionGrid: React.FC<FoodSelectionGridProps> = ({
  foodOptions,
  selectedFoodOptions,
  onToggleFoodOption,
  onViewDetails,
  loading,
}) => {
  if (loading) {
    return (
      <div className="h-60 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (foodOptions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No food options available for this location.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {foodOptions.map((option) => {
        const isSelected = selectedFoodOptions.some(item => item.id === option.id);
        
        return (
          <FoodCard
            key={option.id}
            option={option}
            isSelected={isSelected}
            onToggleSelect={onToggleFoodOption}
            onViewDetails={onViewDetails}
          />
        );
      })}
    </div>
  );
};

export default FoodSelectionGrid;
