import { useState } from 'react';
import { Loader2, Calculator, CalendarDays, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface BudgetFormProps {
  formData: {
    destination: string;
    duration: string;
    travelers: string;
    accommodation: string;
    transportMode: string;
    mealPreference: string;
    activities: string;
    customBudget: string;
  };
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  calculateBudget: (e: React.FormEvent) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const BudgetForm = ({ 
  formData, 
  loading, 
  handleChange, 
  calculateBudget,
  handleSelectChange 
}: BudgetFormProps) => {
  const [showActivities, setShowActivities] = useState(true);
  
  const maharashtraDestinations = [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", 
    "Lonavala", "Mahabaleshwar", "Kolhapur", "Alibaug", 
    "Matheran", "Panchgani", "Khandala", "Lavasa", "Shirdi",
    "Elephanta Caves", "Tadoba National Park", "Ajanta & Ellora Caves"
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm">
      <h2 className="text-xl font-display font-semibold mb-6 dark:text-white">
        Enter Your Trip Details
      </h2>
      
      <form onSubmit={calculateBudget} className="space-y-5">
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Destination in Maharashtra
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              id="destination"
              name="destination"
              list="maharashtra-destinations"
              placeholder="e.g., Mumbai, Pune, Lonavala"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
            />
            <datalist id="maharashtra-destinations">
              {maharashtraDestinations.map((dest, idx) => (
                <option key={idx} value={dest} />
              ))}
            </datalist>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Trip Duration (Days)
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                id="duration"
                name="duration"
                min="1"
                max="30"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
              />
            </div>
          </div>
          
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
                value={formData.travelers}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Accommodation Type
            </label>
            <Select 
              value={formData.accommodation} 
              onValueChange={(value) => handleSelectChange('accommodation', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select accommodation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget (Hostels, Guesthouses)</SelectItem>
                <SelectItem value="mid-range">Mid-range (3-star Hotels)</SelectItem>
                <SelectItem value="luxury">Luxury (4-5 star Hotels)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="transportMode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Transportation Mode
            </label>
            <Select 
              value={formData.transportMode} 
              onValueChange={(value) => handleSelectChange('transportMode', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select transport mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public Transport</SelectItem>
                <SelectItem value="rental">Rental Vehicle</SelectItem>
                <SelectItem value="private">Private Transport/Taxi</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="flight">Flight</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label htmlFor="mealPreference" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Meal Preference
          </label>
          <Select 
            value={formData.mealPreference} 
            onValueChange={(value) => handleSelectChange('mealPreference', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select meal preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Street Food & Local Eateries</SelectItem>
              <SelectItem value="mixed">Mix of Street Food & Restaurants</SelectItem>
              <SelectItem value="fine-dining">Premium & Fine Dining</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="customBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Budget (Optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
            <input
              type="text"
              id="customBudget"
              name="customBudget"
              placeholder="Enter your budget (e.g., 25000)"
              value={formData.customBudget}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Leave empty to calculate a recommended budget based on your preferences
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="activities" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Planned Activities
            </label>
            <button 
              type="button" 
              onClick={() => setShowActivities(!showActivities)}
              className="text-xs text-yatri-blue hover:underline"
            >
              {showActivities ? 'Hide' : 'Show'} Activities
            </button>
          </div>
          
          {showActivities && (
            <>
              <textarea
                id="activities"
                name="activities"
                rows={3}
                placeholder="List major activities you're interested in (e.g., sightseeing, adventure sports, shopping)"
                value={formData.activities}
                onChange={handleChange}
                className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
              />
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Activities in Maharashtra:</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Beach Activities", "Trekking", "Waterfall Visits", 
                    "Historical Forts", "Cave Explorations", "Temple Tours",
                    "Wildlife Safari", "Boating", "Paragliding", "Shopping",
                    "Vineyard Tours", "Cultural Shows"
                  ].map((activity, idx) => (
                    <Button 
                      key={idx}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentActivities = formData.activities ? formData.activities.split(',').map(a => a.trim()) : [];
                        if (!currentActivities.includes(activity)) {
                          const newActivities = [...currentActivities, activity].join(', ');
                          const event = {
                            target: {
                              name: 'activities',
                              value: newActivities
                            }
                          } as React.ChangeEvent<HTMLTextAreaElement>;
                          handleChange(event);
                        }
                      }}
                      className="text-xs"
                    >
                      +{activity}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching Real-Time Prices...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Budget
            </>
          )}
        </Button>
        
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Calculations based on real-time data from travel APIs
        </p>
      </form>
    </div>
  );
};

export default BudgetForm;
