
import React, { useState } from 'react';
import FoodSectionHeader from './food/FoodSectionHeader';
import FoodSelectionGrid from './food/FoodSelectionGrid';
import { useFoodOptions } from './food/useFoodOptions';
import DetailsModal from './DetailsModal';
import { ExtendedFoodOption } from './food/FoodCard';
import { useDetailsModal } from '@/hooks/useDetailsModal';

interface FoodBookingSectionProps {
  destination: string;
  userLocation?: string;
}

const FoodBookingSection: React.FC<FoodBookingSectionProps> = ({ destination, userLocation }) => {
  const { foodOptions, loading } = useFoodOptions(destination);
  const [selectedFoodOptions, setSelectedFoodOptions] = useState<ExtendedFoodOption[]>([]);
  const { selectedItem, openDetailsModal, closeDetailsModal, isModalOpen } = useDetailsModal<ExtendedFoodOption>();

  const handleToggleFoodOption = (option: ExtendedFoodOption) => {
    setSelectedFoodOptions(prev => {
      const exists = prev.some(item => item.id === option.id);
      return exists 
        ? prev.filter(item => item.id !== option.id)
        : [...prev, option];
    });
  };

  return (
    <div>
      <FoodSectionHeader userLocation={userLocation} />
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Food & Dining Options</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Choose from a variety of dining packages and food experiences
          {userLocation && ` near ${userLocation}`}
        </p>
      </div>
      
      <FoodSelectionGrid 
        foodOptions={foodOptions} 
        selectedFoodOptions={selectedFoodOptions}
        onToggleFoodOption={handleToggleFoodOption}
        onViewDetails={openDetailsModal}
        loading={loading}
      />

      {selectedItem && (
        <DetailsModal
          open={isModalOpen}
          onClose={closeDetailsModal}
          type="food"
          name={selectedItem.name}
          description={selectedItem.description}
          location={selectedItem.location}
          price={selectedItem.price}
          amenities={selectedItem.amenities}
          reviews={selectedItem.reviews}
          mapUrl={selectedItem.mapUrl}
          externalUrl={selectedItem.externalUrl}
        />
      )}
    </div>
  );
};

export default FoodBookingSection;
