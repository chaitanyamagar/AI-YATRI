import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTripPlans } from '../../../hooks/useTripPlans';
import { toast } from '@/hooks/use-toast';

// Schema for form validation
export const formSchema = z.object({
  destination: z.string().min(1, { message: 'Please select a destination' }),
  startDate: z.string().min(1, { message: 'Please select a start date' }),
  endDate: z.string().min(1, { message: 'Please select an end date' }),
  travelers: z.string().min(1, { message: 'Please select number of travelers' }),
  transportMode: z.string().min(1, { message: 'Please select a transport mode' }),
  accommodation: z.string().min(1, { message: 'Please select accommodation type' }),
  budget: z.string().optional(),
  preferences: z.array(z.string()).optional(),
  includeRestaurants: z.boolean().optional(),
  includeMedicalShops: z.boolean().optional(),
  includeMap: z.boolean().optional(),
});

// Export the TypeScript type for the form data
export type TripFormData = z.infer<typeof formSchema>;

// Helper functions for default dates
export function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

export function getEndDateString() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0];
}

export const useTripForm = (
  onSubmit: (data: TripFormData) => void, 
  initialData?: Partial<TripFormData> | null
) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addTrip } = useTripPlans();
  const [saveToDashboard, setSaveToDashboard] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Create form with validation
  const form = useForm<TripFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: '',
      startDate: getTodayString(),
      endDate: getEndDateString(),
      travelers: '2',
      transportMode: 'train',
      accommodation: 'hotel',
      budget: '15000',
      preferences: [],
      includeRestaurants: true,
      includeMedicalShops: false,
      includeMap: true,
    },
  });

  // Apply initial data from props if available
  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        if (value !== undefined) {
          form.setValue(key as any, value);
        }
      });
    }
  }, [initialData, form]);

  // Check if we have a preselected destination from navigation
  useEffect(() => {
    const state = location.state as { preselectedDestination?: string } | null;
    if (state?.preselectedDestination) {
      form.setValue('destination', state.preselectedDestination);
    }
  }, [location.state, form]);

  // Handler for form submission
  const handleFormSubmit = async (data: TripFormData) => {
    // Call the parent onSubmit to generate the itinerary
    onSubmit(data);
    
    // If the user wants to save to dashboard, do that too
    if (saveToDashboard) {
      try {
        // Make sure all required fields are provided
        const tripData = {
          destination: data.destination,
          startDate: data.startDate,
          endDate: data.endDate,
          travelers: data.travelers,
          transportMode: data.transportMode,
          accommodation: data.accommodation,
          preferences: data.preferences || [],
          itineraryHtml: `<p>Planning your trip to ${data.destination}...</p>`
        };
        
        addTrip(tripData);
        
        toast({
          title: "Trip added to dashboard",
          description: "Your trip has been saved to your dashboard.",
        });
      } catch (error) {
        console.error("Error saving trip to dashboard:", error);
        toast({
          title: "Error saving trip",
          description: "There was an error saving your trip to the dashboard.",
          variant: "destructive"
        });
      }
    }
  };

  return {
    form,
    showSummary,
    setShowSummary,
    saveToDashboard,
    setSaveToDashboard,
    handleFormSubmit
  };
};
