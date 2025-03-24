import { memo } from 'react';
import { Search } from 'lucide-react';
import { FormInput } from '../../components/Shared/Form';

const MarketplaceHero = ({ searchQuery, setSearchQuery }) => {
    return (
        <section className="pt-32 pb-16 relative bg-gradient-to-b from-cambridge-blue-900 via-cambridge-blue-800 to-cal-poly-green-600">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        CropMate <span className="text-mindaro-400">Marketplace</span>
                    </h1>
                    <p className="text-xl text-white/90 leading-relaxed mb-10">
                        Discover and purchase high-quality agricultural products directly from verified farmers across Sri Lanka
                    </p>

                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <FormInput
                                id="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for crops, farms, or products..."
                                className="pl-12 pr-4 py-3 bg-cambridge-blue-900/30 border border-cambridge-blue-300/30 text-cambridge-blue-500 placeholder-cambridge-blue-300/60 rounded-xl backdrop-blur-sm"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cambridge-blue-300/70" size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(MarketplaceHero);