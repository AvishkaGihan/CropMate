import React, { memo } from 'react';
import { MapPin, Building, Truck, Clock, Leaf, User } from 'lucide-react';
import Badge from '../../components/Shared/Badge';

const ProductImageSection = ({ product }) => {
    return (
        <div className="space-y-6">
            {/* Main Image with enhanced styling */}
            <div className="bg-cambridge-blue-50/30 rounded-xl overflow-hidden aspect-square relative shadow-sm border border-cambridge-blue-100/40 group">
                {product.badge && (
                    <Badge variant="standard" text={product.badge} position="top-left" />
                )}
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Farm source tag */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-xs py-1 px-3 rounded-full flex items-center shadow-sm border border-cambridge-blue-100/50">
                    <User size={12} className="text-golden-brown-500 mr-1" />
                    <span className="text-cambridge-blue-800 font-medium">From {product.farmType}</span>
                </div>
            </div>

            {/* Quick Facts */}
            <QuickFactsGrid product={product} />

            {/* Harvest Timer */}
            <HarvestInfo product={product} />
        </div>
    );
};

// Quick Facts Component
const QuickFactsGrid = memo(({ product }) => {
    const factItems = [
        { icon: MapPin, title: "Location", value: product.location },
        { icon: Building, title: "Farm", value: product.farmType },
        { icon: Truck, title: "Delivery", value: "2-4 days" },
        { icon: Clock, title: "Shelf Life", value: "14 days" }
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {factItems.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div key={index} className="bg-cambridge-blue-50/60 rounded-xl p-4 flex items-center border border-cambridge-blue-100/30 hover:border-cambridge-blue-200/50 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center text-cambridge-blue-700 mr-3 shadow-sm group-hover:text-golden-brown-500 transition-colors">
                            <Icon size={18} />
                        </div>
                        <div>
                            <div className="text-xs text-cambridge-blue-600">{item.title}</div>
                            <div className="font-medium text-cambridge-blue-800">{item.value}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

// Harvest Info Component
const HarvestInfo = memo(({ product }) => {
    return (
        <div className="bg-gradient-to-r from-mindaro-50 to-golden-brown-50 rounded-xl p-4 border border-golden-brown-100/30 shadow-sm">
            <div className="flex items-center mb-2">
                <Leaf size={16} className="text-golden-brown-500 mr-2" />
                <h3 className="font-medium text-cambridge-blue-800">Harvest Information</h3>
            </div>
            <p className="text-sm text-cambridge-blue-700">
                This {product.title.toLowerCase()} was harvested approximately 2 days ago to ensure
                maximum freshness. Our produce is delivered within 48 hours of packaging.
            </p>
        </div>
    );
});

export default memo(ProductImageSection);