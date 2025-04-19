
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../shared/ThemeToggle';
import { toast } from '@/hooks/use-toast';
import { Logo } from './navbar/Logo';
import { DesktopNavigation } from './navbar/DesktopNavigation';
import { MobileNavigation } from './navbar/MobileNavigation';
import { UserMenuDesktop } from './navbar/UserMenuDesktop';
import { UserMenuMobile } from './navbar/UserMenuMobile';
import { MobileMenuButton } from './navbar/MobileMenuButton';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; isLoggedIn: boolean } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check for user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent dark:bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle size="sm" />
            <UserMenuDesktop user={user} handleSignOut={handleSignOut} />
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton 
            isMobileMenuOpen={isMobileMenuOpen} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileNavigation 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      {/* Mobile Menu Actions */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="container-custom py-4">
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-3">              
              <UserMenuMobile 
                user={user} 
                handleSignOut={handleSignOut}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
