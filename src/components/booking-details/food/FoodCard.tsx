
import React from 'react';
import { Utensils, Check, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { FoodOption } from '../TripFormContext';

export interface ExtendedFoodOption extends FoodOption {
  location?: string;
  mapUrl?: string;
  externalUrl?: string;
  reviews?: {
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  amenities?: string[];
  image?: string;
}

interface FoodCardProps {
  option: ExtendedFoodOption;
  isSelected: boolean;
  onToggleSelect: (option: ExtendedFoodOption) => void;
  onViewDetails: (option: ExtendedFoodOption) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ 
  option, 
  isSelected, 
  onToggleSelect, 
  onViewDetails 
}) => {
  return (
    <Card 
      className={`overflow-hidden hover:shadow-md transition-all ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
    >
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <CardTitle className="flex items-center text-lg">
          <Utensils className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span>{option.name}</span>
        </CardTitle>
        {isSelected && (
          <div className="rounded-full bg-primary p-1">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          <span className="font-medium">{option.restaurant}</span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {option.description.substring(0, 100)}...
        </div>
        {option.location && (
          <div className="text-sm text-gray-500 flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
            {option.location}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-bold">₹{option.price.toLocaleString()}</div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(option)}
            className="flex items-center"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            View Details
          </Button>
          <Checkbox 
            id={`select-${option.id}`} 
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(option)}
            className="ml-2"
          />
          <label 
            htmlFor={`select-${option.id}`}
            className="text-sm font-medium cursor-pointer"
          >
            Select
          </label>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
