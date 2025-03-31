import { useState, useEffect, useMemo, useCallback } from 'react';
import { FormSelect } from '../../components/Shared/FormSelect';
import SectionWrapper from '../../components/Shared/SectionWrapper';
import FilterSidebar from '../../components/Marketplace/FilterSidebar';
import MobileFilters from '../../components/Marketplace/MobileFilters';
import FilterBadges from '../../components/Marketplace/FilterBadges';
import Pagination from '../../components/Marketplace/Pagination';
import CropCard from '../../components/Crops/CropCard';

import { Search } from 'lucide-react';
import { categories, locations, sortOptions, certifications } from '../../constants';
import { generateMoreProducts } from '../../util/Crops/generateMoreProducts';


// Create lookup maps for faster access
const categoryMap = Object.fromEntries(categories.map(cat => [cat.value, cat.label]));
const locationMap = Object.fromEntries(locations.map(loc => [loc.value, loc.label]));

// Create certification lookup map
const certificationMap = Object.fromEntries(certifications.map(cert => [cert.id, cert.label]));



const Marketplace = () => {
    // Cache expensive product generation
    const allProducts = useMemo(() => generateMoreProducts(), []);

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCertifications, setSelectedCertifications] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Filtered products with pagination
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12; // Show fewer products at once for better performance

    // Check if any filters are active
    const hasActiveFilters = useMemo(() => {
        return searchQuery !== '' ||
            selectedCategory !== 'all' ||
            selectedLocation !== '' ||
            selectedCertifications.length > 0 ||
            priceRange.min > 0 ||
            priceRange.max < 2000;
    }, [searchQuery, selectedCategory, selectedLocation, selectedCertifications, priceRange]);

    // Memoized sort function
    const sortProducts = useCallback((products, sortOption) => {
        if (!products.length) return [];

        const sorted = [...products];

        switch (sortOption) {
            case 'price-low':
                return sorted.sort((a, b) => a.numericPrice - b.numericPrice);
            case 'price-high':
                return sorted.sort((a, b) => b.numericPrice - a.numericPrice);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'newest':
            default:
                return sorted;
        }
    }, []);

    // Debounced filtering
    useEffect(() => {
        const handler = setTimeout(() => {
            let results = [...allProducts];

            // Apply search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                results = results.filter(product =>
                    product.title.toLowerCase().includes(query) ||
                    product.farmType?.toLowerCase().includes(query)
                );
            }

            // Apply category filter
            if (selectedCategory && selectedCategory !== 'all') {
                const categoryFilters = {
                    'vegetables': ['Organic Vegetables'],
                    'fruits': ['King Coconut'],
                    'grains': ['Premium Rice'],
                    'spices': ['Ceylon Cinnamon', 'Black Pepper'],
                    'tea': ['Fresh Tea Leaves'],
                    'coconut': ['King Coconut'],
                };

                const categoryTerms = categoryFilters[selectedCategory] || [];

                if (categoryTerms.length) {
                    results = results.filter(product =>
                        categoryTerms.some(term => product.title.includes(term))
                    );
                }
            }

            // Apply location filter
            if (selectedLocation) {
                results = results.filter(product =>
                    product.location?.toLowerCase() === selectedLocation.toLowerCase()
                );
            }

            // Apply certification filters
            if (selectedCertifications.length > 0) {
                const certMap = {
                    'organic': product => product.badge === 'Organic' || product.title.includes('Organic'),
                    'export-quality': product => product.badge === 'Export Quality',
                    'pesticide-free': product => product.badge === 'Premium',
                    'fair-trade': product => product.badge === 'Direct'
                };

                results = results.filter(product =>
                    selectedCertifications.some(cert => certMap[cert] && certMap[cert](product))
                );
            }

            // Apply price filter
            results = results.filter(product =>
                product.numericPrice >= priceRange.min && product.numericPrice <= priceRange.max
            );

            // Apply sorting
            results = sortProducts(results, sortBy);

            setFilteredProducts(results);
            setCurrentPage(1); // Reset to first page when filters change
        }, 300); // 300ms debounce

        return () => clearTimeout(handler);
    }, [allProducts, searchQuery, selectedCategory, selectedLocation, sortBy, selectedCertifications, priceRange, sortProducts]);

    // Update displayed products based on pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
    }, [filteredProducts, currentPage, productsPerPage]);

    // Event handlers
    const handleCertificationToggle = useCallback((certId) => {
        setSelectedCertifications(prev => {
            if (prev.includes(certId)) {
                return prev.filter(id => id !== certId);
            } else {
                return [...prev, certId];
            }
        });
    }, []);

    // Filter removal handlers
    const removeCategoryFilter = useCallback(() => setSelectedCategory('all'), []);
    const removeLocationFilter = useCallback(() => setSelectedLocation(''), []);
    const removeSearchFilter = useCallback(() => setSearchQuery(''), []);
    const removePriceFilter = useCallback(() => setPriceRange({ min: 0, max: 2000 }), []);
    const removeCertificationFilter = useCallback((certId) => {
        setSelectedCertifications(prev => prev.filter(id => id !== certId));
    }, []);

    // Reset all filters
    const resetFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedLocation('');
        setSortBy('newest');
        setSelectedCertifications([]);
        setPriceRange({ min: 0, max: 2000 });
        setCurrentPage(1);
    }, []);

    // Page navigation
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Get label functions
    const getCategoryLabel = useCallback((value) => categoryMap[value] || value, []);
    const getLocationLabel = useCallback((value) => locationMap[value] || value, []);
    const getCertificationLabel = useCallback((id) => certificationMap[id] || id, []);

    // Calculate total pages
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-16 relative bg-gradient-to-b from-cambridge-blue-900 via-cambridge-blue-800 to-cal-poly-green-600">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            CropMate <span className="text-mindaro-400">Marketplace</span>
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed mb-10">
                            Discover and purchase high-quality agricultural products directly from verified farmers across Sri Lanka
                        </p>
                    </div>
                </div>
            </section>

            {/* Marketplace Content */}
            <SectionWrapper className="py-12 bg-cambridge-blue-50/70">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Desktop Filter Sidebar */}
                        <FilterSidebar
                            categories={categories}
                            locations={locations}
                            certifications={certifications}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            selectedCertifications={selectedCertifications}
                            handleCertificationToggle={handleCertificationToggle}
                            resetFilters={resetFilters}
                        />

                        {/* Mobile Filters */}
                        <MobileFilters
                            showMobileFilters={showMobileFilters}
                            setShowMobileFilters={setShowMobileFilters}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            sortOptions={sortOptions}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            categories={categories}
                            locations={locations}
                            certifications={certifications}
                            selectedCertifications={selectedCertifications}
                            handleCertificationToggle={handleCertificationToggle}
                            resetFilters={resetFilters}
                        />

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Results Header */}
                            <div
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4"
                                id="products-top"
                            >
                                <div>
                                    <h2 className="text-2xl font-semibold text-cambridge-blue-800">
                                        {filteredProducts.length} Products Available
                                    </h2>
                                    <p className="text-cambridge-blue-600 text-sm">
                                        {filteredProducts.length > 0
                                            ? `Showing ${(currentPage - 1) * productsPerPage + 1}-${Math.min(currentPage * productsPerPage, filteredProducts.length)} of ${filteredProducts.length} products`
                                            : 'No products match your filters'
                                        }
                                    </p>
                                </div>

                                <div className="hidden md:block">
                                    <FormSelect
                                        id="sort-by"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        options={sortOptions}
                                        className="min-w-40"
                                    />
                                </div>
                            </div>

                            {/* Active Filter Badges */}
                            <FilterBadges
                                hasActiveFilters={hasActiveFilters}
                                searchQuery={searchQuery}
                                selectedCategory={selectedCategory}
                                selectedLocation={selectedLocation}
                                priceRange={priceRange}
                                selectedCertifications={selectedCertifications}
                                resetFilters={resetFilters}
                                removeSearchFilter={removeSearchFilter}
                                removeCategoryFilter={removeCategoryFilter}
                                removeLocationFilter={removeLocationFilter}
                                removePriceFilter={removePriceFilter}
                                removeCertificationFilter={removeCertificationFilter}
                                getCategoryLabel={getCategoryLabel}
                                getLocationLabel={getLocationLabel}
                                getCertificationLabel={getCertificationLabel}
                            />

                            {/* Products Grid or Empty State */}
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {displayedProducts.map((product) => (
                                        <div key={product.id}>
                                            <CropCard crop={product} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl p-8 text-center border border-cambridge-blue-100/50">
                                    <div className="w-16 h-16 mx-auto bg-cambridge-blue-50 rounded-full flex items-center justify-center mb-4">
                                        <Search size={24} className="text-cambridge-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-cambridge-blue-800 mb-2">No products found</h3>
                                    <p className="text-cambridge-blue-600 mb-4">
                                        We couldn't find any products matching your criteria. Try adjusting your filters.
                                    </p>
                                    <button
                                        onClick={resetFilters}
                                        className="font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 
                                                    inline-flex items-center justify-center transition-colors 
                                                    border border-cambridge-blue-200 text-cambridge-blue-700 
                                                    hover:bg-cambridge-blue-50 focus:ring-cambridge-blue-500
                                                    px-4 py-2 text-base cursor-pointer"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}

                            {/* Pagination */}
                            {filteredProducts.length > productsPerPage && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </>
    );
};

export default Marketplace;