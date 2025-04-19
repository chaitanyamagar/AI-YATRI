
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface ThemeToggleProps {
  variant?: 'toggle' | 'button' | 'switch';
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle = ({ variant = 'button', size = 'md' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  if (variant === 'switch') {
    return (
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4" />
        <Switch 
          checked={isDark}
          onCheckedChange={toggleTheme}
        />
        <Moon className="h-4 w-4" />
      </div>
    );
  }

  if (variant === 'toggle') {
    return (
      <Toggle 
        aria-label="Toggle theme" 
        pressed={isDark}
        onPressedChange={toggleTheme}
        className={`${sizeClasses[size]} rounded-full p-0`}
      >
        {isDark ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Toggle>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full p-0 ${sizeClasses[size]}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
};

export default ThemeToggle;
