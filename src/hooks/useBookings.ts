
import { useState, useEffect, useCallback } from 'react';

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface BookingDetails {
  confirmationCode?: string;
  provider?: string;
  location?: string;
  duration?: string;
  tripId?: number;
}

export interface Booking {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  status: BookingStatus;
  price: number;
  image: string;
  type: 'flight' | 'hotel' | 'car' | 'train' | 'cruise' | 'package';
  details: BookingDetails;
}

export interface PendingBooking extends Partial<Booking> {}

// Empty array instead of demo bookings
const defaultBookings: Booking[] = [];

export const useBookings = (initialPendingBooking?: PendingBooking | null) => {
  const [bookings, setBookings] = useState<Booking[]>(defaultBookings);
  const [pendingBooking, setPendingBooking] = useState<PendingBooking | null>(initialPendingBooking || null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Load bookings from localStorage (for a real app)
  useEffect(() => {
    // In a real app, we would load from an API
    setLoading(false);
  }, []);

  const confirmBooking = useCallback(() => {
    if (!pendingBooking) return;
    
    const newBooking: Booking = {
      id: `BK${Date.now().toString().slice(-6)}`,
      destination: pendingBooking.destination || '',
      startDate: pendingBooking.startDate || new Date().toISOString().split('T')[0],
      endDate: pendingBooking.endDate || new Date().toISOString().split('T')[0],
      travelers: pendingBooking.travelers || 1,
      status: 'upcoming',
      price: pendingBooking.price || 999,
      image: '/placeholder.svg',
      type: pendingBooking.type || 'package',
      details: {
        confirmationCode: `${pendingBooking.destination?.slice(0, 3).toUpperCase()}${Date.now().toString().slice(-4)}`,
        provider: 'AI Yatri Travel',
        location: pendingBooking.destination,
        duration: pendingBooking.details?.duration || '7 nights',
        tripId: pendingBooking.details?.tripId,
      }
    };
    
    setBookings(prev => [newBooking, ...prev]);
    setPendingBooking(null);
    
    return newBooking;
  }, [pendingBooking]);

  const cancelPendingBooking = useCallback(() => {
    setPendingBooking(null);
  }, []);

  const getFilteredBookings = useCallback(() => {
    return bookings.filter(booking => {
      // Filter by search term
      const matchesSearch = 
        booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.details.provider?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.details.confirmationCode?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status tab
      const matchesStatus = activeFilter === 'all' || booking.status === activeFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, activeFilter]);

  return {
    bookings,
    filteredBookings: getFilteredBookings(),
    pendingBooking,
    setPendingBooking,
    loading,
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    confirmBooking,
    cancelPendingBooking
  };
};
