import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { MapPin, Calendar, Star, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AIAssistant from '../components/shared/AIAssistant';
import { destinationsData } from '../data/destinations';
import { toast } from '@/hooks/use-toast';

const Destinations = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    document.title = 'Destinations - AI Yatri';
  }, []);

  const handleImageError = (id: number, name: string) => {
    console.error(`loading image for ${name}: ${destinationsData.find(d => d.id === id)?.image}`);
    setImageErrors(prev => ({ ...prev, [id]: true }));
    toast({
      title: "Loading Error",
      description: `loading image for ${name}. Please check if the image exists in the public/images directory.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium text-yatri-blue bg-yatri-blue/10 rounded-full mb-3">
              Explore Maharashtra
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 dark:text-white">
              Destinations
            </h1>
            <p className="text-gray-600 text-lg dark:text-gray-300">
              Discover the most beautiful and culturally rich destinations that Maharashtra has to offer for your next unforgettable journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationsData.map((destination) => (
              <div key={destination.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm card-hover">
                <div className="relative h-56">
                  {imageErrors[destination.id] ? (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Image not available</p>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(destination.id, destination.name)}
                    />
                  )}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-gray-800">{destination.rating}</span>
                  </div>
                </div>
                
                <div className="p-5 dark:text-white">
                  <h3 className="text-xl font-display font-semibold text-gray-800 dark:text-white mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {destination.description}
                  </p>
                  
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="font-medium">Best time to visit:</span>
                    <span className="ml-1">{destination.bestTime}</span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Top Attractions:</h4>
                  <ul className="space-y-1 mb-4">
                    {destination.attractions.map((attraction, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <MapPin className="w-4 h-4 text-yatri-orange mr-1 flex-shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">{attraction}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to={`/destination/${destination.id}`}>
                    <Button className="w-full">
                      Explore {destination.name}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <AIAssistant />
    </div>
  );
};

export default Destinations;
