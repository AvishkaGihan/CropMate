import React from 'react';
import { Loader2 } from 'lucide-react';

export const FormButton = ({
    type = 'button',
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    isLoading = false,
    disabled = false,
    fullWidth = false,
    className = '',
    icon = null,
    iconPosition = 'left',
}) => {
    // Base classes
    const baseClasses = "font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center transition-colors";

    // Size classes
    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
    };

    // Variant classes
    const variantClasses = {
        primary: "bg-cambridge-blue-600 text-white hover:bg-cambridge-blue-700 focus:ring-cambridge-blue-500",
        secondary: "bg-golden-brown-500 text-white hover:bg-golden-brown-600 focus:ring-golden-brown-500",
        outline: "border border-cambridge-blue-200 text-cambridge-blue-700 hover:bg-cambridge-blue-50 focus:ring-cambridge-blue-500",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
        ghost: "text-cambridge-blue-700 hover:bg-cambridge-blue-50 focus:ring-cambridge-blue-500",
    };

    // Width classes
    const widthClasses = fullWidth ? "w-full" : "";

    // State classes
    const stateClasses = (disabled || isLoading) ? "opacity-70 cursor-not-allowed" : "";

    // Combine all classes
    const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size] || sizeClasses.md}
    ${variantClasses[variant] || variantClasses.primary}
    ${widthClasses}
    ${stateClasses}
    ${className}
  `;

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading && (
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            )}

            {!isLoading && icon && iconPosition === 'left' && (
                <span className="mr-2">{icon}</span>
            )}

            {children}

            {!isLoading && icon && iconPosition === 'right' && (
                <span className="ml-2">{icon}</span>
            )}
        </button>
    );
};
