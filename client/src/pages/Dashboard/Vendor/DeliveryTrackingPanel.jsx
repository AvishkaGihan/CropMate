import React from 'react';
import { MapPin, Clock, Package, User, Phone } from 'lucide-react';

const DeliveryTrackingPanel = ({ delivery, formatTime }) => {
    // Calculate ETA display
    const getETADisplay = () => {
        if (!delivery.estimatedDeliveryTime) return 'N/A';

        try {
            const eta = new Date(delivery.estimatedDeliveryTime);
            const now = new Date();

            // Calculate time difference in minutes
            const diffMs = eta - now;
            const diffMins = Math.round(diffMs / 60000);

            if (diffMins <= 0) return 'Arriving now';
            if (diffMins < 60) return `${diffMins} minutes`;

            const hours = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            return `${hours} hour${hours > 1 ? 's' : ''} ${mins > 0 ? `${mins} min` : ''}`;
        } catch (e) {
            return 'N/A';
        }
    };

    // Format date from ISO string to human readable
    const formatDate = (isoString) => {
        if (!isoString) return '';
        try {
            const date = new Date(isoString);
            return date.toLocaleString();
        } catch (e) {
            return '';
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left side - Order/Delivery Info */}
            <div className="md:col-span-1">
                <div className="bg-golden-brown-50/30 p-4 rounded-lg border border-golden-brown-100/30">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Delivery #{delivery.id}</h3>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Package className="h-5 w-5 text-golden-brown-600 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Order: </span>
                            <span className="text-sm text-gray-600 ml-1">{delivery.orderId}</span>
                        </div>

                        <div className="flex items-center">
                            <User className="h-5 w-5 text-golden-brown-600 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Customer: </span>
                            <span className="text-sm text-gray-600 ml-1">{delivery.customerName}</span>
                        </div>

                        {delivery.status === 'in_transit' && delivery.driverName && (
                            <>
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-golden-brown-600 mr-2 mt-0.5" />
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Current Location: </span>
                                        <span className="text-sm text-gray-600 block">{delivery.currentLocation?.address || 'Unknown'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-golden-brown-600 mr-2" />
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Driver: </span>
                                        <span className="text-sm text-gray-600">{delivery.driverName}</span>
                                        <span className="text-xs text-gray-500 block">{delivery.driverContact}</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {delivery.estimatedDeliveryTime && (
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-golden-brown-600 mr-2" />
                                <div>
                                    <span className="text-sm font-medium text-gray-700">ETA: </span>
                                    <span className="text-sm text-gray-600">{getETADisplay()}</span>
                                    <span className="text-xs text-gray-500 block">
                                        {formatTime(delivery.estimatedDeliveryTime)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right side - Step Tracking */}
            <div className="md:col-span-2">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-4">Delivery Progress</h3>

                    <div className="relative">
                        {/* Vertical line connecting steps */}
                        <div className="absolute h-full w-0.5 bg-gray-200 left-2.5 top-0"></div>

                        {/* Timeline steps */}
                        <div className="space-y-8 relative">
                            {delivery.steps.map((step, index) => (
                                <div key={index} className="flex items-start">
                                    {/* Status indicator */}
                                    <div className={`relative z-10 rounded-full h-5 w-5 flex items-center justify-center mr-4 ${step.status === 'completed' ? 'bg-golden-brown-600' :
                                            step.status === 'current' ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}>
                                        {step.status === 'completed' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Step content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                            <div className={`font-medium ${step.status === 'completed' ? 'text-gray-900' :
                                                    step.status === 'current' ? 'text-blue-700' : 'text-gray-500'
                                                }`}>
                                                {step.label}
                                            </div>

                                            {step.time && (
                                                <div className="text-sm text-gray-500">
                                                    {formatDate(step.time)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryTrackingPanel;