import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import AIAssistant from '../components/shared/AIAssistant';
import TripPlannerHeader from '../components/trip-planner/TripPlannerHeader';
import TripForm, { TripFormData } from '../components/trip-planner/TripForm';
import ItineraryDisplay from '../components/trip-planner/ItineraryDisplay';
import { generateItinerary } from '../components/trip-planner/TripItineraryGenerator';
import { toast } from '@/hooks/use-toast';

const TripPlanner = () => {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [initialFormData, setInitialFormData] = useState<Partial<TripFormData> | null>(null);

  // Check for preselected destination from navigation state
  useEffect(() => {
    if (location.state?.preselectedDestination) {
      setInitialFormData({
        destination: location.state.preselectedDestination,
        startDate: getDefaultStartDate(),
        endDate: getDefaultEndDate()
      });
    }
  }, [location.state]);

  // Generate default dates (today and today + 3 days)
  const getDefaultStartDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  const getDefaultEndDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 3); // Default 3-day trip
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (formData: TripFormData) => {
    setLoading(true);
    try {
      // Validate date range
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate < startDate) {
        toast({
          title: "Invalid date range",
          description: "The end date must be after the start date.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      // Calculate days
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      if (days > 30) {
        toast({
          title: "Trip too long",
          description: "Currently, we support planning for trips up to 30 days. Please adjust your dates.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      const generatedItinerary = await generateItinerary(formData);
      setItinerary(generatedItinerary);
      
      toast({
        title: "Itinerary generated!",
        description: `Your custom ${formData.destination} itinerary is ready with interactive map.`,
      });
    } catch (error) {
      console.error("Error generating itinerary:", error);
      toast({
        title: "Generation error",
        description: "There was an error generating your itinerary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <TripPlannerHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TripForm 
              onSubmit={handleSubmit} 
              loading={loading}
              initialData={initialFormData} 
            />
            <ItineraryDisplay itinerary={itinerary} />
          </div>
        </div>
      </div>
      
      <AIAssistant />
    </div>
  );
};

export default TripPlanner;
