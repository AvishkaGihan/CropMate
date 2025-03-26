import React, { useState } from 'react';
import { Trash2, Download, Eye, Tag, Clock, Filter, Calendar } from 'lucide-react';
import { FilterPanel, DateRangePicker, SelectionControls } from '../../components/Dashboard/Forms';
import PageHeader from '../../components/Dashboard/PageHeader';

// Sample data for demo
const sampleItems = [
    { id: 1, name: 'Rice Shipment #1', date: '2024-03-20', status: 'completed', quantity: '500kg', location: 'Warehouse A' },
    { id: 2, name: 'Wheat Order #42', date: '2024-03-18', status: 'pending', quantity: '750kg', location: 'Warehouse B' },
    { id: 3, name: 'Corn Delivery #7', date: '2024-03-15', status: 'processing', quantity: '300kg', location: 'Warehouse C' },
    { id: 4, name: 'Vegetable Package #12', date: '2024-03-10', status: 'completed', quantity: '100kg', location: 'Warehouse A' },
    { id: 5, name: 'Spice Collection #3', date: '2024-03-05', status: 'cancelled', quantity: '50kg', location: 'Warehouse D' },
];

// Filter options for FilterPanel
const filterOptions = [
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        choices: [
            { value: 'pending', label: 'Pending' },
            { value: 'processing', label: 'Processing' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
        ],
    },
    {
        name: 'location',
        label: 'Location',
        type: 'select',
        choices: [
            { value: 'Warehouse A', label: 'Warehouse A' },
            { value: 'Warehouse B', label: 'Warehouse B' },
            { value: 'Warehouse C', label: 'Warehouse C' },
            { value: 'Warehouse D', label: 'Warehouse D' },
        ],
    },
    {
        name: 'search',
        label: 'Search Items',
        type: 'search',
        placeholder: 'Search by name...',
    },
];

// Bulk actions for SelectionControls
const bulkActions = [
    {
        label: 'Delete Selected',
        icon: <Trash2 size={16} />,
        onClick: (selectedIds) => console.log('Delete items with IDs:', selectedIds),
    },
    {
        label: 'Export Selected',
        icon: <Download size={16} />,
        onClick: (selectedIds) => console.log('Export items with IDs:', selectedIds),
    },
    {
        label: 'Mark as Completed',
        icon: <Eye size={16} />,
        onClick: (selectedIds) => console.log('Mark as completed items with IDs:', selectedIds),
    },
];

// Item actions for SelectionControls
const getItemActions = (item) => [
    {
        label: 'View Details',
        icon: <Eye size={16} />,
        onClick: (item) => console.log('View details for:', item),
    },
    {
        label: 'Delete',
        icon: <Trash2 size={16} />,
        onClick: (item) => console.log('Delete:', item),
    },
];

const FormComponentsExample = () => {
    // State for FilterPanel
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [filters, setFilters] = useState({});
    const [savedFilters, setSavedFilters] = useState([]);

    // State for DateRangePicker
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // State for SelectionControls
    const [selectedItems, setSelectedItems] = useState([]);

    // Apply saved filter set
    const handleApplySavedFilterSet = (filterSet) => {
        setFilters(filterSet.filters);
    };

    // Save current filter set
    const handleSaveFilterSet = (filterSet) => {
        setSavedFilters([...savedFilters, filterSet]);
    };

    // Remove a saved filter set
    const handleRemoveSavedFilterSet = (filterSet) => {
        setSavedFilters(savedFilters.filter(fs => fs.name !== filterSet.name));
    };

    // Date range change handler
    const handleDateRangeChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        console.log('Date range selected:', { start, end });
    };

    // Get filtered items based on current filters
    const getFilteredItems = () => {
        return sampleItems.filter(item => {
            // Apply status filter
            if (filters.status && item.status !== filters.status) {
                return false;
            }

            // Apply location filter
            if (filters.location && item.location !== filters.location) {
                return false;
            }

            // Apply search filter
            if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            return true;
        }).map(item => ({
            ...item,
            actions: getItemActions(item)
        }));
    };

    // Custom render function for items in SelectionControls
    const renderItem = (item, isSelected) => (
        <div className="flex flex-col">
            <div className="flex items-center justify-between">
                <label htmlFor={`item-${item.id}`} className="font-medium text-gray-700 cursor-pointer">
                    {item.name}
                </label>
                <div className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${item.status === 'completed' ? 'bg-green-100 text-green-800' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        item.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                    }`}>
                    {item.status}
                </div>
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                <div className="flex items-center">
                    <Tag size={12} className="mr-1" />
                    {item.quantity}
                </div>
                <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    {item.date}
                </div>
                <div className="flex items-center">
                    <Filter size={12} className="mr-1" />
                    {item.location}
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            <PageHeader
                title="Form Components"
                breadcrumbs={[
                    { label: 'Dashboard', path: '/dashboard/farmer' },
                    { label: 'Form Components' }
                ]}
            />

            <div className="space-y-8">
                {/* FilterPanel example */}
                <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-3">Filter Panel</h2>
                    <FilterPanel
                        filters={filters}
                        onFilterChange={setFilters}
                        filterOptions={filterOptions}
                        isExpanded={isFilterExpanded}
                        onToggleExpand={() => setIsFilterExpanded(!isFilterExpanded)}
                        savedFilterSets={savedFilters}
                        onSaveFilterSet={handleSaveFilterSet}
                        onApplySavedFilterSet={handleApplySavedFilterSet}
                        onRemoveSavedFilterSet={handleRemoveSavedFilterSet}
                    />
                </div>

                {/* DateRangePicker example */}
                <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-3">Date Range Picker</h2>
                    <div className="max-w-xs">
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onChange={handleDateRangeChange}
                            presets={true}
                            placeholderText="Select date range"
                            dateFormat="MMM dd, yyyy"
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        {startDate && endDate ? (
                            `Selected range: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                        ) : 'No date range selected'}
                    </p>
                </div>

                {/* SelectionControls example */}
                <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-3">Selection Controls</h2>
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-gray-500">
                            Showing {getFilteredItems().length} of {sampleItems.length} items
                            {Object.keys(filters).length > 0 && ' (filtered)'}
                        </p>
                        <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-gray-500" />
                            <span className="text-sm text-gray-500">
                                {startDate && endDate
                                    ? `Filtered by date: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                                    : 'All dates'
                                }
                            </span>
                        </div>
                    </div>
                    <SelectionControls
                        data={getFilteredItems()}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        bulkActions={bulkActions}
                        selectionKey="id"
                        renderItem={renderItem}
                    />
                </div>
            </div>
        </div>
    );
};

export default FormComponentsExample;