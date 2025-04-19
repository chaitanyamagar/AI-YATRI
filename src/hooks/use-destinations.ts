import { useState, useEffect } from 'react';
import { destinationsApi } from '@/services/destinations-api';

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  fallbackImage: string;
  rating: number;
  attractions: string[];
  bestTime: string;
}

interface UseDestinationsReturn {
  destinations: Destination[];
  loading: boolean;
  error: Error | null;
  searchDestinations: (query: string) => Promise<void>;
}

export function useDestinations(): UseDestinationsReturn {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDestinations = async (query: string = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = await destinationsApi.getDestinations(query);
      setDestinations(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch destinations'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return {
    destinations,
    loading,
    error,
    searchDestinations: fetchDestinations
  };
} 