import { toast } from '@/hooks/use-toast';
import { HotelOffer } from './config';
import { getAmadeusToken } from './auth';
import { BOOKING_IMAGES } from '@/config/image-config';

// Get hotel offers based on location, check-in/out dates and guests
export const getHotelOffers = async (
  cityCode: string, 
  checkInDate: string, 
  checkOutDate: string, 
  adults: number,
  hotelCategory?: 'BUDGET' | 'MIDSCALE' | 'LUXURY'
): Promise<HotelOffer[]> => {
  try {
    // For development, always return mock data
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    // Create sample hotel offers based on the hotel category
    const priceMultiplier = hotelCategory === 'LUXURY' ? 3 : hotelCategory === 'MIDSCALE' ? 1.5 : 1;
    
    return [
      {
        id: '1',
        name: `${hotelCategory === 'LUXURY' ? 'Luxury' : hotelCategory === 'MIDSCALE' ? 'Standard' : 'Budget'} Hotel`,
        rating: hotelCategory === 'LUXURY' ? '5' : hotelCategory === 'MIDSCALE' ? '3' : '2',
        price: {
          amount: Math.round(2500 * priceMultiplier) * adults,
          currency: 'INR'
        },
        image: hotelCategory === 'LUXURY' ? BOOKING_IMAGES.HOTELS.LUXURY : 
               hotelCategory === 'MIDSCALE' ? BOOKING_IMAGES.HOTELS.MIDSCALE : 
               BOOKING_IMAGES.HOTELS.BUDGET
      },
      {
        id: '2',
        name: `${hotelCategory === 'LUXURY' ? 'Premium' : hotelCategory === 'MIDSCALE' ? 'Comfort' : 'Value'} Stay`,
        rating: hotelCategory === 'LUXURY' ? '4' : hotelCategory === 'MIDSCALE' ? '3' : '2',
        price: {
          amount: Math.round(2200 * priceMultiplier) * adults,
          currency: 'INR'
        },
        image: hotelCategory === 'LUXURY' ? BOOKING_IMAGES.HOTELS.GRAND_RIO : 
               hotelCategory === 'MIDSCALE' ? BOOKING_IMAGES.HOTELS.SUPER_HOTEL : 
               BOOKING_IMAGES.HOTELS.BUDGET
      },
      {
        id: '3',
        name: `${hotelCategory === 'LUXURY' ? 'Grand' : hotelCategory === 'MIDSCALE' ? 'City' : 'Economy'} Inn`,
        rating: hotelCategory === 'LUXURY' ? '5' : hotelCategory === 'MIDSCALE' ? '4' : '1',
        price: {
          amount: Math.round(2700 * priceMultiplier) * adults,
          currency: 'INR'
        },
        image: hotelCategory === 'LUXURY' ? BOOKING_IMAGES.HOTELS.SSK_SOLITAIRE : 
               hotelCategory === 'MIDSCALE' ? BOOKING_IMAGES.HOTELS.MIDSCALE : 
               BOOKING_IMAGES.HOTELS.BUDGET
      }
    ];
  } catch (error) {
    console.error('Error fetching hotel offers:', error);
    toast({
      title: 'Error',
      description: 'Could not fetch hotel information.',
      variant: 'destructive',
    });
    throw error;
  }
};
