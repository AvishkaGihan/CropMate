import { motion } from "framer-motion";

const CTA = () => {
    return (
        <div className="mt-16 text-center relative">
            {/* Decorative elements */}
            <div className="absolute -left-12 top-1/2 w-24 h-1 bg-golden-brown-400/20 rounded-full 
      transform -rotate-45 hidden md:block"></div>
            <div className="absolute -right-12 top-1/2 w-24 h-1 bg-golden-brown-400/20 rounded-full 
      transform rotate-45 hidden md:block"></div>

            <motion.a
                href="/crops"
                className="relative inline-flex items-center px-7 py-3.5 bg-gradient-to-r 
          from-golden-brown-500 to-golden-brown-600 text-white font-medium
          rounded-full shadow-md overflow-hidden"
                whileHover={{
                    y: -5,
                    boxShadow: "0 15px 30px -5px rgba(178, 142, 71, 0.25)"
                }}
                whileTap={{ y: -2 }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15
                }}
            >
                {/* Button shine effect */}
                <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                />

                <span className="relative z-10">Browse All Crops</span>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
            </motion.a>
        </div>
    )
}

export default CTA;