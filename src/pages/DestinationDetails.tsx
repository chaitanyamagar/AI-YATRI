import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { toast } from '@/hooks/use-toast';
import AIAssistant from '../components/shared/AIAssistant';
import { useTripPlans } from '../hooks/useTripPlans';
import { useBookings } from '../hooks/useBookings';
import DestinationSidebar from '../components/destinations/DestinationSidebar';
import DestinationNotFound from '../components/destinations/DestinationNotFound';
import DestinationMainContent from '../components/destinations/DestinationMainContent';
import { useDestinationData } from '../hooks/useDestinationData';
import { handleAddToTrip, handleAddToDashboard, handleBookNow } from '../utils/destinationActions';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destination, loading } = useDestinationData(id);
  const { addTrip } = useTripPlans();
  const { setPendingBooking } = useBookings();
  const [showItinerary, setShowItinerary] = useState(false);
  const [showBudgetBreakdown, setShowBudgetBreakdown] = useState(false);
  const [showTransportGuide, setShowTransportGuide] = useState(false);
  const [planType, setPlanType] = useState<'short' | 'detailed'>('detailed');

  const handleAITripPlan = () => {
    setShowItinerary(!showItinerary);
    if (!showItinerary) {
      toast({
        title: "AI Itinerary Generated",
        description: `Sample itinerary for ${destination?.name} has been created.`,
      });
    }
  };
  
  const handleViewBudgetBreakdown = () => {
    setShowBudgetBreakdown(!showBudgetBreakdown);
  };
  
  const handleViewTransportGuide = () => {
    setShowTransportGuide(!showTransportGuide);
  };
  
  const handleChangePlanType = (type: 'short' | 'detailed') => {
    setPlanType(type);
  };

  const handleAddTripAction = () => {
    handleAddToTrip(destination, navigate);
  };

  const handleAddToDashboardAction = (selectedPlanType: 'short' | 'detailed') => {
    handleAddToDashboard(destination, selectedPlanType, addTrip, navigate);
  };

  const handleBookNowAction = (selectedPlanType: 'short' | 'detailed') => {
    handleBookNow(destination, selectedPlanType, setPendingBooking, navigate);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 container-custom">
          <p>Loading destination...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <DestinationNotFound />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DestinationMainContent 
                destination={destination}
                showItinerary={showItinerary}
                showBudgetBreakdown={showBudgetBreakdown}
                showTransportGuide={showTransportGuide}
                planType={planType}
                onToggleItinerary={handleAITripPlan}
                onToggleBudget={handleViewBudgetBreakdown}
                onToggleTransport={handleViewTransportGuide}
                onChangePlanType={handleChangePlanType}
              />
            </div>
            
            <div>
              <DestinationSidebar 
                destination={destination}
                onAddToTrip={handleAddTripAction}
                onAddToDashboard={handleAddToDashboardAction}
                onBookNow={handleBookNowAction}
              />
            </div>
          </div>
        </div>
      </div>
      
      <AIAssistant />
    </div>
  );
};

export default DestinationDetails;
