import React, { memo } from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { socialPlatforms } from '../../constants/SocialPlatforms';


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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                        </svg>
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