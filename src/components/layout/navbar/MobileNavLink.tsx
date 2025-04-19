
import { Link } from 'react-router-dom';
import React from 'react';

// Mobile Navigation Link Component
export const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
  <Link
    to={href}
    onClick={onClick}
    className="block py-2 px-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
  >
    {children}
  </Link>
);
