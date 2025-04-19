import React, { useEffect, useState } from 'react';
import { Map as MapIcon, MapPin, Navigation } from 'lucide-react';
import { API_CONFIG } from '@/config/api-config';

interface MapViewProps {
  destination: string;
  origin?: string;
  attractions?: string[];
}

const MapView = ({ destination, origin, attractions = [] }: MapViewProps) => {
  const [mapUrl, setMapUrl] = useState<string>('');
  
  useEffect(() => {
    // Generate Google Maps embed URL with markers for attractions
    if (destination) {
      let baseUrl;
      
      if (origin) {
        // If origin is provided, show directions
        baseUrl = `https://www.google.com/maps/embed/v1/directions?key=${API_CONFIG.API_KEYS.MAPS}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving`;
      } else {
        // Otherwise just show the destination
        baseUrl = `https://www.google.com/maps/embed/v1/search?key=${API_CONFIG.API_KEYS.MAPS}&q=${encodeURIComponent(destination)}`;
        
        // Add attractions as additional markers if available
        if (attractions.length > 0) {
          const attractionsString = attractions
            .slice(0, 3) // Limit to 3 attractions to keep URL manageable
            .map(attraction => `${encodeURIComponent(attraction + ', ' + destination)}`)
            .join('|');
            
          if (attractionsString) {
            baseUrl = `https://www.google.com/maps/embed/v1/search?key=${API_CONFIG.API_KEYS.MAPS}&q=${encodeURIComponent(destination)}&markers=${attractionsString}`;
          }
        }
      }
      
      setMapUrl(baseUrl);
    }
  }, [destination, origin, attractions]);

  if (!mapUrl) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center text-gray-500">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p>Map loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-2 flex items-center justify-between border-b">
        <div className="flex items-center">
          <MapIcon className="w-4 h-4 text-primary mr-2" />
          <h3 className="text-sm font-medium">
            {origin 
              ? `Route: ${origin} to ${destination}` 
              : `Map View: ${destination}`
            }
          </h3>
        </div>
        <a 
          href={`https://www.google.com/maps/dir/${origin ? encodeURIComponent(origin) + '/' : ''}${encodeURIComponent(destination)}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-primary flex items-center hover:underline"
        >
          Open in Google Maps
          <Navigation className="w-3 h-3 ml-1" />
        </a>
      </div>
      <div className="aspect-video">
        <iframe
          title={origin ? `Route from ${origin} to ${destination}` : `Map of ${destination}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          src={mapUrl}
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="p-2 text-xs text-gray-500 bg-gray-50 border-t">
        Interactive map - click and scroll to explore
      </div>
    </div>
  );
};

export default MapView;
