
import React from 'react';
import { NavLink } from './NavLink';

export const DesktopNavigation = () => {
  // Check if user is logged in for conditional rendering
  const isLoggedIn = !!localStorage.getItem('user');
  
  return (
    <nav className="hidden md:flex space-x-8">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/destinations">Destinations</NavLink>
      <NavLink href="/trip-planner">Trip Planner</NavLink>
      <NavLink href="/budget-planner">Budget Planner</NavLink>
      {isLoggedIn && <NavLink href="/booking-details">Book Now</NavLink>}
      <NavLink href="/about">About</NavLink>
    </nav>
  );
};
