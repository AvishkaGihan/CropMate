import { memo } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { itemVariants } from '../../util/Auth/animations';

const LogoSection = ({
    title = "Welcome Back",
    subtitle = "Sign in to your CropMate account"
}) => {
    return (
        <motion.div
            variants={itemVariants}
            className="text-center mb-8"
        >
            <Link to="/" className="inline-block mb-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cal-poly-green-600 to-cambridge-blue-800 flex items-center justify-center shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="text-mindaro-400 transition-transform duration-500 group-hover:rotate-12">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                        </svg>
                    </div>
                </div>
            </Link>
            <h1 className="text-3xl font-bold text-cambridge-blue-800 mb-1">{title}</h1>
            <p className="text-cambridge-blue-600">{subtitle}</p>
        </motion.div>
    );
};

export default memo(LogoSection);