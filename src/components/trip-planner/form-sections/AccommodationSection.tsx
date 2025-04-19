import { Home, Building, Building2, Hotel, BedDouble, Castle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AccommodationSectionProps {
  accommodation: 'hotel' | 'oyo' | 'luxury' | 'guesthouse' | 'hostel' | 'airbnb';
  onValueChange: (value: string) => void;
}

const AccommodationSection = ({ accommodation, onValueChange }: AccommodationSectionProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Accommodation Preference
      </label>
      <RadioGroup defaultValue={accommodation} onValueChange={onValueChange} className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="hotel" id="hotel" />
          <Label htmlFor="hotel" className="flex items-center cursor-pointer">
            <Hotel className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span>Hotel</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="oyo" id="oyo" />
          <Label htmlFor="oyo" className="flex items-center cursor-pointer">
            <Building className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span>OYO Rooms</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="luxury" id="luxury" />
          <Label htmlFor="luxury" className="flex items-center cursor-pointer">
            <Castle className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span>Luxury</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="guesthouse" id="guesthouse" />
          <Label htmlFor="guesthouse" className="flex items-center cursor-pointer">
            <Home className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span>Guesthouse</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="hostel" id="hostel" />
          <Label htmlFor="hostel" className="flex items-center cursor-pointer">
            <BedDouble className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span>Hostel</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="airbnb" id="airbnb" />
          <Label htmlFor="airbnb" className="flex items-center cursor-pointer">
            <Building2 className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span>Airbnb</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default AccommodationSection;
