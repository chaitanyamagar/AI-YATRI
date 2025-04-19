
import { useNavigate } from 'react-router-dom';
import { CheckSquare, CalendarPlus, ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PlanButtonsProps {
  planType: 'short' | 'detailed';
  destinationName: string;
  onAddToTrip: () => void;
  onAddToDashboard: (planType: 'short' | 'detailed') => void;
  onBookNow: (planType: 'short' | 'detailed') => void;
}

const PlanButtons = ({
  planType,
  destinationName,
  onAddToTrip,
  onAddToDashboard,
  onBookNow
}: PlanButtonsProps) => {
  const navigate = useNavigate();
  
  const handleBookDirectly = () => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book this trip.",
        variant: "destructive",
      });
      navigate('/sign-in');
      return;
    }
    
    // Calculate a price based on plan type
    const estimatedPrice = planType === 'short' ? 4999 : 14999;
    
    // Forward to the booking details page directly with price
    navigate('/booking-details', {
      state: { 
        destination: destinationName,
        price: estimatedPrice
      }
    });
    
    // Show a console log for developers
    console.log(`Booking ${destinationName} trip with estimated price: ₹${estimatedPrice}`);
  };
  
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={onAddToTrip}
        className="w-full text-left flex items-center gap-2 px-4 py-3 bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors rounded-lg"
      >
        <CalendarPlus className="w-5 h-5" />
        <span className="flex-1">Add to Trip Planner</span>
      </button>
      
      <button
        onClick={() => onAddToDashboard(planType)}
        className="w-full text-left flex items-center gap-2 px-4 py-3 bg-white border border-slate-300 hover:border-primary hover:text-primary transition-colors rounded-lg"
      >
        <CheckSquare className="w-5 h-5" />
        <span className="flex-1">Save to Dashboard</span>
      </button>
      
      <button
        onClick={handleBookDirectly}
        className="w-full text-left flex items-center gap-2 px-4 py-3 bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors rounded-lg"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="flex-1">Book Now</span>
      </button>
    </div>
  );
};

export default PlanButtons;
