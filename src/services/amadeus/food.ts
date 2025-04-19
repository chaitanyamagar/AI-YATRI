import { toast } from '@/hooks/use-toast';
import { PricingInfo } from './config';

// Get average food costs for a destination
export const getFoodCosts = async (
  destination: string,
  foodCategory: 'budget' | 'mixed' | 'fine-dining'
): Promise<PricingInfo> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));

    // Base prices for different food categories (per meal per person)
    const basePrices = {
      budget: 200,
      mixed: 500,
      'fine-dining': 1500
    };

    return {
      averageMealCost: basePrices[foodCategory],
      currency: 'INR'
    };
  } catch (error) {
    console.error('Error fetching food costs:', error);
    toast({
      title: 'API Error',
      description: 'Could not fetch dining cost information.',
      variant: 'destructive',
    });
    throw error;
  }
};
