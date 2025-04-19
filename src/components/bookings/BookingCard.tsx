
import { Calendar, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface BookingCardProps {
  booking: any;
  formatDate: (dateString: string) => string;
  getStatusColor: (status: 'upcoming' | 'completed' | 'cancelled') => string;
  getTypeIcon: (type: 'flight' | 'hotel' | 'car' | 'train' | 'cruise' | 'package') => JSX.Element;
}

const BookingCard = ({ booking, formatDate, getStatusColor, getTypeIcon }: BookingCardProps) => {
  return (
    <Card key={booking.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 h-48 md:h-auto bg-gray-200 dark:bg-gray-700">
            <img 
              src={booking.image} 
              alt={booking.destination} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1 dark:text-white">{booking.destination}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {booking.travelers} {booking.travelers === 1 ? 'traveler' : 'travelers'}
                  </span>
                </div>
              </div>
              <Badge className={`${getStatusColor(booking.status)} mt-2 md:mt-0`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Booking Type</span>
                <div className="flex items-center text-sm font-medium">
                  {getTypeIcon(booking.type)}
                  <span className="ml-1 capitalize">{booking.type}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Confirmation Code</span>
                <span className="text-sm font-medium font-mono">{booking.details.confirmationCode}</span>
              </div>
              
              {booking.details.provider && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Provider</span>
                  <span className="text-sm font-medium">{booking.details.provider}</span>
                </div>
              )}
              
              {booking.details.location && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Location</span>
                  <span className="text-sm font-medium">{booking.details.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 border-t bg-gray-50 dark:bg-gray-800/50">
        <div className="text-lg font-semibold dark:text-white">
          ${booking.price.toLocaleString()}
        </div>
        <div className="space-x-2">
          {booking.status === 'upcoming' && (
            <Button variant="outline" size="sm">Reschedule</Button>
          )}
          <Button variant={booking.status === 'upcoming' ? 'default' : 'outline'} size="sm">
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
