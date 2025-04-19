
import { forwardRef } from 'react';
import { LucideProps } from 'lucide-react';

export const MedicalCross = forwardRef<SVGSVGElement, LucideProps>(
  ({ color = 'currentColor', size = 24, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        ref={ref}
        {...props}
      >
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M12 8v6" />
        <path d="M9 11h6" />
      </svg>
    );
  }
);

MedicalCross.displayName = 'MedicalCross';
