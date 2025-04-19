import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useTripFormContext, HotelType } from './TripFormContext';
import { getHotelOffers } from '@/services/amadeus-api';
import DetailsModal from './DetailsModal';
import HotelCard from './HotelCard';
import HotelFilter from './HotelFilter';
import { useDetailsModal, DetailsItem } from '@/hooks/useDetailsModal';
import { API_CONFIG } from '@/config/api-config';

interface HotelBookingSectionProps {
  destination: string;
}

// Fixed interface to avoid property type conflicts completely
interface ExtendedHotelType {
  id: string;
  name: string;
  price: number;
  rating: string;
  amenities: string[];
  image: string;
  location?: string;
  description?: string;
  mapUrl?: string;
  externalUrl?: string;
  reviews?: {
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  selected?: boolean;
}

const HotelBookingSection = ({ destination }: HotelBookingSectionProps) => {
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState<ExtendedHotelType[]>([]);
  const [hotelCategory, setHotelCategory] = useState<'BUDGET' | 'MIDSCALE' | 'LUXURY'>('MIDSCALE');
  const { setSelectedHotel } = useTripFormContext();
  const { selectedItem, openDetailsModal, closeDetailsModal, isModalOpen } = useDetailsModal<ExtendedHotelType>();
  
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        const checkInDate = tomorrow.toISOString().split('T')[0];
        const checkOutDate = nextWeek.toISOString().split('T')[0];
        
        // Get hotel offers from the Rapid API
        const hotelOffers = await getHotelOffers(
          destination.substring(0, 3).toUpperCase(), // Using first 3 letters as city code for demo
          checkInDate,
          checkOutDate,
          2,
          hotelCategory
        );
        
        // Transform hotel offers to our format with Google Maps data
        const transformedHotels: ExtendedHotelType[] = hotelOffers.map(hotel => {
          const hash = hotel.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const lat = 28.6 + (hash % 10) / 100;
          const lng = 77.2 + (hash % 15) / 100;
          
          return {
            id: hotel.id,
            name: hotel.name,
            price: hotel.price.amount,
            rating: hotel.rating,
            amenities: ['Wi-Fi', 'Breakfast', 'Pool', 'Gym', 'Room Service'].slice(0, parseInt(hotel.rating)),
            image: `/images/booking/midscale-hotel.jpg`,
            location: `${destination}, India`,
            description: `Experience comfort and luxury at ${hotel.name}, located in the heart of ${destination}. Our hotel offers a range of amenities to make your stay memorable.`,
            mapUrl: `https://www.google.com/maps/embed/v1/place?key=${API_CONFIG.API_KEYS.MAPS}&q=${encodeURIComponent(hotel.name + ' ' + destination)}&center=${lat},${lng}&zoom=15`,
            externalUrl: `https://www.google.com/maps/search/${encodeURIComponent(hotel.name + ' ' + destination)}`,
            reviews: [
              {
                author: "Rajesh S.",
                rating: 4.5,
                comment: "Great hotel with excellent service and amenities. Would definitely stay again.",
                date: "3 months ago"
              },
              {
                author: "Priya M.",
                rating: parseInt(hotel.rating) - 0.5,
                comment: "Comfortable rooms and friendly staff. The breakfast buffet was excellent.",
                date: "1 month ago"
              },
              {
                author: "Amit K.",
                rating: parseInt(hotel.rating),
                comment: "Perfect location for our stay. Clean rooms and modern facilities.",
                date: "2 weeks ago"
              }
            ]
          };
        });
        
        setHotels(transformedHotels);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch hotel options. Please try again.',
          variant: 'destructive',
        });
        
        // Fallback hotels with Google Maps data
        const fallbackHotels: ExtendedHotelType[] = [
          {
            id: '1',
            name: 'Luxury Resort & Spa',
            price: 12000,
            rating: '5',
            amenities: ['Free Wi-Fi', 'Breakfast', 'Pool', 'Spa', 'Gym'],
            image: '/public/images/booking/luxury-hotel.jpg',
            location: `${destination}, India`,
            description: 'Experience unparalleled luxury at our 5-star resort with premium amenities, spacious rooms, and world-class dining options.',
            mapUrl: `https://www.google.com/maps/embed/v1/place?key=${API_CONFIG.API_KEYS.MAPS}&q=${encodeURIComponent('Luxury Resort & Spa ' + destination)}`,
            externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('Luxury Resort & Spa ' + destination)}`,
            reviews: [
              {
                author: "Rajesh S.",
                rating: 5,
                comment: "The best hotel I've ever stayed at. Exceptional service and beautiful surroundings.",
                date: "3 months ago"
              },
              {
                author: "Priya M.",
                rating: 4.5,
                comment: "Outstanding luxury experience. The spa treatments are a must-try!",
                date: "1 month ago"
              },
              {
                author: "Amit K.",
                rating: 5,
                comment: "Worth every penny. The attention to detail is remarkable.",
                date: "2 weeks ago"
              }
            ]
          },
          {
            id: '2',
            name: 'City Center Hotel',
            price: 8000,
            rating: '4',
            amenities: ['Free Wi-Fi', 'Breakfast', 'Room Service', 'Gym'],
            image: '/public/images/booking/budget-hotel.jpg',
            location: `Central ${destination}, India`,
            description: 'Located in the heart of the city with easy access to all major attractions. Modern rooms with all necessary amenities for a comfortable stay.',
            mapUrl: `https://www.google.com/maps/embed/v1/place?key=${API_CONFIG.API_KEYS.MAPS}&q=${encodeURIComponent('City Center Hotel ' + destination)}`,
            externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('City Center Hotel ' + destination)}`,
            reviews: [
              {
                author: "Sharma J.",
                rating: 4,
                comment: "Great location and friendly staff. Perfect for business travelers.",
                date: "2 months ago"
              },
              {
                author: "Neha R.",
                rating: 4,
                comment: "Clean rooms and decent breakfast. Very convenient for city exploration.",
                date: "3 weeks ago"
              },
              {
                author: "Vijay T.",
                rating: 3.5,
                comment: "Good value for money. Some minor issues with room service but overall good.",
                date: "1 month ago"
              }
            ]
          },
          {
            id: '3',
            name: 'Super Hotel',
            price: 4000,
            rating: '3',
            amenities: ['Free Wi-Fi', 'Breakfast', 'Room Service'],
            image: '/public/images/booking/Super Hotel O Nashik.jpg',
            location: `${destination} East, India`,
            description: 'Affordable accommodation without compromising on essentials. Clean rooms, friendly service, and a convenient location.',
            mapUrl: `https://www.google.com/maps/embed/v1/place?key=${API_CONFIG.API_KEYS.MAPS}&q=${encodeURIComponent('Budget Stay Inn ' + destination)}`,
            externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('Budget Stay Inn ' + destination)}`,
            reviews: [
              {
                author: "Ravi P.",
                rating: 3,
                comment: "Good budget option. Basic amenities but clean and functional.",
                date: "1 month ago"
              },
              {
                author: "Sunita G.",
                rating: 3.5,
                comment: "Friendly staff and decent breakfast. Good value for money.",
                date: "2 months ago"
              },
              {
                author: "Karan M.",
                rating: 2.5,
                comment: "Acceptable for short stays. Could improve on cleanliness.",
                date: "3 weeks ago"
              }
            ]
          }
        ];
        setHotels(fallbackHotels);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHotels();
  }, [destination, hotelCategory]);
  
  const handleSelectHotel = (hotel: ExtendedHotelType) => {
    setSelectedHotel(hotel);
    toast({
      title: 'Hotel Selected',
      description: `You have selected ${hotel.name}`,
    });
  };

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
        <h2 className="text-2xl font-semibold mb-4">Select Your Accommodation</h2>
        <HotelFilter 
          hotelCategory={hotelCategory} 
          onCategoryChange={setHotelCategory} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((hotel) => (
          <HotelCard 
            key={hotel.id} 
            hotel={hotel} 
            onSelect={handleSelectHotel}
            onViewDetails={openDetailsModal}
          />
        ))}
      </div>

      {selectedItem && (
        <DetailsModal
          open={isModalOpen}
          onClose={closeDetailsModal}
          type="hotel"
          name={selectedItem.name}
          description={selectedItem.description}
          location={selectedItem.location}
          rating={selectedItem.rating}
          price={selectedItem.price}
          image={selectedItem.image}
          amenities={selectedItem.amenities}
          reviews={selectedItem.reviews}
          mapUrl={selectedItem.mapUrl}
          externalUrl={selectedItem.externalUrl}
        />
      )}
    </div>
  );
};

export default HotelBookingSection;
