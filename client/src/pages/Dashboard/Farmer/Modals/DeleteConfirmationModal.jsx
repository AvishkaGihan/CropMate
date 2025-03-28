import React from 'react';
import { ConfirmationModal } from '../../../../components/Shared/DashboardModals';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    return (
        <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete Crop"
            message="Are you sure you want to delete {itemName}? This action cannot be undone."
            onConfirm={onConfirm}
            confirmText="Delete"
            cancelText="Cancel"
            confirmButtonClass="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            itemName={itemName}
        />
    );
};

export default DeleteConfirmationModal;