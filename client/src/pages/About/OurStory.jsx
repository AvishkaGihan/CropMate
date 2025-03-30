import React from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../../components/Shared/SectionWrapper'
import SectionHeader from '../../components/Shared/SectionHeader'
import { containerVariants, itemVariants } from '../../util/animations'

const OurStory = () => {
    return (
        <SectionWrapper className="py-20 bg-cambridge-blue-50/90" withGlow>
            <motion.div
                className="container mx-auto px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <SectionHeader
                    badge="Our Story"
                    title="From Idea"
                    special=" to Launch"
                    description="How CropMate went from a simple concept to an emerging agricultural platform in Sri Lanka."
                />

                <div className="grid md:grid-cols-2 gap-16 mt-16">
                    <motion.div variants={itemVariants}>
                        <h3 className="text-2xl font-semibold text-cambridge-blue-800 mb-4">The Spark</h3>
                        <p className="text-cambridge-blue-700/90 leading-relaxed mb-6">
                            CropMate began in early 2023 when our founder, Anjali Patel, participated in an agricultural
                            hackathon in Colombo. Through conversations with local farmers, she discovered a critical
                            disconnect between crop producers, buyers, and transportation services.
                        </p>
                        <p className="text-cambridge-blue-700/90 leading-relaxed">
                            With a background in both agriculture and technology, Anjali saw an opportunity to create
                            a digital platform that could connect these essential players in the agricultural ecosystem.
                            She recruited Rajiv Mendis, a talented developer who shared her vision, and CropMate was born.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-2xl font-semibold text-cambridge-blue-800 mb-4">Where We Are Today</h3>
                        <p className="text-cambridge-blue-700/90 leading-relaxed mb-6">
                            After securing seed funding from local investors who believe in our mission, we've
                            built and launched our platform. We're currently operating in three districts, with plans
                            to expand across Sri Lanka by the end of the year.
                        </p>
                        <p className="text-cambridge-blue-700/90 leading-relaxed">
                            Our beta testing with over 500 users has shown promising results, with participating farmers
                            reporting up to 25% increases in income. We're continuously gathering feedback, refining our
                            platform, and building relationships with agricultural communities throughout the country.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </SectionWrapper>
    )
}

export default OurStory