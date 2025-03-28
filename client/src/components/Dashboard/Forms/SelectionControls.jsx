import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, MoreHorizontal } from 'lucide-react';

/**
 * SelectionControls - Multi-select controls with bulk actions
 */
const SelectionControls = ({
    data = [],
    selectedItems = [],
    onSelectionChange,
    bulkActions = [],
    selectionKey = 'id',
    renderItem,
    className = ''
}) => {
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false);
    const [showBulkActions, setShowBulkActions] = useState(false);

    // Update selection states when selectedItems or data changes
    useEffect(() => {
        const allSelected = data.length > 0 && selectedItems.length === data.length;
        const someSelected = selectedItems.length > 0 && selectedItems.length < data.length;

        setIsAllSelected(allSelected);
        setIsIndeterminate(someSelected);
    }, [selectedItems, data]);

    // Handle toggle all selection
    const handleToggleAll = () => {
        if (isAllSelected) {
            onSelectionChange([]);
        } else {
            const allIds = data.map(item => item[selectionKey]);
            onSelectionChange(allIds);
        }
    };

    // Handle individual item selection
    const handleToggleItem = (itemId) => {
        let newSelection;

        if (selectedItems.includes(itemId)) {
            newSelection = selectedItems.filter(id => id !== itemId);
        } else {
            newSelection = [...selectedItems, itemId];
        }

        onSelectionChange(newSelection);
    };

    // Execute bulk action
    const executeBulkAction = (action) => {
        action.onClick(selectedItems);
        setShowBulkActions(false);
    };

    return (
        <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
            {/* Header with select all and bulk actions */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center">
                    <div className="flex items-center mr-4">
                        <input
                            type="checkbox"
                            id="select-all"
                            className="h-4 w-4 text-gray-600 rounded border-gray-300 focus:ring-gray-500"
                            checked={isAllSelected}
                            ref={el => {
                                if (el) {
                                    el.indeterminate = isIndeterminate;
                                }
                            }}
                            onChange={handleToggleAll}
                        />
                        <label htmlFor="select-all" className="ml-2 text-sm font-medium text-gray-700">
                            {isAllSelected
                                ? 'All selected'
                                : isIndeterminate
                                    ? `${selectedItems.length} selected`
                                    : 'Select all'}
                        </label>
                    </div>

                    {selectedItems.length > 0 && (
                        <div className="relative">
                            <button
                                type="button"
                                className="inline-flex items-center text-sm text-gray-700 hover:text-gray-900"
                                onClick={() => setShowBulkActions(!showBulkActions)}
                            >
                                Actions
                                <ChevronDown size={16} className="ml-1" />
                            </button>

                            {showBulkActions && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowBulkActions(false)}
                                    />
                                    <div className="absolute left-0 z-20 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                        {bulkActions.map((action, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                onClick={() => executeBulkAction(action)}
                                            >
                                                <div className="flex items-center">
                                                    {action.icon && <span className="mr-2">{action.icon}</span>}
                                                    {action.label}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="text-sm text-gray-500">
                    {data.length} items
                </div>
            </div>

            {/* Selectable items */}
            <div className="divide-y divide-gray-200">
                {data.map(item => {
                    const itemId = item[selectionKey];
                    const isSelected = selectedItems.includes(itemId);

                    return (
                        <div
                            key={itemId}
                            className={`px-4 py-3 flex items-start ${isSelected ? 'bg-gray-50' : ''}`}
                        >
                            <div className="flex items-center h-5 mr-4">
                                <input
                                    type="checkbox"
                                    id={`item-${itemId}`}
                                    className="h-4 w-4 text-gray-600 rounded border-gray-300 focus:ring-gray-500"
                                    checked={isSelected}
                                    onChange={() => handleToggleItem(itemId)}
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                {renderItem ? renderItem(item, isSelected) : (
                                    <label htmlFor={`item-${itemId}`} className="font-medium text-gray-700 cursor-pointer">
                                        {item.name || item.title || itemId}
                                    </label>
                                )}
                            </div>

                            {/* Individual item actions */}
                            {item.actions && item.actions.length > 0 && (
                                <ItemActions actions={item.actions} item={item} />
                            )}
                        </div>
                    );
                })}

                {data.length === 0 && (
                    <div className="py-8 text-center text-gray-500 italic">
                        No items available
                    </div>
                )}
            </div>
        </div>
    );
};

// Individual item actions dropdown
const ItemActions = ({ actions, item }) => {
    const [showActions, setShowActions] = useState(false);

    return (
        <div className="relative ml-4">
            <button
                type="button"
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowActions(!showActions)}
            >
                <MoreHorizontal size={16} />
            </button>

            {showActions && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowActions(false)}
                    />
                    <div className="absolute right-0 z-20 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                type="button"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => {
                                    action.onClick(item);
                                    setShowActions(false);
                                }}
                            >
                                <div className="flex items-center">
                                    {action.icon && <span className="mr-2">{action.icon}</span>}
                                    {action.label}
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SelectionControls;