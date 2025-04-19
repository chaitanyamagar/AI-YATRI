
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <MapPin className="w-8 h-8 text-yatri-orange" />
      <span className="text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-yatri-blue to-yatri-orange bg-clip-text text-transparent">
        AI Yatri
      </span>
    </Link>
  );
};
