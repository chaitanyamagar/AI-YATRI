
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trip } from "@/hooks/useTripPlans";
import { toast } from "@/hooks/use-toast";

interface AISuggestionsProps {
  trips: Trip[];
  selectedTrip?: Trip | null;
}

const AISuggestions = ({ trips, selectedTrip }: AISuggestionsProps) => {
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  
  // Generate relevant suggestions based on selected trip or first trip
  const getRelevantSuggestions = () => {
    const tripToUse = selectedTrip || (trips.length > 0 ? trips[0] : null);
    
    if (!tripToUse) return [];
    
    // Base suggestions tailored to the destination
    const destination = tripToUse.destination.toLowerCase();
    
    // Destination-specific suggestions
    const suggestions = [
      {
        title: "Local Cuisine",
        description: destination.includes('pune') || destination.includes('mumbai') ? 
          "Try the street food at Shivaji Market for authentic Maharashtrian cuisine and vada pav." : 
          destination.includes('nashik') ?
          "Visit the vineyards and wine tasting tours in Nashik, known as India's wine capital." :
          destination.includes('fort') ?
          "Pack a picnic lunch when visiting the fort - there are beautiful spots with panoramic views." :
          "Try the local street food markets for authentic Maharashtrian cuisine like Misal Pav and Puran Poli.",
      },
      {
        title: "Hidden Gem",
        description: destination.includes('mumbai') ?
          "Visit the Kanheri Caves in Sanjay Gandhi National Park for a peaceful escape from the city." :
          destination.includes('pune') ?
          "Explore the lesser-known Pataleshwar Cave Temple, an 8th-century rock-cut temple in the heart of Pune." :
          destination.includes('fort') || destination.includes('historical') ?
          "Check out the lesser-explored sections of the fort where you'll find ancient inscriptions and architecture." :
          "Visit early morning or late afternoon to avoid crowds and get the best lighting for photographs.",
      },
      {
        title: tripToUse.transportMode === 'car' ? "Driving Tip" : "Transportation Hack",
        description: tripToUse.transportMode === 'car' ?
          `For your car trip to ${tripToUse.destination}, download an offline map as network coverage might be spotty in some areas.` :
          tripToUse.transportMode === 'train' ?
          `Book your train tickets to ${tripToUse.destination} at least 2 days in advance to secure better seats.` :
          `Use the Ola or Uber app for reliable and affordable rides within ${tripToUse.destination}.`,
      },
      {
        title: tripToUse.accommodation === 'hotel' ? "Hotel Recommendation" : "Stay Advice",
        description: tripToUse.accommodation === 'hotel' ?
          `For your hotel stay in ${tripToUse.destination}, request a room with a view of the ${destination.includes('fort') ? 'fort' : destination.includes('beach') ? 'sea' : 'cityscape'}.` :
          `For your ${tripToUse.accommodation} accommodation in ${tripToUse.destination}, pack extra toiletries as budget stays might not provide all essentials.`,
      },
      {
        title: "Best Time to Visit",
        description: `For ${tripToUse.destination}, the ideal time to visit popular attractions is early morning to avoid the crowds and heat.`,
      },
      {
        title: "Local Etiquette",
        description: `When visiting temples in ${tripToUse.destination}, remember to remove your shoes and dress modestly as a sign of respect.`,
      },
    ];
    
    // Return 3 suggestions based on the trip
    return suggestions.slice(0, 3);
  };
  
  const handleGetMoreSuggestions = () => {
    setLoadingSuggestions(true);
    
    // Simulate loading for a realistic experience
    setTimeout(() => {
      toast({
        title: "New suggestions ready!",
        description: "We've refreshed your travel insights based on your trip.",
      });
      setLoadingSuggestions(false);
    }, 800);
  };
  
  const suggestions = getRelevantSuggestions();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Travel Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                <h4 className="font-medium text-sm dark:text-white">{suggestion.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{suggestion.description}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Add trips to get personalized suggestions</p>
          )}
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={handleGetMoreSuggestions}
            disabled={loadingSuggestions || suggestions.length === 0}
          >
            {loadingSuggestions ? "Loading suggestions..." : "Get More Suggestions"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISuggestions;
