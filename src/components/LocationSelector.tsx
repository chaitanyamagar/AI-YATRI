import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationSelectorProps {
  onLocationSelect: (location: Location) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development';
      
      if (isDevelopment) {
        toast({
          title: "Development Mode Notice",
          description: "Geolocation requires HTTPS in production. For development, try using localhost:8080 or enable SSL.",
          variant: "warning",
        });
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      onLocationSelect(location);
      return location;
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast({
              title: "Location Access Denied",
              description: "Please enable location access in your browser settings.",
              variant: "destructive",
            });
            break;
          case error.POSITION_UNAVAILABLE:
            toast({
              title: "Location Unavailable",
              description: "Unable to determine your location. Please try again.",
              variant: "destructive",
            });
            break;
          case error.TIMEOUT:
            toast({
              title: "Request Timeout",
              description: "Location request timed out. Please try again.",
              variant: "destructive",
            });
            break;
        }
      }
      setShowManualInput(true);
      return getMockLocation();
    } finally {
      setIsLoading(false);
    }
  };

  const getMockLocation = (): Location => {
    return {
      latitude: 19.0760,
      longitude: 72.8777
    };
  };

  const handleLocationRequest = async () => {
    if (import.meta.env.VITE_NODE_ENV === 'development') {
      return getMockLocation();
    }
    return getCurrentLocation();
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleLocationRequest}
        disabled={isLoading}
        className="btn-primary w-full"
      >
        {isLoading ? 'Getting Location...' : 'Use Current Location'}
      </button>
      
      {showManualInput && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Please enter your location manually:
          </p>
          {/* Add manual location input fields here */}
        </div>
      )}
    </div>
  );
};

export default LocationSelector; 