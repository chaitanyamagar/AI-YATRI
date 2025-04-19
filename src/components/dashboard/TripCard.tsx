
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinationsData } from '../../data/destinations';

interface TripCardProps {
  trip: any;
  onRemove: (id: string) => void;
  onSelect: () => void;
}

const TripCard = ({ trip, onRemove, onSelect }: TripCardProps) => {
  // Find destination data for the image if not already provided
  const destinationData = destinationsData.find(d => 
    d.name.toLowerCase() === trip.destination.toLowerCase()
  );
  
  // Use trip.image if available, otherwise fallback to destinationData or placeholder
  const imageUrl = trip.image || (destinationData?.image || '/placeholder.svg');
  
  // Generate a short description if not available
  const description = trip.description || destinationData?.description || 
    `Explore the wonders of ${trip.destination} with a ${trip.accommodation} stay.`;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
      <div className="relative h-48">
        <img 
          src={imageUrl} 
          alt={trip.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-display font-semibold text-gray-800 dark:text-white mb-2">
          {trip.destination}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
          <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{trip.startDate} to {trip.endDate}</span>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
          <Users className="w-4 h-4 mr-1 flex-shrink-0" />
          <span>{trip.travelers} travelers</span>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            className="flex-1 transition-all hover:bg-primary/90" 
            onClick={onSelect}
          >
            View Details
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            onClick={() => onRemove(trip.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
