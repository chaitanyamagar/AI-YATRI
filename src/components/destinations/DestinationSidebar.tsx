
import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trip } from '@/hooks/useTripPlans';

// Import our new components
import EstimatedCost from './sidebar/EstimatedCost';
import QuickRecommendations from './sidebar/QuickRecommendations';
import ShortPlanContent from './sidebar/ShortPlanContent';
import DetailedPlanContent from './sidebar/DetailedPlanContent';
import PlanButtons from './sidebar/PlanButtons';

interface DestinationSidebarProps {
  destination: {
    name: string;
    attractions: string[];
  };
  onAddToTrip: () => void;
  onAddToDashboard: (planType: 'short' | 'detailed') => void;
  onBookNow: (planType: 'short' | 'detailed') => void;
}

const DestinationSidebar = ({
  destination,
  onAddToTrip,
  onAddToDashboard,
  onBookNow
}: DestinationSidebarProps) => {
  const [planType, setPlanType] = useState<'short' | 'detailed'>('detailed');
  
  return (
    <Card className="sticky top-24 mb-6">
      <CardContent className="pt-6">
        <Tabs defaultValue="detailed" onValueChange={(value) => setPlanType(value as 'short' | 'detailed')}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="short" className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {destination.name.toLowerCase().includes('fort') ? 'Day Trip' : 'Short Plan (1-2 days)'}
            </TabsTrigger>
            <TabsTrigger value="detailed" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {destination.name.toLowerCase().includes('fort') ? 'Overnight Trip' : 'Detailed Plan'}
            </TabsTrigger>
          </TabsList>
          
          <EstimatedCost 
            planType={planType} 
            destinationName={destination.name} 
          />
          
          <QuickRecommendations 
            planType={planType} 
            destinationName={destination.name} 
            attractions={destination.attractions} 
          />
          
          <TabsContent value="short" className="mt-0">
            <ShortPlanContent 
              attractions={destination.attractions} 
              destinationName={destination.name} 
            />
          </TabsContent>
          
          <TabsContent value="detailed" className="mt-0">
            <DetailedPlanContent 
              attractions={destination.attractions} 
              destinationName={destination.name} 
            />
          </TabsContent>
        </Tabs>
        
        <h3 className="text-lg font-medium mb-4 dark:text-white">Plan Your Trip</h3>
        
        <PlanButtons 
          planType={planType}
          destinationName={destination.name}
          onAddToTrip={onAddToTrip}
          onAddToDashboard={onAddToDashboard}
          onBookNow={onBookNow}
        />
      </CardContent>
    </Card>
  );
};

export default DestinationSidebar;
