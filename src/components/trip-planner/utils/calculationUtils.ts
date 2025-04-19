import { TripFormData } from '../form/useTripForm';
import { getLocationData } from '../data/locationData';
import { 
  getHotelOffers, 
  getFlightOffers, 
  getGroundTransportation,
  getFoodCosts,
} from '../../../services/rapid-api-service';

// Calculate days between two dates
export const calculateTripDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

// Get accommodation data and calculate costs
export const getAccommodationDetails = async (
  formData: TripFormData,
  travelers: number
): Promise<{ totalCost: number, accommodationText: string, hotelSuggestions: string[] }> => {
  const hotelCategory = 
    formData.accommodation === 'luxury' ? 'LUXURY' : 
    formData.accommodation === 'hotel' ? 'MIDSCALE' : 'BUDGET';
  
  const hotelOffers = await getHotelOffers(
    'DEL', // Using Delhi as a placeholder - in a real app, you'd map city names to IATA codes
    formData.startDate,
    formData.endDate,
    travelers,
    hotelCategory
  );
  
  // Get average hotel price
  const avgHotelPrice = hotelOffers.reduce((sum, hotel) => sum + hotel.price.amount, 0) / hotelOffers.length;
  const totalAccommodationCost = Math.round(avgHotelPrice);
  
  // Get location specific hotel suggestions
  const locationData = getLocationData(formData.destination);
  let hotelSuggestions: string[] = [];
  
  if (formData.accommodation === 'luxury') {
    hotelSuggestions = locationData.hotels.luxury;
  } else if (formData.accommodation === 'hotel') {
    hotelSuggestions = locationData.hotels.midRange;
  } else {
    hotelSuggestions = locationData.hotels.budget;
  }
  
  // Generate accommodation specific text
  const accommodationText = {
    'hotel': 'Standard hotels',
    'oyo': 'Budget-friendly OYO rooms',
    'luxury': 'Luxury resorts and hotels',
    'guesthouse': 'Comfortable guesthouses',
    'hostel': 'Budget-friendly hostels',
    'airbnb': 'Airbnb accommodations'
  }[formData.accommodation] || 'Standard accommodations';

  return { 
    totalCost: totalAccommodationCost, 
    accommodationText,
    hotelSuggestions
  };
};

// Get transportation data and calculate costs
export const getTransportationDetails = async (
  formData: TripFormData,
  travelers: number
): Promise<{ totalCost: number, transportText: string }> => {
  let transportationCost = 0;
  let transportText = '';
  
  if (formData.transportMode === 'flight') {
    const flightOffers = await getFlightOffers('BOM', 'DEL', formData.startDate, travelers);
    const avgFlightPrice = flightOffers.reduce((sum, flight) => sum + flight.price.amount, 0) / flightOffers.length;
    transportationCost = Math.round(avgFlightPrice);
    transportText = 'Flights between major cities';
  } else {
    const transportPrices = await getGroundTransportation(
      'Mumbai', 
      formData.destination, 
      formData.startDate, 
      travelers, 
      formData.transportMode as 'bus' | 'train' | 'car'
    );
    
    transportationCost = Math.round((transportPrices.minPrice + transportPrices.maxPrice) / 2);
    
    transportText = {
      'bus': 'Local and intercity buses',
      'train': 'Train services',
      'car': 'Private vehicle/rental car'
    }[formData.transportMode] || 'Various transport options';
  }
  
  return { totalCost: transportationCost, transportText };
};

// Get food costs data
export const getFoodDetails = async (
  formData: TripFormData,
  tripDays: number,
  travelers: number
): Promise<{ totalCost: number, restaurantSuggestions: string[] }> => {
  const foodCategory = formData.preferences.includes('budget') 
    ? 'budget' 
    : formData.preferences.includes('luxury') 
      ? 'fine-dining' 
      : 'mixed';
      
  const foodCosts = await getFoodCosts(formData.destination, foodCategory);
  const dailyFoodCost = foodCosts.averageMealCost * 3; // 3 meals per day
  
  // Get location specific restaurant suggestions
  const locationData = getLocationData(formData.destination);
  
  return {
    totalCost: Math.round(dailyFoodCost * tripDays * travelers),
    restaurantSuggestions: locationData.restaurants.slice(0, 5)
  };
};

// Calculate additional costs (activities and miscellaneous)
export const calculateAdditionalCosts = (
  tripDays: number, 
  travelers: number, 
  baseCosts: number,
  userBudget: number
): { activitiesCost: number, miscCost: number } => {
  let activitiesCost;
  
  // If user specified a higher budget, allocate more for activities
  if (userBudget > 50000) {
    activitiesCost = Math.round((userBudget * 0.25) / (tripDays * travelers)) * tripDays * travelers;
  } else {
    activitiesCost = Math.round(1000 * tripDays * travelers);
  }
  
  const miscCost = Math.round(baseCosts * 0.1); // 10% of other costs
  
  return { activitiesCost, miscCost };
};
