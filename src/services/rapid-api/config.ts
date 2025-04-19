
// RapidAPI configuration - In a real application, this should be stored in environment variables
// or fetched securely from your backend
export const RAPID_API_KEY = 'enter here your api key';
export const RAPID_API_HOST = 'enter here your api host';

// Re-export the same interfaces to maintain compatibility with existing code
export interface HotelOffer {
  id: string;
  name: string;
  rating: string;
  price: {
    amount: number;
    currency: string;
  };
}

export interface FlightOffer {
  id: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: {
    amount: number;
    currency: string;
  };
}

// Common pricing interface
export interface PricingInfo {
  minPrice?: number;
  maxPrice?: number;
  averageMealCost?: number;
  currency: string;
}
