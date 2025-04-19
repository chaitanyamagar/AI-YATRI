
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { ExtendedFoodOption } from './FoodCard';
import { getMockFoodOptions, getDefaultFoodOptions } from './mockFoodData';
import { getFoodCosts } from '@/services/rapid-api-service';

export const useFoodOptions = (destination: string, userLocation?: string) => {
  const [loading, setLoading] = useState(true);
  const [foodOptions, setFoodOptions] = useState<ExtendedFoodOption[]>([]);

  useEffect(() => {
    const fetchFoodOptions = async () => {
      setLoading(true);
      try {
        // Get food costs from Rapid API
        const budgetFood = await getFoodCosts(destination, 'budget');
        const mixedFood = await getFoodCosts(destination, 'mixed');
        const fineDining = await getFoodCosts(destination, 'fine-dining');
        
        // In a real app, this would use the API data to generate options
        // For now, still using mock options but could be enhanced to use the API data
        const mockOptions = getMockFoodOptions(destination, userLocation);
        setFoodOptions(mockOptions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food options:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch food options. Please try again.',
          variant: 'destructive',
        });
        
        // Set some default options
        setFoodOptions(getDefaultFoodOptions(destination));
        setLoading(false);
      }
    };
    
    fetchFoodOptions();
  }, [destination, userLocation]);

  return { loading, foodOptions };
};
