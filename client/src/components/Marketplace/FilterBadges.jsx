import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, X } from 'lucide-react';

// Simplified badge animation
const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.1 }
    }
};

// Single filter badge component
const FilterBadge = memo(({ label, onRemove }) => (
    <motion.div
        className="inline-flex items-center px-3 py-1 bg-cambridge-blue-100 text-cambridge-blue-700 
             rounded-full text-sm mr-2 mb-2"
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        <span>{label}</span>
        <button
            onClick={onRemove}
            className="ml-2 rounded-full p-0.5 hover:bg-cambridge-blue-200 transition-colors"
            aria-label={`Remove ${label} filter`}
        >
            <X size={14} />
        </button>
    </motion.div>
));

FilterBadge.displayName = 'FilterBadge';

// Filter badges container component
const FilterBadges = ({
    hasActiveFilters,
    searchQuery,
    selectedCategory,
    selectedLocation,
    priceRange,
    selectedCertifications,
    resetFilters,
    removeSearchFilter,
    removeCategoryFilter,
    removeLocationFilter,
    removePriceFilter,
    removeCertificationFilter,
    getCategoryLabel,
    getLocationLabel,
    getCertificationLabel
}) => {
    if (!hasActiveFilters) return null;

    return (
        <div className="mb-6 bg-white rounded-lg border border-cambridge-blue-100/70 p-3">
            <div className="flex items-center mb-2">
                <Tag size={16} className="text-cambridge-blue-600 mr-2" />
                <h3 className="text-sm font-medium text-cambridge-blue-700">Active Filters:</h3>
                <button
                    onClick={resetFilters}
                    className="ml-auto text-xs text-golden-brown-500 hover:text-golden-brown-600 transition-colors"
                >
                    Clear All
                </button>
            </div>

            <div className="flex flex-wrap">
                <AnimatePresence>
                    {searchQuery && (
                        <FilterBadge
                            key="search"
                            label={`Search: ${searchQuery.length > 15 ? searchQuery.substring(0, 15) + '...' : searchQuery}`}
                            onRemove={removeSearchFilter}
                        />
                    )}

                    {selectedCategory !== 'all' && (
                        <FilterBadge
                            key="category"
                            label={`Category: ${getCategoryLabel(selectedCategory)}`}
                            onRemove={removeCategoryFilter}
                        />
                    )}

                    {selectedLocation && (
                        <FilterBadge
                            key="location"
                            label={`Location: ${getLocationLabel(selectedLocation)}`}
                            onRemove={removeLocationFilter}
                        />
                    )}

                    {(priceRange.min > 0 || priceRange.max < 2000) && (
                        <FilterBadge
                            key="price"
                            label={`Price: Rs ${priceRange.min} - Rs ${priceRange.max}`}
                            onRemove={removePriceFilter}
                        />
                    )}

                    {/* Show only first 3 certification badges for performance */}
                    {selectedCertifications.slice(0, 3).map(certId => (
                        <FilterBadge
                            key={certId}
                            label={getCertificationLabel(certId)}
                            onRemove={() => removeCertificationFilter(certId)}
                        />
                    ))}

                    {/* Show count for additional badges */}
                    {selectedCertifications.length > 3 && (
                        <span className="inline-flex items-center px-3 py-1 bg-cambridge-blue-50 text-cambridge-blue-700 
                   rounded-full text-sm mr-2 mb-2">
                            +{selectedCertifications.length - 3} more
                        </span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default memo(FilterBadges);