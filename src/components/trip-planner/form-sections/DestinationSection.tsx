
import { MapPin } from 'lucide-react';

interface DestinationSectionProps {
  destination: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DestinationSection = ({ destination, onChange }: DestinationSectionProps) => {
  return (
    <div>
      <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Where would you like to go?
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          id="destination"
          name="destination"
          placeholder="e.g., Mumbai, Pune, Nashik"
          value={destination}
          onChange={onChange}
          required
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default DestinationSection;
