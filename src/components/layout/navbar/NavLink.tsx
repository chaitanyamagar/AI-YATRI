
import { Link } from 'react-router-dom';
import React from 'react';

// Desktop Navigation Link Component
export const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    to={href}
    className="relative font-medium text-gray-700 dark:text-gray-300 hover:text-yatri-blue dark:hover:text-yatri-blue-light transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yatri-blue after:scale-x-0 after:origin-right after:transition-transform hover:after:scale-x-100 hover:after:origin-left"
  >
    {children}
  </Link>
);
