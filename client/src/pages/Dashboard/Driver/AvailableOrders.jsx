import React, { useState, useEffect } from 'react';
import {
    Truck,
    Package,
    MapPin,
    Clock,
    CreditCard,
    Filter,
    Search,
    Eye,
    CalendarRange,
    RefreshCw,
    CheckCircle,
    X
} from 'lucide-react';
import { DataTable, StatusBadge } from '../../../components/Dashboard/DataTable';
import { FormInput, FormSelect } from '../../../components/Shared/Form';
import { DateRangePicker } from '../../../components/Dashboard/Forms';
import ViewDeliveryDetail from './Modals/ViewDriverDetail';

const AvailableOrders = () => {
    // State management
    const [availableDeliveries, setAvailableDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        distance: '',
        paymentAmount: '',
        dateRange: { start: null, end: null }
    });
    const [deliveryStats, setDeliveryStats] = useState({
        available: 0,
        highPriority: 0,
        longDistance: 0,
        shortDistance: 0,
        averagePayment: 0
    });
    // For processing animation
    const [processingDeliveryId, setProcessingDeliveryId] = useState(null);

    // Fetch available deliveries data
    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const mockDeliveries = generateMockDeliveries();
            setAvailableDeliveries(mockDeliveries);
            calculateDeliveryStats(mockDeliveries);
            setLoading(false);
        }, 800);
    }, []);

    // Generate mock delivery data
    const generateMockDeliveries = () => {
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

        return Array(25).fill().map((_, i) => {
            const pickupLocation = getRandomLocation();
            let dropoffLocation = getRandomLocation();

            // Make sure pickup and dropoff locations are different
            while (dropoffLocation.area === pickupLocation.area) {
                dropoffLocation = getRandomLocation();
            }

            const distance = Math.floor(Math.random() * 30) + 5; // 5-35 km
            const isLongDistance = distance > 20;

            // Base payment calculation
            const basePayment = 500 + (distance * 50); // LKR 500 base + LKR 50 per km
            const paymentAmount = Math.round(basePayment / 100) * 100; // Round to nearest 100

            // Current date/time + random hours for pickup (0-48 hours from now)
            const now = new Date();
            const pickupTime = new Date(now);
            pickupTime.setHours(now.getHours() + Math.floor(Math.random() * 48));

            // Deadline is 2-4 hours after pickup time
            const dropoffDeadline = new Date(pickupTime);
            dropoffDeadline.setHours(pickupTime.getHours() + 2 + Math.floor(Math.random() * 3));

            // 70% of orders should be normal priority, 30% high priority
            const isHighPriority = Math.random() > 0.7;

            return {
                id: `DEL-${1000 + i}`,
                status: 'pending', // All available orders are pending
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
                clientName: `Farmer ${i + 1}`,
                clientContact: `+94 7${Math.floor(Math.random() * 10000000)}`,
                items: [
                    {
                        name: ['Rice', 'Wheat', 'Corn', 'Vegetables', 'Coconuts'][Math.floor(Math.random() * 5)],
                        quantity: `${Math.floor(Math.random() * 10) + 5}kg`
                    }
                ],
                priority: isHighPriority ? 'high' : 'normal',
                note: Math.random() > 0.7 ? 'Please handle with care.' : ''
            };
        });
    };

    // Calculate delivery statistics
    const calculateDeliveryStats = (deliveries) => {
        const stats = {
            available: deliveries.length,
            highPriority: deliveries.filter(delivery => delivery.priority === 'high').length,
            longDistance: deliveries.filter(delivery => delivery.distance > 20).length,
            shortDistance: deliveries.filter(delivery => delivery.distance <= 20).length,
            averagePayment: Math.round(deliveries.reduce((sum, delivery) => sum + delivery.paymentAmount, 0) / deliveries.length)
        };
        setDeliveryStats(stats);
    };

    // Filter deliveries based on filters
    const filteredDeliveries = availableDeliveries.filter(delivery => {
        // Search by ID or location
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (!delivery.id.toLowerCase().includes(query) &&
                !delivery.pickupLocation.address.toLowerCase().includes(query) &&
                !delivery.dropoffLocation.address.toLowerCase().includes(query)) {
                return false;
            }
        }

        // Filter by distance
        if (filters.distance) {
            if (filters.distance === 'short' && delivery.distance > 20) {
                return false;
            }
            if (filters.distance === 'long' && delivery.distance <= 20) {
                return false;
            }
        }

        // Filter by payment amount
        if (filters.paymentAmount) {
            if (filters.paymentAmount === 'low' && delivery.paymentAmount > 1000) {
                return false;
            }
            if (filters.paymentAmount === 'medium' && (delivery.paymentAmount <= 1000 || delivery.paymentAmount > 2000)) {
                return false;
            }
            if (filters.paymentAmount === 'high' && delivery.paymentAmount <= 2000) {
                return false;
            }
        }

        // Filter by date range
        if (filters.dateRange.start && filters.dateRange.end) {
            const pickupDate = new Date(delivery.pickupTime);
            const startDate = new Date(filters.dateRange.start);
            const endDate = new Date(filters.dateRange.end);

            // Set time to beginning/end of day for accurate comparison
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            if (pickupDate < startDate || pickupDate > endDate) {
                return false;
            }
        }

        return true;
    });

    // Handle filter changes
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleDateRangeChange = (range) => {
        setDateRange(range);
        handleFilterChange('dateRange', range);
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            distance: '',
            paymentAmount: '',
            dateRange: { start: null, end: null }
        });
        setDateRange({ start: null, end: null });
        setSearchQuery('');
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

    // Format date with optional time
    const formatDate = (dateString, includeTime = false) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                ...(includeTime && { hour: '2-digit', minute: '2-digit' })
            });
        } catch (e) {
            return dateString;
        }
    };

    // View delivery detail
    const handleViewDelivery = (delivery) => {
        setSelectedDelivery(delivery);
        setIsModalOpen(true);
    };

    // Handle delivery actions
    const handleAcceptDelivery = (id) => {
        // Set processing state for the action button
        setProcessingDeliveryId(id);

        // Simulate API call with delay
        setTimeout(() => {
            console.log(`Accepted delivery: ${id}`);
            // Remove delivery from available list
            setAvailableDeliveries(prev => prev.filter(d => d.id !== id));
            setProcessingDeliveryId(null);
            // Update stats
            calculateDeliveryStats(availableDeliveries.filter(d => d.id !== id));
        }, 800);
    };

    const handleRejectDelivery = (id) => {
        // Set processing state for the action button
        setProcessingDeliveryId(id);

        // Simulate API call with delay
        setTimeout(() => {
            console.log(`Rejected delivery: ${id}`);
            // Remove delivery from available list
            setAvailableDeliveries(prev => prev.filter(d => d.id !== id));
            setProcessingDeliveryId(null);
            // Update stats
            calculateDeliveryStats(availableDeliveries.filter(d => d.id !== id));
        }, 800);
    };

    // Close modal handler
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedDelivery(null), 300);
    };

    // Define table columns
    const deliveryColumns = [
        {
            field: 'id',
            header: 'Delivery ID',
            sortable: true,
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
            field: 'distance',
            header: 'Distance',
            sortable: true,
            render: row => (
                <div className="text-sm text-gray-900">{row.distance} km</div>
            )
        },
        {
            field: 'pickupTime',
            header: 'Pickup Time',
            sortable: true,
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
            sortable: true,
            render: row => (
                <div className="font-medium text-gray-900">LKR {row.paymentAmount}</div>
            )
        },
        {
            field: 'priority',
            header: 'Priority',
            sortable: true,
            render: row => (
                <StatusBadge
                    status={row.priority === 'high' ? 'danger' : 'success'}
                    label={row.priority === 'high' ? 'High Priority' : 'Normal'}
                />
            )
        },
        // Direct action buttons in the table
        {
            field: 'actions',
            header: 'Actions',
            render: row => (
                <div className="flex items-center space-x-2">
                    {/* Accept button */}
                    <button
                        onClick={() => handleAcceptDelivery(row.id)}
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

                    {/* Reject button */}
                    <button
                        onClick={() => handleRejectDelivery(row.id)}
                        disabled={processingDeliveryId === row.id}
                        className="flex items-center justify-center px-3 py-1 border border-red-600 text-red-600 rounded text-sm hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processingDeliveryId === row.id ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <X size={14} className="mr-1" />
                                Reject
                            </span>
                        )}
                    </button>

                    {/* View details button */}
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

    // Modified row actions - now only has view details
    const rowActions = [
        {
            label: 'View Details',
            icon: <Eye size={16} />,
            onClick: (row) => handleViewDelivery(row)
        }
    ];

    return (
        <div className="min-h-screen space-y-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Available Deliveries</h1>
                    <p className="text-gray-600 mt-1">Browse and accept delivery assignments</p>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => {
                            setLoading(true);
                            setTimeout(() => {
                                const mockDeliveries = generateMockDeliveries();
                                setAvailableDeliveries(mockDeliveries);
                                calculateDeliveryStats(mockDeliveries);
                                setLoading(false);
                            }, 800);
                        }}
                        className="flex items-center px-4 py-2 bg-cambridge-blue-600 text-white rounded-md hover:bg-cambridge-blue-700"
                    >
                        <RefreshCw size={16} className="mr-2" />
                        Refresh Deliveries
                    </button>
                </div>
            </div>

            {/* Delivery statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Available</span>
                            <span className="text-2xl font-bold text-gray-900">{deliveryStats.available}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-cambridge-blue-100 flex items-center justify-center">
                            <Package size={24} className="text-cambridge-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">High Priority</span>
                            <span className="text-2xl font-bold text-gray-900">{deliveryStats.highPriority}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                            <Clock size={24} className="text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Short Distance</span>
                            <span className="text-2xl font-bold text-gray-900">{deliveryStats.shortDistance}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <MapPin size={24} className="text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Long Distance</span>
                            <span className="text-2xl font-bold text-gray-900">{deliveryStats.longDistance}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                            <Truck size={24} className="text-amber-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Avg. Payment</span>
                            <span className="text-2xl font-bold text-gray-900">LKR {deliveryStats.averagePayment}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <CreditCard size={24} className="text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and search */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FormInput
                            type="text"
                            placeholder="Search by ID or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            iconLeft={<Search size={18} className="text-gray-400" />}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Distance filter */}
                        <FormSelect
                            value={filters.distance}
                            onChange={(e) => handleFilterChange('distance', e.target.value)}
                            options={[
                                { value: '', label: 'All Distances' },
                                { value: 'short', label: 'Short (<20km)' },
                                { value: 'long', label: 'Long (>20km)' }
                            ]}
                        />

                        {/* Payment filter */}
                        <FormSelect
                            value={filters.paymentAmount}
                            onChange={(e) => handleFilterChange('paymentAmount', e.target.value)}
                            options={[
                                { value: '', label: 'All Payments' },
                                { value: 'low', label: '<LKR 1,000' },
                                { value: 'medium', label: 'LKR 1,000-2,000' },
                                { value: 'high', label: '>LKR 2,000' }
                            ]}
                        />

                        {/* Date range picker */}
                        <div className="relative">
                            <DateRangePicker
                                startDate={dateRange.start}
                                endDate={dateRange.end}
                                onChange={handleDateRangeChange}
                                placeholder="Filter by delivery date"
                                icon={<CalendarRange size={16} />}
                            />
                        </div>
                    </div>
                    <button
                        onClick={clearFilters}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cambridge-blue-500"
                    >
                        <RefreshCw size={16} className="mr-2" />
                        Clear
                    </button>
                </div>
            </div>

            {/* Deliveries table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <DataTable
                    columns={deliveryColumns}
                    data={filteredDeliveries}
                    emptyMessage="No available deliveries found matching your criteria"
                    isLoading={loading}
                    itemsPerPage={10}
                />
            </div>

            {/* Delivery Detail Modal */}
            {selectedDelivery && (
                <ViewDeliveryDetail
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    delivery={selectedDelivery}
                    onAccept={handleAcceptDelivery}
                    onReject={handleRejectDelivery}
                    formatTime={formatTime}
                />
            )}
        </div>
    );
};

export default AvailableOrders;