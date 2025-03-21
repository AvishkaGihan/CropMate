import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
    return (
        <div className="text-center mt-16">
            <motion.a
                href="/signup"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cambridge-blue-500 to-cambridge-blue-600 
                    text-white font-medium rounded-full shadow-md overflow-hidden relative"
                whileHover={{ y: -4 }}
                whileTap={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
                <span className="relative z-10">Learn More</span>

                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                </motion.svg>
            </motion.a>
        </div>
    );
};

export default CallToAction;