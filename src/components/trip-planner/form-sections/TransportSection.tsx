
import { Car, Bus, Train, Plane } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TransportSectionProps {
  transportMode: 'car' | 'bus' | 'train' | 'flight';
  onValueChange: (value: string) => void;
}

const TransportSection = ({ transportMode, onValueChange }: TransportSectionProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Transportation Mode
      </label>
      <RadioGroup defaultValue={transportMode} onValueChange={onValueChange} className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="car" id="car" />
          <Label htmlFor="car" className="flex items-center cursor-pointer">
            <Car className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span>Car</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="bus" id="bus" />
          <Label htmlFor="bus" className="flex items-center cursor-pointer">
            <Bus className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span>Bus</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="train" id="train" />
          <Label htmlFor="train" className="flex items-center cursor-pointer">
            <Train className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span>Train</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 rounded-lg border p-3 border-gray-200 dark:border-gray-700">
          <RadioGroupItem value="flight" id="flight" />
          <Label htmlFor="flight" className="flex items-center cursor-pointer">
            <Plane className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span>Flight</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default TransportSection;
