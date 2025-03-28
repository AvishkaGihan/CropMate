import { memo } from 'react';
import { motion } from 'framer-motion';
import { containerVariants } from '../util/Auth/animations';

// Import farm image
import FarmImage from '../assets/images/farm-landscape.jpg';

const AuthLayout = ({
    children,
    leftContent,
    rightContent,
    bgImageSrc = FarmImage
}) => {
    return (
        <div className="min-h-screen flex">
            {/* Left Column - Image */}
            <div className="hidden md:block md:w-1/2 bg-cambridge-blue-700 relative overflow-hidden">
                <img
                    src={bgImageSrc || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"}
                    alt="Farm landscape"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cambridge-blue-900/90 to-cambridge-blue-700/50"></div>

                {/* Overlay content */}
                {leftContent}
            </div>

            {/* Right Column - Form */}
            <div className="w-full md:w-1/2 bg-cambridge-blue-50 flex items-center justify-center p-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-md w-full"
                >
                    {rightContent || children}
                </motion.div>
            </div>
        </div>
    );
};

export default memo(AuthLayout);