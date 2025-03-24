import React from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../Home/SectionWrapper'
import CTA from '../../components/Shared/CTA'

const CallToAction = () => {
    return (
        <SectionWrapper className="py-20 bg-gradient-to-br from-cambridge-blue-900 to-cal-poly-green-500">
            <motion.div
                className="container mx-auto px-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Us On This Journey</h2>
                <p className="text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                    CropMate is just getting started, and we're looking for early adopters who want to help shape
                    the future of agriculture in Sri Lanka. Whether you're a farmer, vendor, or transporter, we
                    invite you to be part of something revolutionary.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <CTA
                        href="/signup"
                        text="Join CropMate"
                        variant="white"
                        size="lg"
                        withShine={true}
                    />
                </div>
            </motion.div>
        </SectionWrapper>
    )
}

export default CallToAction