import React from 'react';
import { socialPlatforms } from '../../../constants/socialPlatforms';

const SocialLinks = () => {
    return (
        <div className="flex space-x-4">
            {socialPlatforms.map((platform) => (
                <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-green-600 transition-colors"
                    aria-label={platform.name}
                >
                    {platform.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;