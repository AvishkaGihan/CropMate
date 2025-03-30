import React from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../../components/Shared/SectionWrapper'
import SectionHeader from '../../components/Shared/SectionHeader'
import { values } from '../../data/aboutUs/aboutUsCoreValues'
import { containerVariants, itemVariants } from '../../util/animations'

const OurValues = () => {
    return (
        <SectionWrapper className="py-20 bg-white" withGlow>
            <motion.div
                className="container mx-auto px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <SectionHeader
                    badge="Our Values"
                    title="Principles"
                    special=" We Live By"
                    description="The core values guiding our approach as we build the future of agriculture in Sri Lanka."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-cambridge-blue-200/30 hover:shadow-md 
                        transition-all duration-300 hover:-translate-y-1"
                            variants={itemVariants}
                        >
                            <div className="w-14 h-14 rounded-full bg-cambridge-blue-100/50 flex items-center justify-center text-2xl mb-5">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-cambridge-blue-800 mb-3">{value.title}</h3>
                            <p className="text-cambridge-blue-700/80 leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </SectionWrapper>
    )
}

export default OurValues