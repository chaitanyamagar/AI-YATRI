import { toast } from '@/hooks/use-toast';
import { 
  getHotelOffers, 
  getFlightOffers, 
  getGroundTransportation,
  getFoodCosts 
} from '../../../services/rapid-api-service';

export interface FormDataType {
  destination: string;
  duration: string;
  travelers: string;
  accommodation: string; // budget, mid-range, luxury
  transportMode: string; // public, rental, private, train, flight
  mealPreference: string; // budget, mixed, fine-dining
  activities: string;
  customBudget: string;
}

export interface BudgetType {
  total: number;
  breakdown: {
    accommodation: number;
    transportation: number;
    food: number;
    activities: number;
    miscellaneous: number;
  };
  suggestions: string[];
  isCustomBudget: boolean;
}

export const generateSuggestions = (formData: FormDataType, breakdown: any) => {
  const suggestions = [];
  
  const destinationLower = formData.destination.toLowerCase();
  
  if (destinationLower.includes('mumbai')) {
    suggestions.push('Use the local train network in Mumbai to save on transportation costs.');
    suggestions.push('Visit free attractions like Gateway of India, Marine Drive, and Juhu Beach.');
  } else if (destinationLower.includes('pune')) {
    suggestions.push('Explore Pune using the efficient PMPML bus service rather than private cabs.');
    suggestions.push('Many Pune attractions like Shaniwar Wada and Aga Khan Palace have affordable entry fees.');
  } else if (destinationLower.includes('lonavala') || destinationLower.includes('khandala')) {
    suggestions.push('Visit Lonavala during weekdays to get better hotel rates compared to weekends.');
    suggestions.push('Pack snacks and water for trekking to viewpoints to avoid paying premium prices at tourist spots.');
  } else if (destinationLower.includes('nashik')) {
    suggestions.push('Stay near Nashik Road for better connectivity and more economical accommodation options.');
    suggestions.push('Combine your Nashik trip with a visit to nearby Trimbakeshwar for better value.');
  } else if (destinationLower.includes('aurangabad')) {
    suggestions.push('Book a guided tour that covers both Ajanta and Ellora Caves to save on transportation costs.');
    suggestions.push('Stay in accommodations near Cidco for more affordable options.');
  } else {
    suggestions.push(`Book ${formData.accommodation === 'luxury' ? 'luxury hotels' : formData.accommodation === 'mid-range' ? '3-star hotels' : 'budget accommodations'} in advance to get better rates in ${formData.destination}.`);
  }
  
  if (formData.transportMode === 'public') {
    suggestions.push(`Consider purchasing day passes for public transport to save on daily travel costs.`);
    suggestions.push(`For longer stays in ${formData.destination}, look into weekly passes if available.`);
  } else if (formData.transportMode === 'rental') {
    suggestions.push(`Compare rental car prices online and book in advance for best rates.`);
    suggestions.push(`Factor in parking fees at tourist attractions, which can add up quickly.`);
  } else if (formData.transportMode === 'train') {
    suggestions.push(`Book train tickets through IRCTC at least 15-30 days in advance for better availability and fares.`);
    suggestions.push(`Consider Tatkal booking if making last-minute plans, but be prepared to pay premium prices.`);
  } else if (formData.transportMode === 'flight') {
    suggestions.push(`Check for flight deals on Tuesdays and Wednesdays, which often have cheaper fares.`);
    suggestions.push(`Book flights 45-60 days in advance for optimal pricing, especially during peak season.`);
  } else {
    suggestions.push(`Look for shared private transport options to split costs with other travelers.`);
    suggestions.push(`Negotiate rates for multi-day private taxi rentals rather than paying day-by-day.`);
  }
  
  if (formData.mealPreference === 'budget') {
    suggestions.push(`Explore local street food markets for authentic and inexpensive meals in ${formData.destination}.`);
    suggestions.push(`Look for 'thali' meals which offer good value with multiple items at a fixed price.`);
  } else if (formData.mealPreference === 'mixed') {
    suggestions.push(`Balance between street food lunches and restaurant dinners to optimize your food budget.`);
    suggestions.push(`Many restaurants offer lunch specials that are cheaper than dinner menus with similar items.`);
  } else {
    suggestions.push(`Research fine dining restaurants that offer lunch specials or early bird discounts.`);
    suggestions.push(`Consider dining at luxury hotels during weekdays when they often have special promotional offers.`);
  }
  
  suggestions.push(`Pack essentials like medicines, toiletries, and snacks to avoid overspending on small purchases.`);
  suggestions.push(`Look for combo tickets for multiple attractions to save on entrance fees.`);
  suggestions.push(`Check if your hotel includes complimentary breakfast to save on meal costs.`);
  suggestions.push(`Travel during shoulder season (just before or after peak season) for better rates on everything.`);
  
  return suggestions.slice(0, 8);
};

