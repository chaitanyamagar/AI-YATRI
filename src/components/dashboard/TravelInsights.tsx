
import { Trip } from '@/hooks/useTripPlans';
import AISuggestions from './AISuggestions';
import UpcomingTripsTable from './UpcomingTripsTable';

interface TravelInsightsProps {
  trips: Trip[];
  selectedTrip: Trip | null;
  onViewDetails: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
}

const TravelInsights = ({ trips, selectedTrip, onViewDetails, onBookNow }: TravelInsightsProps) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-display font-semibold mb-6 dark:text-white">
        Travel Insights
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UpcomingTripsTable 
          trips={trips} 
          onViewDetails={onViewDetails} 
          onBookNow={onBookNow} 
        />
        <AISuggestions trips={trips} selectedTrip={selectedTrip} />
      </div>
    </div>
  );
};

export default TravelInsights;
