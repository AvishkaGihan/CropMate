import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, X, Save, Check, Plus } from 'lucide-react';

/**
 * FilterPanel - Collapsible filter control panel with filter chips and preset management
 */
const FilterPanel = ({
    filters = {},
    onFilterChange,
    filterOptions = [],
    isExpanded = false,
    onToggleExpand,
    savedFilterSets = [],
    onSaveFilterSet,
    onApplySavedFilterSet,
    onRemoveSavedFilterSet,
    className = ''
}) => {
    const [activeFilters, setActiveFilters] = useState({});
    const [savedFilterSetName, setSavedFilterSetName] = useState('');
    const [showSaveFilterDialog, setShowSaveFilterDialog] = useState(false);

    // Update internal active filters state when external filters change
    useEffect(() => {
        setActiveFilters(filters);
    }, [filters]);

    // Handle filter change
    const handleFilterChange = (key, value) => {
        const newFilters = { ...activeFilters, [key]: value };
        if (value === '' || value === null || value === undefined) {
            delete newFilters[key];
        }
        onFilterChange(newFilters);
    };

    // Remove a specific filter
    const removeFilter = (key) => {
        const newFilters = { ...activeFilters };
        delete newFilters[key];
        onFilterChange(newFilters);
    };

    // Clear all filters
    const clearAllFilters = () => {
        onFilterChange({});
    };

    // Save current filters as a named set
    const saveCurrentFilters = () => {
        if (savedFilterSetName.trim() === '') return;

        onSaveFilterSet({
            name: savedFilterSetName,
            filters: { ...activeFilters }
        });

        setSavedFilterSetName('');
        setShowSaveFilterDialog(false);
    };

    // Get display name for a filter value
    const getFilterDisplayValue = (key, value) => {
        const option = filterOptions.find(opt => opt.name === key);
        if (!option) return value;

        if (option.type === 'select') {
            const choice = option.choices.find(c => c.value === value);
            return choice ? choice.label : value;
        }

        return value;
    };

    // Check if there are any active filters
    const hasActiveFilters = Object.keys(activeFilters).length > 0;

    return (
        <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer border-b"
                onClick={onToggleExpand}
            >
                <div className="flex items-center">
                    <Filter size={16} className="mr-2 text-gray-500" />
                    <h3 className="font-medium text-gray-700">Filters</h3>
                    {hasActiveFilters && (
                        <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                            {Object.keys(activeFilters).length}
                        </span>
                    )}
                </div>

                <div className="flex items-center">
                    {hasActiveFilters && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                clearAllFilters();
                            }}
                            className="mr-3 text-xs text-gray-500 hover:text-gray-700"
                        >
                            Clear all
                        </button>
                    )}
                    <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            {/* Filter Chips (always visible) */}
            {hasActiveFilters && (
                <div className="px-4 py-2 flex flex-wrap gap-2 border-b">
                    {Object.entries(activeFilters).map(([key, value]) => (
                        <div
                            key={key}
                            className="flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                            <span className="mr-1 font-medium">{key}:</span>
                            <span>{getFilterDisplayValue(key, value)}</span>
                            <button
                                onClick={() => removeFilter(key)}
                                className="ml-1 text-gray-500 hover:text-gray-700"
                                aria-label={`Remove ${key} filter`}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Expandable Filter Controls */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filterOptions.map((option) => (
                                <FilterControl
                                    key={option.name}
                                    option={option}
                                    value={activeFilters[option.name] || ''}
                                    onChange={(value) => handleFilterChange(option.name, value)}
                                />
                            ))}
                        </div>

                        {/* Saved Filters Section */}
                        <div className="border-t px-4 py-3">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium text-gray-700">Saved Filters</h4>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowSaveFilterDialog(true);
                                    }}
                                    className="text-xs flex items-center text-gray-600 hover:text-gray-800"
                                >
                                    <Plus size={14} className="mr-1" />
                                    Save current filters
                                </button>
                            </div>

                            {/* Save Filter Dialog */}
                            {showSaveFilterDialog && (
                                <div className="mb-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={savedFilterSetName}
                                            onChange={(e) => setSavedFilterSetName(e.target.value)}
                                            placeholder="Filter set name"
                                            className="flex-1 text-sm border-gray-300 rounded-md focus:ring-gray-400 focus:border-gray-400"
                                        />
                                        <button
                                            onClick={saveCurrentFilters}
                                            disabled={savedFilterSetName.trim() === ''}
                                            className="ml-2 p-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 disabled:opacity-50"
                                        >
                                            <Save size={14} />
                                        </button>
                                        <button
                                            onClick={() => setShowSaveFilterDialog(false)}
                                            className="ml-2 p-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Saved Filter Sets */}
                            <div className="space-y-2">
                                {savedFilterSets.length === 0 ? (
                                    <p className="text-xs text-gray-500 italic">No saved filter sets</p>
                                ) : (
                                    savedFilterSets.map((set, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2 border border-gray-200"
                                        >
                                            <span className="text-sm font-medium text-gray-700">{set.name}</span>
                                            <div>
                                                <button
                                                    onClick={() => onApplySavedFilterSet(set)}
                                                    className="p-1 text-gray-600 hover:text-gray-900"
                                                    title="Apply this filter set"
                                                >
                                                    <Check size={16} />
                                                </button>
                                                <button
                                                    onClick={() => onRemoveSavedFilterSet(set)}
                                                    className="p-1 text-gray-600 hover:text-gray-900 ml-1"
                                                    title="Remove this filter set"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Filter Control Component based on filter type
const FilterControl = ({ option, value, onChange }) => {
    switch (option.type) {
        case 'select':
            return (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        {option.label}
                    </label>
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm"
                    >
                        <option value="">All {option.label}s</option>
                        {option.choices.map((choice) => (
                            <option key={choice.value} value={choice.value}>
                                {choice.label}
                            </option>
                        ))}
                    </select>
                </div>
            );

        case 'range':
            return (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        {option.label}
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={value.min || ''}
                            onChange={(e) => {
                                const newValue = { ...value, min: e.target.value };
                                onChange(newValue);
                            }}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={value.max || ''}
                            onChange={(e) => {
                                const newValue = { ...value, max: e.target.value };
                                onChange(newValue);
                            }}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm"
                        />
                    </div>
                </div>
            );

        case 'boolean':
            return (
                <div className="flex items-center h-full pt-5">
                    <input
                        type="checkbox"
                        id={`filter-${option.name}`}
                        checked={value === true}
                        onChange={(e) => onChange(e.target.checked)}
                        className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                    />
                    <label
                        htmlFor={`filter-${option.name}`}
                        className="ml-2 text-sm font-medium text-gray-700"
                    >
                        {option.label}
                    </label>
                </div>
            );

        case 'search':
            return (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        {option.label}
                    </label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={option.placeholder || `Search ${option.label.toLowerCase()}...`}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm"
                    />
                </div>
            );

        default:
            return null;
    }
};

export default FilterPanel;