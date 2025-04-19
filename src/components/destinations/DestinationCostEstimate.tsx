
import { useState, useEffect } from 'react';
import { IndianRupee, Hotel, Bus, Utensils, MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DestinationCostEstimateProps {
  destination: string;
}

const DestinationCostEstimate = ({ destination }: DestinationCostEstimateProps) => {
  const [costs, setCosts] = useState({
    accommodation: 0,
    transportation: 0,
    food: 0,
    activities: 0,
    misc: 0,
    total: 0
  });
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN');
  };
  
  // Calculate percentage of total for each category
  const getPercentage = (amount: number) => {
    if (costs.total === 0) return 0;
    return Math.round((amount / costs.total) * 100);
  };
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // Here we'll generate destination-specific estimates
    const generateCostEstimate = () => {
      let baseAccommodation = 0;
      let baseTransport = 0;
      let baseFood = 0;
      let baseActivities = 0;
      
      // Adjust costs based on destination
      if (destination.toLowerCase().includes('mumbai')) {
        baseAccommodation = 3500; // Per night
        baseTransport = 1200; // Per day
        baseFood = 1000; // Per day
        baseActivities = 1500; // Per day
      } else if (destination.toLowerCase().includes('delhi')) {
        baseAccommodation = 3000;
        baseTransport = 1000;
        baseFood = 900;
        baseActivities = 1200;
      } else if (destination.toLowerCase().includes('goa')) {
        baseAccommodation = 4000;
        baseTransport = 1500;
        baseFood = 1200;
        baseActivities = 2000;
      } else {
        baseAccommodation = 2500;
        baseTransport = 800;
        baseFood = 800;
        baseActivities = 1000;
      }
      
      // Calculate for 3 days and 2 people
      const days = 3;
      const people = 2;
      
      const accommodation = baseAccommodation * days * (people/2);
      const transportation = baseTransport * days;
      const food = baseFood * days * people;
      const activities = baseActivities * days * people;
      const misc = Math.round((accommodation + transportation + food + activities) * 0.1);
      const total = accommodation + transportation + food + activities + misc;
      
      setCosts({
        accommodation,
        transportation,
        food,
        activities,
        misc,
        total
      });
    };
    
    generateCostEstimate();
  }, [destination]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IndianRupee className="h-5 w-5 text-yatri-orange" />
          <span>Estimated Trip Cost for {destination}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                Total Estimated Cost (3 days, 2 people)
              </span>
            </div>
            <span className="text-xl font-semibold text-yatri-blue">
              ₹{formatCurrency(costs.total)}
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <Hotel className="h-4 w-4 text-yatri-blue" />
                  <span className="text-gray-600 dark:text-gray-300">Accommodation</span>
                </div>
                <span className="text-gray-700 dark:text-gray-200">
                  ₹{formatCurrency(costs.accommodation)} ({getPercentage(costs.accommodation)}%)
                </span>
              </div>
              <Progress value={getPercentage(costs.accommodation)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-yatri-orange" />
                  <span className="text-gray-600 dark:text-gray-300">Transportation</span>
                </div>
                <span className="text-gray-700 dark:text-gray-200">
                  ₹{formatCurrency(costs.transportation)} ({getPercentage(costs.transportation)}%)
                </span>
              </div>
              <Progress value={getPercentage(costs.transportation)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600 dark:text-gray-300">Food & Dining</span>
                </div>
                <span className="text-gray-700 dark:text-gray-200">
                  ₹{formatCurrency(costs.food)} ({getPercentage(costs.food)}%)
                </span>
              </div>
              <Progress value={getPercentage(costs.food)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-purple-600" />
                  <span className="text-gray-600 dark:text-gray-300">Activities</span>
                </div>
                <span className="text-gray-700 dark:text-gray-200">
                  ₹{formatCurrency(costs.activities)} ({getPercentage(costs.activities)}%)
                </span>
              </div>
              <Progress value={getPercentage(costs.activities)} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Miscellaneous</span>
                <span className="text-gray-700 dark:text-gray-200">
                  ₹{formatCurrency(costs.misc)} ({getPercentage(costs.misc)}%)
                </span>
              </div>
              <Progress value={getPercentage(costs.misc)} className="h-2" />
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
            <p className="font-medium mb-2">Money-Saving Tips:</p>
            <ul className="space-y-1 list-disc pl-5">
              <li>Book accommodation in advance to get better deals</li>
              <li>Use local transportation instead of taxis</li>
              <li>Eat at local restaurants for authentic and cheaper meals</li>
              <li>Visit free attractions and museums</li>
              <li>Travel during off-season for better rates</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCostEstimate;
