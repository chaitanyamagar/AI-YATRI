
import React from 'react';
import { Plane, Hotel, Car, Train, Ship, MapPin } from 'lucide-react';
import { BookingStatus } from '../hooks/useBookings';

// Format date
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get status color
export const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case 'upcoming':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'completed':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  }
};

// Get type icon
export const getTypeIcon = (type: 'flight' | 'hotel' | 'car' | 'train' | 'cruise' | 'package') => {
  switch (type) {
    case 'flight':
      return <Plane className="w-4 h-4" />;
    case 'hotel':
      return <Hotel className="w-4 h-4" />;
    case 'car':
      return <Car className="w-4 h-4" />;
    case 'train':
      return <Train className="w-4 h-4" />;
    case 'cruise':
      return <Ship className="w-4 h-4" />;
    case 'package':
      return <MapPin className="w-4 h-4" />;
  }
};
