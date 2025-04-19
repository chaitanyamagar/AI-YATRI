import { useState, useEffect } from 'react';
import { Plane, Train, Bus, Clock, Loader2, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useTripFormContext, TransportType } from './TripFormContext';
import { getFlightOffers } from '@/services/amadeus-api';
import DetailsModal from './DetailsModal';

interface TransportBookingSectionProps {
  destination: string;
  origin?: string;
}

interface ExtendedTransportType extends TransportType {
  description?: string;
  stationLocation?: string;
  mapUrl?: string;
  externalUrl?: string;
  reviews?: {
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  amenities?: string[];
}

const TransportBookingSection = ({ destination }: TransportBookingSectionProps) => {
  const [loading, setLoading] = useState(true);
  const [transportOptions, setTransportOptions] = useState<{
    flights: ExtendedTransportType[];
    trains: ExtendedTransportType[];
    buses: ExtendedTransportType[];
  }>({
    flights: [],
    trains: [],
    buses: []
  });
  const [transportType, setTransportType] = useState<'flight' | 'train' | 'bus'>('flight');
  const [selectedTransportForDetails, setSelectedTransportForDetails] = useState<ExtendedTransportType | null>(null);
  
  const { setSelectedTransport } = useTripFormContext();
  
  useEffect(() => {
    const fetchTransportOptions = async () => {
      setLoading(true);
      try {
        if (transportType === 'flight') {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          const flightOffers = await getFlightOffers(
            'DEL', // Delhi as origin for demo
            destination.substring(0, 3).toUpperCase(), // First 3 letters as destination code
            tomorrow.toISOString().split('T')[0],
            2
          );
          
          const transformedFlights: ExtendedTransportType[] = flightOffers.map(flight => {
            const originCode = 'DEL';
            const destCode = destination.substring(0, 3).toUpperCase();
            
            return {
              id: flight.id,
              type: 'flight',
              provider: `AI Airline ${Math.floor(Math.random() * 500)}`,
              departureTime: flight.departureTime,
              arrivalTime: flight.arrivalTime,
              price: flight.price.amount,
              duration: `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 50) + 10}m`,
              description: `Non-stop flight from Delhi to ${destination}. Includes complimentary meals and one checked baggage.`,
              stationLocation: `Terminal 3, IGI Airport, Delhi to ${destination} Airport`,
              mapUrl: `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=Indira+Gandhi+International+Airport&destination=${encodeURIComponent(destination + ' Airport')}&mode=flying`,
              externalUrl: `https://www.google.com/maps/dir/Indira+Gandhi+International+Airport/${encodeURIComponent(destination + ' Airport')}`,
              reviews: [
                {
                  author: "Rohit M.",
                  rating: 4,
                  comment: "Comfortable flight with good service. Slight delay in departure.",
                  date: "2 months ago"
                },
                {
                  author: "Sonia T.",
                  rating: 3.5,
                  comment: "Decent experience. Food quality could be better.",
                  date: "1 month ago"
                },
                {
                  author: "Kiran V.",
                  rating: 4.5,
                  comment: "Excellent service and punctual departure.",
                  date: "3 weeks ago"
                }
              ],
              amenities: ['In-flight Meals', 'Entertainment System', 'Wi-Fi', 'Power Outlets', 'One Free Checked Bag']
            };
          });
          
          setTransportOptions(prev => ({
            ...prev,
            flights: transformedFlights
          }));
        } else {
          const stationType = transportType === 'train' ? 'Railway Station' : 'Bus Terminal';
          const mockOptions: ExtendedTransportType[] = Array(3).fill(0).map((_, i) => {
            const originStation = transportType === 'train' ? 'New Delhi Railway Station' : 'ISBT Kashmere Gate';
            const destStation = `${destination} ${stationType}`;
            
            return {
              id: `${transportType}-${i+1}`,
              type: transportType,
              provider: transportType === 'train' ? `Express Rail ${i+1}` : `Luxury Coach ${i+1}`,
              departureTime: ['08:00', '12:30', '16:45'][i],
              arrivalTime: ['12:30', '17:00', '21:15'][i],
              price: transportType === 'train' ? 1200 + (i * 500) : 800 + (i * 300),
              duration: transportType === 'train' ? '4h 30m' : '4h 45m',
              description: transportType === 'train' 
                ? `Travel comfortably from Delhi to ${destination} on our modern train with convenient amenities.` 
                : `Luxury bus service from Delhi to ${destination} with comfortable seating and amenities.`,
              stationLocation: `${originStation} to ${destStation}`,
              mapUrl: `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${encodeURIComponent(originStation)}&destination=${encodeURIComponent(destStation)}&mode=${transportType === 'train' ? 'transit' : 'driving'}`,
              externalUrl: `https://www.google.com/maps/dir/${encodeURIComponent(originStation)}/${encodeURIComponent(destStation)}`,
              reviews: [
                {
                  author: "Rajat S.",
                  rating: transportType === 'train' ? 4 : 3.5,
                  comment: transportType === 'train' 
                    ? "Comfortable journey with good amenities." 
                    : "Good service but seats could be more comfortable.",
                  date: "1 month ago"
                },
                {
                  author: "Meena K.",
                  rating: transportType === 'train' ? 3.5 : 4,
                  comment: transportType === 'train' 
                    ? "Clean compartments but slight delay in arrival." 
                    : "Punctual service with courteous staff.",
                  date: "2 weeks ago"
                },
                {
                  author: "Pratap R.",
                  rating: 4,
                  comment: "Good value for money and reliable service.",
                  date: "3 weeks ago"
                }
              ],
              amenities: transportType === 'train' 
                ? ['Power Outlets', 'Onboard Catering', 'Clean Toilets', 'Reading Lights', 'Blankets'] 
                : ['Air Conditioning', 'Reclining Seats', 'USB Charging', 'Bottled Water', 'Toilet']
            };
          });
          
          setTransportOptions(prev => ({
            ...prev,
            [transportType === 'train' ? 'trains' : 'buses']: mockOptions
          }));
        }
      } catch (error) {
        console.error(`Error fetching ${transportType} options:`, error);
        toast({
          title: 'Error',
          description: `Failed to fetch ${transportType} options. Please try again.`,
          variant: 'destructive',
        });
        
        const fallbackOptions: ExtendedTransportType[] = Array(3).fill(0).map((_, i) => {
          const originPlace = transportType === 'flight' 
            ? 'Indira Gandhi International Airport' 
            : transportType === 'train' 
              ? 'New Delhi Railway Station' 
              : 'ISBT Kashmere Gate';
          
          const destPlace = transportType === 'flight' 
            ? `${destination} Airport` 
            : transportType === 'train' 
              ? `${destination} Railway Station` 
              : `${destination} Bus Terminal`;
          
          return {
            id: `${transportType}-${i+1}`,
            type: transportType,
            provider: transportType === 'flight' 
              ? `Air Express ${i+1}` 
              : transportType === 'train' 
                ? `Rail Express ${i+1}` 
                : `Luxury Coach ${i+1}`,
            departureTime: ['08:00', '12:30', '16:45'][i],
            arrivalTime: ['12:30', '17:00', '21:15'][i],
            price: transportType === 'flight' 
              ? 5000 + (i * 1000) 
              : transportType === 'train' 
                ? 1200 + (i * 500) 
                : 800 + (i * 300),
            duration: transportType === 'flight' 
              ? '2h 30m' 
              : transportType === 'train' 
                ? '4h 30m' 
                : '4h 45m',
            description: `Travel from Delhi to ${destination} with our reliable ${transportType} service. Enjoy a comfortable journey with modern amenities.`,
            stationLocation: `${originPlace} to ${destPlace}`,
            mapUrl: `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${encodeURIComponent(originPlace)}&destination=${encodeURIComponent(destPlace)}&mode=${transportType === 'flight' ? 'flying' : transportType === 'train' ? 'transit' : 'driving'}`,
            externalUrl: `https://www.google.com/maps/dir/${encodeURIComponent(originPlace)}/${encodeURIComponent(destPlace)}`,
            reviews: [
              {
                author: "Rahul M.",
                rating: 4,
                comment: "Comfortable journey and good service.",
                date: "1 month ago"
              },
              {
                author: "Sheela K.",
                rating: 3.5,
                comment: "Decent experience overall. Some minor issues.",
                date: "3 weeks ago"
              },
              {
                author: "Vikram S.",
                rating: 4.5,
                comment: "Excellent service and comfortable journey.",
                date: "2 weeks ago"
              }
            ],
            amenities: transportType === 'flight' 
              ? ['In-flight Meals', 'Entertainment', 'Wi-Fi', 'Power Outlets'] 
              : transportType === 'train' 
                ? ['Power Outlets', 'Catering', 'Clean Toilets', 'Reading Lights'] 
                : ['AC', 'Reclining Seats', 'USB Charging', 'Water Bottle']
          };
        });
        
        setTransportOptions(prev => ({
          ...prev,
          [transportType === 'flight' 
            ? 'flights' 
            : transportType === 'train' 
              ? 'trains' 
              : 'buses']: fallbackOptions
        }));
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransportOptions();
  }, [destination, transportType]);
  
  const handleSelectTransport = (transport: ExtendedTransportType) => {
    setSelectedTransport(transport);
    toast({
      title: 'Transport Selected',
      description: `You selected ${transport.provider} ${transport.type}`,
    });
  };

  const handleViewDetails = (transport: ExtendedTransportType) => {
    setSelectedTransportForDetails(transport);
  };
  
  const getTransportIcon = (type: 'flight' | 'train' | 'bus') => {
    switch (type) {
      case 'flight':
        return <Plane className="h-5 w-5" />;
      case 'train':
        return <Train className="h-5 w-5" />;
      case 'bus':
        return <Bus className="h-5 w-5" />;
    }
  };
  
  if (loading) {
    return (
      <div className="h-60 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }
  
  const currentOptions = transportType === 'flight' 
    ? transportOptions.flights 
    : transportType === 'train' 
      ? transportOptions.trains 
      : transportOptions.buses;
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Select Your Transportation</h2>
        
        <Tabs 
          defaultValue="flight" 
          value={transportType}
          onValueChange={(value) => setTransportType(value as 'flight' | 'train' | 'bus')}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="flight" className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              <span>Flight</span>
            </TabsTrigger>
            <TabsTrigger value="train" className="flex items-center gap-2">
              <Train className="h-4 w-4" />
              <span>Train</span>
            </TabsTrigger>
            <TabsTrigger value="bus" className="flex items-center gap-2">
              <Bus className="h-4 w-4" />
              <span>Bus</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="flight">
            <div className="space-y-4">
              {currentOptions.map((option) => (
                <TransportCard 
                  key={option.id} 
                  transport={option} 
                  onSelect={handleSelectTransport}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="train">
            <div className="space-y-4">
              {currentOptions.map((option) => (
                <TransportCard 
                  key={option.id} 
                  transport={option} 
                  onSelect={handleSelectTransport}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="bus">
            <div className="space-y-4">
              {currentOptions.map((option) => (
                <TransportCard 
                  key={option.id} 
                  transport={option} 
                  onSelect={handleSelectTransport}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedTransportForDetails && (
        <DetailsModal
          open={!!selectedTransportForDetails}
          onClose={() => setSelectedTransportForDetails(null)}
          type="transport"
          name={selectedTransportForDetails.provider}
          description={selectedTransportForDetails.description}
          location={selectedTransportForDetails.stationLocation}
          price={selectedTransportForDetails.price}
          amenities={selectedTransportForDetails.amenities}
          reviews={selectedTransportForDetails.reviews}
          mapUrl={selectedTransportForDetails.mapUrl}
          externalUrl={selectedTransportForDetails.externalUrl}
        />
      )}
    </div>
  );
};

const TransportCard = ({ 
  transport, 
  onSelect,
  onViewDetails
}: { 
  transport: ExtendedTransportType, 
  onSelect: (transport: ExtendedTransportType) => void,
  onViewDetails: (transport: ExtendedTransportType) => void
}) => {
  const getTransportIcon = (type: 'flight' | 'train' | 'bus') => {
    switch (type) {
      case 'flight':
        return <Plane className="h-5 w-5" />;
      case 'train':
        return <Train className="h-5 w-5" />;
      case 'bus':
        return <Bus className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          {getTransportIcon(transport.type)}
          <span className="ml-2">{transport.provider}</span>
        </CardTitle>
        {transport.stationLocation && (
          <div className="text-sm text-gray-600 flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
            {transport.stationLocation}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-2xl font-semibold">{transport.departureTime}</div>
            <div className="text-sm text-gray-500">Departure</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500">{transport.duration}</div>
            <div className="relative w-16 h-px bg-gray-300 my-1">
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-gray-500" />
              <span className="text-xs text-gray-500">Non-stop</span>
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-semibold">{transport.arrivalTime}</div>
            <div className="text-sm text-gray-500">Arrival</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="text-xl font-bold">₹{transport.price.toLocaleString()}</div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(transport)}
            className="flex items-center"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            View Details
          </Button>
          <Button 
            onClick={() => onSelect(transport)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Select
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransportBookingSection;
