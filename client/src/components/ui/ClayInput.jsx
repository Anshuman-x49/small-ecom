import React, { forwardRef } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const ClayInput = forwardRef(
  (
    {
      label,
      type = 'text',
      error,
      icon: Icon,
      rightIcon,
      isPassword = false,
      showPassword = false,
      onTogglePassword,
      className = '',
      placeholder = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-[#1E293B] flex items-center gap-1.5 ml-1"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-4 text-[#64748B] pointer-events-none flex items-center justify-center">
              <Icon size={18} />
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            placeholder={placeholder}
            aria-invalid={error ? 'true' : 'false'}
            className={`w-full clay-input py-2.5 sm:py-3 ${
              Icon ? 'pl-11' : 'pl-4'
            } ${isPassword || rightIcon ? 'pr-12' : 'pr-4'} text-sm text-[#1E293B] placeholder-[#94A3B8] font-medium outline-none transition-all duration-200 ${
              error
                ? 'border-red-400 focus:border-red-500 shadow-[inset_3px_3px_6px_rgba(239,68,68,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]'
                : 'focus:border-blue-400'
            } ${className}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={onTogglePassword}
              className="absolute right-3.5 p-1.5 text-[#64748B] hover:text-[#1E293B] focus:outline-none rounded-lg transition-colors cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {!isPassword && rightIcon && (
            <div className="absolute right-4 text-[#64748B] flex items-center justify-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium mt-1 ml-1 animate-fadeIn">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error.message || error}</span>
          </div>
        )}
      </div>
    );
  }
);

ClayInput.displayName = 'ClayInput';

export default ClayInput;
