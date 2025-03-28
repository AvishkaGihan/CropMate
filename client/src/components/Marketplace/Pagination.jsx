import { memo, useMemo } from 'react';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    // Calculate visible page numbers
    const paginationItems = useMemo(() => {
        if (totalPages <= 1) return [];

        const items = [];
        const maxVisiblePages = 5;

        // Simple case: few pages
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                items.push({ type: 'page', value: i });
            }
            return items;
        }

        // Complex case: many pages
        items.push({ type: 'page', value: 1 });

        // Calculate visible range
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        // Adjust for edge cases
        if (start === 2) end = Math.min(totalPages - 1, 4);
        if (end === totalPages - 1) start = Math.max(2, totalPages - 3);

        // Add first ellipsis if needed
        if (start > 2) {
            items.push({ type: 'ellipsis', key: 'start-ellipsis' });
        }

        // Add middle pages
        for (let i = start; i <= end; i++) {
            items.push({ type: 'page', value: i });
        }

        // Add second ellipsis if needed
        if (end < totalPages - 1) {
            items.push({ type: 'ellipsis', key: 'end-ellipsis' });
        }

        // Always add last page
        if (totalPages > 1) {
            items.push({ type: 'page', value: totalPages });
        }

        return items;
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
                {/* Previous button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md border ${currentPage === 1
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-cambridge-blue-200 bg-white hover:bg-cambridge-blue-50'
                        }`}
                >
                    Previous
                </button>

                {/* Page numbers and ellipses */}
                {paginationItems.map(item =>
                    item.type === 'ellipsis' ? (
                        <span key={item.key} className="px-2">...</span>
                    ) : (
                        <button
                            key={`page-${item.value}`}
                            onClick={() => onPageChange(item.value)}
                            className={`px-3 py-1 rounded-md ${currentPage === item.value
                                ? 'bg-cambridge-blue-600 text-white'
                                : 'border border-cambridge-blue-200 bg-white hover:bg-cambridge-blue-50'
                                }`}
                        >
                            {item.value}
                        </button>
                    )
                )}

                {/* Next button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md border ${currentPage === totalPages
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-cambridge-blue-200 bg-white hover:bg-cambridge-blue-50'
                        }`}
                >
                    Next
                </button>
            </nav>
        </div>
    );
};

export default memo(Pagination);