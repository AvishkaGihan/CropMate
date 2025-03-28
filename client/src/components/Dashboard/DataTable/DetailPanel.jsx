import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

const DetailPanel = ({
    title,
    children,
    initialExpanded = false,
    className = '',
    closeable = false,
    onClose,
    headerRight = null,
    variant = 'default' // options: default, compact, bordered
}) => {
    const [expanded, setExpanded] = useState(initialExpanded);

    // Variant-specific styling
    const getVariantClasses = () => {
        switch (variant) {
            case 'compact':
                return {
                    panel: 'rounded-md shadow-sm',
                    header: 'py-2 px-3',
                    body: 'p-3'
                };
            case 'bordered':
                return {
                    panel: 'rounded-md border border-primary-200',
                    header: 'py-3 px-4 border-b',
                    body: 'p-4'
                };
            case 'default':
            default:
                return {
                    panel: 'rounded-lg border border-gray-200 shadow-sm',
                    header: 'py-3 px-4 border-b border-gray-200',
                    body: 'p-4'
                };
        }
    };

    const { panel, header: headerClass, body } = getVariantClasses();

    const togglePanel = () => setExpanded(!expanded);

    const panelAnimations = {
        hidden: {
            height: 0,
            opacity: 0,
            transition: {
                height: { duration: 0.2 },
                opacity: { duration: 0.2 }
            }
        },
        visible: {
            height: 'auto',
            opacity: 1,
            transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.3, delay: 0.1 }
            }
        }
    };

    const iconAnimations = {
        collapsed: { rotate: 0 },
        expanded: { rotate: 90 }
    };

    // Header treatment based on variant
    const renderHeader = () => (
        <div
            className={`flex items-center justify-between cursor-pointer ${headerClass} ${variant === 'default' ? 'bg-gray-50 hover:bg-gray-100' : ''
                } ${variant === 'bordered' ? 'bg-primary-50 hover:bg-primary-100' : ''}`}
            onClick={togglePanel}
        >
            <div className="flex items-center">
                <motion.div
                    animate={expanded ? 'expanded' : 'collapsed'}
                    variants={iconAnimations}
                    transition={{ duration: 0.2 }}
                    className="mr-2"
                >
                    <ChevronRight size={18} className={variant === 'default' ? 'text-primary-600' : ''} />
                </motion.div>
                <h3 className={`font-medium ${variant === 'default' ? 'text-primary-800' : 'text-gray-800'}`}>{title}</h3>
            </div>

            <div className="flex items-center space-x-2">
                {headerRight}
                {closeable && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onClose) onClose();
                        }}
                        className="p-1 rounded-full hover:bg-gray-200"
                    >
                        <X size={16} className="text-gray-500" />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className={`${panel} overflow-hidden bg-white ${className}`}>
            {renderHeader()}

            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="content"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={panelAnimations}
                        className="overflow-hidden"
                    >
                        <div className={body}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DetailPanel;