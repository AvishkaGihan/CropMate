import React from 'react';

const StatusBadge = ({ status }) => {
    const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        delivered: 'bg-green-100 text-green-800',
        completed: 'bg-green-100 text-green-800'
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status.toLowerCase()]}`}>
            {status}
        </span>
    );
};

export default StatusBadge;