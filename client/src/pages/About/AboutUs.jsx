import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../Home/SectionWrapper';
import SectionHeader from '../../components/Shared/SectionHeader';
import CTA from '../../components/Shared/CTA';

// Animation variants optimized for performance
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
            duration: 0.4
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const statItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

// Team members data
const teamMembers = [
    {
        name: "Anjali Patel",
        role: "Founder & CEO",
        bio: "Agricultural economist with 10+ years of experience revolutionizing farming technology in Sri Lanka.",
        image: "/src/assets/images/team/founder.webp"
    },
    {
        name: "Rajiv Mendis",
        role: "Chief Technology Officer",
        bio: "Former software architect at Google with a passion for applying technology to solve agricultural challenges.",
        image: "/src/assets/images/team/cto.webp"
    },
    {
        name: "Dharshana Silva",
        role: "Agricultural Specialist",
        bio: "PhD in Agricultural Sciences with extensive experience in sustainable farming practices across Asia.",
        image: "/src/assets/images/team/specialist.webp"
    }
];

// Key stats
const stats = [
    { value: "5,000+", label: "Active Users" },
    { value: "100+", label: "Tons of Crops Sold" },
    { value: "20+", label: "Districts Covered" },
    { value: "30%", label: "Increase in Farmer Income" }
];

// Core values
const values = [
    {
        icon: "🌱",
        title: "Sustainability",
        description: "We promote environmentally responsible agricultural practices that preserve natural resources for future generations."
    },
    {
        icon: "🤝",
        title: "Community",
        description: "We foster strong relationships between all participants in the agricultural ecosystem, creating a supportive community."
    },
    {
        icon: "💡",
        title: "Innovation",
        description: "We constantly seek innovative solutions to enhance agricultural efficiency and productivity."
    },
    {
        icon: "⚖️",
        title: "Fairness",
        description: "We ensure fair prices and transparent processes for all parties involved in agricultural commerce."
    }
];

const AboutUs = () => {
    return (
        <>
            {/* Hero Section */}
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
                            Building a sustainable future for agriculture in Sri Lanka through technology,
                            community, and innovation.
                        </p>

                        {/* Stats section */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
                            variants={statsVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10"
                                    variants={statItemVariants}
                                >
                                    <div className="text-3xl font-bold text-mindaro-400 mb-1">{stat.value}</div>
                                    <div className="text-sm text-white/80">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section */}
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
                        title="From Vision"
                        special=" to Reality"
                        description="How CropMate evolved from a simple idea to a transformative platform for Sri Lankan agriculture."
                    />

                    <div className="grid md:grid-cols-2 gap-16 mt-16">
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-semibold text-cambridge-blue-800 mb-4">Our Beginning</h3>
                            <p className="text-cambridge-blue-700/90 leading-relaxed mb-6">
                                CropMate began in 2021 when our founder, Anjali Patel, witnessed firsthand the challenges
                                faced by Sri Lankan farmers trying to sell their products at fair prices. Middlemen were
                                taking significant cuts, and farmers struggled to find reliable transportation for their goods.
                            </p>
                            <p className="text-cambridge-blue-700/90 leading-relaxed">
                                Combining her background in agricultural economics with modern technology, Anjali assembled
                                a team of experts to build a platform that would directly connect farmers with buyers and
                                transporters, creating an efficient ecosystem for agricultural commerce.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-semibold text-cambridge-blue-800 mb-4">Our Mission Today</h3>
                            <p className="text-cambridge-blue-700/90 leading-relaxed mb-6">
                                Today, CropMate has grown into a comprehensive platform serving thousands of users across
                                Sri Lanka. We're dedicated to empowering farmers with market insights, connecting them with
                                fair-paying buyers, and providing efficient transportation solutions.
                            </p>
                            <p className="text-cambridge-blue-700/90 leading-relaxed">
                                Our mission extends beyond mere commerce—we're building a sustainable agricultural
                                ecosystem that promotes environmental responsibility, fair trade practices, and community
                                development. By leveraging technology, we're transforming agriculture into a more profitable
                                and sustainable venture for all participants.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </SectionWrapper>

            {/* Our Values Section */}
            <SectionWrapper className="py-20 bg-gradient-to-b from-white to-cambridge-blue-50/50" withPattern>
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
                        description="The core values that guide our approach to revolutionizing agriculture in Sri Lanka."
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

            {/* Team Section */}
            <SectionWrapper className="py-20 bg-white" withGlow>
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
                        special=" Experts"
                        description="The passionate individuals driving CropMate's mission to transform agriculture."
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

            {/* Call to Action */}
            <SectionWrapper className="py-20 bg-gradient-to-br from-cambridge-blue-900 to-cal-poly-green-500">
                <motion.div
                    className="container mx-auto px-6 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join the Agricultural Revolution?</h2>
                    <p className="text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Whether you're a farmer looking for better prices, a vendor seeking quality produce,
                        or a transporter wanting to grow your business, CropMate is here to help you succeed.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <CTA
                            href="/signup"
                            text="Join CropMate Today"
                            variant="white"
                            size="lg"
                            withShine={true}
                        />
                        <CTA
                            href="/contact-us"
                            text="Contact Us"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10"
                            size="lg"
                        />
                    </div>
                </motion.div>
            </SectionWrapper>
        </>
    );
};

export default AboutUs;