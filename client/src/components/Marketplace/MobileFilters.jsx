import { memo } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { FormButton } from '../Shared/Form';
import { FormSelect } from '../Shared/FormSelect';

const MobileFilters = ({
    showMobileFilters,
    setShowMobileFilters,
    sortBy,
    setSortBy,
    sortOptions,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    categories,
    locations,
    certifications,
    selectedCertifications,
    handleCertificationToggle,
    resetFilters
}) => {
    return (
        <>
            {/* Mobile Filters Toggle */}
            <div className="md:hidden flex justify-between items-center mb-4">
                <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-cambridge-blue-100/50 text-cambridge-blue-700"
                >
                    <SlidersHorizontal size={18} />
                    <span>Filters</span>
                    <ChevronDown size={16} className={`transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
                </button>

                <div>
                    <FormSelect
                        id="mobile-sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        options={sortOptions}
                        className="text-sm"
                    />
                </div>
            </div>

            {/* Mobile Filters Panel */}
            {showMobileFilters && (
                <div className="md:hidden bg-white rounded-xl shadow-sm border border-cambridge-blue-100/50 p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-cambridge-blue-700 font-medium mb-2 text-sm">Category</h3>
                            <FormSelect
                                id="mobile-category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                options={categories}
                            />
                        </div>
                        <div>
                            <h3 className="text-cambridge-blue-700 font-medium mb-2 text-sm">Location</h3>
                            <FormSelect
                                id="mobile-location"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                options={locations}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-cambridge-blue-700 font-medium mb-2 text-sm">Certifications</h3>
                        <div className="flex flex-wrap gap-2">
                            {certifications.map(cert => (
                                <label key={`mobile-${cert.id}`} className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCertifications.includes(cert.id)}
                                        onChange={() => handleCertificationToggle(cert.id)}
                                        className="w-4 h-4 text-golden-brown-500 border-cambridge-blue-300 rounded focus:ring-2 focus:ring-golden-brown-400/30"
                                    />
                                    <span className="ml-1 text-cambridge-blue-700 text-sm">{cert.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={resetFilters}
                            className="font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 
                                                    inline-flex items-center justify-center transition-colors 
                                                    border border-cambridge-blue-200 text-cambridge-blue-700 
                                                    hover:bg-cambridge-blue-50 focus:ring-cambridge-blue-500
                                                    px-3 py-1.5 text-sm cursor-pointer"
                        >
                            Reset
                        </button>
                        <button
                            onClick={resetFilters}
                            className="font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 
                                                    inline-flex items-center justify-center transition-colors 
                                                    border border-cambridge-blue-200 text-cambridge-blue-700 
                                                    hover:bg-cambridge-blue-50 focus:ring-cambridge-blue-500
                                                    px-3 py-1.5 text-sm cursor-pointer"
                        >
                            Reset
                        </button>
                        <FormButton
                            variant="primary"
                            size="sm"
                            onClick={() => setShowMobileFilters(false)}
                            className="flex-1"
                        >
                            Apply
                        </FormButton>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(MobileFilters);