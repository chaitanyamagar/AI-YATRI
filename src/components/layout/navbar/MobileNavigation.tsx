
import React from 'react';
import { MobileNavLink } from './MobileNavLink';

interface MobileNavigationProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export const MobileNavigation = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileNavigationProps) => {
  if (!isMobileMenuOpen) return null;
  
  return (
    <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 animate-fade-in">
      <div className="container-custom py-4">
        <nav className="flex flex-col space-y-4 py-4">
          <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="/destinations" onClick={() => setIsMobileMenuOpen(false)}>Destinations</MobileNavLink>
          <MobileNavLink href="/trip-planner" onClick={() => setIsMobileMenuOpen(false)}>Trip Planner</MobileNavLink>
          <MobileNavLink href="/budget-planner" onClick={() => setIsMobileMenuOpen(false)}>Budget Planner</MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
        </nav>
      </div>
    </div>
  );
};
