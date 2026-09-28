import React from 'react';
import { Loader2 } from 'lucide-react';

const ClayButton = ({
  children,
  type = 'button',
  variant = 'primary', // 'primary' | 'accent' | 'secondary' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  className = '',
  icon: Icon,
  onClick,
  ...props
}) => {
  const variantStyles = {
    primary: 'clay-btn-primary',
    accent: 'clay-btn-accent',
    secondary: 'clay-btn-secondary',
    danger: 'bg-red-500 text-white shadow-[6px_6px_14px_rgba(239,68,68,0.4),-4px_-4px_12px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(255,255,255,0.5),inset_-2px_-2px_4px_rgba(185,28,28,0.4)] hover:bg-red-600',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 rounded-xl gap-1.5',
    md: 'text-sm px-5 py-3 rounded-2xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5 font-bold',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`clay-btn ${variantStyles[variant] || variantStyles.primary} ${
        sizeStyles[size] || sizeStyles.md
      } ${
        disabled || isLoading
          ? 'opacity-60 cursor-not-allowed transform-none shadow-none'
          : 'cursor-pointer active:scale-95'
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={18} />}
          {children}
        </>
      )}
    </button>
  );
};

export default ClayButton;
