
import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Calendar, ShoppingCart } from 'lucide-react';

interface UserMenuDesktopProps {
  user: { name: string; email: string; isLoggedIn: boolean } | null;
  handleSignOut: () => void;
}

export const UserMenuDesktop = ({ user, handleSignOut }: UserMenuDesktopProps) => {
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link 
          to="/sign-in" 
          className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-yatri-blue dark:hover:text-yatri-blue-light px-3 py-2"
        >
          Sign in
        </Link>
        <Link 
          to="/sign-up" 
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-yatri-blue text-white hover:bg-yatri-blue-dark transition-colors"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <User className="w-4 h-4" />
        <span>{user.name}</span>
      </button>
      
      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden origin-top-right transition-all scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible">
        <div className="py-1">
          <Link 
            to="/dashboard" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link 
            to="/profile" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Profile
          </Link>
          <Link 
            to="/bookings" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            My Bookings
          </Link>
          <Link 
            to="/booking-details" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ShoppingCart className="w-4 h-4 inline mr-2" />
            Book Now
          </Link>
          <button 
            onClick={handleSignOut}
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
