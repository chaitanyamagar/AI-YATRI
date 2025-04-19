
import { UseFormReturn } from 'react-hook-form';
import { TripFormData } from './useTripForm';
import DestinationSection from '../form-sections/DestinationSection';
import DateSection from '../form-sections/DateSection';
import TravelersSection from '../form-sections/TravelersSection';
import TransportSection from '../form-sections/TransportSection';
import AccommodationSection from '../form-sections/AccommodationSection';
import PreferencesSection from '../form-sections/PreferencesSection';
import BudgetSection from '../form-sections/BudgetSection';
import AdditionalOptionsSection from '../form-sections/AdditionalOptionsSection';

interface FormSectionsProps {
  form: UseFormReturn<TripFormData>;
}

const FormSections = ({ form }: FormSectionsProps) => {
  return (
    <>
      <DestinationSection 
        destination={form.watch('destination')} 
        onChange={(e) => form.setValue('destination', e.target.value)}
      />
      <DateSection 
        startDate={form.watch('startDate')} 
        endDate={form.watch('endDate')} 
        onChange={(e) => form.setValue(e.target.name as any, e.target.value)}
      />
      <TravelersSection 
        travelers={form.watch('travelers')} 
        onChange={(e) => form.setValue('travelers', e.target.value)}
      />
      <TransportSection 
        transportMode={form.watch('transportMode') as any} 
        onValueChange={(value) => form.setValue('transportMode', value)}
      />
      <AccommodationSection 
        accommodation={form.watch('accommodation') as any} 
        onValueChange={(value) => form.setValue('accommodation', value)}
      />
      <PreferencesSection 
        preferences={form.watch('preferences')?.join(', ') || ''} 
        onChange={(e) => form.setValue('preferences', e.target.value.split(',').map(item => item.trim()))}
      />
      <BudgetSection 
        budget={[parseInt(form.watch('budget') || '15000')]} 
        onValueChange={(value) => form.setValue('budget', value[0].toString())}
      />
      <AdditionalOptionsSection 
        includeRestaurants={form.watch('includeRestaurants') || false} 
        includeMedicalShops={form.watch('includeMedicalShops') || false} 
        includeMap={form.watch('includeMap') !== false}
        onCheckedChange={(name, checked) => form.setValue(name as any, checked)}
      />
    </>
  );
};

export default FormSections;
