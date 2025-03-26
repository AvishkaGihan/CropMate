import React from 'react';
import DetailModal from '../DetailModal';

/**
 * Universal Confirmation Modal component for confirmations (delete, approve, etc)
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Function to close the modal
 * @param {string} title - Modal title
 * @param {string} message - Confirmation message
 * @param {function} onConfirm - Confirmation action handler
 * @param {string} confirmText - Text for confirm button
 * @param {string} cancelText - Text for cancel button
 * @param {string} confirmButtonClass - Class for confirm button
 * @param {string} itemName - Optional name of item being acted upon
 * @param {string} size - Modal size (sm, md, lg, xl)
 */
const ConfirmationModal = ({
    isOpen,
    onClose,
    title = 'Confirm Action',
    message = 'Are you sure you want to perform this action?',
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmButtonClass = 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    itemName,
    size = 'sm'
}) => {
    return (
        <DetailModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size={size}
        >
            <div className="space-y-4">
                <p className="text-gray-700">
                    {itemName ? (
                        <>
                            {message.replace('{itemName}', '')}
                            <span className="font-medium">{itemName}</span>
                            {message.includes('{itemName}') ? message.split('{itemName}')[1] : '?'}
                        </>
                    ) : message}
                </p>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        className={`inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${confirmButtonClass}`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </DetailModal>
    );
};

export default ConfirmationModal;