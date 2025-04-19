
import { Trip } from '@/hooks/useTripPlans';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface TripDetailsSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedTrip: Trip | null;
  onBookNow: (trip: Trip) => void;
}

const TripDetailsSheet = ({ isOpen, setIsOpen, selectedTrip, onBookNow }: TripDetailsSheetProps) => {
  if (!selectedTrip) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">Trip to {selectedTrip.destination}</SheetTitle>
          <SheetDescription>
            {selectedTrip.startDate} to {selectedTrip.endDate}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Trip Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Travelers</p>
                <p>{selectedTrip.travelers}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Transportation</p>
                <p className="capitalize">{selectedTrip.transportMode}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Accommodation</p>
                <p className="capitalize">{selectedTrip.accommodation}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Preferences</p>
                <p>{selectedTrip.preferences.join(', ')}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Itinerary</h3>
            <div className="prose dark:prose-invert max-w-none text-sm">
              <div dangerouslySetInnerHTML={{ __html: selectedTrip.itineraryHtml || 'No itinerary available' }} />
            </div>
          </div>
          
          <div className="pt-4 flex gap-4">
            <Button className="flex-1" variant="default" onClick={() => onBookNow(selectedTrip)}>
              Book Now
            </Button>
            <Button className="flex-1" variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TripDetailsSheet;
