import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronUp, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

// Row Actions Menu Component - Fixed to ensure actions work correctly
const RowActionsMenu = ({ actions, row }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    // Handle toggle dropdown
    const toggleDropdown = (e) => {
        e.stopPropagation();
        if (!isOpen) {
            // When opening, calculate position
            const rect = buttonRef.current.getBoundingClientRect();
            const scrollY = window.scrollY || window.pageYOffset;
            const scrollX = window.scrollX || window.pageXOffset;

            // Default position is below and to the right
            let top = rect.bottom + scrollY;
            let left = rect.left + scrollX;

            // Check if dropdown would go off screen to the right
            const dropdownWidth = 170; // Approximate width of dropdown
            if (rect.left + dropdownWidth > window.innerWidth) {
                // Position to the left instead
                left = rect.right + scrollX - dropdownWidth;
            }

            setMenuPosition({ top, left });
        }
        setIsOpen(!isOpen);
    };

    // Handle action click with proper event handling
    const handleActionClick = (e, action) => {
        e.preventDefault();
        e.stopPropagation();

        // Close the dropdown first
        setIsOpen(false);

        // Small delay to ensure dropdown is closed before action executes
        setTimeout(() => {
            if (typeof action.onClick === 'function') {
                action.onClick(row);
            }
        }, 10);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Only close if clicking outside both the button and dropdown
            if (
                isOpen &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('scroll', handleScroll, true);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [isOpen]);

    return (
        <>
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                aria-label="Row actions"
                aria-expanded={isOpen}
                type="button"
            >
                <MoreHorizontal size={16} />
            </button>

            {isOpen && createPortal(
                <div
                    ref={dropdownRef}
                    className="fixed rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999] overflow-hidden"
                    style={{
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                        width: '170px'
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="py-1">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={(e) => handleActionClick(e, action)}
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${action.className || 'text-gray-700'}`}
                            >
                                <div className="flex items-center">
                                    {action.icon && <span className="mr-2">{action.icon}</span>}
                                    <span>{action.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

// Main DataTable component 
const DataTable = ({
    data = [],
    columns = [],
    onRowClick,
    onRowSelectionChange,
    emptyMessage = "No data available",
    itemsPerPage = 10,
    rowActions = []
}) => {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Handle column sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Handle row selection
    const handleRowSelect = (id) => {
        setSelectedRows(prevSelected => {
            const isSelected = prevSelected.includes(id);
            let newSelected = [...prevSelected];

            if (isSelected) {
                newSelected = newSelected.filter(rowId => rowId !== id);
            } else {
                newSelected.push(id);
            }

            // Notify parent component if callback provided
            if (onRowSelectionChange) {
                onRowSelectionChange(newSelected);
            }

            return newSelected;
        });
    };

    // Handle select all rows
    const handleSelectAll = () => {
        if (selectedRows.length === sortedAndPagedData.length) {
            setSelectedRows([]);
            if (onRowSelectionChange) onRowSelectionChange([]);
        } else {
            const allIds = sortedAndPagedData.map(row => row.id || row._id || `row-${sortedAndPagedData.indexOf(row)}`);
            setSelectedRows(allIds);
            if (onRowSelectionChange) onRowSelectionChange(allIds);
        }
    };

    // Calculate sorted and paginated data
    const sortedAndPagedData = useMemo(() => {
        // First sort the data if needed
        let processedData = [...data];

        if (sortField) {
            processedData.sort((a, b) => {
                const aValue = a[sortField];
                const bValue = b[sortField];

                // Handle different data types for sorting
                if (typeof aValue === 'string') {
                    return sortDirection === 'asc'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                return sortDirection === 'asc'
                    ? (aValue - bValue)
                    : (bValue - aValue);
            });
        }

        // Then paginate
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedData.slice(startIndex, startIndex + itemsPerPage);
    }, [data, sortField, sortDirection, currentPage, itemsPerPage]);

    // Calculate pagination values
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const showPagination = data.length > itemsPerPage;

    // Render table or empty state
    if (data.length === 0) {
        return (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
                <p className="mt-1 text-sm text-gray-500">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {onRowSelectionChange && (
                                <th scope="col" className="w-12 px-3 py-3.5 text-left">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-primary-600"
                                        checked={selectedRows.length > 0 && selectedRows.length === sortedAndPagedData.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.field}
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    {column.sortable ? (
                                        <button
                                            className="flex items-center font-semibold"
                                            onClick={() => handleSort(column.field)}
                                        >
                                            {column.header}
                                            <span className="ml-2">
                                                {sortField === column.field ? (
                                                    sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                                ) : (
                                                    <ChevronDown size={16} className="text-gray-300" />
                                                )}
                                            </span>
                                        </button>
                                    ) : (
                                        column.header
                                    )}
                                </th>
                            ))}
                            {rowActions.length > 0 && (
                                <th scope="col" className="relative w-16 px-4 py-3.5">
                                    <span className="sr-only">Actions</span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sortedAndPagedData.map((row, index) => {
                            const rowId = row.id || row._id || `row-${index}`;
                            const isSelected = selectedRows.includes(rowId);
                            return (
                                <tr
                                    key={rowId}
                                    className={`${isSelected ? 'bg-primary-50' : ''} hover:bg-gray-50 transition-colors`}
                                    onClick={() => onRowClick && onRowClick(row)}
                                >
                                    {onRowSelectionChange && (
                                        <td className="w-12 px-3 py-4" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300"
                                                checked={isSelected}
                                                onChange={() => handleRowSelect(rowId)}
                                            />
                                        </td>
                                    )}
                                    {columns.map((column) => (
                                        <td
                                            key={`${rowId}-${column.field || column.accessor || index}`}
                                            className="whitespace-nowrap px-4 py-4 text-sm text-gray-800"
                                        >
                                            {column.render ? column.render(row) : row[column.field || column.accessor]}
                                        </td>
                                    ))}
                                    {rowActions.length > 0 && (
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                            <div className="flex justify-end">
                                                <RowActionsMenu actions={rowActions} row={row} />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {showPagination && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                                <span className="font-medium">{Math.min(currentPage * itemsPerPage, data.length)}</span> of{" "}
                                <span className="font-medium">{data.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === i + 1
                                            ? 'bg-primary-600 text-white'
                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;