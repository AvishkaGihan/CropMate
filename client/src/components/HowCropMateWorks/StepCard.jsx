import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            delay: index * 0.08
        }
    })
};

const StepCard = ({ step }) => {
    return (
        <motion.div
            key={step.id}
            custom={step.id}
            variants={cardVariants}
            className={`${step.decorColor} backdrop-blur-sm p-7 rounded-2xl shadow-lg hover:shadow-2xl
                group h-full flex flex-col relative overflow-hidden
                transition-all duration-300 hover:-translate-y-1`}
        >
            {/* Step number badge */}
            <div className="absolute -right-1 -top-1">
                <div
                    className={`w-12 h-12 flex items-center justify-center ${step.iconBg} 
                        rounded-full text-white font-bold text-lg shadow-md 
                        -rotate-3 transition-transform duration-300 group-hover:rotate-0`}
                >
                    {step.number}
                </div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div
                    className={`${step.iconBg} w-16 h-16 rounded-full mb-6 flex items-center justify-center
                        text-2xl shadow-inner transition-transform duration-300 group-hover:scale-110`}
                >
                    {step.id === 0 ? '🧑‍🌾' : step.id === 1 ? '🤝' : '📈'}
                </div>

                {/* Title */}
                <h3
                    className={`text-${step.color}-800 font-semibold text-xl mb-3`}
                >
                    {step.title}
                </h3>

                {/* Description */}
                <p className={`leading-relaxed mb-4`}>
                    {step.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2 mb-6 flex-grow">
                    {step.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                            <div className={`mt-1 w-4 h-4 ${step.iconBg} rounded-full flex-shrink-0 mr-3 
                                opacity-70 flex items-center justify-center`}>
                                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 8 8" fill="none">
                                    <path d="M1 4L3 6L7 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Learn more link - replacing button with link style */}
                <div className={`mt-5 pt-5 border-t border-${step.color}`}>
                    <div className="overflow-hidden">
                        <motion.a
                            href={step.buttonLink}
                            className={`text-${step.color}-600 text-sm flex items-center
                                group-hover:opacity-100 transition-all duration-300`}
                            whileHover={{ x: 3 }}
                        >
                            {step.buttonText}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div >
    );
};

export default StepCard;