import React from 'react';

export const FormSelect = ({
    label,
    id,
    name,
    value,
    onChange,
    options = [],
    required = false,
    disabled = false,
    className = '',
    error = null,
    helpText = null,
    placeholder = 'Select an option',
    showEmptyOption = false,
}) => {
    const baseSelectClasses =
        "w-full px-4 py-2 border border-cambridge-blue-200 rounded-lg focus:ring-2 focus:ring-cambridge-blue-500/30 focus:border-cambridge-blue-500 outline-none transition-colors cursor-pointer";

    const selectClasses = `
    ${baseSelectClasses}
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

            <select
                id={id}
                name={name || id}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={selectClasses}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
            >
                {showEmptyOption && (
                    <option value="">{placeholder}</option>
                )}

                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

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