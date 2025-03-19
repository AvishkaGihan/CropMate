import React from 'react';

const Button = ({ children, color = 'green', onClick }) => {
    const colorClasses = {
        green: 'bg-green-600 hover:bg-green-700',
        red: 'bg-red-600 hover:bg-red-700',
        yellow: 'bg-yellow-600 hover:bg-yellow-700',
    };

    return (
        <button
            onClick={onClick}
            className={`${colorClasses[color]} text-white px-4 py-2 rounded-md text-sm font-medium`}
        >
            {children}
        </button>
    );
};

export default Button;