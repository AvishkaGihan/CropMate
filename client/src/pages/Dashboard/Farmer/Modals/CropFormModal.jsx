import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CircleHelp, X, Loader } from 'lucide-react';
import { FormInput } from '../../../../components/Shared/FormInput';
import { FormSelect } from '../../../../components/Shared/FormSelect';

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
    // Handler to prevent form submission when pressing Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Background overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
                </Transition.Child>

                {/* Modal panel */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                {/* Modal header */}
                                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                                    <Dialog.Title as="h3" className="text-lg font-medium text-cambridge-blue-900">
                                        {title}
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={onClose}
                                    >
                                        <X size={20} aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Modal content */}
                                <div className="px-6 py-4">
                                    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                                        {/* Crop name and category */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <FormInput
                                                    label="Crop Name"
                                                    name="name"
                                                    value={cropForm.name}
                                                    onChange={handleFormChange}
                                                    required={true}
                                                    placeholder="Enter crop name"
                                                />
                                                {formErrors.name && (
                                                    <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <FormSelect
                                                    label="Category"
                                                    id="category"
                                                    name="category"
                                                    value={cropForm.category}
                                                    onChange={handleFormChange}
                                                    options={cropTypes}
                                                    required={true}
                                                    placeholder="Select crop type"
                                                />
                                                {formErrors.category && (
                                                    <p className="mt-1 text-xs text-red-500">{formErrors.category}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-6">
                                            <label className="block text-cambridge-blue-800 text-sm font-medium mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={cropForm.description}
                                                onChange={handleFormChange}
                                                placeholder="Describe your crop"
                                                required
                                                rows={4}
                                                className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                            />
                                            {formErrors.description && (
                                                <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>
                                            )}
                                        </div>

                                        {/* Price, quantity, and harvest date */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div>
                                                <FormInput
                                                    label="Price (₹/kg)"
                                                    name="price"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={cropForm.price}
                                                    onChange={handleFormChange}
                                                    required={true}
                                                    placeholder="0.00"
                                                />
                                                {formErrors.price && (
                                                    <p className="mt-1 text-xs text-red-500">{formErrors.price}</p>
                                                )}
                                            </div>

                                            <div>
                                                <FormInput
                                                    label="Available Quantity (kg)"
                                                    name="quantity"
                                                    type="number"
                                                    min="0"
                                                    value={cropForm.quantity}
                                                    onChange={handleFormChange}
                                                    required={true}
                                                    placeholder="0"
                                                />
                                                {formErrors.quantity && (
                                                    <p className="mt-1 text-xs text-red-500">{formErrors.quantity}</p>
                                                )}
                                            </div>

                                            <div>
                                                <FormInput
                                                    label="Harvest Date"
                                                    name="harvestDate"
                                                    type="date"
                                                    value={cropForm.harvestDate}
                                                    onChange={handleFormChange}
                                                    required={true}
                                                />
                                                {formErrors.harvestDate && (
                                                    <p className="mt-1 text-xs text-red-500">{formErrors.harvestDate}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Organic checkbox */}
                                        <div className="mb-6">
                                            <div className="flex items-center">
                                                <input
                                                    id="isOrganic"
                                                    name="isOrganic"
                                                    type="checkbox"
                                                    checked={cropForm.isOrganic}
                                                    onChange={handleFormChange}
                                                    className="h-4 w-4 text-golden-brown-600 focus:ring-golden-brown-500 border-cambridge-blue-300 rounded"
                                                />
                                                <label htmlFor="isOrganic" className="ml-2 block text-sm text-cambridge-blue-800 font-medium">
                                                    This is an organic product
                                                </label>
                                                <div className="ml-2 cursor-help" title="Organic products are grown without synthetic pesticides or fertilizers">
                                                    <CircleHelp size={16} className="text-gray-400 hover:text-gray-500" />
                                                </div>
                                            </div>
                                            <p className="mt-1.5 text-xs text-cambridge-blue-600/80 pl-6">
                                                Organic products are grown without synthetic pesticides or fertilizers
                                            </p>
                                        </div>

                                        {/* Image upload */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Upload Images
                                            </label>

                                            {/* Preview of images */}
                                            {cropForm.images.length > 0 && (
                                                <div className="mb-3 flex flex-wrap gap-2">
                                                    {cropForm.images.map((img, idx) => (
                                                        <div key={idx} className="relative w-20 h-20 rounded-lg bg-gray-200 overflow-hidden group">
                                                            <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(idx)}
                                                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Upload area */}
                                            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                                                <div className="space-y-1 text-center">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                                                        >
                                                            <span>Upload images</span>
                                                            <input
                                                                id="file-upload"
                                                                name="file-upload"
                                                                type="file"
                                                                className="sr-only"
                                                                multiple
                                                                accept="image/*"
                                                                onChange={handleImageUpload}
                                                            />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG, GIF up to 5MB each
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Form actions */}
                                        <div className="border-t border-gray-200 pt-4 mt-6 flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cambridge-blue-500"
                                                disabled={isSubmitting}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-golden-brown-600 border border-transparent rounded-md shadow-sm hover:bg-golden-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-golden-brown-500 disabled:opacity-75 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader size={16} className="animate-spin mr-2" />
                                                        {modalMode === 'add' ? 'Creating...' : 'Saving...'}
                                                    </>
                                                ) : (
                                                    modalMode === 'add' ? 'Create Crop' : 'Save Changes'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CropFormModal;