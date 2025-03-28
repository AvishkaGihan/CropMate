import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
    ShoppingBag,
    User,
    MapPin,
    CreditCard,
    Truck,
    ArrowLeft,
    Check,
    Upload,
    Info,
    AlertCircle,
    Loader,
    X
} from 'lucide-react';
import { FormInput, FormSelect, FormTextarea } from '../../components/Shared/Form';

const OrderNow = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product, quantity = 1, totalPrice = 0 } = location.state || {};

    // State management
    const [orderDetails, setOrderDetails] = useState({
        deliveryAddress: '',
        paymentMethod: 'bank_transfer',
        note: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentSlip, setPaymentSlip] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [errors, setErrors] = useState({});
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');

    // Mock user data (in a real app, this would come from auth context)
    const [user, setUser] = useState({
        id: 'user123',
        name: 'Green Foods Market',
        email: 'market@example.com',
        role: 'vendor',
        defaultAddress: '45 Temple Road, Kandy, Sri Lanka'
    });

    // Mock farmer data (in a real app, this would be fetched based on the product)
    const [farmer, setFarmer] = useState({
        id: 'farmer456',
        name: 'Organic Farm Co.',
        location: 'Colombo, Sri Lanka'
    });

    // Redirect if no product data
    useEffect(() => {
        if (!product && !location.state) {
            navigate('/marketplace');
        } else if (product) {
            // Auto-fill address if available
            setOrderDetails(prev => ({
                ...prev,
                deliveryAddress: user.defaultAddress || ''
            }));
        }
    }, [product, location.state, navigate, user.defaultAddress]);

    // Handle file upload for payment slip
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPaymentSlip(file);
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
            // Clear any previous error
            setErrors(prev => ({ ...prev, paymentSlip: '' }));
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!orderDetails.deliveryAddress.trim()) {
            newErrors.deliveryAddress = 'Delivery address is required';
        }

        if (orderDetails.paymentMethod === 'bank_transfer' && !paymentSlip) {
            newErrors.paymentSlip = 'Payment slip is required for bank transfers';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle order submission
    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // In a real app, this would be an API call to create the order
            // For now, we'll simulate an API call with setTimeout
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate a mock order ID
            const mockOrderId = `ORD-${Math.floor(Math.random() * 10000)}`;
            setOrderId(mockOrderId);
            setOrderSuccess(true);

        } catch (error) {
            console.error('Error submitting order:', error);
            setErrors(prev => ({
                ...prev,
                submit: 'There was a problem submitting your order. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Navigate back to marketplace
    const handleBackToShopping = () => {
        navigate('/marketplace');
    };

    // Handle order cancellation
    const handleCancelOrder = () => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            navigate('/marketplace');
        }
    };

    // If no product data available
    if (!product && !location.state) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center">
                    <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Product Selected</h2>
                    <p className="text-gray-600 mb-6">Please select a product from the marketplace to place an order.</p>
                    <button
                        onClick={() => navigate('/marketplace')}
                        className="px-6 py-3 bg-golden-brown-600 text-white rounded-lg font-medium"
                    >
                        Go to Marketplace
                    </button>
                </div>
            </div>
        );
    }

    // Order success page
    if (orderSuccess) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
                    <p className="text-gray-600 mb-6">Your order has been received and is being processed.</p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-medium text-gray-800 mb-2">Order Information</h3>
                        <p className="text-gray-600">Order ID: <span className="font-medium text-gray-900">{orderId}</span></p>
                        <p className="text-gray-600">Total Amount: <span className="font-medium text-gray-900">LKR {totalPrice.toLocaleString()}</span></p>
                        <p className="text-gray-600">Status: <span className="text-amber-600 font-medium">Processing</span></p>
                    </div>

                    <p className="text-sm text-gray-500 mb-8">
                        We'll notify you when your order is on its way. You can also check the status in your order history.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard/vendor/my-orders')}
                            className="px-6 py-3 bg-golden-brown-600 text-white rounded-lg font-medium"
                        >
                            View My Orders
                        </button>
                        <button
                            onClick={handleBackToShopping}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Complete Your Order</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={18} className="mr-1" />
                    Back
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmitOrder}>
                        {/* Delivery Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                            <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                                <MapPin size={20} className="mr-2 text-golden-brown-600" />
                                Delivery Information
                            </h2>

                            <div className="mb-4">
                                <FormInput
                                    label="Delivery Address"
                                    name="deliveryAddress"
                                    value={orderDetails.deliveryAddress}
                                    onChange={handleChange}
                                    placeholder="Enter your full delivery address"
                                    error={errors.deliveryAddress}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <FormTextarea
                                    label="Order Notes (Optional)"
                                    name="note"
                                    value={orderDetails.note}
                                    onChange={handleChange}
                                    placeholder="Any special instructions for your order"
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                            <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                                <CreditCard size={20} className="mr-2 text-golden-brown-600" />
                                Payment Details
                            </h2>

                            <div className="mb-4">
                                <FormSelect
                                    label="Payment Method"
                                    name="paymentMethod"
                                    value={orderDetails.paymentMethod}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'bank_transfer', label: 'Bank Transfer' },
                                        { value: 'cod', label: 'Cash on Delivery' }
                                    ]}
                                />
                            </div>

                            {orderDetails.paymentMethod === 'bank_transfer' && (
                                <div className="mt-4">
                                    <div className="mb-4 p-4 bg-blue-50 rounded-md">
                                        <div className="flex">
                                            <Info size={20} className="text-blue-600 mr-2 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-blue-800 font-medium">Bank Transfer Information</p>
                                                <p className="text-sm text-blue-700 mt-1">Please transfer the total amount to the following bank account:</p>
                                                <div className="mt-2 text-sm text-blue-800">
                                                    <p><span className="font-medium">Bank:</span> Commercial Bank of Sri Lanka</p>
                                                    <p><span className="font-medium">Account Name:</span> CropMate Marketplace</p>
                                                    <p><span className="font-medium">Account Number:</span> 1234-5678-9012</p>
                                                    <p><span className="font-medium">Branch:</span> Colombo Main Branch</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Upload Payment Slip
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                                        {!previewUrl ? (
                                            <div>
                                                <Upload size={24} className="mx-auto text-gray-400" />
                                                <p className="text-sm text-gray-500 mt-1">Click to upload or drag and drop</p>
                                                <p className="text-xs text-gray-400">PNG, JPG or PDF up to 5MB</p>
                                                <input
                                                    type="file"
                                                    accept=".jpg,.jpeg,.png,.pdf"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                {previewUrl.includes('data:image') ? (
                                                    <img
                                                        src={previewUrl}
                                                        alt="Payment Slip"
                                                        className="mx-auto max-h-40 object-contain"
                                                    />
                                                ) : (
                                                    <div className="p-4 bg-gray-100 text-center">
                                                        <span className="text-sm text-gray-600">File uploaded</span>
                                                    </div>
                                                )}
                                                <button
                                                    type="button"
                                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                                    onClick={() => {
                                                        setPaymentSlip(null);
                                                        setPreviewUrl('');
                                                    }}
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {errors.paymentSlip && (
                                        <p className="mt-1 text-sm text-red-600">{errors.paymentSlip}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Farmer Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                            <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                                <User size={20} className="mr-2 text-golden-brown-600" />
                                Farmer Information
                            </h2>

                            <div className="flex items-start">
                                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User size={20} className="text-green-600" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-md font-medium text-gray-900">{farmer.name}</h3>
                                    <p className="text-sm text-gray-500">{farmer.location}</p>
                                    <p className="text-sm text-gray-700 mt-1">
                                        This order will be sourced directly from this farmer, supporting local agriculture.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <button
                                type="button"
                                onClick={handleCancelOrder}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                            >
                                Cancel Order
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-golden-brown-600 text-white rounded-lg font-medium hover:bg-golden-brown-700 flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader size={18} className="animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    'Place Order'
                                )}
                            </button>
                        </div>

                        {errors.submit && (
                            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                                {errors.submit}
                            </div>
                        )}
                    </form>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                        <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                            <ShoppingBag size={20} className="mr-2 text-golden-brown-600" />
                            Order Summary
                        </h2>

                        {/* Product Information */}
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <div className="flex gap-4">
                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                )}
                                <div>
                                    <h3 className="font-medium text-gray-900">{product.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Price: {product.price} per kg
                                    </p>
                                    <div className="text-sm text-gray-700 mt-2">
                                        <span className="font-medium">Quantity:</span> {quantity} kg
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Calculation */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-900">LKR {totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Delivery Fee</span>
                                <span className="text-gray-900">LKR 350</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 mt-2">
                                <div className="flex justify-between font-medium">
                                    <span className="text-gray-900">Total</span>
                                    <span className="text-golden-brown-700">LKR {(totalPrice + 350).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Estimate */}
                        <div className="mt-6 p-3 bg-gray-50 rounded-md">
                            <div className="flex">
                                <Truck size={18} className="text-gray-500 mr-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">Estimated Delivery</p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderNow;