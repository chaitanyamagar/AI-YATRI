
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface LocationSelectorProps {
  onOriginChange: (origin: string) => void;
  onDestinationChange: (destination: string) => void;
  defaultDestination: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  onOriginChange,
  onDestinationChange,
  defaultDestination
}) => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>(defaultDestination);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isSearchingCurrentLocation, setIsSearchingCurrentLocation] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string>('');

  // Common Indian cities for demo suggestions
  const popularCities = [
    'New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bengaluru', 
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  useEffect(() => {
    // Pass initial values to parent
    if (destination) {
      onDestinationChange(destination);
    }
    
    // Try to get user's location on component mount
    if (!origin) {
      getCurrentLocation();
    }
  }, []);

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOrigin(value);
    
    if (value.length > 1) {
      // Filter suggestions based on input
      const filtered = popularCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);
    onDestinationChange(value);
  };

  const handleSelectSuggestion = (city: string) => {
    setOrigin(city);
    setShowSuggestions(false);
    onOriginChange(city);
    toast({
      title: "Location Selected",
      description: `Origin set to ${city}`,
    });
  };

  const getCurrentLocation = () => {
    setIsSearchingCurrentLocation(true);
    setLocationStatus('Detecting your location...');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In a real app, you'd use Google's Geocoding API here
            // For demo, we'll just use a random major city
            const randomCity = popularCities[Math.floor(Math.random() * popularCities.length)];
            setOrigin(randomCity);
            onOriginChange(randomCity);
            setLocationStatus(`Location detected: ${randomCity}`);
            toast({
              title: "Location Found",
              description: `Your location: ${randomCity}`,
            });
          } catch (error) {
            console.error("Error getting location name:", error);
            setLocationStatus('Location detection failed. Please enter manually.');
            toast({
              title: "Error",
              description: "Could not determine your location. Please enter it manually.",
              variant: "destructive",
            });
          } finally {
            setIsSearchingCurrentLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationStatus('Location access denied. Please enter manually.');
          toast({
            title: "Geolocation Error",
            description: "Could not access your location. Please enter it manually.",
            variant: "destructive",
          });
          setIsSearchingCurrentLocation(false);
        }
      );
    } else {
      setLocationStatus('Geolocation not supported in your browser.');
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser. Please enter your location manually.",
        variant: "destructive",
      });
      setIsSearchingCurrentLocation(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Enter your current location"
                  value={origin}
                  onChange={handleOriginChange}
                  className="pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={getCurrentLocation} 
                disabled={isSearchingCurrentLocation}
                title="Detect my current location"
              >
                {isSearchingCurrentLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {locationStatus && (
              <p className="text-xs mt-1 text-green-600">
                {locationStatus}
              </p>
            )}
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                {suggestions.map((city, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSelectSuggestion(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <Input
              placeholder="Enter destination"
              value={destination}
              onChange={handleDestinationChange}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSelector;
