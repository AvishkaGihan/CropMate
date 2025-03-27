import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { getAllProducts } from '../../util/Crops/generateMoreProducts';
import { Leaf, LeafyGreen, ArrowRight, Loader } from 'lucide-react'; // Add Loader icon

import SectionWrapper from '../../components/Shared/SectionWrapper';
import Loading from '../../components/ProductDetails/Loading';
import Product404 from '../../components/ProductDetails/Product404';
import NotificationToast from '../../components/Shared/NotificationToast';
import Breadcrumb from '../../components/Shared/BreadCrumb';
import ProductImageSection from './ProductImage';
import ProductInfoSection from './ProductInfo';
import ProductTabsSection from './ProductTabs';
import RelatedProducts from './RelatedProducts';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Add this to use navigation
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [notification, setNotification] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const productRef = useRef(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false); // Add loading state

    // Fetch product by ID
    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);

        const allProducts = getAllProducts();
        const foundProduct = allProducts.find(p => p.id === parseInt(id));

        if (foundProduct) {
            setProduct(foundProduct);

            // Find related products
            const productTitle = foundProduct.title.toLowerCase();
            const related = allProducts
                .filter(p => {
                    return p.id !== parseInt(id) && (
                        p.title.toLowerCase().includes(productTitle.split(' ')[productTitle.split(' ').length - 1]) ||
                        p.location === foundProduct.location
                    );
                })
                .slice(0, 4);

            setRelatedProducts(related);
        }

        setLoading(false);
    }, [id]);

    // Handle quantity changes
    const increaseQuantity = useCallback(() => {
        setQuantity(prev => {
            if (prev >= 10) {
                showNotification("Maximum 10kg per order");
                return 10;
            }
            return prev + 1;
        });
    }, []);

    const decreaseQuantity = useCallback(() => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }, []);

    // Handle tab changes
    const changeTab = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    // Show notification
    const showNotification = useCallback((message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    }, []);

    // Add to cart and navigate to order page with loading state
    const handleAddToCart = useCallback(() => {
        // Set loading state to true
        setIsAddingToCart(true);

        // Show notification
        showNotification(`Added ${quantity}kg of ${product?.title} to cart!`);

        // Then navigate to order page after a short delay
        setTimeout(() => {
            navigate('/order-now', {
                state: {
                    product: product,
                    quantity: quantity,
                    totalPrice: product.numericPrice * quantity
                }
            });
            // If navigation fails for some reason, reset loading state
            // This is a safeguard but typically won't be needed as navigation will unmount this component
            setIsAddingToCart(false);
        }, 1000);
    }, [product, quantity, navigate]);

    // Toggle favorite
    const toggleFavorite = useCallback(() => {
        setIsFavorite(prev => !prev);
        showNotification(isFavorite
            ? `Removed ${product?.title} from wishlist`
            : `Added ${product?.title} to wishlist!`);
    }, [product, isFavorite]);

    // Share product
    const handleShare = useCallback(() => {
        showNotification('Product link copied to clipboard!');
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!product) {
        return <Product404 />;
    }

    const breadcrumbItems = [
        { path: '/', label: 'Home' },
        { path: '/marketplace', label: 'Marketplace' },
        { label: product.title, isActive: true }
    ];

    // Calculate total price
    const totalPrice = product.numericPrice * quantity;

    return (
        <>
            {/* Notification Toast */}
            {notification && (
                <NotificationToast
                    notification={notification}
                    clearNotification={() => setNotification(null)}
                />
            )}

            {/* Breadcrumb */}
            <Breadcrumb
                items={breadcrumbItems}
                background="gradient"
                decorative={true}
            />

            {/* Product Details with Nature-Inspired Design */}
            <div className="relative bg-gradient-to-b from-cambridge-blue-50/50 to-white" ref={productRef}>
                <SectionWrapper className="pt-8 pb-16">
                    <div className="container mx-auto px-4">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-cambridge-blue-100/50 relative">
                            {/* Decorative leaf in the corner */}
                            <div className="absolute -top-6 -right-6 text-mindaro-200 opacity-20 rotate-45 pointer-events-none">
                                <Leaf size={120} />
                            </div>

                            {/* Main Product Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8">
                                {/* Product Image Column */}
                                <ProductImageSection product={product} />

                                {/* Product Info Column */}
                                <ProductInfoSection
                                    product={product}
                                    quantity={quantity}
                                    totalPrice={totalPrice}
                                    isFavorite={isFavorite}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    handleAddToCart={handleAddToCart}
                                    toggleFavorite={toggleFavorite}
                                    handleShare={handleShare}
                                    changeTab={changeTab}
                                    isAddingToCart={isAddingToCart} // Pass new loading state
                                />
                            </div>

                            {/* Tabs Section */}
                            <ProductTabsSection
                                product={product}
                                activeTab={activeTab}
                                changeTab={changeTab}
                            />
                        </div>

                        {/* Related Products */}
                        {relatedProducts.length > 0 && (
                            <div className="mt-16">
                                <div className="relative">
                                    {/* Decorative leaf elements */}
                                    <div className="absolute -top-10 -left-6 text-cal-poly-green-100 opacity-30">
                                        <Leaf size={80} className="transform rotate-45" />
                                    </div>

                                    <div className="flex items-center justify-between mb-6 relative">
                                        <h2 className="text-2xl font-bold text-cambridge-blue-800 flex items-center">
                                            <LeafyGreen size={20} className="mr-2 text-cal-poly-green-600" />
                                            You Might Also Like
                                        </h2>
                                        <Link
                                            to="/marketplace"
                                            className="text-golden-brown-600 hover:text-golden-brown-700 font-medium flex items-center transition-colors"
                                        >
                                            View All Products
                                            <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="bg-cambridge-blue-50/30 p-6 rounded-xl border border-cambridge-blue-100/30">
                                    <RelatedProducts products={relatedProducts} />
                                </div>
                            </div>
                        )}
                    </div>
                </SectionWrapper>
            </div>
        </>
    );
};

export default ProductDetailPage;