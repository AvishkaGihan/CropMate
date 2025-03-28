import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CreditCard } from 'lucide-react';
import { StatusBadge } from '../../../../components/Dashboard/DataTable';
import { ViewModal } from '../../../../components/Shared/DashboardModals';

const ViewDeliveryDetail = ({
    isOpen,
    onClose,
    delivery,
    onAccept,
    onReject,
    onStart,
    onComplete,
    formatTime
}) => {
    // Add local state to track delivery status changes
    const [currentDelivery, setCurrentDelivery] = useState(delivery);

    // Update local state when the delivery prop changes
    useEffect(() => {
        setCurrentDelivery(delivery);
    }, [delivery]);

    if (!currentDelivery) return null;

    // Wrapper functions for status changes that update local state immediately
    const handleAccept = (id) => {
        setCurrentDelivery(prev => ({ ...prev, status: 'accepted' }));
        onAccept(id);
    };

    const handleReject = (id) => {
        setCurrentDelivery(prev => ({ ...prev, status: 'rejected' }));
        onReject(id);
    };

    const handleStart = (id) => {
        setCurrentDelivery(prev => ({ ...prev, status: 'in_progress' }));
        onStart(id);
    };

    const handleComplete = (id) => {
        setCurrentDelivery(prev => ({ ...prev, status: 'completed' }));
        onComplete(id);
    };

    return (
        <ViewModal
            isOpen={isOpen}
            onClose={onClose}
            title={`Delivery Details: ${currentDelivery.id}`}
            size="lg"
        >
            {/* Status and action buttons */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                            <h4 className="font-medium text-gray-700 mr-2">Status:</h4>
                            <StatusBadge status={currentDelivery.status} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {currentDelivery.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => handleAccept(currentDelivery.id)}
                                    className="px-3 py-1 bg-cambridge-blue-600 text-white rounded text-sm hover:bg-cambridge-blue-700"
                                >
                                    Accept Delivery
                                </button>
                                <button
                                    onClick={() => handleReject(currentDelivery.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                >
                                    Reject
                                </button>
                            </>
                        )}
                        {currentDelivery.status === 'accepted' && (
                            <button
                                onClick={() => handleStart(currentDelivery.id)}
                                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                Start Delivery
                            </button>
                        )}
                        {currentDelivery.status === 'in_progress' && (
                            <button
                                onClick={() => handleComplete(currentDelivery.id)}
                                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            >
                                Complete Delivery
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Pickup and dropoff info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-3">Pickup Information</h4>
                    <div className="flex items-start mb-3">
                        <MapPin size={18} className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                        <div>
                            <p className="text-gray-800">{currentDelivery.pickupLocation.address}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-500 flex-shrink-0" />
                        <p className="text-gray-700">{formatTime(currentDelivery.pickupTime)}</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-3">Dropoff Information</h4>
                    <div className="flex items-start mb-3">
                        <MapPin size={18} className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                        <div>
                            <p className="text-gray-800">{currentDelivery.dropoffLocation.address}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-500 flex-shrink-0" />
                        <p className="text-gray-700">{formatTime(currentDelivery.dropoffDeadline)} (Deadline)</p>
                    </div>
                </div>
            </div>

            {/* Payment information */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Payment Information</h4>
                <div className="flex items-center">
                    <CreditCard size={18} className="mr-2 text-gray-500 flex-shrink-0" />
                    <p className="text-gray-800 font-medium">LKR {currentDelivery.paymentAmount}</p>
                </div>
                <p className="text-sm text-gray-500 mt-2">Payment will be processed upon successful delivery</p>
            </div>

            {/* Client information */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Client Information</h4>
                <div className="flex items-center">
                    <div className="font-medium">Client:</div>
                    <div className="ml-2">{currentDelivery.clientName}</div>
                </div>
            </div>

            {/* Distance information */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Delivery Details</h4>
                <div className="flex items-center">
                    <div className="font-medium">Distance:</div>
                    <div className="ml-2">{currentDelivery.distance} km</div>
                </div>
            </div>
        </ViewModal>
    );
};

export default ViewDeliveryDetail;