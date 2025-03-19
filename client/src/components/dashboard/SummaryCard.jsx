import React from 'react';
import { Package, Truck, Clock, DollarSign, CheckCircle } from 'lucide-react';

const SummaryCard = ({ title, value, type }) => {
    const icons = {
        orders: <Package className="text-yellow-500" size={20} />,
        processing: <Clock className="text-blue-500" size={20} />,
        completed: <CheckCircle className="text-green-500" size={20} />,
        earnings: <DollarSign className="text-yellow-500" size={20} />,
        delivered: <CheckCircle className="text-green-500" size={20} />,
        pending: <Clock className="text-yellow-500" size={20} />,
        sales: <DollarSign className="text-yellow-500" size={20} />,
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {icons[type]}
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;