export const calculateBudgetEstimate = async (formData: FormDataType): Promise<BudgetType | null> => {
  try {
    const days = parseInt(formData.duration);
    const people = parseInt(formData.travelers);
    const isCustomBudget = !!formData.customBudget && !isNaN(parseFloat(formData.customBudget));
    
    const hotelCategory = 
      formData.accommodation === 'luxury' ? 'LUXURY' : 
      formData.accommodation === 'mid-range' ? 'MIDSCALE' : 'BUDGET';
    
    const transportType = 
      formData.transportMode === 'public' ? 'bus' : 
      formData.transportMode === 'train' ? 'train' :
      formData.transportMode === 'flight' ? 'flight' :
      formData.transportMode === 'rental' ? 'car' : 'train';
    
    const destinationCode = getDestinationCode(formData.destination);
    
    const hotelOffers = await getHotelOffers(
      destinationCode,
      new Date().toISOString().split('T')[0],
      new Date(new Date().setDate(new Date().getDate() + days)).toISOString().split('T')[0],
      people,
      hotelCategory
    );
    
    const avgHotelPricePerDay = hotelOffers.reduce((sum, hotel) => sum + hotel.price.amount, 0) / hotelOffers.length;
    const accommodationCost = Math.round(avgHotelPricePerDay * days);
    
    let transportationCost = 0;
    
    if (transportType === 'flight') {
      const flightOffers = await getFlightOffers(
        'BOM',
        destinationCode,
        new Date().toISOString().split('T')[0],
        people
      );
      
      const avgFlightPrice = flightOffers.reduce((sum, flight) => sum + flight.price.amount, 0) / flightOffers.length;
      transportationCost = Math.round(avgFlightPrice * 2);
    } else {
      const transportPrices = await getGroundTransportation(
        'Mumbai',
        formData.destination,
        new Date().toISOString().split('T')[0],
        people,
        transportType as 'bus' | 'train' | 'car'
      );
      
      if (transportType === 'car') {
        transportationCost = Math.round(transportPrices.maxPrice * days);
      } else {
        transportationCost = Math.round((transportPrices.minPrice + transportPrices.maxPrice) / 2);
        
        if (days > 1) {
          transportationCost *= 2;
        }
        
        if (days > 2) {
          const localTransportDaily = 200 * people;
          transportationCost += localTransportDaily * days;
        }
      }
    }
    
    const foodCosts = await getFoodCosts(
      formData.destination,
      formData.mealPreference as 'budget' | 'mixed' | 'fine-dining'
    );
    
    const dailyFoodCost = foodCosts.averageMealCost * 3;
    const totalFoodCost = Math.round(dailyFoodCost * days * people);
    
    let activitiesMultiplier = 1;
    
    if (formData.activities.length > 0) {
      const activities = formData.activities.split(',');
      activitiesMultiplier = 1 + (activities.length * 0.2);
      
      const premiumActivities = ["Paragliding", "Wildlife Safari", "Vineyard Tours", "Boating"];
      activities.forEach(activity => {
        if (premiumActivities.some(premium => activity.includes(premium))) {
          activitiesMultiplier += 0.3;
        }
      });
    }
    
    const destinationTier = getDestinationTier(formData.destination);
    const baseActivityCost = destinationTier === 'premium' ? 1500 : destinationTier === 'standard' ? 1000 : 600;
    
    const activitiesCost = Math.round(baseActivityCost * days * people * activitiesMultiplier);
    
    const subtotal = accommodationCost + transportationCost + totalFoodCost + activitiesCost;
    const miscellaneousCost = Math.round(subtotal * 0.12);
    
    let totalCost = subtotal + miscellaneousCost;
    
    if (isCustomBudget) {
      const customBudgetAmount = parseFloat(formData.customBudget);
      const ratio = customBudgetAmount / totalCost;
      
      const adjustedBudget = {
        accommodation: Math.round(accommodationCost * ratio),
        transportation: Math.round(transportationCost * ratio),
        food: Math.round(totalFoodCost * ratio),
        activities: Math.round(activitiesCost * ratio),
        miscellaneous: Math.round(miscellaneousCost * ratio)
      };
      
      const sum = Object.values(adjustedBudget).reduce((a, b) => a + b, 0);
      if (sum !== customBudgetAmount) {
        adjustedBudget.miscellaneous += (customBudgetAmount - sum);
      }
      
      return {
        total: customBudgetAmount,
        breakdown: adjustedBudget,
        isCustomBudget: true,
        suggestions: generateSuggestions(formData, adjustedBudget)
      };
    } else {
      return {
        total: totalCost,
        breakdown: {
          accommodation: accommodationCost,
          transportation: transportationCost,
          food: totalFoodCost,
          activities: activitiesCost,
          miscellaneous: miscellaneousCost
        },
        isCustomBudget: false,
        suggestions: generateSuggestions(formData, {
          accommodation: accommodationCost,
          transportation: transportationCost,
          food: totalFoodCost,
          activities: activitiesCost,
          miscellaneous: miscellaneousCost
        })
      };
    }
  } catch (error) {
    console.error('Error calculating budget:', error);
    toast({
      title: "Calculation Error",
      description: "An error occurred while calculating your budget. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

function getDestinationCode(destination: string): string {
  const destinationMap: {[key: string]: string} = {
    'mumbai': 'BOM',
    'pune': 'PNQ',
    'nagpur': 'NAG',
    'aurangabad': 'IXU',
    'nashik': 'ISK',
    'lonavala': 'BOM',
    'mahabaleshwar': 'PNQ',
    'shirdi': 'SAG'
  };
  
  for (const [key, value] of Object.entries(destinationMap)) {
    if (destination.toLowerCase().includes(key)) {
      return value;
    }
  }
  
  return 'BOM';
}

function getDestinationTier(destination: string): 'premium' | 'standard' | 'budget' {
  const premiumDestinations = ['mumbai', 'lonavala', 'mahabaleshwar', 'matheran', 'alibaug', 'lavasa'];
  const standardDestinations = ['pune', 'nashik', 'aurangabad', 'nagpur', 'shirdi'];
  
  const destinationLower = destination.toLowerCase();
  
  if (premiumDestinations.some(dest => destinationLower.includes(dest))) {
    return 'premium';
  } else if (standardDestinations.some(dest => destinationLower.includes(dest))) {
    return 'standard';
  } else {
    return 'budget';
  }
}
