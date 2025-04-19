
import React from 'react';
import { useTripFormContext } from './TripFormContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface BookingSummaryProps {
  onBookNow: () => void;
  userLocation?: string;
}

const BookingSummary = ({ onBookNow, userLocation }: BookingSummaryProps) => {
  const context = useTripFormContext();
  const startDate = new Date();
  const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  // Calculate the total price from all selections
  const totalPrice = context.calculateTotalPrice();
  
  // Apply discount if there's a promo code
  const finalPrice = context.discount > 0 
    ? totalPrice * (1 - context.discount / 100) 
    : totalPrice;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 sticky top-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Trip Summary</h2>
        
        {/* Display origin-destination if available */}
        {userLocation && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Your Trip:</span>
              <span className="font-medium">
                {userLocation} → {context.destination}
              </span>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Destination:</span>
            <span className="font-medium">{context.destination}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Travel Dates:</span>
            <span className="font-medium">
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Travelers:</span>
            <span className="font-medium">2</span>
          </div>
        </div>
        
        {/* Show selected hotel if any */}
        {context.selectedHotel && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Selected Hotel</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">{context.selectedHotel.name}</span>
              <span className="font-medium">₹{context.selectedHotel.price.toLocaleString()}</span>
            </div>
          </div>
        )}
        
        {/* Show selected transport if any */}
        {context.selectedTransport && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Selected Transport</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                {context.selectedTransport.provider} ({context.selectedTransport.type})
              </span>
              <span className="font-medium">₹{context.selectedTransport.price.toLocaleString()}</span>
            </div>
          </div>
        )}
        
        {/* Show selected cab if any */}
        {context.selectedCab && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Selected Cab</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                {context.selectedCab.provider} ({context.selectedCab.type})
              </span>
              <span className="font-medium">₹{context.selectedCab.price.toLocaleString()}</span>
            </div>
          </div>
        )}
        
        {/* Show selected food options if any */}
        {context.selectedFoodOptions.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Selected Dining Options</h3>
            {context.selectedFoodOptions.map((option, index) => (
              <div key={index} className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">{option.name}</span>
                <span className="font-medium">₹{option.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Discount section */}
        {context.discount > 0 && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex justify-between text-sm">
              <span className="text-green-600 dark:text-green-400">Promo Discount ({context.discount}%):</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                -₹{(totalPrice * (context.discount / 100)).toLocaleString()}
              </span>
            </div>
          </div>
        )}
        
        <div className="my-6">
          <div className="flex justify-between font-semibold text-lg mb-2">
            <span>Total Price:</span>
            <span>₹{Math.round(finalPrice).toLocaleString()}</span>
          </div>
          
          {/* Progress bar to show booking completion */}
          <div className="mt-2 mb-4">
            <Progress value={75} className="h-2" />
            <p className="text-xs text-right mt-1 text-gray-500">75% completed</p>
          </div>
        </div>
        
        <Button className="w-full" onClick={onBookNow}>
          Book Now
        </Button>
        
        {/* Add promo code form */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter promo code" 
              value={context.promoCode}
              onChange={(e) => context.setPromoCode(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700"
            />
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => context.applyPromoCode(context.promoCode)}
            >
              Apply
            </Button>
          </div>
          <p className="text-xs mt-2 text-gray-500">Try "WELCOME10" for 10% off</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
