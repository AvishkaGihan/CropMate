import { useState, useEffect } from 'react';
import {
    ShoppingCart,
    Clock,
    User,
    Truck,
    ArrowUpRight,
    Search,
    Eye,
    CheckCircle,
    CalendarRange,
    RefreshCw,
    MapPin,
    CircleDollarSign,
    Package
} from 'lucide-react';
import { DataTable, StatusBadge } from '../../../components/Dashboard/DataTable';
import DetailModal from '../../../components/Shared/DetailModal';
import { FormInput } from '../../../components/Shared/FormInput';
import { FormSelect } from '../../../components/Shared/FormSelect';
import { DateRangePicker } from '../../../components/Dashboard/Forms';
import DeliveryTrackingPanel from './DeliveryTrackingPanel';

const MyOrders = () => {
    // State management
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        deliveryStatus: '',
        dateRange: { start: null, end: null }
    });
    const [orderStats, setOrderStats] = useState({
        total: 0,
        pending: 0,
        processing: 0,
        completed: 0,
        inTransit: 0,
        value: 0
    });
    const [showTracking, setShowTracking] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState(null);

    // Fetch orders data
    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            const mockOrders = generateMockOrders();
            setOrders(mockOrders);
            calculateOrderStats(mockOrders);
            setLoading(false);
        }, 800);
    }, []);

    // Calculate order statistics
    const calculateOrderStats = (ordersData) => {
        const stats = {
            total: ordersData.length,
            pending: ordersData.filter(order => order.status === 'pending').length,
            processing: ordersData.filter(order => order.status === 'processing').length,
            completed: ordersData.filter(order => order.status === 'completed').length,
            inTransit: ordersData.filter(order => order.deliveryStatus === 'in_transit').length,
            value: ordersData.reduce((total, order) => {
                // Extract numeric value from price string (e.g., "LKR 15,000" -> 15000)
                const price = parseFloat(order.totalPrice.replace(/[^0-9.-]+/g, ""));
                return total + price;
            }, 0)
        };
        setOrderStats(stats);
    };

    // Generate mock order data
    const generateMockOrders = () => {
        const statuses = ['pending', 'processing', 'completed', 'cancelled'];
        const deliveryStatuses = ['preparing', 'ready_for_pickup', 'in_transit', 'delivered', 'pending'];
        const farmerNames = [
            'Organic Farm Co.', 'Sri Lankan Greens', 'Highland Producers',
            'Kandy Farms', 'Colombo Crop Circle', 'Galle Growers',
            'Traditional Farmers', 'Natural Haven', 'Pure Produce'
        ];
        const products = [
            { name: 'Rice', unit: 'kg', pricePerUnit: 45 },
            { name: 'Wheat', unit: 'kg', pricePerUnit: 35 },
            { name: 'Corn', unit: 'kg', pricePerUnit: 40 },
            { name: 'Tomatoes', unit: 'kg', pricePerUnit: 80 },
            { name: 'Onions', unit: 'kg', pricePerUnit: 65 },
            { name: 'Potatoes', unit: 'kg', pricePerUnit: 55 },
            { name: 'Coconuts', unit: 'nut', pricePerUnit: 120 },
            { name: 'Tea Leaves', unit: 'kg', pricePerUnit: 320 }
        ];

        return Array(15).fill().map((_, i) => {
            const orderItems = [];
            // Random number of items (1-3)
            const itemCount = Math.floor(Math.random() * 3) + 1;

            // Generate unique random items for this order
            const availableProducts = [...products];
            let totalPrice = 0;

            for (let j = 0; j < itemCount; j++) {
                if (availableProducts.length === 0) break;

                const productIndex = Math.floor(Math.random() * availableProducts.length);
                const product = availableProducts.splice(productIndex, 1)[0];
                const quantity = Math.floor(Math.random() * 10) * 50 + 50; // Random quantity (50, 100, 150, ..., 500)
                const itemPrice = product.pricePerUnit * quantity;
                totalPrice += itemPrice;

                orderItems.push({
                    id: `ITEM-${i}-${j}`,
                    name: product.name,
                    quantity: `${quantity}${product.unit}`,
                    pricePerUnit: `LKR ${product.pricePerUnit}/${product.unit}`,
                    totalPrice: `LKR ${itemPrice.toLocaleString()}`
                });
            }

            // Create random dates within the last 30 days
            const orderDate = new Date();
            orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30));

            // Random delivery date (1-7 days after order)
            const deliveryDate = new Date(orderDate);
            deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 7) + 1);

            // Set status and delivery status with some logic
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            let randomDeliveryStatus;

            if (randomStatus === 'cancelled') {
                randomDeliveryStatus = 'cancelled';
            } else if (randomStatus === 'completed') {
                randomDeliveryStatus = 'delivered';
            } else if (randomStatus === 'processing') {
                const deliveryOptions = ['preparing', 'ready_for_pickup', 'in_transit'];
                randomDeliveryStatus = deliveryOptions[Math.floor(Math.random() * deliveryOptions.length)];
            } else {
                randomDeliveryStatus = 'pending';
            }

            // Create steps for delivery tracking
            const steps = createDeliverySteps(randomDeliveryStatus, orderDate, deliveryDate);

            // Generate driver info for in-transit orders
            let driverInfo = null;
            let currentLocation = null;
            if (randomDeliveryStatus === 'in_transit') {
                driverInfo = {
                    name: 'Ajith Fernando',
                    contact: '+94 755-123-456'
                };
                currentLocation = {
                    address: 'Galle Road, Colombo',
                    coordinates: { lat: 6.9271, lng: 79.8612 }
                };
            }

            return {
                id: `ORD-${1000 + i}`,
                farmerName: farmerNames[Math.floor(Math.random() * farmerNames.length)],
                farmerContact: `+94 7${Math.floor(Math.random() * 10000000)}`,
                farmerEmail: `farmer${i}@example.com`,
                items: orderItems,
                status: randomStatus,
                deliveryStatus: randomDeliveryStatus,
                paymentMethod: Math.random() > 0.5 ? 'Bank Transfer' : 'Cash on Delivery',
                totalPrice: `LKR ${totalPrice.toLocaleString()}`,
                numericPrice: totalPrice,
                createdAt: orderDate.toISOString(),
                deliveryDate: deliveryDate.toISOString(),
                pickupLocation: `${farmerNames[Math.floor(Math.random() * farmerNames.length)]} Farm, ${['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo'][Math.floor(Math.random() * 5)]}, Sri Lanka`,
                deliveryAddress: `Green Foods Market, 45 Temple Road, Kandy, Sri Lanka`,
                note: Math.random() > 0.7 ? 'Please call before delivery' : '',
                steps: steps,
                driverInfo: driverInfo,
                currentLocation: currentLocation,
                estimatedDeliveryTime: randomDeliveryStatus === 'in_transit' ? getEstimatedDeliveryTime() : null
            };
        });
    };

    // Create delivery tracking steps
    const createDeliverySteps = (status, orderDate, deliveryDate) => {
        const steps = [
            {
                label: 'Order Placed',
                status: 'completed',
                time: orderDate.toISOString()
            },
            {
                label: 'Order Confirmed',
                status: status === 'cancelled' ? 'pending' : 'completed',
                time: status === 'cancelled' ? null : new Date(orderDate.getTime() + (2 * 60 * 60 * 1000)).toISOString()
            },
            {
                label: 'Preparing',
                status: ['pending', 'cancelled'].includes(status) ? 'pending' : 'completed',
                time: ['pending', 'cancelled'].includes(status) ? null : new Date(orderDate.getTime() + (6 * 60 * 60 * 1000)).toISOString()
            },
            {
                label: 'Ready for Pickup',
                status: ['pending', 'cancelled', 'preparing'].includes(status) ? 'pending' : 'completed',
                time: ['pending', 'cancelled', 'preparing'].includes(status) ? null : new Date(orderDate.getTime() + (12 * 60 * 60 * 1000)).toISOString()
            },
            {
                label: 'In Transit',
                status: status === 'in_transit' ? 'current' : (status === 'delivered' ? 'completed' : 'pending'),
                time: ['in_transit', 'delivered'].includes(status) ? new Date(orderDate.getTime() + (18 * 60 * 60 * 1000)).toISOString() : null
            },
            {
                label: 'Delivered',
                status: status === 'delivered' ? 'completed' : 'pending',
                time: status === 'delivered' ? deliveryDate.toISOString() : null
            }
        ];

        return steps;
    };

    // Get estimated delivery time for in-transit orders
    const getEstimatedDeliveryTime = () => {
        const now = new Date();
        const randomMinutes = Math.floor(Math.random() * 120) + 30; // 30-150 minutes from now
        const eta = new Date(now.getTime() + (randomMinutes * 60 * 1000));
        return eta.toISOString();
    };

    // Filter orders
    const filteredOrders = orders.filter(order => {
        // Search by ID or farmer name
        if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !order.farmerName.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Filter by status
        if (filters.status && order.status !== filters.status) {
            return false;
        }

        // Filter by delivery status
        if (filters.deliveryStatus && order.deliveryStatus !== filters.deliveryStatus) {
            return false;
        }

        // Filter by date range
        if (filters.dateRange.start && filters.dateRange.end) {
            const orderDate = new Date(order.createdAt);
            const startDate = new Date(filters.dateRange.start);
            const endDate = new Date(filters.dateRange.end);

            // Set time to beginning/end of day for accurate comparison
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            if (orderDate < startDate || orderDate > endDate) {
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
            status: '',
            deliveryStatus: '',
            dateRange: { start: null, end: null }
        });
        setDateRange({ start: null, end: null });
        setSearchQuery('');
    };

    // Handle opening order detail modal
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
        setShowTracking(false); // Reset to order details view
    };

    // Handle showing delivery tracking
    const handleShowTracking = (order) => {
        setSelectedOrder(order);
        setSelectedDelivery({
            id: `DEL-${order.id.split('-')[1]}`,
            orderId: order.id,
            customerName: "Your Order",
            status: order.deliveryStatus,
            steps: order.steps,
            driverName: order.driverInfo?.name || null,
            driverContact: order.driverInfo?.contact || null,
            currentLocation: order.currentLocation,
            estimatedDeliveryTime: order.estimatedDeliveryTime,
            pickupLocation: {
                address: order.pickupLocation
            },
            dropoffLocation: {
                address: order.deliveryAddress
            },
            items: order.items
        });
        setIsModalOpen(true);
        setShowTracking(true);
    };

    // Handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
        // Delay clearing the data to prevent UI flicker during animation
        setTimeout(() => {
            setSelectedOrder(null);
            setSelectedDelivery(null);
        }, 300);
    };

    // Format date with or without time
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

    // Define the columns for orders table
    const orderColumns = [
        {
            field: 'id',
            header: 'Order ID',
            sortable: true,
            render: row => (
                <div className="font-medium text-gray-900">{row.id}</div>
            )
        },
        {
            field: 'farmerName',
            header: 'Farmer',
            sortable: true
        },
        {
            field: 'totalPrice',
            header: 'Total',
            sortable: true,
            render: row => (
                <div className="font-medium text-gray-900">{row.totalPrice}</div>
            )
        },
        {
            field: 'status',
            header: 'Status',
            sortable: true,
            render: row => <StatusBadge status={row.status} />
        },
        {
            field: 'deliveryStatus',
            header: 'Delivery',
            sortable: true,
            render: row => (
                <StatusBadge
                    status={
                        row.deliveryStatus === 'delivered' ? 'success' :
                            row.deliveryStatus === 'in_transit' ? 'processing' :
                                row.deliveryStatus === 'ready_for_pickup' ? 'warning' :
                                    row.deliveryStatus === 'cancelled' ? 'danger' :
                                        'pending'
                    }
                    label={row.deliveryStatus.replace('_', ' ')}
                />
            )
        },
        {
            field: 'createdAt',
            header: 'Order Date',
            sortable: true,
            render: row => (
                <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={14} className="mr-1" />
                    {formatDate(row.createdAt)}
                </div>
            )
        }
    ];

    // Define row actions
    const rowActions = [
        {
            label: 'View Details',
            icon: <Eye size={16} />,
            onClick: handleViewOrder
        },
        {
            label: 'Track Order',
            icon: <Truck size={16} />,
            onClick: handleShowTracking,
            // Only show tracking for orders that are being delivered
            condition: (row) => ['preparing', 'ready_for_pickup', 'in_transit'].includes(row.deliveryStatus)
        }
    ];

    return (
        <div className="min-h-screen space-y-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-600 mt-1">Track and manage your purchases from farmers</p>
                </div>
            </div>

            {/* Order statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Total Orders</span>
                            <span className="text-2xl font-bold text-gray-900">{orderStats.total}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-golden-brown-100 flex items-center justify-center">
                            <ShoppingCart size={24} className="text-golden-brown-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Pending</span>
                            <span className="text-2xl font-bold text-gray-900">{orderStats.pending}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Clock size={24} className="text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">In Transit</span>
                            <span className="text-2xl font-bold text-gray-900">{orderStats.inTransit}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Truck size={24} className="text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Completed</span>
                            <span className="text-2xl font-bold text-gray-900">{orderStats.completed}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle size={24} className="text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Total Spent</span>
                            <span className="text-2xl font-bold text-gray-900">LKR {orderStats.value.toLocaleString()}</span>
                            <span className="text-xs mt-1 flex items-center text-green-600">
                                <ArrowUpRight size={14} className="mr-1" />
                                <span>+12% from last month</span>
                            </span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <CircleDollarSign size={24} className="text-purple-600" />
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
                            placeholder="Search by order ID or farmer name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            iconLeft={<Search size={18} className="text-gray-400" />}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {/* Status filter */}
                        <FormSelect
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            options={[
                                { value: '', label: 'All Statuses' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'processing', label: 'Processing' },
                                { value: 'completed', label: 'Completed' },
                                { value: 'cancelled', label: 'Cancelled' }
                            ]}
                        />

                        {/* Delivery status filter */}
                        <FormSelect
                            value={filters.deliveryStatus}
                            onChange={(e) => handleFilterChange('deliveryStatus', e.target.value)}
                            options={[
                                { value: '', label: 'All Deliveries' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'preparing', label: 'Preparing' },
                                { value: 'ready_for_pickup', label: 'Ready for Pickup' },
                                { value: 'in_transit', label: 'In Transit' },
                                { value: 'delivered', label: 'Delivered' },
                                { value: 'cancelled', label: 'Cancelled' }
                            ]}
                        />

                        {/* Date range picker */}
                        <div className="relative col-span-1 sm:col-span-2">
                            <DateRangePicker
                                startDate={dateRange.start}
                                endDate={dateRange.end}
                                onChange={handleDateRangeChange}
                                placeholder="Filter by date range"
                                icon={<CalendarRange size={16} />}
                            />
                        </div>
                    </div>
                    <button
                        onClick={clearFilters}
                        className="inline-flex items-center px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-golden-brown-500"
                    >
                        <RefreshCw size={16} className="mr-2" />
                        Clear
                    </button>
                </div>
            </div>

            {/* Orders table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <DataTable
                    columns={orderColumns}
                    data={filteredOrders}
                    rowActions={rowActions}
                    emptyMessage="No orders found matching your criteria"
                    isLoading={loading}
                    itemsPerPage={10}
                />
            </div>

            {/* Order Detail Modal */}
            <DetailModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={showTracking
                    ? `Order Tracking: ${selectedOrder?.id}`
                    : selectedOrder ? `Order Details: ${selectedOrder.id}` : 'Order Details'}
                size="lg"
            >
                {/* Order tracking view */}
                {showTracking && selectedDelivery && (
                    <DeliveryTrackingPanel delivery={selectedDelivery} formatTime={formatTime} />
                )}

                {/* Order details view */}
                {!showTracking && selectedOrder && (
                    <div className="space-y-6">
                        {/* Order summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <User size={16} className="mr-2 text-gray-500" />
                                    <h4 className="text-sm font-medium text-gray-500">Farmer</h4>
                                </div>
                                <p className="text-gray-900 font-medium">{selectedOrder.farmerName}</p>
                                <p className="text-gray-500 text-sm mt-1">{selectedOrder.farmerContact}</p>
                                <p className="text-gray-500 text-sm">{selectedOrder.farmerEmail}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <Truck size={16} className="mr-2 text-gray-500" />
                                    <h4 className="text-sm font-medium text-gray-500">Delivery Details</h4>
                                </div>
                                <p className="text-gray-900">{formatDate(selectedOrder.deliveryDate)}</p>
                                <p className="text-gray-500 text-sm mt-1">{selectedOrder.deliveryAddress}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <Clock size={16} className="mr-2 text-gray-500" />
                                    <h4 className="text-sm font-medium text-gray-500">Order Date</h4>
                                </div>
                                <p className="text-gray-900">{formatDate(selectedOrder.createdAt, true)}</p>
                                <p className="text-gray-500 text-sm mt-1">Payment: {selectedOrder.paymentMethod}</p>
                            </div>
                        </div>

                        {/* Status and tracking button */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <h4 className="font-medium text-gray-700 mr-2">Order Status:</h4>
                                    <StatusBadge status={selectedOrder.status} />
                                </div>
                                <div className="flex items-center mt-1">
                                    <h4 className="font-medium text-gray-700 mr-2">Delivery Status:</h4>
                                    <StatusBadge
                                        status={
                                            selectedOrder.deliveryStatus === 'delivered' ? 'success' :
                                                selectedOrder.deliveryStatus === 'in_transit' ? 'processing' :
                                                    selectedOrder.deliveryStatus === 'ready_for_pickup' ? 'warning' :
                                                        selectedOrder.deliveryStatus === 'cancelled' ? 'danger' :
                                                            'pending'
                                        }
                                        label={selectedOrder.deliveryStatus.replace('_', ' ')}
                                    />
                                </div>
                            </div>
                            {['preparing', 'ready_for_pickup', 'in_transit'].includes(selectedOrder.deliveryStatus) && (
                                <button
                                    onClick={() => handleShowTracking(selectedOrder)}
                                    className="px-3 py-1 bg-golden-brown-600 text-white rounded text-sm hover:bg-golden-brown-700 flex items-center"
                                >
                                    <Truck size={14} className="mr-1" />
                                    Track Delivery
                                </button>
                            )}
                        </div>

                        {/* Order items */}
                        <div>
                            <h4 className="font-medium text-gray-800 mb-3">Order Items</h4>
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Item
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Quantity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price (Per Unit)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedOrder.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.pricePerUnit}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.totalPrice}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                                                Total:
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                                                {selectedOrder.totalPrice}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* Pickup & Delivery Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Pickup information */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-3">Pickup Information</h4>
                                <div className="flex items-start mb-3">
                                    <MapPin size={18} className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-800 font-medium">Farm Location</p>
                                        <p className="text-gray-600">{selectedOrder.pickupLocation}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Package size={18} className="mr-2 text-gray-500" />
                                    <div>
                                        <p className="text-gray-800 font-medium">Items</p>
                                        <p className="text-gray-600">{selectedOrder.items.length} items, {selectedOrder.items.map(i => i.name).join(', ')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery information */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-3">Delivery Information</h4>
                                <div className="flex items-start mb-3">
                                    <MapPin size={18} className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-800 font-medium">Delivery Address</p>
                                        <p className="text-gray-600">{selectedOrder.deliveryAddress}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock size={18} className="mr-2 text-gray-500" />
                                    <div>
                                        <p className="text-gray-800 font-medium">Expected Delivery</p>
                                        <p className="text-gray-600">{formatDate(selectedOrder.deliveryDate, true)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {selectedOrder.note && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">Order Notes</h4>
                                <p className="text-gray-600">{selectedOrder.note}</p>
                            </div>
                        )}
                    </div>
                )}

                {!selectedOrder && !selectedDelivery && (
                    <div className="py-8 text-center text-gray-500">Loading order details...</div>
                )}
            </DetailModal>
        </div>
    );
};

export default MyOrders;