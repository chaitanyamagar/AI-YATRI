
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
        <Compass className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">No trips planned yet</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        Start exploring destinations and add them to your dashboard to plan your next adventure!
      </p>
      <Link to="/destinations">
        <Button>
          Explore Destinations
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
