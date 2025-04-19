// API Configuration
export const API_CONFIG = {
  // Base URLs for different services
  BASE_URLS: {
    AMADEUS: 'https://test.api.amadeus.com/v1',
    WEATHER: 'https://api.weatherapi.com/v1',
    MAPS: 'https://maps.googleapis.com/maps/api',
    RAPID_API: 'https://travel-advisor.p.rapidapi.com',
    GEMINI: 'https://generativelanguage.googleapis.com/v1beta'
  },

  // API Keys (will be loaded from environment variables)
  API_KEYS: {
    AMADEUS: import.meta.env.VITE_AMADEUS_API_KEY,
    WEATHER: import.meta.env.VITE_WEATHER_API_KEY,
    MAPS: import.meta.env.VITE_MAPS_API_KEY,
    RAPID_API: import.meta.env.VITE_RAPID_API_KEY,
    GEMINI: import.meta.env.VITE_GEMINI_API_KEY
  },

  // API Endpoints
  ENDPOINTS: {
    // Amadeus endpoints
    FLIGHTS: '/shopping/flight-offers',
    HOTELS: '/shopping/hotel-offers',
    
    // Weather endpoints
    CURRENT_WEATHER: '/current.json',
    FORECAST: '/forecast.json',
    
    // Maps endpoints
    GEOCODING: '/geocode/json',
    PLACES: '/place/textsearch/json',
    
    // RapidAPI endpoints
    DESTINATIONS: '/locations/search',
    ATTRACTIONS: '/attractions/list',
    
    // Gemini endpoints
    CHAT: '/models/gemini-pro:generateContent'
  },

  // API Headers
  HEADERS: {
    RAPID_API: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    },
    AMADEUS: {
      'Authorization': `Bearer ${import.meta.env.VITE_AMADEUS_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }
}; 