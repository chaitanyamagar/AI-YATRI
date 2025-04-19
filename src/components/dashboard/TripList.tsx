
import { useState } from 'react';
import TripCard from './TripCard';
import { Trip } from '@/hooks/useTripPlans';
import EmptyState from './EmptyState';

interface TripListProps {
  trips: Trip[];
  loading: boolean;
  hasTrips: boolean;
  onRemoveTrip: (id: string) => void;
  onViewDetails: (trip: Trip) => void;
}

const TripList = ({ trips, loading, hasTrips, onRemoveTrip, onViewDetails }: TripListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center my-12">
        <p>Loading your trips...</p>
      </div>
    );
  }

  if (!hasTrips) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {trips.map((trip) => (
        <TripCard 
          key={trip.id} 
          trip={trip}
          onRemove={onRemoveTrip}
          onSelect={() => onViewDetails(trip)}
        />
      ))}
    </div>
  );
};

export default TripList;
