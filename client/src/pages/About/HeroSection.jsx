import React from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
    return (
        <section className="pt-32 pb-20 relative bg-gradient-to-b from-cambridge-blue-900 via-cambridge-blue-800 to-cal-poly-green-600 overflow-hidden">
            {/* Background orbs and texture */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-mindaro-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 -left-20 w-80 h-80 bg-golden-brown-400/10 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-3"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        About <span className="text-mindaro-400">CropMate</span>
                    </h1>
                    <p className="text-xl text-white/90 leading-relaxed mb-8">
                        A startup with a mission to revolutionize agriculture in Sri Lanka
                        through technology, community, and innovation.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection