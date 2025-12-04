import React from 'react';
import { useSite } from '../context/SiteContext';
import * as Icons from 'lucide-react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }> = ({ 
  children, 
  variant = 'primary', 
  className = '',
  style = {},
  ...props 
}) => {
  const { state } = useSite();
  const { buttonStyle, primaryColor, secondaryColor } = state.theme;

  const getRadius = () => {
    switch(buttonStyle) {
      case 'pill': return '9999px';
      case 'sharp': return '0px';
      default: return '0.375rem';
    }
  };

  const baseStyles = {
    borderRadius: getRadius(),
    ...style
  };

  let variantClasses = '';
  let variantStyles = {};

  if (variant === 'primary') {
    variantClasses = 'text-white hover:opacity-90';
    variantStyles = { backgroundColor: primaryColor };
  } else if (variant === 'secondary') {
    variantClasses = 'text-white hover:opacity-90';
    variantStyles = { backgroundColor: secondaryColor };
  } else if (variant === 'outline') {
    variantClasses = 'bg-transparent border-2 hover:bg-slate-50 dark:hover:bg-slate-800';
    variantStyles = { borderColor: primaryColor, color: primaryColor };
  }

  return (
    <button
      className={`px-6 py-3 font-medium transition-all transform active:scale-95 ${variantClasses} ${className}`}
      style={{ ...baseStyles, ...variantStyles }}
      {...props}
    >
      {children}
    </button>
  );
};

export const Section: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  id?: string;
  background?: 'white' | 'gray' | 'dark';
}> = ({ children, className = '', id, background = 'white' }) => {
  const { state } = useSite();
  const { layout } = state.theme;

  const bgClass = 
    background === 'white' ? 'bg-white dark:bg-slate-900' :
    background === 'gray' ? 'bg-slate-50 dark:bg-slate-950' :
    'bg-slate-900 text-white';

  const containerClass = 
    layout === 'boxed' ? 'max-w-5xl' : 
    layout === 'wide' ? 'max-w-7xl' : 
    'max-w-full px-8';

  return (
    <section id={id} className={`py-20 ${bgClass} ${className}`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${containerClass}`}>
        {children}
      </div>
    </section>
  );
};

export const IconByName: React.FC<{ name: string; className?: string; size?: number }> = ({ name, className, size = 24 }) => {
  // @ts-ignore - Dynamic icon loading
  const Icon = Icons[name] || Icons.HelpCircle;
  return <Icon className={className} size={size} />;
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const { state } = useSite();
  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-1 ${className}`}
      style={{ 
        borderRadius: state.theme.buttonStyle === 'sharp' ? '0' : '0.75rem' 
      }}
    >
      {children}
    </div>
  );
};
