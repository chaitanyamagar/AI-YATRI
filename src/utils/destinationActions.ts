
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Trip } from '@/hooks/useTripPlans';

export const handleAddToTrip = (destination: any, navigate: ReturnType<typeof useNavigate>) => {
  if (!destination) return;
  
  navigate('/trip-planner', { 
    state: { preselectedDestination: destination.name } 
  });
};

export const handleAddToDashboard = (
  destination: any, 
  selectedPlanType: 'short' | 'detailed',
  addTrip: (tripData: Omit<Trip, 'id'>) => string,
  navigate: ReturnType<typeof useNavigate>
) => {
  if (!destination) return;
  
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + (selectedPlanType === 'short' ? 2 : 7));
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Create a properly structured trip
  const newTrip: Omit<Trip, 'id'> = {
    destination: destination.name,
    startDate: formatDate(today),
    endDate: formatDate(nextWeek),
    travelers: '2',
    transportMode: selectedPlanType === 'short' ? 'car' : 'train',
    accommodation: selectedPlanType === 'short' ? 'oyo' : 'hotel',
    preferences: [selectedPlanType === 'short' ? 'budget' : 'comfort'],
    itineraryHtml: `<p>A ${selectedPlanType === 'short' ? 'quick' : 'wonderful'} trip to ${destination.name} to explore:</p>
      <ul>
        ${destination.attractions.slice(0, selectedPlanType === 'short' ? 3 : undefined).map((a: string) => `<li>${a}</li>`).join('')}
      </ul>`,
    image: destination.image || '/placeholder.svg'
  };
  
  // Add the trip and get the new ID
  const newTripId = addTrip(newTrip);
  
  toast({
    title: `${destination.name} trip added!`,
    description: `Your ${selectedPlanType === 'short' ? 'quick' : 'full'} ${destination.name} trip has been added to your dashboard. You can view and manage it there.`,
  });
  
  navigate('/dashboard');
};

export const handleBookNow = (
  destination: any, 
  selectedPlanType: 'short' | 'detailed',
  setPendingBooking: (bookingData: any) => void,
  navigate: ReturnType<typeof useNavigate>
) => {
  if (!destination) return;
  
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + (selectedPlanType === 'short' ? 2 : 7));
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Create a pending booking
  setPendingBooking({
    destination: destination.name,
    startDate: formatDate(today),
    endDate: formatDate(endDate),
    travelers: 2,
    status: 'upcoming',
    price: selectedPlanType === 'short' ? 4999 : 14999,
    image: destination.image || '/placeholder.svg',
    type: selectedPlanType === 'short' ? 'car' : 'package',
    details: {
      confirmationCode: `${destination.name.slice(0, 3).toUpperCase()}${Date.now().toString().slice(-4)}`,
      provider: 'AI Yatri Travel',
      location: destination.name,
      duration: selectedPlanType === 'short' ? '2 days' : '7 days',
    }
  });
  
  navigate('/bookings');
};
