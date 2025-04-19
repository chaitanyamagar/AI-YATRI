
// Re-export all services from the individual files
export { getHotelOffers } from './amadeus/hotels';
export { getFlightOffers } from './amadeus/flights';
export { getGroundTransportation } from './amadeus/ground-transport';
export { getFoodCosts } from './amadeus/food';

// Re-export types that might be needed by consumers
export type { HotelOffer, FlightOffer } from './amadeus/config';
