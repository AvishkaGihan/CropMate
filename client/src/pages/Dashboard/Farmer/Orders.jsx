import React, { useState, useEffect } from 'react';
import {
    ShoppingCart,
    Clock,
    User,
    Truck,
    ArrowUpRight,
    Search,
    Filter,
    Eye,
    CheckCircle,
    Download,
    CalendarRange,
    RefreshCw
} from 'lucide-react';
import { DataTable, StatusBadge } from '../../../components/Dashboard/DataTable';
import DetailModal from '../../../components/Shared/DetailModal';
import { FormInput, FormSelect } from '../../../components/Shared/Form';
import { DateRangePicker } from '../../../components/Dashboard/Forms';

const Orders = () => {
    // State management
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        paymentStatus: '',
        dateRange: { start: null, end: null }
    });
    const [orderStats, setOrderStats] = useState({
        total: 0,
        pending: 0,
        processing: 0,
        completed: 0,
        revenue: 0
    });

    // Fetch orders data (mock implementation)
    useEffect(() => {
        // Simulating API call
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
            completed: ordersData.filter(order => order.status === 'success').length,
            revenue: ordersData.reduce((total, order) => {
                // Extract numeric value from price string (e.g., "LKR 15,000" -> 15000)
                const price = parseFloat(order.totalPrice.replace(/[^0-9.-]+/g, ""));
                return total + price;
            }, 0)
        };
        setOrderStats(stats);
    };

    // Generate mock order data
    const generateMockOrders = () => {
        const statuses = ['pending', 'processing', 'success', 'cancelled'];
        const paymentStatuses = ['pending', 'verified', 'failed'];
        const buyerNames = [
            'Green Foods Inc.', 'Fresh Mart', 'Organic Foods Ltd',
            'Colombo Grocers', 'Kandy Fresh Market', 'Farm to Table Co.',
            'Sri Lankan Exports', 'Natural Harvest', 'Galle Superstore'
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

            // Set status and payment status with some logic
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            let randomPaymentStatus;
            if (randomStatus === 'cancelled') {
                randomPaymentStatus = 'failed';
            } else if (randomStatus === 'success') {
                randomPaymentStatus = 'verified';
            } else {
                randomPaymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
            }

            return {
                id: `ORD-${1000 + i}`,
                buyerName: buyerNames[Math.floor(Math.random() * buyerNames.length)],
                buyerContact: `+94 7${Math.floor(Math.random() * 10000000)}`,
                buyerEmail: `buyer${i}@example.com`,
                items: orderItems,
                status: randomStatus,
                paymentStatus: randomPaymentStatus,
                paymentMethod: Math.random() > 0.5 ? 'Bank Transfer' : 'Cash on Delivery',
                totalPrice: `LKR ${totalPrice.toLocaleString()}`,
                numericPrice: totalPrice,
                createdAt: orderDate.toISOString(),
                deliveryDate: deliveryDate.toISOString(),
                deliveryAddress: `${Math.floor(Math.random() * 100) + 1} ${['Main St', 'Temple Rd', 'Lake View', 'Hill St', 'Beach Rd'][Math.floor(Math.random() * 5)]}, ${['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Trincomalee'][Math.floor(Math.random() * 5)]}, Sri Lanka`,
                note: Math.random() > 0.7 ? 'Please deliver in the morning.' : ''
            };
        });
    };

    // Filter orders
    const filteredOrders = orders.filter(order => {
        // Search by ID or buyer name
        if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !order.buyerName.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Filter by status
        if (filters.status && order.status !== filters.status) {
            return false;
        }

        // Filter by payment status
        if (filters.paymentStatus && order.paymentStatus !== filters.paymentStatus) {
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
            paymentStatus: '',
            dateRange: { start: null, end: null }
        });
        setDateRange({ start: null, end: null });
        setSearchQuery('');
    };

    // Handle opening order detail modal
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // Handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
        // Delay clearing the data to prevent UI flicker during animation
        setTimeout(() => setSelectedOrder(null), 300);
    };

    // Update order status
    const updateOrderStatus = (orderId, newStatus) => {
        // Here you would make an API call to update the order status
        console.log(`Updating order ${orderId} to status: ${newStatus}`);

        // For demo, update the local state
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });

        setOrders(updatedOrders);
        calculateOrderStats(updatedOrders);

        // If we're updating the currently selected order, update that too
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    // Format date with or without time
    const formatDate = (dateString, includeTime = false) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                ...(includeTime && { hour: '2-digit', minute: '2-digit' })
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
            field: 'buyerName',
            header: 'Buyer',
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
            field: 'paymentStatus',
            header: 'Payment',
            sortable: true,
            render: row => (
                <StatusBadge
                    status={row.paymentStatus === 'verified' ? 'success' : row.paymentStatus === 'failed' ? 'danger' : 'pending'}
                    label={row.paymentStatus}
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
        }
    ];

    return (
        <div className="min-h-screen space-y-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                    <p className="text-gray-600 mt-1">Track and manage your crop orders</p>
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
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <ShoppingCart size={24} className="text-blue-600" />
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
                            <span className="text-sm text-gray-500">Processing</span>
                            <span className="text-2xl font-bold text-gray-900">{orderStats.processing}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Truck size={24} className="text-purple-600" />
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
                            <span className="text-sm text-gray-500">Total Revenue</span>
                            <span className="text-2xl font-bold text-gray-900">LKR {orderStats.revenue.toLocaleString()}</span>
                            <span className="text-xs mt-1 flex items-center text-green-600">
                                <ArrowUpRight size={14} className="mr-1" />
                                <span>+15% from last month</span>
                            </span>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <ShoppingCart size={24} className="text-green-600" />
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
                            placeholder="Search by order ID or buyer name..."
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
                                { value: 'success', label: 'Completed' },
                                { value: 'cancelled', label: 'Cancelled' }
                            ]}
                        />

                        {/* Payment status filter */}
                        <FormSelect
                            value={filters.paymentStatus}
                            onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                            options={[
                                { value: '', label: 'All Payments' },
                                { value: 'verified', label: 'Verified' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'failed', label: 'Failed' }
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
                        className="inline-flex items-center px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
                title={selectedOrder ? `Order Details: ${selectedOrder.id}` : 'Order Details'}
                size="lg"
            >
                {selectedOrder ? (
                    <div className="space-y-6">
                        {/* Order summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <User size={16} className="mr-2 text-gray-500" />
                                    <h4 className="text-sm font-medium text-gray-500">Buyer</h4>
                                </div>
                                <p className="text-gray-900 font-medium">{selectedOrder.buyerName}</p>
                                <p className="text-gray-500 text-sm mt-1">{selectedOrder.buyerContact}</p>
                                <p className="text-gray-500 text-sm">{selectedOrder.buyerEmail}</p>
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

                        {/* Status and action buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <h4 className="font-medium text-gray-700 mr-2">Order Status:</h4>
                                    <StatusBadge status={selectedOrder.status} />
                                </div>
                                <div className="flex items-center mt-1">
                                    <h4 className="font-medium text-gray-700 mr-2">Payment Status:</h4>
                                    <StatusBadge
                                        status={selectedOrder.paymentStatus === 'verified' ? 'success' : selectedOrder.paymentStatus === 'failed' ? 'danger' : 'pending'}
                                        label={selectedOrder.paymentStatus}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {selectedOrder.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                                            className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                                        >
                                            Process Order
                                        </button>
                                        <button
                                            onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                                {selectedOrder.status === 'processing' && (
                                    <button
                                        onClick={() => updateOrderStatus(selectedOrder.id, 'success')}
                                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                                    >
                                        Mark as Completed
                                    </button>
                                )}
                            </div>
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

                        {/* Notes */}
                        {selectedOrder.note && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">Customer Notes</h4>
                                <p className="text-gray-600">{selectedOrder.note}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-8 text-center text-gray-500">Loading order details...</div>
                )}
            </DetailModal>
        </div>
    );
};

export default Orders;