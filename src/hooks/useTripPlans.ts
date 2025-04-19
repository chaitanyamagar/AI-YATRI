import { useState, useEffect, useCallback } from 'react';

// Define the Trip type
export interface Trip {
  id: string; 
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  transportMode: string;
  accommodation: string;
  preferences: string[];
  itineraryHtml?: string;
  image?: string;
}

// In a real app, this would use Supabase or another backend
export const useTripPlans = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  // Load trips from localStorage
  useEffect(() => {
    const loadTrips = () => {
      try {
        const savedTrips = localStorage.getItem('tripPlans');
        if (savedTrips) {
          setTrips(JSON.parse(savedTrips));
        }
      } catch (error) {
        console.error('Error loading trips from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTrips();
  }, []);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('tripPlans', JSON.stringify(trips));
      } catch (error) {
        console.error('Error saving trips to localStorage:', error);
      }
    }
  }, [trips, loading]);

  // Add a new trip
  const addTrip = useCallback((tripData: Omit<Trip, 'id'>) => {
    const newId = Date.now().toString();
    const newTrip = {
      ...tripData,
      id: newId,
    };
    
    setTrips(prevTrips => {
      const updatedTrips = [...prevTrips, newTrip];
      // Immediately update localStorage
      try {
        localStorage.setItem('tripPlans', JSON.stringify(updatedTrips));
      } catch (error) {
        console.error('Error saving trips after adding:', error);
      }
      return updatedTrips;
    });
    
    return newId;
  }, []);

  // Remove a trip
  const removeTrip = useCallback((id: string) => {
    setTrips(prevTrips => {
      const updatedTrips = prevTrips.filter(trip => trip.id !== id);
      // Immediately update localStorage
      try {
        localStorage.setItem('tripPlans', JSON.stringify(updatedTrips));
      } catch (error) {
        console.error('Error saving trips after removal:', error);
      }
      return updatedTrips;
    });
  }, []);

  return {
    trips,
    loading,
    addTrip,
    removeTrip,
    hasTrips: trips.length > 0
  };
};
