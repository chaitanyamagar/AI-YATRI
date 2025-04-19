
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { IndianRupee } from 'lucide-react';

interface BudgetSectionProps {
  budget: number[];
  onValueChange: (value: number[]) => void;
}

const BudgetSection = ({ budget, onValueChange }: BudgetSectionProps) => {
  const [inputValue, setInputValue] = useState(budget[0].toString());

  useEffect(() => {
    setInputValue(budget[0].toString());
  }, [budget]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      if (value) {
        const numericValue = parseInt(value);
        if (numericValue >= 5000 && numericValue <= 500000) {
          onValueChange([numericValue]);
        }
      }
    }
  };

  const handleBlur = () => {
    if (!inputValue || parseInt(inputValue) < 5000) {
      setInputValue('5000');
      onValueChange([5000]);
    } else if (parseInt(inputValue) > 500000) {
      setInputValue('500000');
      onValueChange([500000]);
    }
  };

  // Format number with Indian comma system (e.g., 1,00,000)
  const formatIndianRupees = (amount: number) => {
    return amount.toLocaleString('en-IN');
  };

  // Calculate an appropriate step for the slider based on the budget range
  const getSliderStep = () => {
    if (budget[0] < 50000) return 5000;
    if (budget[0] < 100000) return 10000;
    return 25000;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Budget
      </label>
      <div className="flex items-center mb-4 gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background">
          <IndianRupee className="h-4 w-4 text-gray-500" />
        </div>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-32"
          placeholder="15000"
        />
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {budget[0] >= 5000 && (
            <span>
              ≈ ₹{formatIndianRupees(Math.round(budget[0] / parseInt(budget[0].toString().length > 4 ? '2' : '1')))} per person
              {budget[0] > 20000 && ' for a comfortable trip'}
            </span>
          )}
        </div>
      </div>
      <div className="px-4">
        <Slider
          defaultValue={budget}
          max={500000}
          min={5000}
          step={getSliderStep()}
          value={budget}
          onValueChange={onValueChange}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>₹{formatIndianRupees(5000)}</span>
          <span>₹{formatIndianRupees(250000)}</span>
          <span>₹{formatIndianRupees(500000)}</span>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300">
          <p className="mb-2 font-medium">Budget Tips:</p>
          <ul className="list-disc pl-5 space-y-1">
            {budget[0] < 20000 ? (
              <>
                <li>Consider hostels or budget homestays</li>
                <li>Use public transportation for most travel</li>
                <li>Eat at local street food stalls and casual eateries</li>
              </>
            ) : budget[0] < 50000 ? (
              <>
                <li>Mix of budget and mid-range accommodations</li>
                <li>Combination of public transport and occasional cabs</li>
                <li>Add 1-2 premium dining experiences</li>
              </>
            ) : (
              <>
                <li>Premium hotels or resort stays available</li>
                <li>Private transportation options throughout your trip</li>
                <li>Fine dining experiences at top-rated restaurants</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BudgetSection;
