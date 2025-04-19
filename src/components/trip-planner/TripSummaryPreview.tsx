
import { MapPin, Calendar, Users, Bus, Hotel, IndianRupee } from 'lucide-react';

interface TripSummaryPreviewProps {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  transportMode: string;
  accommodation: string;
  budget: string;
}

const TripSummaryPreview = ({
  destination,
  startDate,
  endDate,
  travelers,
  transportMode,
  accommodation,
  budget
}: TripSummaryPreviewProps) => {
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  // Calculate trip duration
  const calculateDuration = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };
  
  // Get transport icon and label
  const getTransportInfo = () => {
    switch(transportMode) {
      case 'car':
        return { label: 'Car' };
      case 'bus':
        return { label: 'Bus' };
      case 'train':
        return { label: 'Train' };
      case 'flight':
        return { label: 'Flight' };
      default:
        return { label: transportMode };
    }
  };
  
  // Get accommodation label
  const getAccommodationLabel = () => {
    switch(accommodation) {
      case 'hotel':
        return 'Hotels';
      case 'oyo':
        return 'OYO Rooms';
      case 'luxury':
        return 'Luxury Accommodations';
      case 'guesthouse':
        return 'Guesthouses';
      case 'hostel':
        return 'Hostels';
      case 'airbnb':
        return 'Airbnb';
      default:
        return accommodation;
    }
  };
  
  // Format budget for display
  const formatBudget = (amount: string) => {
    return parseInt(amount).toLocaleString('en-IN');
  };
  
  const transportInfo = getTransportInfo();
  const duration = calculateDuration();
  
  if (!destination) return null;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Trip Summary
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-yatri-blue mr-2" />
          <span className="text-gray-700 dark:text-gray-200">
            <strong>Destination:</strong> {destination}
          </span>
        </div>
        
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-yatri-blue mr-2" />
          <span className="text-gray-700 dark:text-gray-200">
            <strong>Dates:</strong> {formatDate(startDate)} to {formatDate(endDate)} ({duration} days)
          </span>
        </div>
        
        <div className="flex items-center">
          <Users className="h-5 w-5 text-yatri-blue mr-2" />
          <span className="text-gray-700 dark:text-gray-200">
            <strong>Travelers:</strong> {travelers}
          </span>
        </div>
        
        <div className="flex items-center">
          <Bus className="h-5 w-5 text-yatri-blue mr-2" />
          <span className="text-gray-700 dark:text-gray-200">
            <strong>Transport:</strong> {transportInfo.label}
          </span>
        </div>
        
        <div className="flex items-center">
          <Hotel className="h-5 w-5 text-yatri-blue mr-2" />
          <span className="text-gray-700 dark:text-gray-200">
            <strong>Accommodation:</strong> {getAccommodationLabel()}
          </span>
        </div>
        
        <div className="flex items-center">
          <IndianRupee className="h-5 w-5 text-yatri-blue mr-2" />
          <span className="text-gray-700 dark:text-gray-200">
            <strong>Budget:</strong> ₹{formatBudget(budget)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TripSummaryPreview;
        