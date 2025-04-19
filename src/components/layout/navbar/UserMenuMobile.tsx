import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Calendar, ShoppingCart } from 'lucide-react';

interface UserMenuMobileProps {
  user: { name: string; email: string; isLoggedIn: boolean } | null;
  handleSignOut: () => void;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export const UserMenuMobile = ({ user, handleSignOut, setIsMobileMenuOpen }: UserMenuMobileProps) => {
  if (!user) {
    return (
      <>
        <Link 
          to="/sign-in" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="w-full p-3 flex justify-center items-center space-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <User className="w-4 h-4" />
          <span>Sign In</span>
        </Link>
        <Link 
          to="/sign-up" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="w-full p-3 flex justify-center items-center space-x-2 rounded-lg bg-yatri-blue text-white hover:bg-yatri-blue-dark transition-colors"
        >
          <span>Sign Up</span>
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="w-full p-3 flex justify-center items-center space-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
        <User className="w-4 h-4" />
        <span>Hello, {user.name}</span>
      </div>
      
      <Link 
        to="/dashboard" 
        onClick={() => setIsMobileMenuOpen(false)}
        className="w-full p-3 flex justify-center items-center space-x-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        <span>Dashboard</span>
      </Link>
      
      <Link 
        to="/bookings" 
        onClick={() => setIsMobileMenuOpen(false)}
        className="w-full p-3 flex justify-center items-center space-x-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        <span>My Bookings</span>
      </Link>
      
      <Link 
        to="/booking-details" 
        onClick={() => setIsMobileMenuOpen(false)}
        className="w-full p-3 flex justify-center items-center space-x-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        <span>Book Now</span>
      </Link>
      
      <button 
        onClick={() => {
          handleSignOut();
          setIsMobileMenuOpen(false);
        }}
        className="w-full p-3 flex justify-center items-center space-x-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </>
  );
};
