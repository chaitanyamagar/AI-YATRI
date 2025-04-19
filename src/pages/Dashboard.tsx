import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Plus } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import AIAssistant from '../components/shared/AIAssistant';
import { Button } from '@/components/ui/button';
import { useTripPlans } from '../hooks/useTripPlans';
import { useBookings, BookingStatus } from '../hooks/useBookings';
import { toast } from '@/hooks/use-toast';
import TripList from '../components/dashboard/TripList';
import TripDetailsSheet from '../components/dashboard/TripDetailsSheet';
import TravelInsights from '../components/dashboard/TravelInsights';

const Dashboard = () => {
  const navigate = useNavigate();
  const { trips, loading, addTrip, removeTrip, hasTrips } = useTripPlans();
  const { setPendingBooking } = useBookings();
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    document.title = 'My Dashboard - AI Yatri';
  }, []);

  const handleBookNow = (trip: any) => {
    // Create a pending booking with properly typed properties
    const bookingType = trip.transportMode === 'car' ? 'car' as const : 'package' as const;
    
    // Estimate a price based on the destination if not provided
    const estimatedPrice = trip.price || trip.destination.length * 1000; 
    
    const newBooking = {
      destination: trip.destination,
      startDate: trip.startDate, 
      endDate: trip.endDate,
      travelers: parseInt(trip.travelers) || 2,
      status: 'upcoming' as BookingStatus, // Type assertion to BookingStatus
      price: estimatedPrice, // Use the provided price or calculate one
      image: trip.image || '/placeholder.svg',
      type: bookingType, // Now properly typed as a literal
      details: {
        confirmationCode: `${trip.destination.slice(0, 3).toUpperCase()}${Date.now().toString().slice(-4)}`,
        provider: 'AI Yatri Travel',
        location: trip.destination,
        duration: `${Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))} days`,
        tripId: trip.id,
      }
    };
    
    // If it's a direct booking, navigate to booking details
    if (trip.bookingPreference === 'direct') {
      navigate('/booking-details', {
        state: {
          destination: trip.destination,
          price: estimatedPrice
        }
      });
      return;
    }
    
    // Otherwise set the pending booking in the hook
    setPendingBooking(newBooking);
    
    // Show toast message
    toast({
      title: "Trip added to bookings",
      description: `Your ${trip.destination} trip has been added to your bookings.`,
    });
    
    // Navigate to bookings page and pass the booking data
    navigate('/bookings', { state: { pendingBooking: newBooking } });
  };

  const handleViewDetails = (trip: any) => {
    setSelectedTrip(trip);
    setIsSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 dark:text-white">
                My Travel Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your trips and get personalized AI travel suggestions
              </p>
            </div>
            <Link to="/destinations">
              <Button className="mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Explore New Destinations
              </Button>
            </Link>
          </div>

          <TripList
            trips={trips}
            loading={loading}
            hasTrips={hasTrips}
            onRemoveTrip={removeTrip}
            onViewDetails={handleViewDetails}
          />

          <TripDetailsSheet
            isOpen={isSheetOpen}
            setIsOpen={setIsSheetOpen}
            selectedTrip={selectedTrip}
            onBookNow={handleBookNow}
          />

          {hasTrips && (
            <TravelInsights
              trips={trips}
              selectedTrip={selectedTrip}
              onViewDetails={handleViewDetails}
              onBookNow={handleBookNow}
            />
          )}
        </div>
      </div>
      
      <AIAssistant />
    </div>
  );
};

export default Dashboard;
