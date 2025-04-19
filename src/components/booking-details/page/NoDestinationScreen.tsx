
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoDestinationScreen: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">No destination selected</h1>
      <p className="mb-6">Please select a destination to book a trip</p>
      <button 
        onClick={() => navigate('/destinations')}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Browse Destinations
      </button>
    </div>
  );
};

export default NoDestinationScreen;
