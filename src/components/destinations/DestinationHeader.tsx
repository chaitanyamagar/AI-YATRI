
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DestinationHeaderProps {
  destination: {
    name: string;
    image: string;
    bestTime: string;
    rating: number;
  };
}

const DestinationHeader = ({ destination }: DestinationHeaderProps) => {
  return (
    <>
      <Link to="/destinations">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Destinations
        </Button>
      </Link>
      
      <div className="relative rounded-xl overflow-hidden h-[400px] mb-6">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-medium text-gray-800">{destination.rating}</span>
        </div>
      </div>
    </>
  );
};

export default DestinationHeader;
