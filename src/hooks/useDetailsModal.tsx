import { useState } from 'react';

export interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DetailsItem {
  id: string;
  name: string;
  description?: string;
  location?: string;
  rating?: string;
  price: number;
  image?: string;
  amenities?: string[];
  reviews?: Review[];
  mapUrl?: string;
  externalUrl?: string;
}

export function useDetailsModal<T extends DetailsItem>() {
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<T | null>(null);

  const openDetailsModal = (item: T) => {
    setSelectedItemForDetails(item);
  };

  const closeDetailsModal = () => {
    setSelectedItemForDetails(null);
  };

  return {
    selectedItem: selectedItemForDetails,
    openDetailsModal,
    closeDetailsModal,
    isModalOpen: !!selectedItemForDetails
  };
}
