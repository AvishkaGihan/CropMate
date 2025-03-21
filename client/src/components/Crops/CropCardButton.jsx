import { motion } from 'framer-motion';

const CropCardButton = ({ text, onClick }) => {
    return (
        <motion.button
            className="w-full py-3 rounded-xl border border-cambridge-blue-400 text-cambridge-blue-700
                font-medium flex items-center justify-center relative overflow-hidden
                hover:bg-cambridge-blue-600 hover:text-white hover:border-cambridge-blue-600
                transition-all duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={onClick}
        >
            <span className="relative z-10">{text}</span>
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
        </motion.button>
    );
};

export default CropCardButton;