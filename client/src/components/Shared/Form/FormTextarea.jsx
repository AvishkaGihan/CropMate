import React from 'react';

const FormTextarea = ({
    label,
    id,
    name,
    value,
    onChange,
    rows = 4,
    placeholder = '',
    required = false,
    disabled = false,
    className = '',
    error = null,
    helpText = null,
    maxLength = null,
}) => {
    const baseTextareaClasses =
        "w-full px-4 py-2 border border-cambridge-blue-200 rounded-lg focus:ring-2 focus:ring-cambridge-blue-500/30 focus:border-cambridge-blue-500 outline-none transition-colors";

    const textareaClasses = `
    ${baseTextareaClasses}
    ${error ? 'border-red-300 focus:ring-red-500/30 focus:border-red-500' : ''}
    ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'}
    ${className}
  `;

    return (
        <div className="mb-6">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-cambridge-blue-700 mb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <textarea
                id={id}
                name={name || id}
                value={value}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={textareaClasses}
                maxLength={maxLength}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
            />

            {maxLength && (
                <div className="mt-1 text-xs text-right text-cambridge-blue-500/70">
                    {value.length}/{maxLength} characters
                </div>
            )}

            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-1.5 text-xs font-medium text-red-500"
                >
                    {error}
                </p>
            )}

            {helpText && !error && (
                <p
                    id={`${id}-help`}
                    className="mt-1.5 text-xs text-cambridge-blue-600/80"
                >
                    {helpText}
                </p>
            )}
        </div>
    );
};

export default FormTextarea;