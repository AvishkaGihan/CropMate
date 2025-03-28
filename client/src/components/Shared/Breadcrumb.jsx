import React, { memo } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Leaf } from 'lucide-react';


/**
 * Universal BreadCrumb component that can be used across the application.
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of breadcrumb items with path, label, and isActive properties
 * @param {string} props.background - Background style ('default', 'transparent', 'gradient')
 * @param {boolean} props.decorative - Whether to show decorative leaf elements
 * @param {string} props.className - Additional CSS classes
 */
const Breadcrumb = ({
    items = [],
    background = 'default',
    decorative = true,
    className = ''
}) => {
    // Get the appropriate background classes based on the background prop
    const getBackgroundClasses = () => {
        switch (background) {
            case 'transparent':
                return 'bg-transparent';
            case 'gradient':
                return 'bg-gradient-to-r from-cambridge-blue-50/90 via-cambridge-blue-50/80 to-cambridge-blue-50/90 backdrop-blur-sm border-b border-cambridge-blue-100/50';
            default:
                return 'bg-cambridge-blue-50 bg-opacity-70';
        }
    };

    return (
        <div className={`pt-24 pb-4 relative overflow-hidden ${getBackgroundClasses()} ${className}`}>
            {/* Decorative elements if enabled */}
            {decorative && (
                <>
                    <div className="absolute top-0 right-0 text-mindaro-300 opacity-10">
                        <Leaf size={180} className="transform -rotate-12" />
                    </div>
                    <div className="absolute bottom-0 left-20 text-cambridge-blue-200 opacity-20">
                        <Leaf size={100} className="transform rotate-45" />
                    </div>
                    <div className="absolute bottom-0 right-1/4 text-cal-poly-green-200 opacity-10">
                        <Leaf size={60} className="transform rotate-180" />
                    </div>
                </>
            )}

            <div className="container mx-auto px-4 relative">
                <div className="flex items-center text-sm text-cambridge-blue-600 flex-wrap">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        // If it's the last item or has isActive flag, render as active
                        if (isLast || item.isActive) {
                            return (
                                <React.Fragment key={index}>
                                    {index > 0 && (
                                        <ChevronRight size={16} className="mx-2 text-cambridge-blue-400" />
                                    )}
                                    <span className="text-cambridge-blue-800 font-medium">
                                        {item.label}
                                    </span>
                                </React.Fragment>
                            );
                        }

                        // Otherwise render as a link
                        return (
                            <React.Fragment key={index}>
                                {index > 0 && (
                                    <ChevronRight size={16} className="mx-2 text-cambridge-blue-400" />
                                )}
                                <Link
                                    to={item.path}
                                    className="hover:text-golden-brown-500 transition-colors flex items-center"
                                >
                                    <span>{item.label}</span>
                                </Link>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default memo(Breadcrumb);