import React, { memo } from 'react';
import { Leaf, GripHorizontal, Building, LeafyGreen, MapPin, Clock, ShieldCheck, Truck, Heart, ArrowRight } from 'lucide-react';

const ProductTabsSection = ({ product, activeTab, changeTab }) => {
    return (
        <div className="border-t border-cambridge-blue-100/50 px-6 lg:px-8 pt-6">
            {/* Tabs Navigation */}
            <TabNavigation activeTab={activeTab} changeTab={changeTab} />

            {/* Tab Content */}
            <div className="py-6">
                {activeTab === 'description' && <DescriptionTab product={product} />}
                {activeTab === 'specifications' && <SpecificationsTab product={product} />}
                {activeTab === 'farmInfo' && <FarmInfoTab product={product} />}
            </div>
        </div>
    );
};

// Tab Navigation Component
const TabNavigation = memo(({ activeTab, changeTab }) => {
    const tabs = [
        { id: 'description', label: 'Description', icon: Leaf },
        { id: 'specifications', label: 'Specifications', icon: GripHorizontal },
        { id: 'farmInfo', label: 'Farm Information', icon: Building }
    ];

    return (
        <div className="flex border-b border-cambridge-blue-100 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`px-4 py-3 font-medium text-sm transition-all flex items-center ${activeTab === tab.id
                            ? 'text-cambridge-blue-800 border-b-2 border-cambridge-blue-500 bg-cambridge-blue-50/50'
                            : 'text-cambridge-blue-600 hover:text-cambridge-blue-800 hover:bg-cambridge-blue-50/30'
                        }`}
                    onClick={() => changeTab(tab.id)}
                >
                    {activeTab === tab.id && (
                        <tab.icon size={14} className="mr-1.5 text-golden-brown-500" />
                    )}
                    {tab.label}
                </button>
            ))}
        </div>
    );
});

// Description Tab Content
const DescriptionTab = memo(({ product }) => {
    return (
        <div className="prose max-w-none text-cambridge-blue-700">
            <p className="mb-4 leading-relaxed">{product.description}</p>
            <div className="p-4 my-4 bg-cambridge-blue-50/50 rounded-xl border-l-4 border-cambridge-blue-500/30">
                <p className="mb-2 italic">
                    "Our {product.title.toLowerCase()} is sourced directly from {product.farmType} in {product.location},
                    Sri Lanka. We ensure that only the highest quality produce reaches your table,
                    supporting sustainable agriculture practices and local farming communities."
                </p>
                <p className="text-sm text-cambridge-blue-600">
                    — CropMate Quality Promise
                </p>
            </div>
            <p className="leading-relaxed">
                Each batch is carefully inspected to meet our rigorous quality standards.
                Our produce is harvested at peak ripeness and delivered to you as fresh as possible.
            </p>
        </div>
    );
});

// Specifications Tab Content
const SpecificationsTab = memo(({ product }) => {
    const specifications = [
        { icon: MapPin, label: 'Origin', value: `${product.location}, Sri Lanka` },
        { icon: Building, label: 'Farm', value: product.farmType },
        { icon: Leaf, label: 'Variety', value: product.title.includes('Premium') ? 'Premium Grade' : (product.title.includes('Bulk') ? 'Commercial Grade' : 'Standard') },
        { icon: LeafyGreen, label: 'Cultivation Method', value: product.badge === 'Organic' ? 'Organic farming, no synthetic pesticides' : 'Conventional farming with minimal chemical inputs' },
        { icon: Clock, label: 'Harvest Season', value: 'Year-round availability, peak quality during monsoon season' },
        { icon: ShieldCheck, label: 'Storage', value: 'Store in a cool, dry place. Refrigerate for extended freshness.' },
        { icon: Truck, label: 'Packaging', value: 'Eco-friendly packaging, minimum 1kg units' }
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <tbody>
                    {specifications.map((spec, index) => {
                        const Icon = spec.icon;
                        return (
                            <tr key={index} className="border-b border-cambridge-blue-100 hover:bg-cambridge-blue-50/30 transition-colors">
                                <td className="py-3 px-4 font-medium text-cambridge-blue-700 w-1/3">
                                    <div className="flex items-center">
                                        <Icon size={14} className="mr-2 text-golden-brown-500" />
                                        {spec.label}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-cambridge-blue-800">{spec.value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});

// Farm Info Tab Content
const FarmInfoTab = memo(({ product }) => {
    const farmingPractices = [
        "Soil conservation through crop rotation",
        "Water-efficient irrigation systems",
        "Minimal use of chemical inputs",
        "Hand harvesting for better quality control",
        "Fair wages and good working conditions for all farm workers"
    ];

    return (
        <div className="text-cambridge-blue-700 p-1">
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-cambridge-blue-800 mb-3 flex items-center">
                    <Building size={16} className="mr-2 text-golden-brown-500" />
                    About {product.farmType}
                </h3>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <p className="mb-4 leading-relaxed">
                            Located in the beautiful region of {product.location}, {product.farmType} has been
                            growing quality crops for over 25 years. The farm spans across 35 acres of fertile land,
                            perfectly suited for cultivating {product.title.toLowerCase().split(' ').pop()}.
                        </p>
                        <p className="leading-relaxed">
                            The farmers use a combination of traditional knowledge and modern sustainable practices
                            to ensure consistent quality while preserving the natural ecosystem.
                        </p>
                    </div>
                    <div className="md:w-1/3 bg-cambridge-blue-50/40 rounded-xl overflow-hidden border border-cambridge-blue-100/30">
                        {/* Using the single product image with an overlay */}
                        <div className="aspect-video bg-cambridge-blue-200/50 relative">
                            <img
                                src={product.image}
                                alt={`${product.farmType} farm`}
                                className="w-full h-full object-cover opacity-70"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="px-3 py-1 bg-white/80 rounded-full text-sm font-medium text-cambridge-blue-800">
                                    {product.farmType} Farm
                                </div>
                            </div>
                        </div>
                        <div className="p-3 text-xs text-cambridge-blue-600 italic">
                            View of the farm in {product.location}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold text-cambridge-blue-800 mb-3 flex items-center">
                    <LeafyGreen size={16} className="mr-2 text-golden-brown-500" />
                    Farming Practices
                </h3>
                <ul className="list-none space-y-3 pl-0">
                    {farmingPractices.map((practice, index) => (
                        <li key={index} className="flex items-start pl-6 relative">
                            <Leaf size={14} className="text-cal-poly-green-500 absolute left-0 top-1.5 transform -rotate-12" />
                            <span>{practice}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-cambridge-blue-800 mb-3 flex items-center">
                    <Heart size={16} className="mr-2 text-golden-brown-500" />
                    Direct Impact
                </h3>
                <div className="p-4 bg-mindaro-50/40 rounded-xl border border-mindaro-200/30">
                    <p className="leading-relaxed">
                        By purchasing from {product.farmType}, you're directly supporting approximately
                        15 farming families in {product.location}. Your purchase enables investments in
                        better farming equipment, community facilities, and educational opportunities for
                        farmers' children.
                    </p>

                    <a
                        href="#"
                        className="inline-flex items-center mt-3 text-golden-brown-600 hover:text-golden-brown-700 font-medium text-sm"
                    >
                        Learn more about our impact
                        <ArrowRight size={14} className="ml-1" />
                    </a>
                </div>
            </div>
        </div>
    );
});

export default memo(ProductTabsSection);