import React from 'react';

const Form = ({
    children,
    onSubmit,
    className = '',
    id = '',
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <form
            id={id}
            onSubmit={handleSubmit}
            className={`w-full ${className}`}
            noValidate // We'll handle validation ourselves
        >
            {children}
        </form>
    );
};

export default Form;