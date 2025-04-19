
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BookingHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const BookingHeader = ({ searchTerm, setSearchTerm }: BookingHeaderProps) => {
  return (
    <>
      <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-yatri-blue dark:hover:text-yatri-blue-light transition-colors mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 dark:text-white">My Bookings</h1>
        
        <div className="flex w-full md:w-auto space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search bookings..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingHeader;
