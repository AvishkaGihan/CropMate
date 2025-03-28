import React from "react";
import { motion } from "framer-motion";

const SectionHeader = ({ badge, title, special, description }) => {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }}
    >
      {/* Section label */}
      <motion.div 
        className="inline-block px-3 py-1 rounded-full bg-golden-brown-400/10 mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-golden-brown-500 text-sm font-medium uppercase tracking-wider">
          {badge}
        </span>
      </motion.div>

      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-cambridge-blue-800 mt-3 mb-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {title}{" "}
        <motion.span 
          className="text-golden-brown-500 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.3,
            delay: 0.2
          }}
        >
          {special}
        </motion.span>
      </motion.h2>

      {/* Divider */}
      <motion.div 
        className="w-24 h-1 bg-golden-brown-400/30 mx-auto my-6 rounded-full"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 96, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      ></motion.div>

      <motion.p 
        className="text-cambridge-blue-700/80 max-w-2xl mx-auto text-lg leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;