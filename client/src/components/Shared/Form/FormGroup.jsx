import React from 'react';

const FormGroup = ({
    children,
    className = '',
    direction = 'column', // 'column' or 'row'
    spacing = 'default', // 'default', 'tight', 'loose'
}) => {
    // Spacing classes
    const spacingClasses = {
        tight: direction === 'column' ? 'space-y-3' : 'space-x-3',
        default: direction === 'column' ? 'space-y-6' : 'space-x-4',
        loose: direction === 'column' ? 'space-y-8' : 'space-x-6',
    };

    // Direction classes
    const directionClasses = direction === 'row' ? 'flex flex-wrap items-center' : '';

    // Combine classes
    const groupClasses = `
    ${directionClasses}
    ${spacingClasses[spacing] || spacingClasses.default}
    ${className}
  `;

    return (
        <div className={groupClasses}>
            {children}
        </div>
    );
};

export default FormGroup;