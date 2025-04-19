
import { Trip } from '@/hooks/useTripPlans';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UpcomingTripsTableProps {
  trips: Trip[];
  onViewDetails: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
}

const UpcomingTripsTable = ({ trips, onViewDetails, onBookNow }: UpcomingTripsTableProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Upcoming Trips</CardTitle>
        <CardDescription>Your scheduled journeys for the next few months</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell className="font-medium">{trip.destination}</TableCell>
                <TableCell>{trip.startDate} - {trip.endDate}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Planned
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onViewDetails(trip)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => onBookNow(trip)}
                    >
                      Book Now
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UpcomingTripsTable;
