import React, { memo } from 'react';
import { Star, Leaf, LeafyGreen, ShieldCheck, Plus, Minus, Heart, Share2, ArrowRight, ShoppingCart, Loader } from 'lucide-react';
import Badge from '../../components/Shared/Badge';

const ProductInfoSection = ({
    product,
    quantity,
    totalPrice,
    isFavorite,
    increaseQuantity,
    decreaseQuantity,
    handleAddToCart,
    toggleFavorite,
    handleShare,
    changeTab,
    isAddingToCart
}) => {
    return (
        <div className="space-y-6">
            <div>
                {/* Product Header - Title, Price, Rating */}
                <ProductHeader
                    product={product}
                />

                {/* Product Description */}
                <ProductShortDescription
                    product={product}
                    changeTab={changeTab}
                />

                {/* Certifications */}
                <CertificationBadges
                    product={product}
                />

                {/* Quantity Selector */}
                <QuantitySelector
                    quantity={quantity}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                />

                {/* Total Price */}
                <TotalPrice
                    totalPrice={totalPrice}
                />

                {/* Action Buttons */}
                <ActionButtons
                    isFavorite={isFavorite}
                    handleAddToCart={handleAddToCart}
                    toggleFavorite={toggleFavorite}
                    handleShare={handleShare}
                    isAddingToCart={isAddingToCart}
                />
            </div>
        </div>
    );
};

// Product Header Component
const ProductHeader = memo(({ product }) => {
    return (
        <>
            <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="farm" text={product.farmType} />

                {/* Rating */}
                <div className="flex items-center bg-white py-1 px-2 rounded-full border border-cambridge-blue-100/50">
                    <div className="flex text-golden-brown-500">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                            />
                        ))}
                    </div>
                    <span className="text-cambridge-blue-700 ml-2 text-xs">{product.rating}/5</span>
                </div>
            </div>

            <h1 className="text-3xl font-bold text-cambridge-blue-800 mb-2 tracking-tight">{product.title}</h1>

            {/* Price with eco badge when applicable */}
            <div className="flex items-baseline gap-3 mb-4">
                <div className="text-3xl font-bold text-cambridge-blue-800">{product.price}</div>
                {product.badge === 'Premium' && (
                    <div className="text-sm line-through text-cambridge-blue-500">
                        Rs {product.numericPrice - 30}/kg
                    </div>
                )}

                {product.badge === 'Organic' && (
                    <div className="bg-cal-poly-green-50 text-cal-poly-green-700 px-2 py-1 rounded-full text-xs flex items-center border border-cal-poly-green-100/50">
                        <Leaf size={12} className="mr-1" />
                        Eco-friendly
                    </div>
                )}
            </div>
        </>
    );
});

// Product Short Description Component
const ProductShortDescription = memo(({ product, changeTab }) => {
    return (
        <div className="relative pl-6 text-cambridge-blue-700 mb-6 border-l-2 border-cambridge-blue-100">
            <p className="leading-relaxed">
                {product.description?.substring(0, 150)}...
            </p>
            <button
                className="text-golden-brown-600 hover:text-golden-brown-700 mt-2 text-sm font-medium flex items-center"
                onClick={() => changeTab('description')}
            >
                Read More
                <ArrowRight size={14} className="ml-1" />
            </button>
        </div>
    );
});

// Certification Badges Component
const CertificationBadges = memo(({ product }) => {
    return (
        <div className="mb-6 p-4 bg-cambridge-blue-50/50 rounded-xl border border-cambridge-blue-100/30">
            <div className="text-sm font-medium text-cambridge-blue-700 mb-3 flex items-center">
                <ShieldCheck size={16} className="mr-2 text-golden-brown-500" />
                Certifications & Quality Assurance
            </div>
            <div className="flex flex-wrap gap-2">
                {product.badge === 'Organic' && (
                    <div className="bg-cal-poly-green-50 text-cal-poly-green-700 px-3 py-1.5 rounded-lg text-xs flex items-center border border-cal-poly-green-100/50">
                        <ShieldCheck size={14} className="mr-1.5" />
                        Organic Certified
                    </div>
                )}
                {product.badge === 'Export Quality' && (
                    <div className="bg-golden-brown-50 text-golden-brown-700 px-3 py-1.5 rounded-lg text-xs flex items-center border border-golden-brown-100/50">
                        <ShieldCheck size={14} className="mr-1.5" />
                        Export Quality
                    </div>
                )}
                {product.badge === 'Premium' && (
                    <div className="bg-cambridge-blue-50 text-cambridge-blue-700 px-3 py-1.5 rounded-lg text-xs flex items-center border border-cambridge-blue-100/50">
                        <ShieldCheck size={14} className="mr-1.5" />
                        Pesticide-Free
                    </div>
                )}
                <div className="bg-mindaro-50 text-mindaro-700 px-3 py-1.5 rounded-lg text-xs flex items-center border border-mindaro-100/50">
                    <ShieldCheck size={14} className="mr-1.5" />
                    Quality Checked
                </div>
            </div>
        </div>
    );
});

// Quantity Selector Component
const QuantitySelector = memo(({ quantity, increaseQuantity, decreaseQuantity }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="text-sm font-medium text-cambridge-blue-700">Quantity:</div>
            <div className="flex items-center gap-3">
                <div className="inline-flex items-center bg-cambridge-blue-50 rounded-lg border border-cambridge-blue-100/50">
                    <button
                        onClick={decreaseQuantity}
                        className="w-9 h-9 flex items-center justify-center text-cambridge-blue-700 hover:bg-cambridge-blue-100/50 rounded-l-lg transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <Minus size={16} />
                    </button>
                    <div className="w-10 h-9 flex items-center justify-center font-medium text-cambridge-blue-800">
                        {quantity}
                    </div>
                    <button
                        onClick={increaseQuantity}
                        className="w-9 h-9 flex items-center justify-center text-cambridge-blue-700 hover:bg-cambridge-blue-100/50 rounded-r-lg transition-colors"
                        aria-label="Increase quantity"
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <div className="text-sm text-cambridge-blue-600 flex items-center">
                    <LeafyGreen size={14} className="mr-1 text-cal-poly-green-500" />
                    <span>kg (Min: 1kg, Max: 10kg)</span>
                </div>
            </div>
        </div>
    );
});

// Total Price Component
const TotalPrice = memo(({ totalPrice }) => {
    return (
        <div className="mb-6 bg-gradient-to-r from-cambridge-blue-50/80 to-cambridge-blue-50/20 p-4 rounded-xl border border-cambridge-blue-100/30">
            <div className="flex justify-between items-center">
                <div className="text-cambridge-blue-800 font-medium">Total Price:</div>
                <div className="text-2xl font-bold text-cambridge-blue-800">
                    Rs {totalPrice}
                </div>
            </div>
        </div>
    );
});

// Action Buttons Component
const ActionButtons = memo(({ handleAddToCart, isAddingToCart }) => {
    return (
        <div className="w-full flex flex-col items-center justify-end sm:flex-row gap-3">
            <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-1/2 py-3 px-4 bg-golden-brown-600 text-white rounded-lg font-medium hover:bg-golden-brown-700 transition-all duration-300 ${isAddingToCart ? 'opacity-80 cursor-not-allowed' : ''
                    } flex items-center justify-center`}
            >
                {isAddingToCart ? (
                    <>
                        <Loader size={18} className="animate-spin mr-2" />
                        Processing...
                    </>
                ) : (
                    'Buy Now'
                )}
            </button>
        </div>
    );
});

export default memo(ProductInfoSection);