import { motion } from 'framer-motion'
import SectionWrapper from '../../components/Shared/SectionWrapper'
import SectionHeader from '../../components/Shared/SectionHeader'
import { milestones } from '../../constants'
import { containerVariants, itemVariants } from '../../util/animations'

const Milestones = () => {
    return (
        <SectionWrapper className="py-20 bg-gradient-to-b from-cambridge-blue-50/50 to-white" withPattern>
            <motion.div
                className="container mx-auto px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <SectionHeader
                    badge="Our Journey"
                    title="Key"
                    special=" Milestones"
                    description="The significant moments that have shaped our young company's development."
                />

                <div className="max-w-3xl mx-auto mt-16 relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cambridge-blue-200 md:left-1/2 md:-ml-0.5"></div>

                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={index}
                            className="relative mb-12 last:mb-0"
                            variants={itemVariants}
                        >
                            <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Timeline point */}
                                <div className="absolute left-4 md:left-1/2 md:-ml-3 mt-6 w-6 h-6 rounded-full bg-golden-brown-500 border-4 border-white shadow"></div>

                                {/* Content */}
                                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                                    <div className="p-4 bg-white rounded-lg shadow-sm border border-cambridge-blue-100/50">
                                        <span className="text-xs font-semibold text-golden-brown-500 uppercase tracking-wider">{milestone.date}</span>
                                        <h3 className="text-lg font-semibold text-cambridge-blue-800 mt-1">{milestone.title}</h3>
                                        <p className="text-cambridge-blue-700/80 mt-2 text-sm">{milestone.description}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </SectionWrapper>
    )
}

export default Milestones