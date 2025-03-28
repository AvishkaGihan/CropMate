import React from 'react';

const FormInput = ({
    label,
    id,
    name,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    required = false,
    disabled = false,
    className = '',
    error = null,
    helpText = null,
    iconLeft = null,
    iconRight = null,
    iconLeftClassName = '',
    iconRightClassName = '',
    onIconRightClick = null,
}) => {
    const baseInputClasses =
        "w-full outline-none transition-colors";

    const getInputWrapperClasses = () => {
        let classes = "relative flex items-center border rounded-lg overflow-hidden";

        // Add conditional classes based on error and disabled states
        if (error) {
            classes += " border-red-300 focus-within:ring-2 focus-within:ring-red-500/30 focus-within:border-red-500";
        } else {
            classes += " border-cambridge-blue-200 focus-within:ring-2 focus-within:ring-cambridge-blue-500/30 focus-within:border-cambridge-blue-500";
        }

        if (disabled) {
            classes += " bg-gray-50";
        } else {
            classes += " bg-white";
        }

        return classes;
    };

    const inputClasses = `
        ${baseInputClasses}
        ${iconLeft ? 'pl-2' : 'pl-4'} 
        ${iconRight ? 'pr-2' : 'pr-4'}
        py-2
        ${disabled ? 'text-gray-500 cursor-not-allowed' : ''}
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

            <div className={getInputWrapperClasses()}>
                {iconLeft && (
                    <div className={`pl-3 flex items-center justify-center ${iconLeftClassName}`}>
                        {iconLeft}
                    </div>
                )}

                <input
                    id={id}
                    name={name || id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={inputClasses}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
                />

                {iconRight && (
                    <div
                        className={`pr-3 flex items-center justify-center ${onIconRightClick ? 'cursor-pointer hover:text-golden-brown-500' : ''} ${iconRightClassName}`}
                        onClick={onIconRightClick}
                    >
                        {iconRight}
                    </div>
                )}
            </div>

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

export default FormInput;