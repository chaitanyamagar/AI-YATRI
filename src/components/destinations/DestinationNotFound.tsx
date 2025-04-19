
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DestinationNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="pt-24 pb-16 container-custom">
      <h1 className="text-2xl font-bold">Destination not found</h1>
      <p className="mt-4">Sorry, we couldn't find the destination you're looking for.</p>
      <Button variant="outline" className="mt-4" onClick={() => navigate('/destinations')}>
        Back to All Destinations
      </Button>
    </div>
  );
};

export default DestinationNotFound;
