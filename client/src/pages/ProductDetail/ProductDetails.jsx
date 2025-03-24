import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router';
import {
    Star,
    ChevronLeft,
    MapPin,
    Tag,
    Building,
    Truck,
    Clock,
    ShieldCheck,
    Plus,
    Minus,
    Heart,
    Share2
} from 'lucide-react';

import SectionWrapper from '../../components/Shared/SectionWrapper';
import Badge from '../../components/Shared/Badge';
import { FormButton } from '../../components/Shared/Form';
import RelatedProducts from './RelatedProducts';
import { getAllProducts } from '../../util/Crops/generateMoreProducts';
import Loading from '../../components/ProductDetails/Loading';
import Product404 from '../../components/ProductDetails/Product404';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Fetch product by ID
    useEffect(() => {
        // Simulate API fetch
        setLoading(true);

        // Get all products from the utility function
        const allProducts = getAllProducts();

        // Find product by ID
        const foundProduct = allProducts.find(p => p.id === parseInt(id));

        if (foundProduct) {
            setProduct(foundProduct);

            // Find related products (same category/type or location)
            const productTitle = foundProduct.title.toLowerCase();
            const related = allProducts
                .filter(p => {
                    // Different product but similar in type or location
                    return p.id !== parseInt(id) && (
                        p.title.toLowerCase().includes(productTitle.split(' ')[productTitle.split(' ').length - 1]) ||
                        p.location === foundProduct.location
                    );
                })
                .slice(0, 3); // Get only 3 related products

            setRelatedProducts(related);
        }

        setLoading(false);
    }, [id]);

    // Handle quantity changes
    const increaseQuantity = useCallback(() => {
        setQuantity(prev => prev + 1);
    }, []);

    const decreaseQuantity = useCallback(() => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }, []);

    // Handle tab changes
    const changeTab = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (!product) {
        return (
            <Product404 />
        );
    }

    // Calculate total price
    const totalPrice = product.numericPrice * quantity;

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-cambridge-blue-50 pt-24 pb-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center text-sm text-cambridge-blue-600">
                        <Link to="/" className="hover:text-golden-brown-500">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/marketplace" className="hover:text-golden-brown-500">Marketplace</Link>
                        <span className="mx-2">/</span>
                        <span className="text-cambridge-blue-800">{product.title}</span>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <SectionWrapper className="pt-8 pb-16">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-cambridge-blue-100/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8">
                            {/* Product Image Column */}
                            <div className="space-y-6">
                                {/* Main Image */}
                                <div className="bg-cambridge-blue-50/50 rounded-xl overflow-hidden aspect-square relative">
                                    {product.badge && <Badge variant="standard" text={product.badge} position="top-left" />}
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Quick Facts */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-cambridge-blue-50/70 rounded-lg p-4 flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-cambridge-blue-100 flex items-center justify-center text-cambridge-blue-700 mr-3">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-cambridge-blue-600">Location</div>
                                            <div className="font-medium text-cambridge-blue-800">{product.location}</div>
                                        </div>
                                    </div>

                                    <div className="bg-cambridge-blue-50/70 rounded-lg p-4 flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-cambridge-blue-100 flex items-center justify-center text-cambridge-blue-700 mr-3">
                                            <Building size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-cambridge-blue-600">Farm</div>
                                            <div className="font-medium text-cambridge-blue-800">{product.farmType}</div>
                                        </div>
                                    </div>

                                    <div className="bg-cambridge-blue-50/70 rounded-lg p-4 flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-cambridge-blue-100 flex items-center justify-center text-cambridge-blue-700 mr-3">
                                            <Truck size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-cambridge-blue-600">Delivery</div>
                                            <div className="font-medium text-cambridge-blue-800">2-4 days</div>
                                        </div>
                                    </div>

                                    <div className="bg-cambridge-blue-50/70 rounded-lg p-4 flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-cambridge-blue-100 flex items-center justify-center text-cambridge-blue-700 mr-3">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-cambridge-blue-600">Shelf Life</div>
                                            <div className="font-medium text-cambridge-blue-800">14 days</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Info Column */}
                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div>
                                    <h1 className="text-3xl font-bold text-cambridge-blue-800 mb-2">{product.title}</h1>

                                    <div className="flex items-center gap-2 mb-4">
                                        {/* Rating */}
                                        <div className="flex items-center">
                                            <div className="flex text-golden-brown-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                                        className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-cambridge-blue-700 ml-2 text-sm">{product.rating} / 5</span>
                                        </div>

                                        {/* Farm Type Badge */}
                                        <Badge variant="farm" text={product.farmType} />
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-3 mb-6">
                                        <div className="text-3xl font-bold text-cambridge-blue-800">{product.price}</div>
                                        {product.badge === 'Premium' && (
                                            <div className="text-sm line-through text-cambridge-blue-500">
                                                Rs {product.numericPrice - 30}/kg
                                            </div>
                                        )}
                                    </div>

                                    {/* Short Description */}
                                    <p className="text-cambridge-blue-600 mb-6">
                                        {product.description?.substring(0, 120)}...
                                    </p>

                                    {/* Certifications */}
                                    <div className="mb-6">
                                        <div className="text-sm font-medium text-cambridge-blue-700 mb-2">Certifications:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {product.badge === 'Organic' && (
                                                <div className="bg-cal-poly-green-50 text-cal-poly-green-700 px-3 py-1 rounded-full text-xs flex items-center">
                                                    <ShieldCheck size={12} className="mr-1" />
                                                    Organic Certified
                                                </div>
                                            )}
                                            {product.badge === 'Export Quality' && (
                                                <div className="bg-golden-brown-50 text-golden-brown-700 px-3 py-1 rounded-full text-xs flex items-center">
                                                    <ShieldCheck size={12} className="mr-1" />
                                                    Export Quality
                                                </div>
                                            )}
                                            {product.badge === 'Premium' && (
                                                <div className="bg-cambridge-blue-50 text-cambridge-blue-700 px-3 py-1 rounded-full text-xs flex items-center">
                                                    <ShieldCheck size={12} className="mr-1" />
                                                    Pesticide-Free
                                                </div>
                                            )}
                                            <div className="bg-mindaro-50 text-mindaro-700 px-3 py-1 rounded-full text-xs flex items-center">
                                                <ShieldCheck size={12} className="mr-1" />
                                                Quality Checked
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Selector */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-sm font-medium text-cambridge-blue-700">Quantity:</div>
                                        <div className="flex items-center border border-cambridge-blue-200 rounded-lg">
                                            <button
                                                onClick={decreaseQuantity}
                                                className="px-3 py-2 text-cambridge-blue-700 hover:bg-cambridge-blue-50"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <div className="px-3 py-1 min-w-[40px] text-center">{quantity}</div>
                                            <button
                                                onClick={increaseQuantity}
                                                className="px-3 py-2 text-cambridge-blue-700 hover:bg-cambridge-blue-50"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <div className="text-sm text-cambridge-blue-600">
                                            (Minimum: 1kg)
                                        </div>
                                    </div>

                                    {/* Total Price */}
                                    <div className="mb-6">
                                        <div className="text-sm font-medium text-cambridge-blue-700 mb-1">Total:</div>
                                        <div className="text-2xl font-bold text-cambridge-blue-800">
                                            Rs {totalPrice}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <FormButton
                                            variant="primary"
                                            fullWidth
                                            onClick={() => alert('Adding to cart: ' + product.title)}
                                        >
                                            Add to Cart
                                        </FormButton>

                                        <button className="p-3 border border-cambridge-blue-200 rounded-lg text-cambridge-blue-700 hover:bg-cambridge-blue-50">
                                            <Heart size={20} />
                                        </button>

                                        <button className="p-3 border border-cambridge-blue-200 rounded-lg text-cambridge-blue-700 hover:bg-cambridge-blue-50">
                                            <Share2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs Section */}
                        <div className="border-t border-cambridge-blue-100/50 px-6 lg:px-8 pt-6">
                            {/* Tabs Navigation */}
                            <div className="flex border-b border-cambridge-blue-100">
                                <button
                                    className={`px-4 py-3 font-medium text-sm transition-colors ${activeTab === 'description'
                                        ? 'text-cambridge-blue-800 border-b-2 border-cambridge-blue-500'
                                        : 'text-cambridge-blue-600 hover:text-cambridge-blue-800'
                                        }`}
                                    onClick={() => changeTab('description')}
                                >
                                    Description
                                </button>
                                <button
                                    className={`px-4 py-3 font-medium text-sm transition-colors ${activeTab === 'specifications'
                                        ? 'text-cambridge-blue-800 border-b-2 border-cambridge-blue-500'
                                        : 'text-cambridge-blue-600 hover:text-cambridge-blue-800'
                                        }`}
                                    onClick={() => changeTab('specifications')}
                                >
                                    Specifications
                                </button>
                                <button
                                    className={`px-4 py-3 font-medium text-sm transition-colors ${activeTab === 'farmInfo'
                                        ? 'text-cambridge-blue-800 border-b-2 border-cambridge-blue-500'
                                        : 'text-cambridge-blue-600 hover:text-cambridge-blue-800'
                                        }`}
                                    onClick={() => changeTab('farmInfo')}
                                >
                                    Farm Information
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="py-6">
                                {activeTab === 'description' && (
                                    <div className="prose max-w-none text-cambridge-blue-700">
                                        <p>{product.description}</p>
                                        <p>
                                            Our {product.title.toLowerCase()} is sourced directly from {product.farmType} in {product.location},
                                            Sri Lanka. We ensure that only the highest quality produce reaches your table,
                                            supporting sustainable agriculture practices and local farming communities.
                                        </p>
                                        <p>
                                            Each batch is carefully inspected to meet our rigorous quality standards.
                                            Our produce is harvested at peak ripeness and delivered to you as fresh as possible.
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'specifications' && (
                                    <div>
                                        <table className="w-full text-sm">
                                            <tbody>
                                                <tr className="border-b border-cambridge-blue-100">
                                                    <td className="py-3 font-medium text-cambridge-blue-700 w-1/3">Origin</td>
                                                    <td className="py-3 text-cambridge-blue-800">{product.location}, Sri Lanka</td>
                                                </tr>
                                                <tr className="border-b border-cambridge-blue-100">
                                                    <td className="py-3 font-medium text-cambridge-blue-700">Farm</td>
                                                    <td className="py-3 text-cambridge-blue-800">{product.farmType}</td>
                                                </tr>
                                                <tr className="border-b border-cambridge-blue-100">
                                                    <td className="py-3 font-medium text-cambridge-blue-700">Variety</td>
                                                    <td className="py-3 text-cambridge-blue-800">
                                                        {product.title.includes('Premium')
                                                            ? 'Premium Grade'
                                                            : product.title.includes('Bulk')
                                                                ? 'Commercial Grade'
                                                                : 'Standard'}
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-cambridge-blue-100">
                                                    <td className="py-3 font-medium text-cambridge-blue-700">Cultivation Method</td>
                                                    <td className="py-3 text-cambridge-blue-800">
                                                        {product.badge === 'Organic'
                                                            ? 'Organic farming, no synthetic pesticides'
                                                            : 'Conventional farming with minimal chemical inputs'}
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-cambridge-blue-100">
                                                    <td className="py-3 font-medium text-cambridge-blue-700">Harvest Season</td>
                                                    <td className="py-3 text-cambridge-blue-800">Year-round availability, peak quality during monsoon season</td>
                                                </tr>
                                                <tr className="border-b border-cambridge-blue-100">
                                                    <td className="py-3 font-medium text-cambridge-blue-700">Storage</td>
                                                    <td className="py-3 text-cambridge-blue-800">Store in a cool, dry place. Refrigerate for extended freshness.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 font-medium text-cambridge-blue-700">Packaging</td>
                                                    <td className="py-3 text-cambridge-blue-800">Eco-friendly packaging, minimum 1kg units</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {activeTab === 'farmInfo' && (
                                    <div className="text-cambridge-blue-700">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-cambridge-blue-800 mb-2">About {product.farmType}</h3>
                                            <p className="mb-4">
                                                Located in the beautiful region of {product.location}, {product.farmType} has been
                                                growing quality crops for over 25 years. The farm spans across 35 acres of fertile land,
                                                perfectly suited for cultivating {product.title.toLowerCase().split(' ').pop()}.
                                            </p>
                                            <p>
                                                The farmers use a combination of traditional knowledge and modern sustainable practices
                                                to ensure consistent quality while preserving the natural ecosystem.
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-cambridge-blue-800 mb-2">Farming Practices</h3>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Soil conservation through crop rotation</li>
                                                <li>Water-efficient irrigation systems</li>
                                                <li>Minimal use of chemical inputs</li>
                                                <li>Hand harvesting for better quality control</li>
                                                <li>Fair wages and good working conditions for all farm workers</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-cambridge-blue-800 mb-2">Direct Impact</h3>
                                            <p>
                                                By purchasing from {product.farmType}, you're directly supporting approximately
                                                15 farming families in {product.location}. Your purchase enables investments in
                                                better farming equipment, community facilities, and educational opportunities for
                                                farmers' children.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-cambridge-blue-800 mb-6">Related Products</h2>
                            <RelatedProducts products={relatedProducts} />
                        </div>
                    )}
                </div>
            </SectionWrapper>
        </>
    );
};

export default ProductDetailPage;