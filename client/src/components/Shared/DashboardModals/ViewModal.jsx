import React from 'react';
import DetailModal from '../DetailModal';

/**
 * Universal View Modal component for displaying detailed information
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Function to close the modal
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Modal content sections
 * @param {string} size - Modal size (sm, md, lg, xl)
 */
const ViewModal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'lg'
}) => {
    return (
        <DetailModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size={size}
        >
            <div className="space-y-6">
                {children}
            </div>
        </DetailModal>
    );
};

export default ViewModal;