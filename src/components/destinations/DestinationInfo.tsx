
import React from 'react';
import { Calendar } from 'lucide-react';

interface DestinationInfoProps {
  destination: {
    name: string;
    bestTime: string;
    description: string;
  };
}

const DestinationInfo = ({ destination }: DestinationInfoProps) => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 dark:text-white">
        {destination.name}
      </h1>
      
      <div className="flex items-center text-gray-500 text-sm mb-6 dark:text-gray-400">
        <Calendar className="w-4 h-4 mr-1" />
        <span className="font-medium">Best time to visit:</span>
        <span className="ml-1">{destination.bestTime}</span>
      </div>
      
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p className="text-gray-600 text-lg mb-4 dark:text-gray-300">
          {destination.description}
        </p>
        
        <p className="text-gray-600 mb-4 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Maecenas eget justo vitae nisi fringilla sagittis. 
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec at odio id elit fringilla
          consectetur vel sit amet urna. Praesent fermentum, nisi in faucibus eleifend, nisl nisi aliquam enim.
        </p>
        
        <p className="text-gray-600 dark:text-gray-300">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </>
  );
};

export default DestinationInfo;
