import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface BookingSuccessScreenProps {
  selectedDestination: string;
}

const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({ selectedDestination }) => {
  const navigate = useNavigate();

  const handleViewBooking = () => {
    navigate('/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Booking Created Successfully!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your trip to {selectedDestination} has been created and is now pending confirmation.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={handleViewBooking}
            className="w-full bg-primary text-white hover:bg-primary/90"
          >
            View Booking Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          
          <p className="text-sm text-gray-500">
            You can view your booking details and track its status in the My Bookings section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessScreen;