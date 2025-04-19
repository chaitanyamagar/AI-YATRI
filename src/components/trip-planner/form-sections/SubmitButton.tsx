
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  loading: boolean;
  text?: string;
  loadingText?: string;
  icon?: React.ReactNode;
}

const SubmitButton = ({ 
  loading, 
  text = "Generate AI Itinerary", 
  loadingText = "Generating Itinerary...", 
  icon = <Send className="mr-2 h-4 w-4" />
}: SubmitButtonProps) => {
  return (
    <Button type="submit" disabled={loading} className="w-full">
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
