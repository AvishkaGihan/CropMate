import React from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../Home/SectionWrapper'
import SectionHeader from '../../components/Shared/SectionHeader'
import { containerVariants, itemVariants } from './animationVariants'
import { teamMembers } from '../../data/aboutUs/aboutUsOurTeam'

const OurTeam = () => {
    return (
        <SectionWrapper className="py-20 bg-cambridge-blue-50/50" withPattern>
            <motion.div
                className="container mx-auto px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <SectionHeader
                    badge="Our Team"
                    title="Meet the"
                    special=" Founders"
                    description="The visionaries building CropMate from the ground up."
                />

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="bg-gradient-to-br from-cambridge-blue-400/5 to-cambridge-blue-300/5 
                                    backdrop-blur-sm p-6 rounded-2xl border border-cambridge-blue-400/20 
                                    shadow-sm hover:shadow-md transition-all duration-300 group will-change-transform"
                            variants={itemVariants}
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-golden-brown-400/30 mx-auto">
                                <img
                                    src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=5A8268&color=fff`}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-cambridge-blue-800 mb-1 text-center">
                                {member.name}
                            </h3>
                            <p className="text-golden-brown-600 mb-4 text-center text-sm">{member.role}</p>
                            <p className="text-cambridge-blue-700/80 leading-relaxed text-center">{member.bio}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </SectionWrapper>
    )
}

export default OurTeam