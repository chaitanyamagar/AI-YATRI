import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { TripFormProvider } from '@/components/booking-details/TripFormContext';
import LocationSelector from '@/components/booking-details/LocationSelector';
import BookingSummary from '@/components/booking-details/BookingSummary';
import BookingDetailsHeader from '@/components/booking-details/page/BookingDetailsHeader';
import BookingTabContent from '@/components/booking-details/page/BookingTabContent';
import BookingSuccessScreen from '@/components/booking-details/page/BookingSuccessScreen';
import NoDestinationScreen from '@/components/booking-details/page/NoDestinationScreen';
import UserContactForm from '@/components/booking-details/UserContactForm';
import VendorNotification from '@/components/booking-details/VendorNotification';
import { useTripFormContext } from '@/components/booking-details/TripFormContext';

// Separate component for the booking form that uses the context
const BookingForm = ({ 
  selectedDestination, 
  originLocation, 
  initialPlanPrice,
  onBackToBookings 
}: { 
  selectedDestination: string;
  originLocation: string;
  initialPlanPrice: number | null;
  onBackToBookings: () => void;
}) => {
  const navigate = useNavigate();
  const tripFormContext = useTripFormContext();
  const [activeTab, setActiveTab] = useState('hotel');
  const [bookingCreated, setBookingCreated] = useState(false);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);

  const handleCheckout = () => {
    setCheckoutDialogOpen(true);
  };

  const handleCompleteCheckout = () => {
    setCheckoutDialogOpen(false);
    
    // Get current date and a date 7 days in the future
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    // Calculate the total price
    const calculatedPrice = tripFormContext.calculateTotalPrice();
    const finalPrice = tripFormContext.discount > 0 
      ? calculatedPrice * (1 - tripFormContext.discount / 100) 
      : calculatedPrice;
    
    // Show success message
    setBookingCreated(true);
    
    // Store booking data in localStorage for persistence
    const bookingData = {
      destination: selectedDestination,
      origin: originLocation,
      startDate: startDate,
      endDate: endDate,
      travelers: 2,
      type: 'package',
      price: finalPrice > 0 ? Math.round(finalPrice) : (initialPlanPrice || 25000),
      image: "/placeholder.svg",
      details: {
        confirmationCode: `${selectedDestination.slice(0, 3).toUpperCase()}${Date.now().toString().slice(-4)}`,
        provider: 'AI Yatri Travel',
        duration: '7 nights',
        location: selectedDestination
      }
    };
    
    // Get existing bookings or initialize empty array
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, bookingData]));
  };

  if (bookingCreated) {
    return <BookingSuccessScreen selectedDestination={selectedDestination} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <BookingDetailsHeader 
          selectedDestination={selectedDestination}
          handleBackToBookings={onBackToBookings}
        />
        
        <VendorNotification />
        
        <LocationSelector 
          onOriginChange={() => {}}
          onDestinationChange={() => {}}
          defaultDestination={selectedDestination}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="hotel" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="hotel">Hotel</TabsTrigger>
                <TabsTrigger value="transport">Transport</TabsTrigger>
                <TabsTrigger value="cab">Cab Rental</TabsTrigger>
                <TabsTrigger value="food">Food & Dining</TabsTrigger>
              </TabsList>
              
              <BookingTabContent
                activeTab={activeTab}
                selectedDestination={selectedDestination}
                originLocation={originLocation}
                setActiveTab={setActiveTab}
                handleBooking={handleCheckout}
              />
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <BookingSummary 
              onBookNow={handleCheckout} 
              userLocation={originLocation}
            />
          </div>
        </div>
        
        <Dialog open={checkoutDialogOpen} onOpenChange={setCheckoutDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Your Booking</DialogTitle>
            </DialogHeader>
            <UserContactForm onComplete={handleCompleteCheckout} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Main BookingDetails component
const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [originLocation, setOriginLocation] = useState<string>('');
  const [initialPlanPrice, setInitialPlanPrice] = useState<number | null>(null);
  
  useEffect(() => {
    // Process location state to get destination details
    if (location.state?.destination) {
      setSelectedDestination(location.state.destination);
    }
    
    // Check if there's a predefined origin
    if (location.state?.origin) {
      setOriginLocation(location.state.origin);
    }
    
    // Check if there's a plan price
    if (location.state?.price && typeof location.state.price === 'number') {
      setInitialPlanPrice(location.state.price);
    }
    
    setLoading(false);
  }, [location.state]);

  const handleOriginChange = (origin: string) => {
    setOriginLocation(origin);
    toast({
      title: "Origin Updated",
      description: `Showing travel options from ${origin} to ${selectedDestination}`,
    });
  };

  const handleDestinationChange = (destination: string) => {
    setSelectedDestination(destination);
  };

  const handleBackToBookings = () => {
    navigate('/bookings');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!selectedDestination) {
    return <NoDestinationScreen />;
  }

  return (
    <TripFormProvider destination={selectedDestination} initialPrice={initialPlanPrice}>
      <BookingForm 
        selectedDestination={selectedDestination}
        originLocation={originLocation}
        initialPlanPrice={initialPlanPrice}
        onBackToBookings={handleBackToBookings}
      />
    </TripFormProvider>
  );
};

export default BookingDetails;