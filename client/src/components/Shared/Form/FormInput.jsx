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
}) => {
    const baseInputClasses =
        "w-full px-4 py-2 border border-cambridge-blue-200 rounded-lg focus:ring-2 focus:ring-cambridge-blue-500/30 focus:border-cambridge-blue-500 outline-none transition-colors";

    const inputClasses = `
    ${baseInputClasses}
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