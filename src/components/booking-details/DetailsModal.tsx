
import React from 'react';
import { X, MapPin, Star, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  type: 'hotel' | 'transport' | 'food';
  name: string;
  description?: string;
  location?: string;
  rating?: string;
  price: number;
  image?: string;
  amenities?: string[];
  reviews?: Review[];
  mapUrl?: string;
  externalUrl?: string;
}

const DetailsModal = ({
  open,
  onClose,
  type,
  name,
  description,
  location,
  rating,
  price,
  image,
  amenities,
  reviews,
  mapUrl,
  externalUrl,
}: DetailsModalProps) => {
  const renderStars = (rating: string) => {
    const stars = [];
    for (let i = 0; i < parseInt(rating); i++) {
      stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }
    return stars;
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>{name}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          {location && (
            <DialogDescription className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
              {location}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-video relative bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-4">
              {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No image available
                </div>
              )}
            </div>

            {rating && (
              <div className="flex items-center mb-4">
                <span className="mr-2">Rating:</span>
                <div className="flex">
                  {renderStars(rating)}
                </div>
                <span className="ml-2 text-gray-600">({rating}/5)</span>
              </div>
            )}

            {amenities && amenities.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 bg-gray-100 dark:bg-gray-800">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <h3 className="font-medium mb-2">Price</h3>
              <div className="text-xl font-bold">₹{price.toLocaleString()}</div>
              {type === 'hotel' && <div className="text-sm text-gray-500">per night</div>}
            </div>

            {description && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300">{description}</p>
              </div>
            )}
          </div>

          <div>
            {mapUrl && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Location</h3>
                <div className="aspect-video relative bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${name}`}
                  ></iframe>
                </div>
              </div>
            )}

            {reviews && reviews.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Reviews</h3>
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium">{review.author}</div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm">{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                      <div className="text-xs text-gray-500 mt-1">{review.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-4" />

        <DialogFooter className="flex justify-between items-center">
          {externalUrl && (
            <a 
              href={externalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          )}
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
