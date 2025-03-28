import { memo } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { FormSelect, FormButton } from '../Shared/Form';

const FilterSidebar = ({
    categories,
    locations,
    certifications,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    priceRange,
    setPriceRange,
    selectedCertifications,
    handleCertificationToggle,
    resetFilters,
}) => {
    // Simplified animation variant
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.aside
            className="hidden md:block w-full md:w-64 lg:w-72 flex-shrink-0"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
        >
            <div className="bg-white rounded-xl shadow-sm border border-cambridge-blue-100/50 p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-cambridge-blue-800 text-lg">Filters</h2>
                    <button
                        onClick={resetFilters}
                        className="text-sm text-golden-brown-500 hover:text-golden-brown-600 transition-colors"
                    >
                        Reset All
                    </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                    <h3 className="text-cambridge-blue-700 font-medium mb-3">Category</h3>
                    <FormSelect
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        options={categories}
                    />
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                    <h3 className="text-cambridge-blue-700 font-medium mb-3">Location</h3>
                    <FormSelect
                        id="location"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        options={locations}
                    />
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                    <h3 className="text-cambridge-blue-700 font-medium mb-3">Price Range</h3>
                    <div className="flex items-center gap-3 mb-2">
                        <input
                            type="number"
                            value={priceRange.min}
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 0;
                                setPriceRange(prev => ({ ...prev, min: value }));
                            }}
                            className="w-full px-3 py-2 border border-cambridge-blue-200 rounded-lg"
                            placeholder="Min"
                        />
                        <span className="text-cambridge-blue-600">—</span>
                        <input
                            type="number"
                            value={priceRange.max}
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 0;
                                setPriceRange(prev => ({ ...prev, max: value }));
                            }}
                            className="w-full px-3 py-2 border border-cambridge-blue-200 rounded-lg"
                            placeholder="Max"
                        />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange.max}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setPriceRange(prev => ({ ...prev, max: value }));
                        }}
                        className="w-full h-2 bg-cambridge-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-cambridge-blue-600 mt-1">
                        <span>Rs 0</span>
                        <span>Rs 1000</span>
                        <span>Rs 2000</span>
                    </div>
                </div>

                {/* Certifications Filter */}
                <div className="mb-6">
                    <h3 className="text-cambridge-blue-700 font-medium mb-3">Certifications</h3>
                    <div className="space-y-2">
                        {certifications.map(cert => (
                            <label key={cert.id} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCertifications.includes(cert.id)}
                                    onChange={() => handleCertificationToggle(cert.id)}
                                    className="w-4 h-4 text-golden-brown-500 border-cambridge-blue-300 rounded focus:ring-2 focus:ring-golden-brown-400/30"
                                />
                                <span className="ml-2 text-cambridge-blue-700">{cert.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Apply Filters Button */}
                <FormButton
                    fullWidth
                    variant="primary"
                    icon={<Filter size={16} />}
                    iconPosition="left"
                >
                    Apply Filters
                </FormButton>
            </div>
        </motion.aside>
    );
};

export default memo(FilterSidebar);