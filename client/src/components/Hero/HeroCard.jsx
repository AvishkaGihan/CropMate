import { motion } from 'framer-motion';

const HeroCard = ({
    image,
    tag = "Featured",
    title = "Sustainable Farming Practices",
    description = "Discover how modern techniques are transforming agriculture"
}) => {
    return (
        <div className="relative">
            {/* Card Glow Effect */}
            <motion.div
                className="absolute inset-0 rounded-2xl bg-mindaro-400/15 blur-md -m-2"
                animate={{
                    opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            ></motion.div>

            {/* Card Container */}
            <motion.div
                className="relative bg-gradient-to-br from-mindaro-400/10 
                    to-cambridge-blue-400/10 backdrop-blur-sm 
                    rounded-2xl overflow-hidden shadow-2xl border-[4px] 
                    border-mindaro-400/15"
                whileHover={{
                    y: -8,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderColor: "rgba(243, 255, 182, 0.25)"
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
            >
                {/* Card Image */}
                <div className="rounded-xl overflow-hidden">
                    <motion.img
                        src={image}
                        alt={title}
                        className="w-full h-auto object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t 
                        from-cal-poly-green-900/80 via-cal-poly-green-900/40 
                        to-transparent rounded-xl"></div>
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 p-8">
                    <motion.div
                        className="inline-block px-4 py-1.5 bg-golden-brown-400/90 
                            text-white text-sm font-medium rounded-full mb-3 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 10
                        }}
                    >
                        {tag}
                    </motion.div>

                    <motion.h3
                        className="text-white text-2xl font-bold drop-shadow-lg"
                        whileHover={{ x: 4 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 10
                        }}
                    >
                        {title}
                    </motion.h3>

                    <motion.p
                        className="text-white/90 mt-2 max-w-md"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {description}
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroCard;