
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type HotelType = {
  id: string;
  name: string;
  price: number;
  rating: string;
  amenities: string[];
  image: string;
  selected?: boolean;
};

export type TransportType = {
  id: string;
  type: 'flight' | 'train' | 'bus';
  provider: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
  selected?: boolean;
};

export type CabType = {
  id: string;
  type: 'one-way' | 'round-trip' | 'hourly';
  provider: string;
  price: number;
  driverInfo?: string;
  selected?: boolean;
};

export type FoodOption = {
  id: string;
  name: string;
  type: 'buffet' | 'a-la-carte' | 'special';
  price: number;
  restaurant: string;
  description: string;
  selected?: boolean;
};

interface VendorNotification {
  status: 'idle' | 'pending' | 'success' | 'error';
  message: string;
  notifiedVendors: string[];
}

type TripFormContextType = {
  destination: string;
  selectedHotel: HotelType | null;
  setSelectedHotel: (hotel: HotelType | null) => void;
  selectedTransport: TransportType | null;
  setSelectedTransport: (transport: TransportType | null) => void;
  selectedCab: CabType | null;
  setSelectedCab: (cab: CabType | null) => void;
  selectedFoodOptions: FoodOption[];
  setSelectedFoodOptions: (options: FoodOption[]) => void;
  totalPrice: number;
  calculateTotalPrice: () => number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discount: number;
  applyPromoCode: (code: string) => void;
  vendorNotification: VendorNotification;
  notifyVendors: (userName: string, userContact: string) => Promise<boolean>;
};

const TripFormContext = createContext<TripFormContextType | undefined>(undefined);

export const TripFormProvider = ({ 
  children, 
  destination,
  initialPrice = null
}: { 
  children: ReactNode, 
  destination: string,
  initialPrice?: number | null
}) => {
  const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<TransportType | null>(null);
  const [selectedCab, setSelectedCab] = useState<CabType | null>(null);
  const [selectedFoodOptions, setSelectedFoodOptions] = useState<FoodOption[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [vendorNotification, setVendorNotification] = useState<VendorNotification>({
    status: 'idle',
    message: '',
    notifiedVendors: []
  });
  
  const calculateTotalPrice = () => {
    // If no selections have been made yet but we have an initial price, return that
    const noSelectionsYet = !selectedHotel && !selectedTransport && !selectedCab && selectedFoodOptions.length === 0;
    if (noSelectionsYet && initialPrice) {
      return initialPrice;
    }
    
    // Otherwise calculate based on selections
    let total = 0;
    
    if (selectedHotel) {
      total += selectedHotel.price;
    }
    
    if (selectedTransport) {
      total += selectedTransport.price;
    }
    
    if (selectedCab) {
      total += selectedCab.price;
    }
    
    selectedFoodOptions.forEach(option => {
      total += option.price;
    });
    
    // If total is 0 but we have an initial price, use that instead
    if (total === 0 && initialPrice) {
      return initialPrice;
    }
    
    return total;
  };
  
  const applyPromoCode = (code: string) => {
    // Simple promo code logic
    if (code === 'WELCOME10') {
      setDiscount(10);
    } else if (code === 'SUMMER20') {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };
  
  const notifyVendors = async (userName: string, userContact: string) => {
    try {
      // Import dynamically to avoid circular dependencies
      const { notifyAllVendors } = await import('../../services/notification-service');
      
      setVendorNotification({
        status: 'pending',
        message: 'Sending booking notifications to vendors...',
        notifiedVendors: []
      });
      
      // Generate a booking ID
      const bookingId = `${destination.slice(0, 3).toUpperCase()}${Date.now().toString().slice(-6)}`;
      
      // Get today's date and a date 7 days in the future
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const result = await notifyAllVendors({
        hotel: selectedHotel,
        transport: selectedTransport,
        cab: selectedCab,
        foodOptions: selectedFoodOptions,
        userName,
        startDate,
        endDate,
        travelers: 2, // Default value
        totalAmount: calculateTotalPrice(),
        userContact,
        bookingId
      });
      
      if (result.success) {
        setVendorNotification({
          status: 'success',
          message: 'All vendors have been notified of your booking.',
          notifiedVendors: result.notifiedVendors
        });
        return true;
      } else {
        setVendorNotification({
          status: 'error',
          message: 'Some vendors could not be notified. Your booking is still confirmed.',
          notifiedVendors: result.notifiedVendors
        });
        return false;
      }
    } catch (error) {
      console.error('Error notifying vendors:', error);
      setVendorNotification({
        status: 'error',
        message: 'Failed to notify vendors. Please contact customer support.',
        notifiedVendors: []
      });
      return false;
    }
  };
  
  const value = {
    destination,
    selectedHotel,
    setSelectedHotel,
    selectedTransport,
    setSelectedTransport,
    selectedCab,
    setSelectedCab,
    selectedFoodOptions,
    setSelectedFoodOptions,
    totalPrice: calculateTotalPrice(),
    calculateTotalPrice,
    promoCode,
    setPromoCode,
    discount,
    applyPromoCode,
    vendorNotification,
    notifyVendors
  };
  
  return (
    <TripFormContext.Provider value={value}>
      {children}
    </TripFormContext.Provider>
  );
};

export const useTripFormContext = () => {
  const context = useContext(TripFormContext);
  if (context === undefined) {
    throw new Error('useTripFormContext must be used within a TripFormProvider');
  }
  return context;
};

