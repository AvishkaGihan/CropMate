import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({
    title = 'No data available',
    message = 'There are no items to display at the moment.',
    icon,
    actionButton = null,
    secondaryAction = null,
    variant = 'default' // default, card, compact, illustration
}) => {
    // Default icon if none provided
    const defaultIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-10 w-10"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
        </svg>
    );

    // Variant-specific layout
    const renderContent = () => {
        switch (variant) {
            case 'card':
                return (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
                        <div className="text-center">
                            <div className="mx-auto rounded-full bg-primary-100 text-primary-700 p-3 h-16 w-16 flex items-center justify-center mb-4">
                                {icon || defaultIcon}
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
                            <p className="text-gray-500 mb-6">{message}</p>

                            {actionButton && (
                                <div className="mt-5">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                        onClick={actionButton.onClick}
                                    >
                                        {actionButton.icon && <span className="mr-2">{actionButton.icon}</span>}
                                        {actionButton.label}
                                    </motion.button>

                                    {secondaryAction && (
                                        <button
                                            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={secondaryAction.onClick}
                                        >
                                            {secondaryAction.label}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'compact':
                return (
                    <div className="bg-primary-50 rounded-md p-4 flex items-center justify-center">
                        <div className="text-primary-600 mr-3">
                            {icon || (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-primary-800">{title}</p>
                            <p className="text-sm text-primary-600">{message}</p>
                        </div>
                        {actionButton && (
                            <button
                                className="ml-auto text-primary-600 hover:text-primary-800 text-sm font-medium"
                                onClick={actionButton.onClick}
                            >
                                {actionButton.label}
                            </button>
                        )}
                    </div>
                );

            case 'illustration':
                return (
                    <div className="text-center py-12">
                        <div className="mx-auto w-48 h-48 mb-6 opacity-75">
                            {icon || (
                                <img
                                    src="/assets/empty-state-illustration.svg"
                                    alt="No data"
                                    className="w-full h-full"
                                />
                            )}
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">{message}</p>

                        {actionButton && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                onClick={actionButton.onClick}
                            >
                                {actionButton.icon && <span className="mr-2">{actionButton.icon}</span>}
                                {actionButton.label}
                            </motion.button>
                        )}
                    </div>
                );

            case 'default':
            default:
                return (
                    <div className="text-center p-8">
                        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                            {icon || defaultIcon}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
                        <p className="text-gray-500">{message}</p>

                        {actionButton && (
                            <div className="mt-6">
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                                    onClick={actionButton.onClick}
                                >
                                    {actionButton.icon && <span className="mr-2">{actionButton.icon}</span>}
                                    {actionButton.label}
                                </button>
                            </div>
                        )}
                    </div>
                );
        }
    };

    return renderContent();
};

export default EmptyState;