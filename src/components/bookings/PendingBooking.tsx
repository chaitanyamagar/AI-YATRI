
import { Calendar, MapPin, Users, Check, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PendingBookingProps {
  pendingBooking: any;
  confirmBooking: () => void;
  cancelPendingBooking: () => void;
  formatDate: (dateString: string) => string;
}

const PendingBooking = ({ pendingBooking, confirmBooking, cancelPendingBooking, formatDate }: PendingBookingProps) => {
  if (!pendingBooking) return null;
  
  return (
    <Card className="mb-6 border-2 border-dashed border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Confirm Your Booking</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-4">
              Review the details below to complete your booking.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">{pendingBooking.destination}</p>
                  <p className="text-sm text-gray-500">{pendingBooking.details?.duration}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {pendingBooking.startDate && formatDate(pendingBooking.startDate)} - 
                    {pendingBooking.endDate && formatDate(pendingBooking.endDate)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">{pendingBooking.travelers} travelers</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-lg font-semibold">
                  Total: ${pendingBooking.price?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-0 flex flex-col space-y-2">
            <Button onClick={confirmBooking} className="sm:w-40">
              <Check className="mr-2 h-4 w-4" />
              Confirm Booking
            </Button>
            <Button variant="outline" onClick={cancelPendingBooking} className="sm:w-40">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingBooking;
