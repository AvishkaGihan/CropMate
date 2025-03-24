import React from 'react';

const FormCheckbox = ({
    id,
    name,
    checked,
    onChange,
    label,
    required = false,
    disabled = false,
    error = null,
    helpText = null,
    className = '',
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id={id}
                        name={name || id}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        className="w-4 h-4 text-cambridge-blue-600 rounded border-cambridge-blue-300 focus:ring-cambridge-blue-500/30"
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
                    />
                </div>

                {label && (
                    <div className="ml-2 text-sm">
                        <label
                            htmlFor={id}
                            className={`font-medium ${disabled ? 'text-gray-500' : 'text-cambridge-blue-700'}`}
                        >
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                    </div>
                )}
            </div>

            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-1.5 text-xs font-medium text-red-500 pl-6"
                >
                    {error}
                </p>
            )}

            {helpText && !error && (
                <p
                    id={`${id}-help`}
                    className="mt-1.5 text-xs text-cambridge-blue-600/80 pl-6"
                >
                    {helpText}
                </p>
            )}
        </div>
    );
};

export default FormCheckbox;