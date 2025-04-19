
import { Tabs, TabsContent } from '@/components/ui/tabs';
import BookingCard from './BookingCard';

interface BookingListProps {
  filteredBookings: any[];
  formatDate: (dateString: string) => string;
  getStatusColor: (status: 'upcoming' | 'completed' | 'cancelled') => string;
  getTypeIcon: (type: 'flight' | 'hotel' | 'car' | 'train' | 'cruise' | 'package') => JSX.Element;
}

const BookingList = ({ filteredBookings, formatDate, getStatusColor, getTypeIcon }: BookingListProps) => {
  return (
    <div className="space-y-4">
      <TabsContent value="all" className="mt-0">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">No bookings found. Try a different search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard 
                key={booking.id}
                booking={booking}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
                getTypeIcon={getTypeIcon}
              />
            ))}
          </div>
        )}
      </TabsContent>
      <TabsContent value="upcoming" className="mt-0">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">No upcoming bookings found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard 
                key={booking.id}
                booking={booking}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
                getTypeIcon={getTypeIcon}
              />
            ))}
          </div>
        )}
      </TabsContent>
      <TabsContent value="completed" className="mt-0">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">No completed bookings found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard 
                key={booking.id}
                booking={booking}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
                getTypeIcon={getTypeIcon}
              />
            ))}
          </div>
        )}
      </TabsContent>
      <TabsContent value="cancelled" className="mt-0">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">No cancelled bookings found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard 
                key={booking.id}
                booking={booking}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
                getTypeIcon={getTypeIcon}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </div>
  );
};

export default BookingList;
