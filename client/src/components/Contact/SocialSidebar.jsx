import { motion } from 'framer-motion';
import { itemVariants } from '../../util/animations';
import SocialLink from './SocialLink';

import {
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
} from 'lucide-react';
const SocialSidebar = () => (
    <motion.div
        className="bg-cambridge-blue-50/80 rounded-xl p-6 border border-cambridge-blue-100/50"
        variants={itemVariants}
    >
        <h3 className="text-lg font-semibold text-cambridge-blue-800 mb-4">
            Connect With Us
        </h3>
        <p className="text-cambridge-blue-700/80 mb-6 text-sm">
            Follow us on social media to stay updated with the latest agricultural insights and CropMate news.
        </p>

        <div className="space-y-2">
            <SocialLink
                icon={<Twitter size={20} strokeWidth={2} />}
                platform="Twitter"
                url="https://twitter.com/cropmate"
            />
            <SocialLink
                icon={<Facebook size={20} strokeWidth={2} />}
                platform="Facebook"
                url="https://facebook.com/cropmate"
            />
            <SocialLink
                icon={<Instagram size={20} strokeWidth={2} />}
                platform="Instagram"
                url="https://instagram.com/cropmate"
            />
            <SocialLink
                icon={<Linkedin size={20} strokeWidth={2} />}
                platform="LinkedIn"
                url="https://linkedin.com/company/cropmate"
            />
        </div>

        <div className="mt-8 pt-6 border-t border-cambridge-blue-200/50">
            <h4 className="font-medium text-cambridge-blue-700 mb-2">
                Join Our Newsletter
            </h4>
            <p className="text-cambridge-blue-700/80 text-sm mb-4">
                Get agricultural tips and updates delivered to your inbox.
            </p>
            <a
                href="/newsletter"
                className="inline-block w-full text-center px-4 py-2 bg-golden-brown-500 text-white rounded-lg hover:bg-golden-brown-600 transition-colors text-sm font-medium"
            >
                Subscribe Now
            </a>
        </div>
    </motion.div>
);

export default SocialSidebar;