import React from 'react';
import {
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock,
    Activity,
    Truck,
    ShieldCheck,
    RotateCcw,
    AlertTriangle,
    Ban,
    Loader
} from 'lucide-react';

const StatusBadge = ({
    status,
    label,
    variant = 'default', // default, outline, light, dot
    size = 'default', // sm, default, lg
    icon = true
}) => {
    // Map status to colors
    const getStatusConfig = () => {
        // Define color schemes based on status
        const statusMappings = {
            success: {
                bg: 'bg-green-100',
                text: 'text-green-800',
                border: 'border-green-200',
                dotColor: 'bg-green-600',
                icon: <CheckCircle size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            warning: {
                bg: 'bg-amber-100',
                text: 'text-amber-800',
                border: 'border-amber-200',
                dotColor: 'bg-amber-500',
                icon: <AlertCircle size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            error: {
                bg: 'bg-red-100',
                text: 'text-red-800',
                border: 'border-red-200',
                dotColor: 'bg-red-600',
                icon: <XCircle size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            info: {
                bg: 'bg-blue-100',
                text: 'text-blue-800',
                border: 'border-blue-200',
                dotColor: 'bg-blue-600',
                icon: <Activity size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            pending: {
                bg: 'bg-purple-100',
                text: 'text-purple-800',
                border: 'border-purple-200',
                dotColor: 'bg-purple-600',
                icon: <Clock size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            shipping: {
                bg: 'bg-indigo-100',
                text: 'text-indigo-800',
                border: 'border-indigo-200',
                dotColor: 'bg-indigo-600',
                icon: <Truck size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            approved: {
                bg: 'bg-teal-100',
                text: 'text-teal-800',
                border: 'border-teal-200',
                dotColor: 'bg-teal-600',
                icon: <ShieldCheck size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            processing: {
                bg: 'bg-sky-100',
                text: 'text-sky-800',
                border: 'border-sky-200',
                dotColor: 'bg-sky-600',
                icon: <Loader size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="animate-spin" />
            },
            retry: {
                bg: 'bg-orange-100',
                text: 'text-orange-800',
                border: 'border-orange-200',
                dotColor: 'bg-orange-600',
                icon: <RotateCcw size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            attention: {
                bg: 'bg-yellow-100',
                text: 'text-yellow-800',
                border: 'border-yellow-200',
                dotColor: 'bg-yellow-500',
                icon: <AlertTriangle size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            blocked: {
                bg: 'bg-gray-100',
                text: 'text-gray-800',
                border: 'border-gray-200',
                dotColor: 'bg-gray-600',
                icon: <Ban size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            harvested: {
                bg: 'bg-primary-100',
                text: 'text-primary-800',
                border: 'border-primary-200',
                dotColor: 'bg-primary-600',
                icon: <CheckCircle size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            delivering: {
                bg: 'bg-primary-100',
                text: 'text-primary-800',
                border: 'border-primary-200',
                dotColor: 'bg-primary-600',
                icon: <Truck size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            },
            received: {
                bg: 'bg-primary-100',
                text: 'text-primary-800',
                border: 'border-primary-200',
                dotColor: 'bg-primary-600',
                icon: <CheckCircle size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            }
        };

        return statusMappings[status] || statusMappings.info;
    };

    const config = getStatusConfig();

    // Size-based classes
    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        default: 'text-xs px-2.5 py-1',
        lg: 'text-sm px-3 py-1.5'
    };

    // Get size classes
    const sizeClass = sizeClasses[size] || sizeClasses.default;

    // Build classes based on variant
    const getBadgeClasses = () => {
        switch (variant) {
            case 'outline':
                return `border ${config.border} ${config.text} bg-white`;
            case 'light':
                return `${config.bg} ${config.text}`;
            case 'dot':
                return `inline-flex items-center rounded-full bg-white border border-gray-200 ${config.text}`;
            case 'default':
            default:
                return `${config.bg} ${config.text}`;
        }
    };

    return (
        <span className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${getBadgeClasses()}`}>
            {variant === 'dot' && (
                <span className={`mr-1.5 h-2 w-2 rounded-full ${config.dotColor}`}></span>
            )}

            {icon && variant !== 'dot' && (
                <span className="mr-1.5 flex-shrink-0">{config.icon}</span>
            )}

            {label || status}
        </span>
    );
};

export default StatusBadge;