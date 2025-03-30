import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MapPin, Clock, CreditCard, X, CheckCircle, Clock4, XCircle, Truck } from 'lucide-react';

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

    // Custom StatusBadge component implementation
    const StatusBadge = ({ status }) => {
        const statusConfig = {
            pending: {
                bgColor: 'bg-amber-100',
                textColor: 'text-amber-800',
                icon: <Clock4 size={14} className="mr-1" />,
                label: 'Pending'
            },
            accepted: {
                bgColor: 'bg-blue-100',
                textColor: 'text-blue-800',
                icon: <CheckCircle size={14} className="mr-1" />,
                label: 'Accepted'
            },
            rejected: {
                bgColor: 'bg-red-100',
                textColor: 'text-red-800',
                icon: <XCircle size={14} className="mr-1" />,
                label: 'Rejected'
            },
            in_progress: {
                bgColor: 'bg-purple-100',
                textColor: 'text-purple-800',
                icon: <Truck size={14} className="mr-1" />,
                label: 'In Progress'
            },
            completed: {
                bgColor: 'bg-green-100',
                textColor: 'text-green-800',
                icon: <CheckCircle size={14} className="mr-1" />,
                label: 'Completed'
            }
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                {config.icon}
                {config.label}
            </span>
        );
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Background overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
                </Transition.Child>

                {/* Modal panel */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                {/* Modal header */}
                                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                                    <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                                        {`Delivery Details: ${currentDelivery.id}`}
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={onClose}
                                    >
                                        <X size={20} aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Modal content */}
                                <div className="px-6 py-4 space-y-4">
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

                                    {/* Close button at the bottom */}
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ViewDeliveryDetail;