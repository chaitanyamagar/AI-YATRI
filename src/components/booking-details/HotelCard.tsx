import React from 'react';
import { Hotel, Star, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HotelType } from './TripFormContext';
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { BOOKING_IMAGES } from "@/config/image-config";

// Define the ExtendedHotelType interface here to match HotelBookingSection
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

interface HotelCardProps {
  hotel: ExtendedHotelType;
  onSelect: (hotel: HotelType) => void;
  onViewDetails: (hotel: ExtendedHotelType) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect, onViewDetails }) => {
  // Determine hotel category based on price
  let category = 'MIDSCALE';
  if (hotel.price > 10000) category = 'LUXURY';
  else if (hotel.price < 5000) category = 'BUDGET';

  // Get the appropriate image based on category
  const hotelImage = hotel.image || BOOKING_IMAGES.HOTELS[category as keyof typeof BOOKING_IMAGES.HOTELS];

  const renderStars = (rating: string) => {
    const stars = [];
    for (let i = 0; i < parseInt(rating); i++) {
      stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }
    return stars;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <ImageWithFallback
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
          fallbackSrc={BOOKING_IMAGES.HOTELS[category as keyof typeof BOOKING_IMAGES.HOTELS]}
        />
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-medium text-gray-800">{hotel.rating}</span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{hotel.name}</CardTitle>
          <div className="flex">
            {renderStars(hotel.rating)}
          </div>
        </div>
        <CardDescription className="flex items-center">
          <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
          {hotel.location || `Rating: ${hotel.rating}-star property`}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold">₹{hotel.price.toLocaleString()}</span>
          <span className="text-sm text-gray-500">per night</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
            >
              {amenity}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="text-xl font-bold">₹{hotel.price.toLocaleString()}</div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(hotel)}
            className="flex items-center"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            View Details
          </Button>
          <Button 
            onClick={() => onSelect(hotel)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Select
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
