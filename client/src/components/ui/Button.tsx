import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  withArrow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading, withArrow, children, disabled, ...props },
    ref
  ) => {
    const baseStyles = 'group inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
    
    const variants = {
      primary: 'bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-sm hover:shadow-accent hover:-translate-y-0.5 hover:brightness-110',
      secondary: 'bg-muted text-foreground hover:bg-muted/80 shadow-sm hover:-translate-y-0.5',
      outline: 'border border-border bg-transparent hover:bg-accent/5 hover:border-accent/30 text-foreground',
      ghost: 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:-translate-y-0.5',
    };

    const sizes = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-12 px-6',
      lg: 'h-14 px-8 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
        {withArrow && !isLoading && (
          <svg 
            className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
