import React from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';

const PageHeader = ({ title, showRefresh = false, action = null }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                <Link to="/" className="text-green-800 hover:text-green-700">
                    <div className="flex items-center gap-2">
                        <ArrowLeft size={16} />
                        <span className="text-sm">Return Home</span>
                    </div>
                </Link>
            </div>
            <h1 className="text-2xl font-bold text-green-800">{title}</h1>
            <div className="flex items-center gap-4">
                {showRefresh && (
                    <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                        <RefreshCw size={16} />
                        <span className="text-sm">Refresh</span>
                    </button>
                )}
                {action}
            </div>
        </div>
    );
};

export default PageHeader;
