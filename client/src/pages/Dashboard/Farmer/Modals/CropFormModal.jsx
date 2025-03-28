import React from 'react';
import { CircleHelp } from 'lucide-react';
import { FormModal } from '../../../../components/Shared/DashboardModals';
import {
    FormInput,
    FormSelect,
    FormTextarea,
    FormCheckbox,
    FormImageUpload
} from '../../../../components/Shared/Form';

const CropFormModal = ({
    isOpen,
    onClose,
    title,
    cropForm,
    handleFormChange,
    handleSubmit,
    formErrors,
    isSubmitting,
    cropTypes,
    modalMode,
    handleImageUpload,
    removeImage
}) => {
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitText={modalMode === 'add' ? 'Create Crop' : 'Save Changes'}
        >
            {/* Crop name and category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    label="Crop Name"
                    name="name"
                    value={cropForm.name}
                    onChange={handleFormChange}
                    error={formErrors.name}
                    required
                />
                <FormSelect
                    label="Category"
                    name="category"
                    value={cropForm.category}
                    onChange={handleFormChange}
                    options={cropTypes}
                    error={formErrors.category}
                    required
                    placeholder="Select crop type"
                />
            </div>

            {/* Description */}
            <FormTextarea
                label="Description"
                name="description"
                value={cropForm.description}
                onChange={handleFormChange}
                error={formErrors.description}
                required
                rows={4}
            />

            {/* Price, quantity, and harvest date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                    label="Price (₹/kg)"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={cropForm.price}
                    onChange={handleFormChange}
                    error={formErrors.price}
                    required
                />
                <FormInput
                    label="Available Quantity (kg)"
                    name="quantity"
                    type="number"
                    min="0"
                    value={cropForm.quantity}
                    onChange={handleFormChange}
                    error={formErrors.quantity}
                    required
                />
                <FormInput
                    label="Harvest Date"
                    name="harvestDate"
                    type="date"
                    value={cropForm.harvestDate}
                    onChange={handleFormChange}
                    error={formErrors.harvestDate}
                    required
                />
            </div>

            {/* Organic checkbox */}
            <FormCheckbox
                label="This is an organic product"
                name="isOrganic"
                checked={cropForm.isOrganic}
                onChange={handleFormChange}
                helpIcon={<CircleHelp size={16} className="text-gray-400 hover:text-gray-500" />}
                helpText="Organic products are grown without synthetic pesticides or fertilizers"
            />

            {/* Image upload */}
            <FormImageUpload
                label="Upload Images"
                name="file-upload"
                onChange={handleImageUpload}
                images={cropForm.images}
                onRemoveImage={removeImage}
                maxSize="5MB"
                acceptedFormats="PNG, JPG, GIF"
            />
        </FormModal>
    );
};

export default CropFormModal;