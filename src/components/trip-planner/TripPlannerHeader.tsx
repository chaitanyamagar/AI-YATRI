import React from 'react';

const TripPlannerHeader = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-8">
      <span className="inline-block px-3 py-1 text-sm font-medium text-yatri-orange bg-yatri-orange/10 rounded-full mb-3">
        AI Trip Planner
      </span>
      <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 dark:text-white">
        Plan Your Perfect Maharashtra Trip
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        Let our AI create a personalized itinerary based on your preferences, budget, and travel style.
      </p>
    </div>
  );
};

export default TripPlannerHeader;
