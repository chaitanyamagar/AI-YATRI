
import { Users } from 'lucide-react';

interface TravelersSectionProps {
  travelers: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TravelersSection = ({ travelers, onChange }: TravelersSectionProps) => {
  return (
    <div>
      <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Number of Travelers
      </label>
      <div className="relative">
        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="number"
          id="travelers"
          name="travelers"
          min="1"
          max="10"
          value={travelers}
          onChange={onChange}
          required
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default TravelersSection;
