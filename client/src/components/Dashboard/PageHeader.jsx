import React from 'react';
import { Link } from 'react-router';
import { ChevronRight, Filter, Download, Plus, Menu } from 'lucide-react';

const PageHeader = ({
    title = 'Dashboard',
    breadcrumbs = [],
    role = 'farmer',
    actionButtons = [],
    showFilters = false,
    onToggleFilters = () => { },
    onToggleMobileMenu = () => { },
}) => {
    // Role-specific styling
    const getRoleClasses = () => {
        switch (role) {
            case 'farmer':
                return {
                    text: 'text-cal-poly-green-800',
                    button: 'bg-cal-poly-green-600 hover:bg-cal-poly-green-700',
                    breadcrumb: 'text-cal-poly-green-600',
                    menuButtonHover: 'hover:bg-cal-poly-green-50'
                };
            case 'driver':
                return {
                    text: 'text-cambridge-blue-800',
                    button: 'bg-cambridge-blue-600 hover:bg-cambridge-blue-700',
                    breadcrumb: 'text-cambridge-blue-600',
                    menuButtonHover: 'hover:bg-cambridge-blue-50'
                };
            case 'vendor':
                return {
                    text: 'text-golden-brown-800',
                    button: 'bg-golden-brown-600 hover:bg-golden-brown-700',
                    breadcrumb: 'text-golden-brown-600',
                    menuButtonHover: 'hover:bg-golden-brown-50'
                };
            default:
                return {
                    text: 'text-cal-poly-green-800',
                    button: 'bg-cal-poly-green-600 hover:bg-cal-poly-green-700',
                    breadcrumb: 'text-cal-poly-green-600',
                    menuButtonHover: 'hover:bg-cal-poly-green-50'
                };
        }
    };

    const { text, button, breadcrumb, menuButtonHover } = getRoleClasses();

    // Default action buttons if none provided
    const defaultActionButtons = [
        {
            label: 'Export',
            icon: <Download size={16} />,
            onClick: () => { },
            primary: false
        },
        {
            label: 'Add New',
            icon: <Plus size={16} />,
            onClick: () => { },
            primary: true
        },
    ];

    const buttonsToRender = actionButtons.length > 0 ? actionButtons : defaultActionButtons;

    return (
        <>
            {/* Mobile Menu Button - Only visible on mobile */}
            <div className="lg:hidden border-b border-gray-200 bg-white px-4 py-2">
                <button
                    type="button"
                    className={`inline-flex items-center p-2 rounded-md text-gray-600 ${menuButtonHover} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
                    onClick={onToggleMobileMenu}
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                    <span className="ml-2 text-sm font-medium">Menu</span>
                </button>
            </div>

            <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8 mb-4">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="min-w-0 flex-1">
                        {/* Breadcrumbs */}
                        {breadcrumbs.length > 0 && (
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="flex items-center space-x-1">
                                    {breadcrumbs.map((crumb, index) => {
                                        const isLast = index === breadcrumbs.length - 1;
                                        return (
                                            <li key={crumb.path || index} className="flex items-center">
                                                {index > 0 && (
                                                    <ChevronRight size={14} className="text-gray-400 mx-1" />
                                                )}
                                                {isLast ? (
                                                    <span className="text-xs text-gray-500">
                                                        {crumb.label}
                                                    </span>
                                                ) : (
                                                    <Link
                                                        to={crumb.path}
                                                        className={`text-xs ${breadcrumb} hover:underline`}
                                                    >
                                                        {crumb.label}
                                                    </Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ol>
                            </nav>
                        )}

                        {/* Page Title */}
                        <h1 className={`mt-1 text-2xl font-semibold ${text} truncate`}>
                            {title}
                        </h1>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex sm:mt-0 space-x-2">
                        {showFilters && (
                            <button
                                onClick={onToggleFilters}
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <Filter size={16} className="mr-2" />
                                <span className="hidden sm:inline">Filters</span>
                            </button>
                        )}

                        {buttonsToRender.map((actionBtn, index) => (
                            <button
                                key={index}
                                onClick={actionBtn.onClick}
                                className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${actionBtn.primary
                                    ? `${button} text-white`
                                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {actionBtn.icon && <span className="mr-2">{actionBtn.icon}</span>}
                                <span className={actionBtn.hideTextOnMobile ? "hidden sm:inline" : ""}>
                                    {actionBtn.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageHeader;