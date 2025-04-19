
import { Form } from '@/components/ui/form';
import { TripFormData } from './useTripForm';
import { useTripForm } from './useTripForm';
import WeatherForecast from '../WeatherForecast';
import TripSummaryPreview from '../TripSummaryPreview';
import FormSections from './FormSections';

interface TripFormContainerProps {
  onSubmit: (data: TripFormData) => void;
  loading: boolean;
  initialData?: Partial<TripFormData> | null;
}

const TripFormContainer = ({ onSubmit, loading, initialData }: TripFormContainerProps) => {
  const {
    form,
    showSummary,
    setShowSummary,
    saveToDashboard,
    setSaveToDashboard,
    handleFormSubmit
  } = useTripForm(onSubmit, initialData);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-display font-semibold mb-6 dark:text-white">
        Plan Your Trip
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <FormSections form={form} />
          
          {form.watch('destination') && (
            <div className="mt-6">
              <WeatherForecast destination={form.watch('destination')} />
            </div>
          )}
          
          <div className="flex flex-col space-y-4 mt-4">
            <button 
              type="button" 
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
              onClick={() => setShowSummary(!showSummary)}
            >
              {showSummary ? 'Hide' : 'Show'} Trip Summary Preview
            </button>
            
            {showSummary && (
              <TripSummaryPreview 
                destination={form.watch('destination')} 
                startDate={form.watch('startDate')}
                endDate={form.watch('endDate')}
                travelers={form.watch('travelers')}
                transportMode={form.watch('transportMode')}
                accommodation={form.watch('accommodation')}
                budget={form.watch('budget') || '15000'}
              />
            )}
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="saveToDashboard"
                checked={saveToDashboard}
                onChange={(e) => setSaveToDashboard(e.target.checked)}
                className="rounded border-gray-300 text-yatri-blue focus:ring-yatri-blue"
              />
              <label htmlFor="saveToDashboard" className="text-sm text-gray-700 dark:text-gray-300">
                Save this trip to my dashboard
              </label>
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Itinerary...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                Generate AI Itinerary
              </>
            )}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default TripFormContainer;
