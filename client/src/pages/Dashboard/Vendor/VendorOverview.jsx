import React, { useState, useEffect } from 'react';
import {
    ShoppingBag,
    Package,
    Truck,
    TrendingUp,
    Clock,
    Eye,
    User,
    MapPin,
    CircleDollarSign,
    ShoppingCart,
    CircleCheck,
    AlertCircle
} from 'lucide-react';
import { DataTable, StatusBadge } from '../../../components/Dashboard/DataTable';
import DetailModal from '../../../components/Shared/DetailModal';
import WelcomeHeader from '../../../components/Dashboard/WelcomeHeader';
import { FormSelect } from '../../../components/Shared/Form';
import DeliveryTrackingPanel from './DeliveryTrackingPanel';

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
        golden: 'bg-golden-brown-50 text-golden-brown-700 border-golden-brown-200',
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

const VendorOverview = () => {
    // State for the dashboard
    const [userName, setUserName] = useState('Vendor');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orderTimeframe, setOrderTimeframe] = useState('today');

    // Sample orders data
    const [recentOrders, setRecentOrders] = useState([]);
    const [activeDeliveries, setActiveDeliveries] = useState([]);

    // Fetch data on component mount
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setUserName('Green Foods Market');
            setRecentOrders(generateMockOrders());
            setActiveDeliveries(generateMockDeliveries());
            setLoading(false);
        }, 800);
    }, []);

    // Generate mock orders
    const generateMockOrders = () => {
        return Array(5).fill().map((_, i) => ({
            id: `ORD-${2000 + i}`,
            customerName: `Customer ${i + 1}`,
            items: [{ name: ['Rice', 'Wheat', 'Vegetables', 'Coconuts', 'Tea'][i % 5], quantity: `${Math.floor(Math.random() * 10) + 5}kg` }],
            status: ['processing', 'pending', 'completed', 'processing', 'pending'][i],
            paymentStatus: ['verified', 'pending', 'verified', 'verified', 'pending'][i],
            totalPrice: `LKR ${(Math.floor(Math.random() * 5000) + 1000).toLocaleString()}`,
            createdAt: new Date(Date.now() - (i * 86400000)).toISOString(),
            deliveryStatus: ['preparing', 'in_transit', 'delivered', 'pending', 'preparing'][i]
        }));
    };

    // Generate mock deliveries with tracking info
    const generateMockDeliveries = () => {
        return Array(4).fill().map((_, i) => {
            const status = ['preparing', 'ready_for_pickup', 'in_transit', 'delivered'][i];
            const now = new Date();

            // Create delivery timeline steps
            const steps = [
                {
                    label: 'Order Placed',
                    status: 'completed',
                    time: new Date(now - (24 * 60 * 60 * 1000)).toISOString()
                },
                {
                    label: 'Order Confirmed',
                    status: 'completed',
                    time: new Date(now - (20 * 60 * 60 * 1000)).toISOString()
                },
                {
                    label: 'Preparing',
                    status: i >= 0 ? 'completed' : 'pending',
                    time: i >= 0 ? new Date(now - (15 * 60 * 60 * 1000)).toISOString() : null
                },
                {
                    label: 'Ready for Pickup',
                    status: i >= 1 ? 'completed' : 'pending',
                    time: i >= 1 ? new Date(now - (10 * 60 * 60 * 1000)).toISOString() : null
                },
                {
                    label: 'In Transit',
                    status: i >= 2 ? 'completed' : 'pending',
                    time: i >= 2 ? new Date(now - (5 * 60 * 60 * 1000)).toISOString() : null
                },
                {
                    label: 'Delivered',
                    status: i >= 3 ? 'completed' : 'pending',
                    time: i >= 3 ? new Date(now - (2 * 60 * 60 * 1000)).toISOString() : null
                }
            ];

            // Calculate ETA based on status
            let eta = null;
            if (i < 3) {
                const hoursToAdd = 3 - i;
                eta = new Date(now.getTime() + (hoursToAdd * 60 * 60 * 1000));
            }

            return {
                id: `DEL-${3000 + i}`,
                orderId: `ORD-${2000 + i}`,
                customerName: `Customer ${i + 1}`,
                status,
                steps,
                driverName: i >= 2 ? 'Ajith Fernando' : null,
                driverContact: i >= 2 ? '+94 755-123-456' : null,
                currentLocation: i === 2 ? {
                    address: 'Galle Road, Colombo',
                    coordinates: { lat: 6.9271, lng: 79.8612 }
                } : null,
                estimatedDeliveryTime: eta,
                pickupLocation: {
                    address: 'Green Foods Market, 45 Temple Road, Kandy',
                    coordinates: { lat: 7.2906, lng: 80.6337 }
                },
                dropoffLocation: {
                    address: `${123 + i} Main St, ${['Colombo', 'Kandy', 'Galle', 'Negombo'][i % 4]}`,
                    coordinates: { lat: 6.9271, lng: 79.8612 }
                },
                items: [{
                    name: ['Rice', 'Wheat', 'Vegetables', 'Coconuts'][i % 4],
                    quantity: `${Math.floor(Math.random() * 10) + 5}kg`
                }]
            };
        });
    };

    // Format date helper function
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
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

    // Format time helper function
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

    // Calculate dashboard metrics
    const metrics = [
        {
            title: 'Total Orders Today',
            value: '24',
            change: '+5 from yesterday',
            trend: 'up',
            icon: <ShoppingBag size={20} />,
            color: 'golden'
        },
        {
            title: 'Active Deliveries',
            value: '8',
            change: '3 arriving soon',
            trend: 'neutral',
            icon: <Truck size={20} />,
            color: 'amber'
        },
        {
            title: 'Revenue Today',
            value: 'LKR 86,500',
            change: '+18% vs yesterday',
            trend: 'up',
            icon: <TrendingUp size={20} />,
            color: 'purple'
        },
        {
            title: 'Inventory Items',
            value: '152',
            change: '12 low stock',
            trend: 'down',
            icon: <Package size={20} />,
            color: 'blue'
        }
    ];

    // Define orders table columns
    const orderColumns = [
        {
            field: 'id',
            header: 'Order ID',
            render: row => (
                <div className="font-medium text-gray-900">{row.id}</div>
            )
        },
        { field: 'customerName', header: 'Customer' },
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
            field: 'deliveryStatus',
            header: 'Delivery',
            render: row => (
                <StatusBadge
                    status={
                        row.deliveryStatus === 'delivered' ? 'success' :
                            row.deliveryStatus === 'in_transit' ? 'processing' :
                                row.deliveryStatus === 'ready_for_pickup' ? 'warning' :
                                    'pending'
                    }
                    label={row.deliveryStatus}
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
                    {formatDate(row.createdAt)}
                </div>
            )
        }
    ];

    // Row actions for orders table
    const rowActions = [
        {
            label: 'View',
            icon: <Eye size={16} />,
            onClick: handleViewOrder
        }
    ];

    // Handle viewing order details
    function handleViewOrder(order) {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }

    // Close modal handler
    const closeModal = () => {
        setIsModalOpen(false);
        // Optional: delay clearing the data to prevent UI flicker during close animation
        setTimeout(() => setSelectedOrder(null), 300);
    };

    // Define active deliveries for tracking section
    const activeDeliveryForTracking = activeDeliveries.find(d => d.status === 'in_transit') || activeDeliveries[0];

    // Quick stats for welcome header
    const quickStats = [
        {
            label: 'Today\'s Orders',
            value: '24 orders',
            icon: <ShoppingCart size={18} className="text-golden-brown-600" />,
            iconBg: 'bg-golden-brown-50'
        },
        {
            label: 'Revenue',
            value: 'LKR 86,500',
            icon: <CircleDollarSign size={18} className="text-green-600" />,
            iconBg: 'bg-green-50'
        },
        {
            label: 'Order Fulfillment',
            value: '92% on time',
            icon: <CircleCheck size={18} className="text-blue-600" />,
            iconBg: 'bg-blue-50'
        }
    ];

    return (
        <div className="min-h-screen space-y-6">
            {/* Welcome Header */}
            <WelcomeHeader
                userName={userName}
                userRole="vendor"
                quickStats={quickStats}
            />

            {/* Metrics Dashboard */}
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

            {/* Delivery Tracking Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Delivery Tracking</h2>
                    <button
                        onClick={() => console.log('Navigate to all deliveries')}
                        className="text-sm text-golden-brown-600 hover:text-golden-brown-800"
                    >
                        View All Deliveries
                    </button>
                </div>

                {activeDeliveryForTracking ? (
                    <DeliveryTrackingPanel delivery={activeDeliveryForTracking} formatTime={formatTime} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Truck size={48} className="text-gray-300 mb-4" />
                        <p className="text-gray-500">No active deliveries at the moment</p>
                    </div>
                )}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                    <div className="flex items-center space-x-2">
                        <FormSelect
                            value={orderTimeframe}
                            onChange={(e) => setOrderTimeframe(e.target.value)}
                            options={[
                                { value: 'today', label: 'Today' },
                                { value: 'week', label: 'This Week' },
                                { value: 'month', label: 'This Month' }
                            ]}
                            className="text-sm min-w-[120px]"
                        />
                        <button
                            onClick={() => console.log('Navigate to orders page')}
                            className="text-sm text-golden-brown-600 hover:text-golden-brown-800"
                        >
                            View All Orders
                        </button>
                    </div>
                </div>
                <DataTable
                    columns={orderColumns}
                    data={recentOrders}
                    rowActions={rowActions}
                    emptyMessage="No recent orders found"
                    isLoading={loading}
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
                                    <h4 className="text-sm font-medium text-gray-500">Customer</h4>
                                </div>
                                <p className="text-gray-900">{selectedOrder.customerName}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <CircleDollarSign size={16} className="mr-2 text-gray-500" />
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
                                        {selectedOrder.status === 'processing' ? 'Order is being processed' :
                                            selectedOrder.status === 'pending' ? 'Waiting for processing' :
                                                selectedOrder.status === 'completed' ? 'Order completed' : 'Unknown status'}
                                    </span>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-3">Payment Status</h4>
                                <div className="flex items-center">
                                    <CircleDollarSign size={18} className="mr-2 text-gray-600" />
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

                        {/* Delivery information */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-3">Delivery Information</h4>
                            <div className="flex items-start">
                                <MapPin size={18} className="mr-2 text-gray-600 mt-0.5" />
                                <div>
                                    <p className="text-gray-800">Delivery Address</p>
                                    <p className="text-gray-500 text-sm">
                                        123 Market Street, Colombo, Sri Lanka, 10100
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <StatusBadge
                                    status={
                                        selectedOrder.deliveryStatus === 'delivered' ? 'success' :
                                            selectedOrder.deliveryStatus === 'in_transit' ? 'processing' :
                                                selectedOrder.deliveryStatus === 'ready_for_pickup' ? 'warning' :
                                                    'pending'
                                    }
                                    label={selectedOrder.deliveryStatus}
                                />
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

export default VendorOverview;