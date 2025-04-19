
import { toast } from '@/hooks/use-toast';
import { PricingInfo } from './config';

// Get bus or train transportation prices (not available in Amadeus, using mock data)
export const getGroundTransportation = async (
  origin: string,
  destination: string,
  departureDate: string,
  adults: number,
  transportType: 'bus' | 'train' | 'car'
): Promise<PricingInfo> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Base prices for different transportation types
    const basePrices = {
      bus: { min: 150, max: 500 },
      train: { min: 300, max: 1200 },
      car: { min: 1500, max: 3000 } // per day for rental
    };
    
    const selectedPrices = basePrices[transportType];
    
    return {
      minPrice: selectedPrices.min * adults,
      maxPrice: selectedPrices.max * adults,
      currency: 'INR'
    };
  } catch (error) {
    console.error('Error fetching ground transportation prices:', error);
    toast({
      title: 'API Error',
      description: 'Could not fetch transportation pricing information.',
      variant: 'destructive',
    });
    throw error;
  }
};
