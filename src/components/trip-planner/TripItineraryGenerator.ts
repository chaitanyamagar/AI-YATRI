import { TripFormData } from './form/useTripForm';
import { getLocationData } from './data/locationData';
import { 
  calculateTripDays,
  getAccommodationDetails,
  getTransportationDetails,
  getFoodDetails,
  calculateAdditionalCosts
} from './utils/calculationUtils';
import { 
  formatItinerary, 
  generateErrorItinerary 
} from './utils/itineraryFormatter';

// Re-export types from rapid-api-service
export type { HotelOffer, FlightOffer } from '../../services/rapid-api-service';

// Main function to generate itinerary
export const generateItinerary = async (formData: TripFormData): Promise<string> => {
  try {
    // Parse number values
    const travelers = parseInt(formData.travelers);
    const tripDays = calculateTripDays(formData.startDate, formData.endDate);
    const userBudget = parseInt(formData.budget);
    
    // Get location-specific data
    const locationData = getLocationData(formData.destination);
    
    // Get costs and details for different components
    const { totalCost: accommodationCost, accommodationText, hotelSuggestions } = await getAccommodationDetails(formData, travelers);
    const { totalCost: transportationCost, transportText } = await getTransportationDetails(formData, travelers);
    const { totalCost: foodCost, restaurantSuggestions } = await getFoodDetails(formData, tripDays, travelers);
    
    // Calculate additional costs
    const baseCosts = accommodationCost + transportationCost + foodCost;
    const { activitiesCost, miscCost } = calculateAdditionalCosts(tripDays, travelers, baseCosts, userBudget);
    
    // Calculate total budget
    const totalBudget = accommodationCost + transportationCost + foodCost + activitiesCost + miscCost;
    
    // Adjust if user specified a budget and it's different from calculated
    let finalCosts = {
      accommodation: accommodationCost,
      transportation: transportationCost,
      food: foodCost,
      activities: activitiesCost,
      misc: miscCost,
      total: totalBudget
    };
    
    // If user has a specific budget, scale costs accordingly
    if (userBudget && Math.abs(userBudget - totalBudget) > 5000) {
      const scaleFactor = userBudget / totalBudget;
      finalCosts = {
        accommodation: Math.round(accommodationCost * scaleFactor),
        transportation: Math.round(transportationCost * scaleFactor),
        food: Math.round(foodCost * scaleFactor),
        activities: Math.round(activitiesCost * scaleFactor),
        misc: Math.round(miscCost * scaleFactor),
        total: userBudget
      };
    }
    
    // Generate full itinerary
    return formatItinerary(
      formData,
      tripDays,
      accommodationText,
      transportText,
      hotelSuggestions,
      restaurantSuggestions,
      locationData
    );
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return generateErrorItinerary();
  }
};
