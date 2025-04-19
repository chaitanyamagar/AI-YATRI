// Re-export all services from the individual files
export { getHotelOffers } from './rapid-api/hotels';
export { getFlightOffers } from './rapid-api/flights';
export { getGroundTransportation } from './rapid-api/ground-transport';
export { getFoodCosts } from './rapid-api/food';

// Re-export types that might be needed by consumers
export type { HotelOffer, FlightOffer } from './rapid-api/config';