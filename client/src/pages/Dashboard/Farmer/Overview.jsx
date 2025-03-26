import React, { useState, useEffect } from 'react';
import {
    Package,
    ShoppingCart,
    TrendingUp,
    Truck,
    Clock,
    Eye,
    User,
    Tag,
    MapPin,
    CreditCard,
    Sun,
    Moon,
    Sunrise,
    Sunset,
    Coffee
} from 'lucide-react';
import { DataTable, StatusBadge } from '../../../components/Dashboard/DataTable';
import DetailModal from '../../../components/Shared/DetailModal';
import WelcomeHeader from '../../../components/Dashboard/WelcomeHeader';

const MetricCard = ({ title, value, icon, trend, change, color = 'blue' }) => {
    // Determine trend arrow and color
    const getTrendIcon = () => {
        if (trend === 'up') return <span className="text-green-600">↑</span>;
        if (trend === 'down') return <span className="text-red-600">↓</span>;
        return null;
    };

    // Define color classes
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-700 border-blue-200',
        green: 'bg-green-50 text-green-700 border-green-200',
        amber: 'bg-amber-50 text-amber-700 border-amber-200',
        purple: 'bg-purple-50 text-purple-700 border-purple-200',
    };

    return (
        <div className={`p-6 rounded-lg border ${colorClasses[color] || 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium opacity-80">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                    {change && (
                        <p className="text-xs mt-2 flex items-center">
                            {getTrendIcon()}
                            <span className={trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}>
                                {change}
                            </span>
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${colorClasses[color] || 'bg-gray-100'}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

const Overview = () => {
    // Added state for modal control
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userName, setUserName] = useState('Siripala');

    // Helper function to format currency
    const formatCurrency = (value) => {
        // Replace ₹ with LKR if it exists in the string
        if (typeof value === 'string' && value.includes('₹')) {
            return value.replace('₹', 'LKR ');
        }
        return `LKR ${value}`;
    };

    // Sample data - to be replaced with actual API calls
    const metrics = [
        {
            title: 'Active Crops',
            value: '24',
            change: '+5% from last month',
            trend: 'up',
            icon: <Package size={20} />,
            color: 'green'
        },
        {
            title: 'Pending Orders',
            value: '12',
            change: '+2 since yesterday',
            trend: 'up',
            icon: <ShoppingCart size={20} />,
            color: 'blue'
        },
        {
            title: 'Revenue This Month',
            value: 'LKR 42,500',  // Updated from ₹ to LKR
            change: '+18% vs last month',
            trend: 'up',
            icon: <TrendingUp size={20} />,
            color: 'purple'
        },
        {
            title: 'Deliveries Today',
            value: '3',
            change: 'same as yesterday',
            trend: 'neutral',
            icon: <Truck size={20} />,
            color: 'amber'
        }
    ];

    const recentOrdersData = [
        {
            id: 'ORD-001',
            buyerName: 'Green Foods Inc.',
            items: [{ name: 'Rice', quantity: '300kg' }],
            status: 'processing',
            paymentStatus: 'verified',
            totalPrice: 'LKR 15,000',  // Updated from ₹ to LKR
            createdAt: '2023-03-20'
        },
        {
            id: 'ORD-002',
            buyerName: 'Fresh Mart',
            items: [{ name: 'Wheat', quantity: '500kg' }],
            status: 'pending',
            paymentStatus: 'pending',
            totalPrice: 'LKR 22,500',  // Updated from ₹ to LKR
            createdAt: '2023-03-19'
        },
        {
            id: 'ORD-003',
            buyerName: 'Organic Foods Ltd',
            items: [{ name: 'Corn', quantity: '200kg' }],
            status: 'success',
            paymentStatus: 'verified',
            totalPrice: 'LKR 8,000',  // Updated from ₹ to LKR
            createdAt: '2023-03-17'
        }
    ];

    const orderColumns = [
        {
            field: 'id',
            header: 'Order ID',
            render: row => (
                <div className="font-medium text-gray-900">{row.id}</div>
            )
        },
        { field: 'buyerName', header: 'Buyer' },
        {
            field: 'status',
            header: 'Status',
            render: row => <StatusBadge status={row.status} />
        },
        {
            field: 'paymentStatus',
            header: 'Payment',
            render: row => (
                <StatusBadge
                    status={row.paymentStatus === 'verified' ? 'success' : 'pending'}
                    label={row.paymentStatus}
                />
            )
        },
        {
            field: 'totalPrice',
            header: 'Total',
            render: row => (
                <div className="font-medium">{row.totalPrice}</div>
            )
        },
        {
            field: 'createdAt',
            header: 'Order Date',
            render: row => (
                <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={14} className="mr-1" />
                    {row.createdAt}
                </div>
            )
        }
    ];

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Optional: delay clearing the data to prevent UI flicker during close animation
        setTimeout(() => setSelectedOrder(null), 300);
    };

    const rowActions = [
        {
            label: 'View',
            icon: <Eye size={16} />,
            onClick: handleViewOrder
        }
    ];

    // Format date helper function
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="min-h-screen space-y-6">
            {/* Welcome Header */}
            <WelcomeHeader userName={userName} userRole='farmer' />

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, idx) => (
                    <MetricCard
                        key={idx}
                        title={metric.title}
                        value={metric.value}
                        change={metric.change}
                        trend={metric.trend}
                        icon={metric.icon}
                        color={metric.color}
                    />
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                    <button
                        onClick={() => console.log('Navigate to orders page')}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        View All Orders
                    </button>
                </div>
                <DataTable
                    columns={orderColumns}
                    data={recentOrdersData}
                    rowActions={rowActions}
                    emptyMessage="No recent orders found"
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
                                <p className="text-gray-900">{selectedOrder.buyerName}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <Tag size={16} className="mr-2 text-gray-500" />
                                    <h4 className="text-sm font-medium text-gray-500">Total Amount</h4>
                                </div>
                                <p className="text-gray-900 font-medium">{selectedOrder.totalPrice}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <Clock size={16} className="mr-2 text-gray-500" />
                                    <h4 className="text-sm font-medium text-gray-500">Order Date</h4>
                                </div>
                                <p className="text-gray-900">{formatDate(selectedOrder.createdAt)}</p>
                            </div>
                        </div>

                        {/* Status information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-3">Order Status</h4>
                                <div className="flex items-center">
                                    <StatusBadge status={selectedOrder.status} />
                                    <span className="ml-2">
                                        {selectedOrder.status === 'processing' ? 'Your order is being processed' :
                                            selectedOrder.status === 'pending' ? 'Waiting for confirmation' :
                                                selectedOrder.status === 'success' ? 'Successfully delivered' : 'Unknown status'}
                                    </span>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-3">Payment Status</h4>
                                <div className="flex items-center">
                                    <CreditCard size={18} className="mr-2 text-gray-600" />
                                    <StatusBadge
                                        status={selectedOrder.paymentStatus === 'verified' ? 'success' : 'pending'}
                                        label={selectedOrder.paymentStatus}
                                    />
                                </div>
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Delivery information would go here */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-3">Delivery Information</h4>
                            <div className="flex items-start">
                                <MapPin size={18} className="mr-2 text-gray-600 mt-0.5" />
                                <div>
                                    <p className="text-gray-800">Delivery Address</p>
                                    <p className="text-gray-500 text-sm">
                                        {/* Updated to reflect Sri Lankan location */}
                                        123 Market Street, Colombo, Sri Lanka, 10100
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 text-center text-gray-500">Loading order details...</div>
                )}
            </DetailModal>
        </div>
    );
};

export default Overview;