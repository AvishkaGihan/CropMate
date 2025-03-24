import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Badge Component with multiple variants
 * @param {Object} props - Component props
 * @param {string} props.variant - Badge variant ('standard', 'price', 'location', 'rating', 'farm')
 * @param {string} props.text - Badge text content
 * @param {string} props.position - Position for absolute badges ('top-left', 'top-right', etc.)
 * @param {number} props.value - Numerical value (used for rating)
 * @param {Object} props.icon - Icon component or element
 * @param {Function} props.onClick - Optional click handler
 */

const Badge = ({
    variant = 'standard',
    text,
    position,
    value,
    icon,
    onClick,
    className = '',
    ...props
}) => {
    // Configure variant styles
    const variantConfig = useMemo(() => {
        const config = {
            standard: {
                container: `${position ? 'absolute ' + getPositionClasses(position) + ' z-10' : ''}`,
                badge: `bg-golden-brown-500 text-white text-xs px-3 py-1 rounded-full shadow-sm font-semibold 
                    -rotate-2 transform-gpu transition-transform duration-300 group-hover:rotate-0`,
                motion: { whileHover: {} }
            },
            price: {
                container: '',
                badge: 'font-bold text-cal-poly-green-600 bg-cal-poly-green-50 px-2 py-1 rounded-lg text-sm',
                motion: { whileHover: {} }
            },
            location: {
                container: '',
                badge: 'flex items-center bg-cambridge-blue-900/30 backdrop-blur-sm px-2 py-1 rounded-full',
                motion: { whileHover: { scale: 1.05 }, transition: { duration: 0.2 } }
            },
            rating: {
                container: '',
                badge: 'flex items-center bg-golden-brown-500/60 backdrop-blur-sm px-2 py-1 rounded-full',
                motion: { whileHover: { scale: 1.05 }, transition: { duration: 0.2 } }
            },
            farm: {
                container: 'mb-4',
                badge: 'text-sm text-cambridge-blue-600 flex items-center bg-cambridge-blue-50 px-2 py-1 rounded-md w-fit',
                motion: { whileHover: {} }
            }
        };
        return config[variant] || config.standard;
    }, [variant, position]);

    // Get standard icon based on variant
    const defaultIcon = useMemo(() => {
        switch (variant) {
            case 'location':
                return (
                    <svg className="w-4 h-4 mr-1 text-mindaro-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                );
            case 'rating':
                return (
                    <svg className="w-4 h-4 mr-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            case 'farm':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-cambridge-blue-500"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4z" />
                    </svg>
                );
            default:
                return null;
        }
    }, [variant]);

    // Render component
    return (
        <div className={`${variantConfig.container} ${className}`}>
            <motion.div
                className={variantConfig.badge}
                {...variantConfig.motion}
                onClick={onClick}
                {...props}
            >
                {/* Use provided icon or default for the variant */}
                {icon || defaultIcon}

                {/* For rating variant, show value + text */}
                {variant === 'rating' && value !== undefined && (
                    <span className="text-sm font-bold text-white">{value}</span>
                )}

                {/* For other variants, show text */}
                {text && (
                    <span className={variant === 'rating' && value !== undefined ? 'ml-1' : ''}>
                        {text}
                    </span>
                )}
            </motion.div>
        </div>
    );
};

// Helper function to convert position strings to Tailwind classes
function getPositionClasses(position) {
    switch (position) {
        case 'top-left':
            return 'top-4 left-4';
        case 'top-right':
            return 'top-4 right-4';
        case 'bottom-left':
            return 'bottom-4 left-4';
        case 'bottom-right':
            return 'bottom-4 right-4';
        default:
            return position; // Allow custom position classes
    }
}

export default Badge;