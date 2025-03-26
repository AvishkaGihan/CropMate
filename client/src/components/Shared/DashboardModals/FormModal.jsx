import React from 'react';
import DetailModal from '../DetailModal';

/**
 * Universal Form Modal component for forms
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Function to close the modal
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Form fields
 * @param {function} onSubmit - Form submission handler
 * @param {boolean} isSubmitting - Loading state for submit button
 * @param {string} submitText - Text for submit button
 * @param {string} cancelText - Text for cancel button
 * @param {string} size - Modal size (sm, md, lg, xl)
 */
const FormModal = ({
    isOpen,
    onClose,
    title,
    children,
    onSubmit,
    isSubmitting = false,
    submitText = 'Save',
    cancelText = 'Cancel',
    size = 'lg'
}) => {
    return (
        <DetailModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size={size}
        >
            <form onSubmit={onSubmit} className="space-y-4">
                {children}

                {/* Submit buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : submitText}
                    </button>
                </div>
            </form>
        </DetailModal>
    );
};

export default FormModal;