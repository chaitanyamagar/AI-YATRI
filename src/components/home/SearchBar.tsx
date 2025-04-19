
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchState, setSearchState] = useState({
    destination: '',
    dates: '',
    travelers: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState({
      ...searchState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', searchState);
    
    if (!searchState.destination) {
      toast({
        title: "Destination required",
        description: "Please enter a destination to search.",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to trip planner with search parameters
    navigate(`/trip-planner?destination=${encodeURIComponent(searchState.destination)}&dates=${encodeURIComponent(searchState.dates)}&travelers=${encodeURIComponent(searchState.travelers)}`);
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-white mb-4">
        Find your perfect getaway
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="destination"
            placeholder="Where to? (e.g., Mumbai, Pune, Nashik)"
            value={searchState.destination}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
          />
        </div>
        
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="dates"
            placeholder="When? (e.g., 10 Oct - 15 Oct)"
            value={searchState.dates}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
          />
        </div>
        
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="travelers"
            placeholder="How many travelers?"
            value={searchState.travelers}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
          />
        </div>
        
        <button
          type="submit"
          className="w-full btn-primary bg-gradient-to-r from-yatri-blue to-yatri-blue-dark dark:from-yatri-blue-light dark:to-yatri-blue flex items-center justify-center"
        >
          <Search className="w-5 h-5 mr-2" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
