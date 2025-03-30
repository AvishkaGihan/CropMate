import React, { memo } from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Leaf } from 'lucide-react';
import { socialPlatforms } from '../../constants';


const iconMap = {
    'Facebook': Facebook,
    'Twitter': Twitter,
    'Instagram': Instagram,
    'Linkedin': Linkedin
};

const FooterBrand = () => {
    return (
        <div>
            <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cambridge-blue-400 to-mindaro-500 rounded-lg flex items-center justify-center shadow-lg mr-3">
                    <div className="text-white">
                        <Leaf size={24} className="w-6 h-6" />
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">CropMate</h2>
                    <p className="text-xs text-cambridge-blue-300">Agricultural Innovation</p>
                </div>
            </div>

            <p className="text-cambridge-blue-300 mb-6">
                Revolutionizing agriculture in Sri Lanka through technology, community, and sustainable practices.
            </p>

            <SocialLinks socialPlatforms={socialPlatforms} />
        </div>
    );
};

// Use socialPlatforms constant for social media links
const SocialLinks = memo(({ socialPlatforms }) => {
    return (
        <div className="flex space-x-3">
            {socialPlatforms.map(platform => {
                // Get the appropriate icon component from our mapping
                const Icon = iconMap[platform.name] || null;

                // Only render if we have a mapped icon
                if (!Icon) return null;

                return (
                    <a
                        key={platform.id}
                        href={platform.url + "/cropmate"}
                        className="w-9 h-9 rounded-full bg-cambridge-blue-700 hover:bg-cambridge-blue-600 flex items-center justify-center text-cambridge-blue-300 hover:text-white transition-colors"
                        aria-label={`Visit our ${platform.name}`}
                    >
                        <Icon size={18} />
                    </a>
                );
            })}
        </div>
    );
});

export default memo(FooterBrand);