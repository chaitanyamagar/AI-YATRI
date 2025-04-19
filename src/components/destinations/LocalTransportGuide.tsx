
import { Bus, Train, Car, Plane, Bike } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface LocalTransportGuideProps {
  destination: string;
}

const LocalTransportGuide = ({ destination }: LocalTransportGuideProps) => {
  const [planType, setPlanType] = useState<'short' | 'detailed'>('detailed');
  
  // Get transport options based on destination and plan type
  const getTransportOptions = () => {
    const isShortPlan = planType === 'short';
    
    if (destination.toLowerCase().includes('mumbai')) {
      return [
        {
          icon: <Train className={`h-5 w-5 ${isShortPlan ? 'text-yatri-orange' : 'text-yatri-blue'}`} />,
          name: "Local Trains",
          description: "Mumbai's lifeline. First class: ₹120-220, Second class: ₹10-30",
          tips: isShortPlan ? "Buy a Tourist Pass for unlimited 1-day travel" : "Avoid peak hours (8:30-10:30 AM, 6-8 PM). Use smart cards for convenience.",
          ideal: isShortPlan
        },
        {
          icon: <Bus className="h-5 w-5 text-yatri-orange" />,
          name: "BEST Buses",
          description: "Extensive network. AC: ₹15-40, Non-AC: ₹5-20",
          tips: "Download the m-Indicator app for routes and timings.",
          ideal: false
        },
        {
          icon: <Car className="h-5 w-5 text-green-600" />,
          name: "Auto Rickshaws",
          description: "For short distances. Meter-based: ₹21 first 1.5km, then ₹14/km",
          tips: "Only available in suburbs, not in South Mumbai.",
          ideal: isShortPlan
        },
        {
          icon: <Car className="h-5 w-5 text-purple-600" />,
          name: "Taxis & Cabs",
          description: "Black & Yellow: ₹25 first 1.5km. Uber/Ola: ₹100-300 for short trips",
          tips: "Prepaid taxis available at airports and major stations.",
          ideal: false
        },
        {
          icon: <Bike className="h-5 w-5 text-blue-500" />,
          name: "Bike Rentals",
          description: "₹300-600 per day for a scooter",
          tips: "Great for short trips, check Bounce or ONN Bikes.",
          ideal: isShortPlan,
          shortOnly: true
        }
      ].filter(option => !option.shortOnly || isShortPlan);
    } else if (destination.toLowerCase().includes('delhi')) {
      return [
        {
          icon: <Train className={`h-5 w-5 ${isShortPlan ? 'text-yatri-orange' : 'text-yatri-blue'}`} />,
          name: "Delhi Metro",
          description: "Clean and efficient. ₹10-60 based on distance",
          tips: isShortPlan ? "Buy a 1-Day Tourist Card for unlimited travel" : "Buy a Tourist Card for unlimited travel. Avoid rush hours.",
          ideal: isShortPlan
        },
        {
          icon: <Bus className="h-5 w-5 text-yatri-orange" />,
          name: "DTC & Cluster Buses",
          description: "AC: ₹10-40, Non-AC: ₹5-15",
          tips: "Get a Delhi Travel Card for combined metro and bus travel.",
          ideal: false
        },
        {
          icon: <Car className="h-5 w-5 text-green-600" />,
          name: "Auto Rickshaws",
          description: "Meter-based: ₹25 first 2km, then ₹8/km",
          tips: "Insist on meter or use app-based services like Jugnoo.",
          ideal: isShortPlan
        },
        {
          icon: <Car className="h-5 w-5 text-purple-600" />,
          name: "Taxis & Cabs",
          description: "Radio Taxis: ₹23/km. Uber/Ola: ₹100-300 for short trips",
          tips: "Prepaid taxis available at airports and major stations.",
          ideal: false
        },
        {
          icon: <Bike className="h-5 w-5 text-blue-500" />,
          name: "E-Bikes & Scooters",
          description: "₹15-20 per 30 minutes from Yulu Bikes",
          tips: "Perfect for short trips within central Delhi.",
          ideal: isShortPlan,
          shortOnly: true
        }
      ].filter(option => !option.shortOnly || isShortPlan);
    } else {
      // Default transport options for other destinations
      return [
        {
          icon: <Bus className="h-5 w-5 text-yatri-orange" />,
          name: "Local Buses",
          description: "Affordable and extensive coverage. ₹10-40 per journey",
          tips: isShortPlan ? "Bus pass available for 1-day unlimited travel" : "Ask locals about the routes or use Google Maps for guidance.",
          ideal: false
        },
        {
          icon: <Car className="h-5 w-5 text-green-600" />,
          name: "Auto Rickshaws",
          description: "Convenient for short distances. ₹20-200 depending on distance",
          tips: "Negotiate the fare before starting the journey or insist on meter.",
          ideal: isShortPlan
        },
        {
          icon: <Car className="h-5 w-5 text-purple-600" />,
          name: "Taxis & Cabs",
          description: "Comfortable for longer journeys. App-based: ₹100-500",
          tips: "Use Uber/Ola for convenience and fare transparency.",
          ideal: false
        },
        {
          icon: <Plane className="h-5 w-5 text-yatri-blue" />,
          name: "Rental Vehicles",
          description: "Cars: ₹1000-3000/day, Bikes: ₹300-800/day",
          tips: "Keep your ID proof handy. Check vehicle condition before renting.",
          ideal: false
        },
        {
          icon: <Bike className="h-5 w-5 text-blue-500" />,
          name: "Bike/Scooter Rentals",
          description: "₹300-600 per day",
          tips: "Perfect for quick sightseeing on your own schedule.",
          ideal: isShortPlan,
          shortOnly: true
        }
      ].filter(option => !option.shortOnly || isShortPlan);
    }
  };
  
  const transportOptions = getTransportOptions();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="h-5 w-5 text-yatri-orange" />
          <span>Local Transportation Guide</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="detailed" onValueChange={(value) => setPlanType(value as 'short' | 'detailed')}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="short">
              Quick Trip
            </TabsTrigger>
            <TabsTrigger value="detailed">
              Extended Stay
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="short" className="mt-0">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Transportation options optimized for 1-2 day visits:
            </p>
          </TabsContent>
          
          <TabsContent value="detailed" className="mt-0">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Comprehensive transportation options for longer stays:
            </p>
          </TabsContent>
          
          <div className="space-y-4">
            {transportOptions.map((option, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {option.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{option.name}</h4>
                    {option.ideal && (
                      <Badge variant="outline" className="text-xs border-yatri-orange text-yatri-orange">
                        Ideal for short trips
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {option.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span className="font-semibold">Tip:</span> {option.tips}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LocalTransportGuide;
