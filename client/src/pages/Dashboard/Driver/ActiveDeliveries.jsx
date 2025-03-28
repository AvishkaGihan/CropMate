import React, { useState, useEffect } from 'react';
import {
    Truck,
    MapPin,
    Clock,
    CreditCard,
    CheckCircle,
    Search,
    Eye,
    Flag,
    Phone,
    Copy
} from 'lucide-react';
import { DataTable, StatusBadge } from '../../../components/Dashboard/DataTable';
import { FormInput } from '../../../components/Shared/Form';
import ViewDeliveryDetail from './Modals/ViewDriverDetail';

const ActiveDeliveries = () => {
    // State management
    const [activeDeliveries, setActiveDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [processingDeliveryId, setProcessingDeliveryId] = useState(null);
    const [copiedText, setCopiedText] = useState('');
    const [showCopied, setShowCopied] = useState(false);
    const [showPhoneForId, setShowPhoneForId] = useState(null);

    // Fetch active deliveries data
    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const mockDeliveries = generateMockDeliveries();
            setActiveDeliveries(mockDeliveries);
            setLoading(false);
        }, 800);
    }, []);

    // Clear copied notification after 2 seconds
    useEffect(() => {
        if (showCopied) {
            const timer = setTimeout(() => {
                setShowCopied(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showCopied]);

    // Generate mock delivery data - keeping this unchanged
    const generateMockDeliveries = () => {
        // ...existing code for mock data generation
        const locations = [
            { area: 'Colombo', addresses: ['52 Galle Road', '125 Union Place', '78 Marine Drive', '15 Duplication Road'] },
            { area: 'Kandy', addresses: ['23 Temple Road', '45 Peradeniya Road', '12 Hill Street'] },
            { area: 'Galle', addresses: ['8 Lighthouse Street', '34 Fort Road', '56 Beach Road'] },
            { area: 'Negombo', addresses: ['67 Beach Road', '23 Main Street', '10 Lagoon Road'] },
            { area: 'Jaffna', addresses: ['19 Hospital Road', '45 Clock Tower Road', '7 Point Pedro Road'] }
        ];

        const getRandomLocation = () => {
            const location = locations[Math.floor(Math.random() * locations.length)];
            return {
                area: location.area,
                address: `${location.addresses[Math.floor(Math.random() * location.addresses.length)]}, ${location.area}`
            };
        };

        return Array(8).fill().map((_, i) => {
            const pickupLocation = getRandomLocation();
            let dropoffLocation = getRandomLocation();

            while (dropoffLocation.area === pickupLocation.area) {
                dropoffLocation = getRandomLocation();
            }

            const distance = Math.floor(Math.random() * 30) + 5;
            const basePayment = 500 + (distance * 50);
            const paymentAmount = Math.round(basePayment / 100) * 100;

            const now = new Date();
            const pickupTime = new Date(now);
            pickupTime.setMinutes(now.getMinutes() - Math.floor(Math.random() * 90));

            const dropoffDeadline = new Date(pickupTime);
            dropoffDeadline.setHours(pickupTime.getHours() + 1 + Math.floor(Math.random() * 2));

            const totalDeliveryTime = dropoffDeadline - pickupTime;
            const elapsedTime = now - pickupTime;
            const estimatedTimeRemaining = Math.round((totalDeliveryTime - elapsedTime) / (1000 * 60));

            const clientPhone = `+94 7${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
            const status = i < 2 ? 'accepted' : 'in_progress';

            return {
                id: `DEL-${1000 + i}`,
                status: status,
                pickupLocation: {
                    address: pickupLocation.address,
                    area: pickupLocation.area
                },
                dropoffLocation: {
                    address: dropoffLocation.address,
                    area: dropoffLocation.area
                },
                distance: distance,
                paymentAmount: paymentAmount,
                pickupTime: pickupTime.toISOString(),
                dropoffDeadline: dropoffDeadline.toISOString(),
                clientName: `Customer ${i + 1}`,
                clientPhone: clientPhone,
                items: [
                    {
                        name: ['Rice', 'Wheat', 'Corn', 'Vegetables', 'Coconuts'][Math.floor(Math.random() * 5)],
                        quantity: `${Math.floor(Math.random() * 10) + 5}kg`
                    }
                ],
                estimatedTimeRemaining: estimatedTimeRemaining
            };
        });
    };

    // Format time for display
    const formatTime = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    // Format remaining time in a friendly way
    const formatRemainingTime = (minutes) => {
        if (minutes < 0) return 'Overdue';
        if (minutes < 60) return `${minutes}m remaining`;
        return `${Math.floor(minutes / 60)}h ${minutes % 60}m remaining`;
    };

    // Filter deliveries based on search
    const filteredDeliveries = activeDeliveries.filter(delivery => {
        if (!searchQuery) return true;

        const query = searchQuery.toLowerCase();
        return delivery.id.toLowerCase().includes(query) ||
            delivery.pickupLocation.address.toLowerCase().includes(query) ||
            delivery.dropoffLocation.address.toLowerCase().includes(query) ||
            delivery.clientName.toLowerCase().includes(query);
    });

    // View delivery detail
    const handleViewDelivery = (delivery) => {
        setSelectedDelivery(delivery);
        setIsModalOpen(true);
    };

    // Copy text to clipboard
    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedText(`${type} copied!`);
            setShowCopied(true);
        });
    };

    // Direct action handlers
    const handleActionWithLoading = (id, actionType) => {
        setProcessingDeliveryId(id);

        // Simulate API call
        setTimeout(() => {
            if (actionType === 'start') {
                handleStartDelivery(id);
            } else if (actionType === 'complete') {
                handleCompleteDelivery(id);
            }
            setProcessingDeliveryId(null);
        }, 800);
    };

    const handleStartDelivery = (id) => {
        console.log(`Started delivery: ${id}`);
        setActiveDeliveries(activeDeliveries.map(delivery =>
            delivery.id === id ? { ...delivery, status: 'in_progress' } : delivery
        ));
        closeModal();
    };

    const handleCompleteDelivery = (id) => {
        console.log(`Completed delivery: ${id}`);
        setActiveDeliveries(activeDeliveries.filter(delivery => delivery.id !== id));
        closeModal();
    };

    // Close modal handler
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedDelivery(null), 300);
    };

    // Define table columns - simplified status column and removed navigation
    const deliveryColumns = [
        {
            field: 'id',
            header: 'Delivery ID',
            render: row => (
                <div className="font-medium text-gray-900">{row.id}</div>
            )
        },
        {
            field: 'status',
            header: 'Status',
            render: row => <StatusBadge status={row.status} />
        },
        {
            field: 'dropoffLocation',
            header: 'Dropoff',
            render: row => (
                <div className="flex items-start">
                    <MapPin size={16} className="mr-1 mt-0.5 text-gray-400 flex-shrink-0" />
                    <div className="text-sm text-gray-600 truncate max-w-[180px]">
                        {row.dropoffLocation.address}
                    </div>
                </div>
            )
        },
        {
            field: 'timeRemaining',
            header: 'Time Remaining',
            render: row => (
                <div className={`flex items-center text-sm ${row.estimatedTimeRemaining < 15 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    <Clock size={14} className="mr-1" />
                    {formatRemainingTime(row.estimatedTimeRemaining)}
                </div>
            )
        },
        {
            field: 'client',
            header: 'Client',
            render: row => (
                <div className="flex items-center">
                    <div className="text-sm text-gray-900">{row.clientName}</div>
                    <button
                        onClick={() => copyToClipboard(row.clientPhone, "Phone number")}
                        className="ml-2 text-gray-400 hover:text-cambridge-blue-600"
                        title="Copy phone number"
                    >
                        <Copy size={14} />
                    </button>
                </div>
            )
        },
        // Actions column - simplified
        {
            field: 'actions',
            header: 'Actions',
            render: row => (
                <div className="flex items-center space-x-2">
                    {/* Phone button - now toggles phone number display */}
                    <button
                        onClick={() => {
                            if (showPhoneForId === row.id) {
                                setShowPhoneForId(null); // Hide if already showing
                            } else {
                                setShowPhoneForId(row.id); // Show for this row
                                copyToClipboard(row.clientPhone, "Phone number"); // Also copy to clipboard for convenience
                            }
                        }}
                        className={`flex items-center justify-center px-2 py-1 ${showPhoneForId === row.id ? 'text-cambridge-blue-600' : 'text-gray-600 hover:text-cambridge-blue-600'}`}
                        title="Show/hide phone number"
                    >
                        <Phone size={16} />
                    </button>

                    {/* Show Start button if status is accepted */}
                    {row.status === 'accepted' && (
                        <button
                            onClick={() => handleActionWithLoading(row.id, 'start')}
                            disabled={processingDeliveryId === row.id}
                            className="flex items-center justify-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processingDeliveryId === row.id ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <CheckCircle size={14} className="mr-1" />
                                    Start
                                </span>
                            )}
                        </button>
                    )}

                    {/* Show Complete button if status is in_progress */}
                    {row.status === 'in_progress' && (
                        <button
                            onClick={() => handleActionWithLoading(row.id, 'complete')}
                            disabled={processingDeliveryId === row.id}
                            className="flex items-center justify-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processingDeliveryId === row.id ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <Flag size={14} className="mr-1" />
                                    Complete
                                </span>
                            )}
                        </button>
                    )}

                    {/* View button for all statuses */}
                    <button
                        onClick={() => handleViewDelivery(row)}
                        className="flex items-center justify-center px-2 py-1 text-gray-600 hover:text-gray-900"
                        title="View details"
                    >
                        <Eye size={16} />
                    </button>
                </div>
            )
        }
    ];

    // The rest of the component (return statement) remains largely the same
    return (
        <div className="min-h-screen space-y-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Active Deliveries</h1>
                    <p className="text-gray-600 mt-1">Manage your ongoing delivery assignments</p>
                </div>
            </div>

            {/* Active deliveries statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Active Deliveries</span>
                            <span className="text-2xl font-bold text-gray-900">{activeDeliveries.filter(d => d.status === 'in_progress').length}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-cambridge-blue-100 flex items-center justify-center">
                            <Truck size={24} className="text-cambridge-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Waiting to Start</span>
                            <span className="text-2xl font-bold text-gray-900">{activeDeliveries.filter(d => d.status === 'accepted').length}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Clock size={24} className="text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Urgently Due</span>
                            <span className="text-2xl font-bold text-gray-900">{activeDeliveries.filter(d => d.estimatedTimeRemaining < 15).length}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                            <Clock size={24} className="text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search bar */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="relative">
                    <FormInput
                        type="text"
                        placeholder="Search by ID, location or client..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        iconLeft={<Search size={18} className="text-gray-400" />}
                    />
                </div>
            </div>

            {/* Active deliveries table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 pb-8 relative">
                <DataTable
                    columns={deliveryColumns}
                    data={filteredDeliveries}
                    emptyMessage="No active deliveries found"
                    isLoading={loading}
                    itemsPerPage={10}
                />

                {/* Copied notification */}
                {showCopied && (
                    <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
                        {copiedText}
                    </div>
                )}
            </div>

            {/* Delivery Detail Modal */}
            {selectedDelivery && (
                <ViewDeliveryDetail
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    delivery={selectedDelivery}
                    onStart={handleStartDelivery}
                    onComplete={handleCompleteDelivery}
                    formatTime={formatTime}
                />
            )}
        </div>
    );
};

export default ActiveDeliveries;