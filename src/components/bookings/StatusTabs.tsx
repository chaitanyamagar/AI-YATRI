
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StatusTabsProps {
  onValueChange: (value: string) => void;
}

const StatusTabs = ({ onValueChange }: StatusTabsProps) => {
  return (
    <TabsList className="grid grid-cols-4 w-full md:w-96 mb-6">
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
      <TabsTrigger value="completed">Completed</TabsTrigger>
      <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
    </TabsList>
  );
};

export default StatusTabs;
