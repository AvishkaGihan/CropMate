import { memo } from 'react';
import { motion } from 'framer-motion';
import { Leaf, CheckCircle2 } from 'lucide-react';
import { containerVariants, itemVariants } from '../../util/Auth/animations';

const BenefitsSection = ({
    title = "Welcome to CropMate",
    subtitle = "Connecting farmers, transporters, and vendors for a sustainable agricultural ecosystem",
    benefits = [
        "Real-time market prices and insights",
        "Connect directly with buyers and sellers",
        "Efficient logistics and transportation"
    ],
    headerLabel = "WHY CHOOSE US"
}) => {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
            <div className="max-w-md text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mb-6"
                >
                    <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-white/20">
                        <Leaf size={40} className="text-mindaro-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3">{title}</h2>
                    <p className="text-white/80 text-lg">{subtitle}</p>
                </motion.div>

                <div className="mt-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-px bg-white/20 flex-1"></div>
                        <span className="px-4 text-white/60 text-sm">{headerLabel}</span>
                        <div className="h-px bg-white/20 flex-1"></div>
                    </div>

                    <motion.ul
                        className="space-y-4 text-left"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {benefits.map((benefit, index) => (
                            <motion.li
                                key={index}
                                className="flex items-start"
                                variants={itemVariants}
                            >
                                <div className="bg-cal-poly-green-500/20 p-2 rounded-full mr-3 mt-0.5">
                                    <CheckCircle2 size={16} className="text-mindaro-400" />
                                </div>
                                <span className="text-white/90">{benefit}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </div>
    );
};

export default memo(BenefitsSection);