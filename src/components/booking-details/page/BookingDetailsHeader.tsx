import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingDetailsHeaderProps {
  selectedDestination: string;
  handleBackToBookings: () => void;
}

const BookingDetailsHeader: React.FC<BookingDetailsHeaderProps> = ({
  selectedDestination,
  handleBackToBookings
}) => {
  return (
    <>
      <div className="mb-6">
        <Button
          variant="ghost"
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          onClick={handleBackToBookings}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Bookings
        </Button>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Book Your Trip to {selectedDestination}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select your accommodations, transportation, and extras
        </p>
      </div>
    </>
  );
};

export default BookingDetailsHeader;
