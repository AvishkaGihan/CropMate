import React from 'react';
import { motion } from 'framer-motion';

/**
 * Universal Call to Action Button component for consistent styling across the application
 * 
 * @param {Object} props
 * @param {string} props.href - URL to navigate to
 * @param {string} props.text - Button text
 * @param {ReactNode} props.icon - Custom icon (uses arrow by default)
 * @param {string} props.variant - Button style variant ('primary', 'secondary', 'golden', 'outline', 'white')
 * @param {string} props.size - Button size ('sm', 'md', 'lg')
 * @param {boolean} props.withShine - Whether to include shine effect
 * @param {boolean} props.withGradientBorder - Whether to include gradient border
 * @param {Function} props.onClick - Optional click handler
 * @param {string} props.className - Additional custom classes
 */
const CTAButton = ({
    href = '#',
    text = 'Learn More',
    icon,
    variant = 'primary',
    size = 'md',
    withShine = false,
    withGradientBorder = false,
    onClick,
    className = '',
    ...props
}) => {
    // Define variant styles
    const variants = {
        primary: {
            button: "bg-gradient-to-r from-cambridge-blue-500 to-cambridge-blue-600 text-white",
            iconColor: "text-white"
        },
        secondary: {
            button: "bg-gradient-to-r from-golden-brown-500 to-golden-brown-600 text-white",
            iconColor: "text-white"
        },
        golden: {
            button: "bg-golden-brown-400 text-white",
            iconColor: "text-white"
        },
        outline: {
            button: "bg-transparent border border-cambridge-blue-400 text-cambridge-blue-700 hover:bg-cambridge-blue-50",
            iconColor: "text-cambridge-blue-600"
        },
        white: {
            button: "bg-white text-cambridge-blue-800 shadow-md",
            iconColor: "text-golden-brown-500"
        }
    };

    // Define size classes
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-lg"
    };

    // Gradient border wrapper
    const GradientBorderWrapper = ({ children }) => {
        if (!withGradientBorder) return children;

        return (
            <div className="inline-block p-0.5 rounded-full bg-gradient-to-r from-cambridge-blue-500 via-golden-brown-500 to-mindaro-500 shadow-lg">
                {children}
            </div>
        );
    };

    // Default arrow icon
    const DefaultIcon = (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className={`relative z-10 h-5 w-5 ml-2 ${variants[variant].iconColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 200 }}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
        </motion.svg>
    );

    // Main button component
    const Button = (
        <motion.a
            href={href}
            onClick={onClick}
            className={`inline-flex items-center ${sizes[size]} ${variants[variant].button} 
                font-medium rounded-full shadow-md overflow-hidden relative ${className}`}
            whileHover={{ y: -4, boxShadow: "0 15px 30px -10px rgba(90, 130, 104, 0.25)" }}
            whileTap={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            {...props}
        >
            {/* Optional shine effect */}
            {withShine && (
                <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                />
            )}

            <span className="relative z-10">{text}</span>

            {/* Icon (custom or default) */}
            {icon || DefaultIcon}
        </motion.a>
    );

    // Return button with optional gradient border
    return (
        <div className="inline-block">
            <GradientBorderWrapper>
                {Button}
            </GradientBorderWrapper>
        </div>
    );
};

export default CTAButton;