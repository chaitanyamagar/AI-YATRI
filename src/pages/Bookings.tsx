
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Loader2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useBookings, PendingBooking } from '../hooks/useBookings';
import { formatDate, getStatusColor, getTypeIcon } from '../utils/bookingUtils';
import BookingHeader from '../components/bookings/BookingHeader';
import PendingBookingCard from '../components/bookings/PendingBooking';
import StatusTabs from '../components/bookings/StatusTabs';
import BookingList from '../components/bookings/BookingList';

const Bookings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<{ name: string; email: string; isLoggedIn: boolean } | null>(
    { name: "Demo User", email: "demo@example.com", isLoggedIn: true } // Default to logged in for demo
  );
  const [initialPendingBooking, setInitialPendingBooking] = useState<PendingBooking | null>(null);
  
  // Process any incoming location.state
  useEffect(() => {
    console.log("Location state:", location.state);
    // First, check for pendingBooking in location state (from Dashboard or BookingDetails)
    if (location.state?.pendingBooking) {
      console.log("Found pending booking in state:", location.state.pendingBooking);
      setInitialPendingBooking(location.state.pendingBooking);
    }
    // Also keep the existing logic for tripToBook
    else if (location.state?.tripToBook) {
      const trip = location.state.tripToBook;
      
      // Create a pending booking from the trip data
      setInitialPendingBooking({
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        travelers: parseInt(trip.travelers) || 2,
        type: 'package',
        price: Math.floor(Math.random() * 2000) + 800, // Generate a random price for demo
        details: {
          duration: `${Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))} nights`,
          tripId: trip.id,
        }
      });
    }
  }, [location.state]);

  // Initialize booking hook with pending booking
  const {
    filteredBookings,
    pendingBooking,
    loading,
    searchTerm,
    setSearchTerm,
    setActiveFilter,
    confirmBooking,
    cancelPendingBooking
  } = useBookings(initialPendingBooking);

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleConfirmBooking = () => {
    const newBooking = confirmBooking();
    if (newBooking) {
      toast({
        title: "Booking Confirmed!",
        description: `Your trip to ${newBooking.destination} has been booked successfully.`,
      });
    }
  };

  const handleCancelBooking = () => {
    cancelPendingBooking();
    
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled.",
      variant: "destructive"
    });
  };

  const handleCreateBooking = () => {
    navigate('/booking-details');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your bookings</h1>
        <Link to="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-6">
          <BookingHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Button onClick={handleCreateBooking} className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </div>
        
        <PendingBookingCard 
          pendingBooking={pendingBooking} 
          confirmBooking={handleConfirmBooking} 
          cancelPendingBooking={handleCancelBooking} 
          formatDate={formatDate}
        />
        
        <Tabs defaultValue="all" className="w-full">
          <StatusTabs onValueChange={setActiveFilter} />
          <BookingList 
            filteredBookings={filteredBookings}
            formatDate={formatDate}
            getStatusColor={getStatusColor}
            getTypeIcon={getTypeIcon}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Bookings;
