import { useState, useEffect } from 'react';
import { destinationsData } from '../data/destinations';

export const useDestinationData = (id: string | undefined) => {
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Convert string id to number for comparison with data
    const numericId = id ? Number(id) : undefined;
    const foundDestination = destinationsData.find(d => d.id === numericId);
    
    if (foundDestination) {
      setDestination(foundDestination);
      document.title = `${foundDestination.name} - AI Yatri`;
    }
    setLoading(false);
  }, [id]);

  return { destination, loading };
};
