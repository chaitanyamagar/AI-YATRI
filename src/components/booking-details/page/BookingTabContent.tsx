
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import HotelBookingSection from '@/components/booking-details/HotelBookingSection';
import TransportBookingSection from '@/components/booking-details/TransportBookingSection';
import CabBookingSection from '@/components/booking-details/CabBookingSection';
import FoodBookingSection from '@/components/booking-details/FoodBookingSection';
import MapView from '@/components/trip-planner/MapView';
import { ShoppingCart } from 'lucide-react';
import { useTripFormContext } from '@/components/booking-details/TripFormContext';

interface BookingTabContentProps {
  activeTab: string;
  selectedDestination: string;
  originLocation: string;
  setActiveTab: (tab: string) => void;
  handleBooking: () => void;
}

const BookingTabContent: React.FC<BookingTabContentProps> = ({
  activeTab,
  selectedDestination,
  originLocation,
  setActiveTab,
  handleBooking
}) => {
  const tripFormContext = useTripFormContext();
  const totalPrice = tripFormContext.calculateTotalPrice();
  
  return (
    <>
      <TabsContent value="hotel">
        <HotelBookingSection destination={selectedDestination} />
      </TabsContent>
      
      <TabsContent value="transport">
        <TransportBookingSection destination={selectedDestination} origin={originLocation} />
      </TabsContent>
      
      <TabsContent value="cab">
        <CabBookingSection destination={selectedDestination} />
      </TabsContent>
      
      <TabsContent value="food">
        <FoodBookingSection destination={selectedDestination} userLocation={originLocation} />
      </TabsContent>
      
      <div className="mt-6 flex justify-between">
        <button 
          onClick={() => {
            const prevIndex = ['hotel', 'transport', 'cab', 'food'].indexOf(activeTab);
            if (prevIndex > 0) {
              setActiveTab(['hotel', 'transport', 'cab', 'food'][prevIndex - 1]);
            }
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          disabled={activeTab === 'hotel'}
        >
          Previous
        </button>
        
        {activeTab === 'food' ? (
          <button 
            onClick={handleBooking}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Proceed to Checkout {totalPrice > 0 && `(₹${totalPrice.toLocaleString('en-IN')})`}
          </button>
        ) : (
          <button 
            onClick={() => {
              const nextIndex = ['hotel', 'transport', 'cab', 'food'].indexOf(activeTab);
              if (nextIndex < 3) {
                setActiveTab(['hotel', 'transport', 'cab', 'food'][nextIndex + 1]);
              }
            }}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Next
          </button>
        )}
      </div>
      
      {originLocation && selectedDestination && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Route Overview</h3>
          <MapView 
            destination={selectedDestination} 
            origin={originLocation}
          />
        </div>
      )}
    </>
  );
};

export default BookingTabContent;
