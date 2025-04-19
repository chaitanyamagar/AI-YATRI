
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface HotelFilterProps {
  hotelCategory: 'BUDGET' | 'MIDSCALE' | 'LUXURY';
  onCategoryChange: (category: 'BUDGET' | 'MIDSCALE' | 'LUXURY') => void;
}

const HotelFilter: React.FC<HotelFilterProps> = ({ hotelCategory, onCategoryChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Accommodation Type
      </label>
      <RadioGroup 
        defaultValue={hotelCategory} 
        onValueChange={(value) => onCategoryChange(value as 'BUDGET' | 'MIDSCALE' | 'LUXURY')}
        className="grid grid-cols-3 gap-4"
      >
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="BUDGET" id="budget" />
          <Label htmlFor="budget" className="flex items-center cursor-pointer">
            <span>Budget</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="MIDSCALE" id="midscale" />
          <Label htmlFor="midscale" className="flex items-center cursor-pointer">
            <span>Standard</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="LUXURY" id="luxury" />
          <Label htmlFor="luxury" className="flex items-center cursor-pointer">
            <span>Luxury</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default HotelFilter;
