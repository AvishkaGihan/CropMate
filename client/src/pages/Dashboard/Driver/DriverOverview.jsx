import React, { useState, useEffect } from 'react';
import {
    Truck,
    Package,
    MapPin,
    Clock,
    CreditCard,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Eye,
    Play,
    Flag
} from 'lucide-react';
import { DataTable, StatusBadge } from '../../../components/Dashboard/DataTable';
import WelcomeHeader from '../../../components/Dashboard/WelcomeHeader';
import ViewDeliveryDetail from './Modals/ViewDriverDetail';

const DriverOverview = () => {
    const [userName, setUserName] = useState('Driver');
    const [isOnline, setIsOnline] = useState(true);
    const [deliveries, setDeliveries] = useState([]);
    const [earnings, setEarnings] = useState({
        today: 0,
        week: 0,
        month: 0
    });
    const [loading, setLoading] = useState(true);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Add state for tracking processing deliveries
    const [processingDeliveryId, setProcessingDeliveryId] = useState(null);

    // Fetch driver data on load
    useEffect(() => {
        // Simulate fetching data from API
        setTimeout(() => {
            setUserName('Ajith Fernando');
            setDeliveries(generateMockDeliveries());
            setEarnings({
                today: 2500,
                week: 12500,
                month: 48000
            });
            setLoading(false);
        }, 800);
    }, []);

    // Generate mock deliveries - unchanged
    const generateMockDeliveries = () => {
        // ...existing code unchanged
        const statuses = ['pending', 'accepted', 'in_progress', 'completed'];

        return Array(5).fill().map((_, i) => {
            const status = statuses[Math.floor(Math.random() * (i === 0 ? 2 : 4))]; // First item is always pending/accepted

            return {
                id: `DEL-${1000 + i}`,
                status: status,
                pickupLocation: {
                    address: `${Math.floor(Math.random() * 100) + 1} Farm Road, ${['Colombo', 'Kandy', 'Negombo'][Math.floor(Math.random() * 3)]}`
                },
                dropoffLocation: {
                    address: `${Math.floor(Math.random() * 100) + 1} ${['Main St', 'Temple Rd', 'Market Ave'][Math.floor(Math.random() * 3)]}, ${['Colombo', 'Kandy', 'Galle'][Math.floor(Math.random() * 3)]}`
                },
                pickupTime: new Date(Date.now() + (1000 * 60 * 60 * (i + 1))).toISOString(),
                dropoffDeadline: new Date(Date.now() + (1000 * 60 * 60 * (i + 3))).toISOString(),
                clientName: `Client ${i + 1}`,
                paymentAmount: Math.floor(Math.random() * 1000) + 500,
                distance: Math.floor(Math.random() * 20) + 5
            };
        });
    };

    // Format date for display - unchanged
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

    // Generate stats for welcome header - unchanged
    const quickStats = [
        {
            label: 'Today\'s Deliveries',
            value: `${deliveries.filter(d => ['completed', 'in_progress'].includes(d.status)).length} completed, ${deliveries.filter(d => ['pending', 'accepted'].includes(d.status)).length} pending`,
            icon: <Truck size={18} className="text-cambridge-blue-600" />,
            iconBg: 'bg-cambridge-blue-50'
        },
        {
            label: 'Today\'s Earnings',
            value: `LKR ${earnings.today.toLocaleString()}`,
            icon: <CreditCard size={18} className="text-green-600" />,
            iconBg: 'bg-green-50'
        },
        {
            label: 'Current Status',
            value: isOnline ? 'Active' : 'Offline',
            icon: isOnline ? <CheckCircle size={18} className="text-green-600" /> : <AlertCircle size={18} className="text-red-600" />,
            iconBg: isOnline ? 'bg-green-50' : 'bg-red-50'
        }
    ];

    // Define columns for deliveries table - add actions column
    const deliveryColumns = [
        {
            field: 'id',
            header: 'Delivery ID',
            render: row => (
                <div className="font-medium text-gray-900">{row.id}</div>
            )
        },
        {
            field: 'pickupLocation',
            header: 'Pickup',
            render: row => (
                <div className="flex items-start">
                    <MapPin size={16} className="mr-1 mt-0.5 text-gray-400 flex-shrink-0" />
                    <div className="text-sm text-gray-600 truncate max-w-[180px]">
                        {row.pickupLocation.address}
                    </div>
                </div>
            )
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
            field: 'pickupTime',
            header: 'Pickup Time',
            render: row => (
                <div className="flex items-center text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {formatTime(row.pickupTime)}
                </div>
            )
        },
        {
            field: 'paymentAmount',
            header: 'Payment',
            render: row => (
                <div className="font-medium text-gray-900">LKR {row.paymentAmount}</div>
            )
        },
        {
            field: 'status',
            header: 'Status',
            render: row => <StatusBadge status={row.status} />
        },
        // New actions column
        {
            field: 'actions',
            header: 'Actions',
            render: row => (
                <div className="flex items-center space-x-2">
                    {/* Show Accept button if status is pending */}
                    {row.status === 'pending' && (
                        <button
                            onClick={() => handleActionWithLoading(row.id, 'accept')}
                            disabled={processingDeliveryId === row.id}
                            className="flex items-center justify-center px-3 py-1 bg-cambridge-blue-600 text-white rounded text-sm hover:bg-cambridge-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    Accept
                                </span>
                            )}
                        </button>
                    )}

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
                                    <Play size={14} className="mr-1" />
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
                    >
                        <Eye size={16} />
                    </button>
                </div>
            )
        }
    ];

    // New function to handle actions with loading state
    const handleActionWithLoading = (id, actionType) => {
        setProcessingDeliveryId(id);

        // Simulate API call
        setTimeout(() => {
            switch (actionType) {
                case 'accept':
                    handleAcceptDelivery(id);
                    break;
                case 'start':
                    handleStartDelivery(id);
                    break;
                case 'complete':
                    handleCompleteDelivery(id);
                    break;
                default:
                    break;
            }
            setProcessingDeliveryId(null);
        }, 800); // Simulate a short delay for API call
    };

    // Delivery action handlers - unchanged
    const handleViewDelivery = (delivery) => {
        setSelectedDelivery(delivery);
        setIsModalOpen(true);
    };

    const handleAcceptDelivery = (id) => {
        console.log(`Accepted delivery: ${id}`);
        updateDeliveryStatus(id, 'accepted');
    };

    const handleRejectDelivery = (id) => {
        console.log(`Rejected delivery: ${id}`);
        // Update the state to remove the delivery or mark as rejected
        setDeliveries(deliveries.filter(d => d.id !== id));
    };

    const handleStartDelivery = (id) => {
        console.log(`Started delivery: ${id}`);
        updateDeliveryStatus(id, 'in_progress');
    };

    const handleCompleteDelivery = (id) => {
        console.log(`Completed delivery: ${id}`);
        updateDeliveryStatus(id, 'completed');

        // Update earnings
        const delivery = deliveries.find(d => d.id === id);
        if (delivery) {
            setEarnings(prev => ({
                ...prev,
                today: prev.today + delivery.paymentAmount,
                week: prev.week + delivery.paymentAmount,
                month: prev.month + delivery.paymentAmount
            }));
        }
    };

    const updateDeliveryStatus = (id, status) => {
        setDeliveries(deliveries.map(delivery =>
            delivery.id === id ? { ...delivery, status } : delivery
        ));
    };

    const toggleOnlineStatus = () => {
        setIsOnline(!isOnline);
    };

    // Close modal handler
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedDelivery(null), 300);
    };

    return (
        <div className="min-h-screen space-y-6">
            {/* Welcome Header */}
            <WelcomeHeader
                userName={userName}
                userRole="driver"
                quickStats={quickStats}
            />

            {/* Online Status Toggle */}
            <div className="flex justify-end">
                <button
                    onClick={toggleOnlineStatus}
                    className={`px-4 py-2 rounded-full flex items-center ${isOnline
                        ? 'bg-cambridge-blue-100 text-cambridge-blue-800 hover:bg-cambridge-blue-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                >
                    <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-cambridge-blue-500' : 'bg-gray-500'} mr-2`}></span>
                    {isOnline ? 'Online' : 'Offline'}
                </button>
            </div>

            {/* Earnings Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Today's Earnings</p>
                            <p className="text-2xl font-bold text-gray-900">LKR {earnings.today.toLocaleString()}</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <CreditCard size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">This Week</p>
                            <p className="text-2xl font-bold text-gray-900">LKR {earnings.week.toLocaleString()}</p>
                        </div>
                        <div className="p-3 rounded-full bg-cambridge-blue-100 text-cambridge-blue-600">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">This Month</p>
                            <p className="text-2xl font-bold text-gray-900">LKR {earnings.month.toLocaleString()}</p>
                        </div>
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <CreditCard size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Deliveries */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Upcoming Deliveries</h2>
                    <button
                        onClick={() => console.log('Navigate to all deliveries')}
                        className="text-sm text-cambridge-blue-600 hover:text-cambridge-blue-800"
                    >
                        View All Deliveries
                    </button>
                </div>
                <DataTable
                    columns={deliveryColumns}
                    data={deliveries.filter(d => ['pending', 'accepted', 'in_progress'].includes(d.status))}
                    emptyMessage="No pending deliveries"
                    isLoading={loading}
                />
            </div>

            {/* Keep modal for detailed view if needed */}
            <ViewDeliveryDetail
                isOpen={isModalOpen}
                onClose={closeModal}
                delivery={selectedDelivery}
                onAccept={handleAcceptDelivery}
                onReject={handleRejectDelivery}
                onStart={handleStartDelivery}
                onComplete={handleCompleteDelivery}
                formatTime={formatTime}
            />
        </div>
    );
};

export default DriverOverview;