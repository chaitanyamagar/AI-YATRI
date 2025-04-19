
import { TripFormData } from '../TripForm';
import { LocationData } from '../data/locationData';

// Generate daily itinerary based on location data and trip length
export const generateDailyItinerary = (
  formData: TripFormData,
  tripDays: number,
  locationData: LocationData
): string => {
  let dailyItinerary = '';
  
  // Get start and end dates
  const startDate = new Date(formData.startDate);
  
  for (let day = 1; day <= Math.min(tripDays, 7); day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day - 1);
    const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    
    dailyItinerary += `\n## Day ${day} (${formattedDate})`;
    
    if (day === 1) {
      dailyItinerary += `
- Morning: Arrival and check-in at ${formData.accommodation === 'luxury' ? 'luxury resort' : formData.accommodation === 'oyo' ? 'OYO room' : formData.accommodation}
- Afternoon: Visit to ${locationData.attractions[0]} and lunch at local restaurant
- Evening: Explore ${locationData.attractions[1]} and dinner`;
    } else if (day === tripDays) {
      dailyItinerary += `
- Morning: Visit to ${locationData.temples[0] || locationData.attractions[Math.min(day, locationData.attractions.length - 1)]}
- Afternoon: Last-minute shopping and souvenirs
- Evening: Check-out and departure`;
    } else {
      // Distribute attractions across days
      const morningAttraction = locationData.attractions[Math.min(day % locationData.attractions.length, locationData.attractions.length - 1)];
      const eveningAttraction = locationData.temples[day % Math.max(1, locationData.temples.length)] || 
                                 locationData.attractions[(day + 2) % locationData.attractions.length];
      
      dailyItinerary += `
- Morning: Visit to ${morningAttraction}
- Afternoon: ${locationData.activities[day % locationData.activities.length]}
- Evening: Explore ${eveningAttraction} followed by dinner`;
    }
    
    if (formData.includeRestaurants) {
      const restaurant = locationData.restaurants[day % locationData.restaurants.length];
      dailyItinerary += `\n- **Restaurant recommendation:** ${restaurant || 'Local authentic eatery'}`;
    }
    
    if (formData.includeMedicalShops) {
      dailyItinerary += '\n- **Nearby Medical Shop:** 24x7 Pharmacy (Open 24/7)';
    }
    
    // Add Google Maps links
    dailyItinerary += '\n- **Get directions:** Use the interactive map to navigate to these locations';
  }
  
  return dailyItinerary;
};

// Generate the itinerary text
export const formatItinerary = (
  formData: TripFormData,
  tripDays: number,
  accommodationText: string,
  transportText: string,
  hotelSuggestions: string[],
  restaurantSuggestions: string[],
  locationData: LocationData
): string => {
  const dailyItinerary = generateDailyItinerary(formData, tripDays, locationData);
  
  return `# AI-Generated Itinerary for ${formData.destination}

## Trip Details
- **Destination:** ${formData.destination}
- **Dates:** ${formData.startDate} to ${formData.endDate} (${tripDays} days)
- **Travelers:** ${formData.travelers}
- **Transportation:** ${transportText}
- **Accommodation:** ${accommodationText}

## Daily Itinerary${dailyItinerary}

## Recommended Stays in ${formData.destination}
${hotelSuggestions.map(hotel => `- ${hotel}`).join('\n')}

## Recommended Restaurants
${restaurantSuggestions.map(restaurant => `- ${restaurant}`).join('\n')}

## Transportation Details
- ${formData.transportMode === 'bus' ? `Local bus routes: City center to all major attractions` : ''}
- ${formData.transportMode === 'train' ? `Train connectivity: Available to major nearby cities and attractions` : ''}
- ${formData.transportMode === 'flight' ? `Nearest airports: City Airport (for internal connections) and International Airport` : ''}
- ${formData.transportMode === 'car' ? `Rental car services available at city center` : ''}

## Must-Visit Attractions
${locationData.attractions.map(attraction => `- ${attraction}`).join('\n')}

## Travel Tips
- Book accommodations in advance, especially during peak season
- Carry light, weather-appropriate clothing
- Keep important documents and a first aid kit handy
- Stay hydrated and try local cuisine
- Respect local customs and traditions
- Download offline maps for emergencies

*This itinerary is based on real-time data and location-specific recommendations. Use the interactive map to navigate to all attractions.*`;
};

// Error handling template
export const generateErrorItinerary = (): string => {
  return `# Error Generating Itinerary

We encountered an issue while fetching real-time travel data. Please try again later or adjust your search parameters.

If the problem persists, please contact our support team.`;
};
