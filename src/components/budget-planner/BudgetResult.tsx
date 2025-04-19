
import { PieChart, DollarSign, MapPin, Hotel, Utensils, Bus, Map } from 'lucide-react';
import BudgetItem from './BudgetItem';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";

interface BudgetResultProps {
  budget: {
    total: number;
    breakdown: {
      accommodation: number;
      transportation: number;
      food: number;
      activities: number;
      miscellaneous: number;
    };
    suggestions: string[];
    isCustomBudget: boolean;
  } | null;
  formData: {
    travelers: string;
    duration: string;
    destination: string;
    accommodation: string;
    transportMode: string;
    mealPreference: string;
  };
}

const BudgetResult = ({ budget, formData }: BudgetResultProps) => {
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN');
  };

  // Helper function to get accommodation recommendations
  const getAccommodationRecommendations = () => {
    const destination = formData.destination;
    const type = formData.accommodation;
    
    if (type === 'budget') {
      return [
        `Backpacker Hostels in ${destination} (₹500-₹1,200 per night)`,
        `Budget Guesthouses near ${destination} center (₹1,000-₹2,000 per night)`,
        `OYO Rooms in ${destination} (starting at ₹1,200 per night)`
      ];
    } else if (type === 'mid-range') {
      return [
        `3-Star Hotels in ${destination} (₹2,500-₹4,500 per night)`,
        `Business Hotels with breakfast in ${destination} (₹3,000-₹5,000 per night)`,
        `Serviced Apartments in ${destination} (₹3,500+ per night)`
      ];
    } else {
      return [
        `4-Star Premium Hotels in ${destination} (₹6,000-₹10,000 per night)`,
        `Luxury Resorts near ${destination} (₹8,000-₹15,000 per night)`,
        `5-Star Heritage Properties in ${destination} (₹12,000+ per night)`
      ];
    }
  };

  // Helper function to get transportation recommendations
  const getTransportationRecommendations = () => {
    const mode = formData.transportMode;
    const destination = formData.destination;
    
    if (mode === 'public') {
      return [
        `Local buses in ${destination} (₹10-₹50 per journey)`,
        `Metro/Local Trains (if available in ${destination}) (₹10-₹60 per journey)`,
        `Shared Auto-rickshaws (₹15-₹50 per journey)`
      ];
    } else if (mode === 'rental') {
      return [
        `Two-wheeler rental in ${destination} (₹500-₹800 per day)`,
        `Car rentals starting at ₹1,500 per day (without fuel)`,
        `Self-drive cars with unlimited kilometers (₹2,000-₹4,000 per day)`
      ];
    } else if (mode === 'train') {
      return [
        `Regular train tickets to ${destination} (₹250-₹1,000)`,
        `AC Chair Car/3-tier tickets (₹600-₹2,000)`,
        `Premium trains like Shatabdi/Rajdhani (₹1,000-₹2,500)`
      ];
    } else if (mode === 'flight') {
      return [
        `Economy flights to ${destination} (₹3,500-₹7,000)`,
        `Premium Economy options (₹6,000-₹10,000)`,
        `Business Class flights (₹12,000-₹25,000)`
      ];
    } else {
      return [
        `Private cabs for ${destination} sightseeing (₹2,000-₹3,500 per day)`,
        `Airport/Railway Station transfers (₹500-₹1,500)`,
        `Weekly car rental with driver (₹15,000-₹25,000)`
      ];
    }
  };

  // Helper function to get food recommendations
  const getFoodRecommendations = () => {
    const type = formData.mealPreference;
    const destination = formData.destination;
    
    if (type === 'budget') {
      return [
        `Street food at ${destination} markets (₹50-₹150 per meal)`,
        `Local thali meals (₹100-₹200)`,
        `Quick service restaurants (₹150-₹300 per person)`
      ];
    } else if (type === 'mixed') {
      return [
        `Casual dining restaurants in ${destination} (₹300-₹600 per person)`,
        `Food courts in malls (₹200-₹400 per meal)`,
        `Themed cafes and coffee shops (₹200-₹500 per visit)`
      ];
    } else {
      return [
        `Fine dining restaurants in ${destination} (₹1,000-₹2,500 per person)`,
        `Specialty cuisine restaurants (₹800-₹2,000 per meal)`,
        `5-star hotel dining experiences (₹1,500-₹4,000 per person)`
      ];
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm">
      <h2 className="text-xl font-display font-semibold mb-6 dark:text-white">
        Your AI Budget Estimate
      </h2>
      
      {budget ? (
        <div className="space-y-6">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="w-4 h-4 text-yatri-orange mr-2" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formData.destination || 'Your Destination'}
              </h3>
            </div>
            <div className="text-4xl font-display font-bold text-yatri-blue dark:text-yatri-blue-light">
              ₹{formatCurrency(budget.total)}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              For {formData.travelers} {parseInt(formData.travelers) === 1 ? 'person' : 'people'} over {formData.duration} {parseInt(formData.duration) === 1 ? 'day' : 'days'}
            </p>
            
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-block bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300 rounded-full px-3 py-1 text-xs">
                {budget.isCustomBudget ? "Custom Budget Plan" : "AI Recommended Budget"}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-white flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-yatri-orange" />
              Budget Breakdown
            </h3>
            
            <div className="space-y-4">
              <BudgetItem 
                label="Accommodation" 
                amount={budget.breakdown.accommodation} 
                percentage={Math.round((budget.breakdown.accommodation / budget.total) * 100)} 
              />
              <BudgetItem 
                label="Transportation" 
                amount={budget.breakdown.transportation} 
                percentage={Math.round((budget.breakdown.transportation / budget.total) * 100)} 
              />
              <BudgetItem 
                label="Food & Dining" 
                amount={budget.breakdown.food} 
                percentage={Math.round((budget.breakdown.food / budget.total) * 100)} 
              />
              <BudgetItem 
                label="Activities & Sightseeing" 
                amount={budget.breakdown.activities} 
                percentage={Math.round((budget.breakdown.activities / budget.total) * 100)} 
              />
              <BudgetItem 
                label="Miscellaneous" 
                amount={budget.breakdown.miscellaneous} 
                percentage={Math.round((budget.breakdown.miscellaneous / budget.total) * 100)} 
              />
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-3 dark:text-white flex items-center">
              <Hotel className="w-5 h-5 mr-2 text-yatri-blue" />
              Accommodation Options
            </h3>
            <ul className="space-y-2 mb-4">
              {getAccommodationRecommendations().map((recommendation, index) => (
                <li key={`accommodation-${index}`} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                  <span className="text-yatri-blue mr-2">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-medium mb-3 dark:text-white flex items-center">
              <Bus className="w-5 h-5 mr-2 text-yatri-orange" />
              Transportation Options
            </h3>
            <ul className="space-y-2 mb-4">
              {getTransportationRecommendations().map((recommendation, index) => (
                <li key={`transport-${index}`} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                  <span className="text-yatri-orange mr-2">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-medium mb-3 dark:text-white flex items-center">
              <Utensils className="w-5 h-5 mr-2 text-green-600" />
              Dining Options
            </h3>
            <ul className="space-y-2 mb-4">
              {getFoodRecommendations().map((recommendation, index) => (
                <li key={`food-${index}`} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                  <span className="text-green-600 mr-2">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-3 dark:text-white">
              Money-Saving Tips
            </h3>
            <ul className="space-y-2 mb-4">
              {budget.suggestions.map((tip, index) => (
                <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                  <span className="text-yatri-orange mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" className="flex-1" onClick={() => window.print()}>
              Print Budget Report
            </Button>
            <Button variant="outline" className="flex-1 flex items-center justify-center">
              <Map className="w-4 h-4 mr-2" />
              View on Map
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto flex items-center justify-center mb-4">
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">No Budget Calculated Yet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Fill out the form to get a detailed budget estimate for your trip.
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetResult;
