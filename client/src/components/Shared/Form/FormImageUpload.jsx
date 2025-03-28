import React from 'react';

/**
 * Reusable form image upload component
 */
const FormImageUpload = ({
    label,
    name,
    onChange,
    images = [],
    onRemoveImage,
    error,
    required = false,
    className = '',
    labelClassName = '',
    maxSize = '5MB',
    acceptedFormats = 'PNG, JPG, GIF'
}) => {
    return (
        <div className={className}>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Preview of images */}
            {images.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 rounded-lg bg-gray-200 overflow-hidden group">
                            <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => onRemoveImage(idx)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload interface */}
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <label
                            htmlFor={name}
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                        >
                            <span>Upload images</span>
                            <input
                                id={name}
                                name={name}
                                type="file"
                                className="sr-only"
                                multiple
                                accept="image/*"
                                onChange={onChange}
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                        {acceptedFormats} up to {maxSize} each
                    </p>
                </div>
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default FormImageUpload;