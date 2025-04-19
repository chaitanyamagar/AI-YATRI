
import React from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../../shared/ThemeToggle';

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export const MobileMenuButton = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileMenuButtonProps) => {
  return (
    <div className="md:hidden flex items-center space-x-2">
      <ThemeToggle size="sm" />
      
      <button 
        className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};
