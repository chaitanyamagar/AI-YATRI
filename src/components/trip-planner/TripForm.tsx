import { TripFormData } from './form/useTripForm';
import TripFormContainer from './form/TripFormContainer';

interface TripFormProps {
  onSubmit: (data: TripFormData) => void;
  loading: boolean;
  initialData?: Partial<TripFormData> | null;
}

const TripForm = (props: TripFormProps) => {
  return <TripFormContainer {...props} />;
};

export default TripForm;

// Export the TripFormData type for other components
export type { TripFormData } from './form/useTripForm';
