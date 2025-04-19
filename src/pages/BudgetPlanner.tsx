import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { Loader2 } from 'lucide-react';
import AIAssistant from '../components/shared/AIAssistant';
import { toast } from '@/hooks/use-toast';

// Import refactored components
import BudgetForm from '../components/budget-planner/BudgetForm';
import BudgetResult from '../components/budget-planner/BudgetResult';
import BudgetPlannerHeader from '../components/budget-planner/BudgetPlannerHeader';
import { calculateBudgetEstimate, FormDataType, BudgetType } from '../components/budget-planner/utils/budgetCalculations';

const BudgetPlanner = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    destination: '',
    duration: '3',
    travelers: '2',
    accommodation: 'mid-range', // budget, mid-range, luxury
    transportMode: 'public', // public, rental, private, train, flight
    mealPreference: 'mixed', // budget, mixed, fine-dining
    activities: '',
    customBudget: ''
  });

  const [budget, setBudget] = useState<BudgetType | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destination) {
      toast({
        title: "Destination Required",
        description: "Please enter a destination to calculate your budget.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const budgetResult = await calculateBudgetEstimate(formData);
      setBudget(budgetResult);
      
      toast({
        title: "Budget Calculated",
        description: `Your budget estimate for ${formData.destination} is ₹${budgetResult.total.toLocaleString('en-IN')}.`,
      });
    } catch (error) {
      console.error('Error calculating budget:', error);
      
      toast({
        title: "Calculation Error",
        description: "There was an error calculating your budget. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <BudgetPlannerHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BudgetForm 
              formData={formData} 
              loading={loading} 
              handleChange={handleChange} 
              calculateBudget={calculateBudget}
              handleSelectChange={handleSelectChange}
            />
            
            <BudgetResult 
              budget={budget} 
              formData={formData} 
            />
          </div>
        </div>
      </div>
      
      <AIAssistant />
    </div>
  );
};

export default BudgetPlanner;
