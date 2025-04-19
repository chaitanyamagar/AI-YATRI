
import { useState, useEffect } from 'react';
import { Car, Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useTripFormContext, CabType } from './TripFormContext';
import { getGroundTransportation } from '@/services/amadeus-api';

interface CabBookingSectionProps {
  destination: string;
}

const CabBookingSection = ({ destination }: CabBookingSectionProps) => {
  const [loading, setLoading] = useState(true);
  const [cabOptions, setCabOptions] = useState<CabType[]>([]);
  const [rentalType, setRentalType] = useState<'one-way' | 'round-trip' | 'hourly'>('one-way');
  const [duration, setDuration] = useState([8]); // hours for hourly rental
  
  const { setSelectedCab } = useTripFormContext();
  
  useEffect(() => {
    const fetchCabOptions = async () => {
      setLoading(true);
      try {
        // Get transportation pricing from API
        const transportPricing = await getGroundTransportation(
          'DEL', // Delhi as origin for demo
          destination,
          new Date().toISOString().split('T')[0],
          2,
          'car'
        );
        
        const basePrice = (transportPricing.minPrice + transportPricing.maxPrice) / 2;
        
        // Generate cab options based on rental type
        let generatedOptions: CabType[] = [];
        
        if (rentalType === 'one-way') {
          generatedOptions = [
            {
              id: 'cab-economy',
              type: 'one-way',
              provider: 'Economy Cab',
              price: Math.round(basePrice * 0.8),
            },
            {
              id: 'cab-standard',
              type: 'one-way',
              provider: 'Standard Sedan',
              price: Math.round(basePrice),
            },
            {
              id: 'cab-luxury',
              type: 'one-way',
              provider: 'Premium SUV',
              price: Math.round(basePrice * 1.5),
            }
          ];
        } else if (rentalType === 'round-trip') {
          generatedOptions = [
            {
              id: 'cab-economy-rt',
              type: 'round-trip',
              provider: 'Economy Cab',
              price: Math.round(basePrice * 0.8 * 1.8), // 1.8x for round trip
            },
            {
              id: 'cab-standard-rt',
              type: 'round-trip',
              provider: 'Standard Sedan',
              price: Math.round(basePrice * 1.8),
            },
            {
              id: 'cab-luxury-rt',
              type: 'round-trip',
              provider: 'Premium SUV',
              price: Math.round(basePrice * 1.5 * 1.8),
            }
          ];
        } else {
          // Hourly rental - price per hour
          const hourlyBase = basePrice / 10; // Typical hourly rate
          generatedOptions = [
            {
              id: 'cab-economy-hr',
              type: 'hourly',
              provider: 'Economy Cab',
              price: Math.round(hourlyBase * 0.8 * duration[0]),
            },
            {
              id: 'cab-standard-hr',
              type: 'hourly',
              provider: 'Standard Sedan',
              price: Math.round(hourlyBase * duration[0]),
            },
            {
              id: 'cab-luxury-hr',
              type: 'hourly',
              provider: 'Premium SUV',
              price: Math.round(hourlyBase * 1.5 * duration[0]),
            }
          ];
        }
        
        setCabOptions(generatedOptions);
      } catch (error) {
        console.error('Error fetching cab options:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch cab rental options. Please try again.',
          variant: 'destructive',
        });
        
        // Fallback cab options
        const fallbackOptions: CabType[] = [
          {
            id: 'cab-economy-fallback',
            type: rentalType,
            provider: 'Economy Cab',
            price: rentalType === 'hourly' ? 500 * duration[0] : rentalType === 'round-trip' ? 5000 : 3000,
          },
          {
            id: 'cab-standard-fallback',
            type: rentalType,
            provider: 'Standard Sedan',
            price: rentalType === 'hourly' ? 800 * duration[0] : rentalType === 'round-trip' ? 8000 : 5000,
          },
          {
            id: 'cab-luxury-fallback',
            type: rentalType,
            provider: 'Premium SUV',
            price: rentalType === 'hourly' ? 1200 * duration[0] : rentalType === 'round-trip' ? 12000 : 7000,
          }
        ];
        
        setCabOptions(fallbackOptions);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCabOptions();
  }, [destination, rentalType, duration]);
  
  const handleSelectCab = (cab: CabType) => {
    setSelectedCab(cab);
    toast({
      title: 'Cab Selected',
      description: `You selected ${cab.provider} (${cab.type})`,
    });
  };
  
  // Update hourly rental prices when duration changes
  useEffect(() => {
    if (rentalType === 'hourly' && !loading) {
      setCabOptions(prev => prev.map(cab => ({
        ...cab,
        price: Math.round(cab.price / (duration[0] === 0 ? 1 : duration[0]) * duration[0])
      })));
    }
  }, [duration, rentalType, loading]);
  
  if (loading) {
    return (
      <div className="h-60 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Select Your Cab Rental</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rental Type
          </label>
          <RadioGroup 
            defaultValue={rentalType} 
            onValueChange={(value) => setRentalType(value as 'one-way' | 'round-trip' | 'hourly')}
            className="grid grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
              <RadioGroupItem value="one-way" id="one-way" />
              <Label htmlFor="one-way" className="flex items-center cursor-pointer">
                <span>One Way</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
              <RadioGroupItem value="round-trip" id="round-trip" />
              <Label htmlFor="round-trip" className="flex items-center cursor-pointer">
                <span>Round Trip</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
              <RadioGroupItem value="hourly" id="hourly" />
              <Label htmlFor="hourly" className="flex items-center cursor-pointer">
                <span>Hourly Rental</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {rentalType === 'hourly' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration: {duration[0]} hours
            </label>
            <Slider 
              defaultValue={[8]} 
              min={4} 
              max={12} 
              step={1} 
              value={duration}
              onValueChange={setDuration}
            />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cabOptions.map((cab) => (
          <Card key={cab.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Car className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span>{cab.provider}</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {rentalType === 'one-way' ? 'One way trip to destination' : 
                 rentalType === 'round-trip' ? 'Return trip included' : 
                 `${duration[0]} hour rental with driver`}
              </div>
              
              <div className="text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Free cancellation up to 24 hours</li>
                  <li>Includes tolls & parking fees</li>
                  <li>Professional driver</li>
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between items-center">
              <div className="text-xl font-bold">₹{cab.price.toLocaleString()}</div>
              <button 
                onClick={() => handleSelectCab(cab)}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Select
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CabBookingSection;
