
import { MapPin, Clock, Train, Bus, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NearbyPlacesProps {
  destination: string;
  className?: string;
}

const NearbyPlaces = ({ destination, className = "" }: NearbyPlacesProps) => {
  // Get nearby places based on destination
  const getNearbyPlaces = () => {
    if (destination.toLowerCase().includes('mumbai')) {
      return [
        {
          name: "Lonavala",
          distance: "84 km",
          travelTime: {
            train: "2 hours",
            bus: "2.5 hours",
            car: "1.5 hours"
          },
          description: "Hill station known for chikki, fudge, lookout points and caves."
        },
        {
          name: "Alibaug",
          distance: "95 km",
          travelTime: {
            train: "N/A (Ferry + Auto)",
            bus: "3 hours",
            car: "2.5 hours"
          },
          description: "Coastal town with beaches, forts and weekend getaway spots."
        },
        {
          name: "Pune",
          distance: "148 km",
          travelTime: {
            train: "3-3.5 hours",
            bus: "4 hours",
            car: "3 hours"
          },
          description: "Cultural capital of Maharashtra with historical sites."
        },
        {
          name: "Matheran",
          distance: "80 km",
          travelTime: {
            train: "2.5 hours (+ toy train)",
            bus: "3 hours (+ walk/horse)",
            car: "2 hours (+ walk/horse)"
          },
          description: "Vehicle-free hill station with stunning viewpoints."
        },
        {
          name: "Elephanta Caves",
          distance: "10 km offshore",
          travelTime: {
            train: "N/A",
            bus: "N/A",
            car: "N/A (1-hour ferry)"
          },
          description: "UNESCO World Heritage Site with ancient cave temples."
        }
      ];
    } else if (destination.toLowerCase().includes('delhi')) {
      return [
        {
          name: "Agra",
          distance: "233 km",
          travelTime: {
            train: "2-3 hours (Gatimaan Express)",
            bus: "4-5 hours",
            car: "3-4 hours"
          },
          description: "Home to the Taj Mahal, Agra Fort and Fatehpur Sikri."
        },
        {
          name: "Jaipur",
          distance: "281 km",
          travelTime: {
            train: "4-5 hours",
            bus: "5-6 hours",
            car: "4-5 hours"
          },
          description: "Pink City with majestic palaces, forts and Rajasthani culture."
        },
        {
          name: "Rishikesh",
          distance: "242 km",
          travelTime: {
            train: "5-6 hours",
            bus: "5-7 hours",
            car: "5-6 hours"
          },
          description: "Yoga capital with adventure sports and spiritual activities."
        },
        {
          name: "Mathura & Vrindavan",
          distance: "180 km",
          travelTime: {
            train: "2.5-3 hours",
            bus: "3-4 hours",
            car: "2.5-3 hours"
          },
          description: "Birthplace of Lord Krishna with numerous temples."
        },
        {
          name: "Neemrana",
          distance: "122 km",
          travelTime: {
            train: "N/A",
            bus: "2.5-3 hours",
            car: "2-2.5 hours"
          },
          description: "Historic fort palace turned luxury hotel with zip-lining."
        }
      ];
    } else {
      // Default nearby places for other destinations
      return [
        {
          name: "Nearby Attraction 1",
          distance: "50-100 km",
          travelTime: {
            train: "1-2 hours",
            bus: "2-3 hours",
            car: "1-1.5 hours"
          },
          description: "Popular nearby destination with natural beauty."
        },
        {
          name: "Nearby Attraction 2",
          distance: "100-150 km",
          travelTime: {
            train: "2-3 hours",
            bus: "3-4 hours",
            car: "2-2.5 hours"
          },
          description: "Historical site with cultural significance."
        },
        {
          name: "Nearby Attraction 3",
          distance: "30-60 km",
          travelTime: {
            train: "1 hour",
            bus: "1.5 hours",
            car: "45 minutes"
          },
          description: "Quick day trip destination popular with locals."
        },
        {
          name: "Nearby Attraction 4",
          distance: "150-200 km",
          travelTime: {
            train: "3-4 hours",
            bus: "4-5 hours",
            car: "3-3.5 hours"
          },
          description: "Major tourist destination worth an overnight stay."
        },
        {
          name: "Nearby Attraction 5",
          distance: "80-120 km",
          travelTime: {
            train: "1.5-2 hours",
            bus: "2-3 hours",
            car: "1.5-2 hours"
          },
          description: "Popular weekend getaway with various activities."
        }
      ];
    }
  };
  
  const nearbyPlaces = getNearbyPlaces();
  
  const handleViewOnMap = (placeName: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${placeName} near ${destination}`)}`, '_blank');
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-yatri-blue" />
          <span>Nearby Places to Visit</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nearbyPlaces.map((place, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-lg">{place.name}</h4>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">
                  {place.distance}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3">
                {place.description}
              </p>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="flex items-center gap-1 text-xs">
                  <Train className="h-3.5 w-3.5 text-yatri-blue" />
                  <span>{place.travelTime.train}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Bus className="h-3.5 w-3.5 text-yatri-orange" />
                  <span>{place.travelTime.bus}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Car className="h-3.5 w-3.5 text-green-600" />
                  <span>{place.travelTime.car}</span>
                </div>
              </div>
              
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => handleViewOnMap(place.name)}
                >
                  <MapPin className="h-3.5 w-3.5 mr-1" /> View on Map
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbyPlaces;
