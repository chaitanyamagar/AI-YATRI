// Mock API key - In a real application, this should be stored in environment variables
// or fetched securely from your backend
export const AMADEUS_API_KEY = 'enter here your api key';
export const AMADEUS_API_SECRET = 'enter here your api secret key';

export interface AmadeusAuthResponse {
  type: string;
  access_token: string;
  expires_in: number;
}

export interface HotelOffer {
  id: string;
  name: string;
  rating: string;
  price: {
    amount: number;
    currency: string;
  };
  image?: string;
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
