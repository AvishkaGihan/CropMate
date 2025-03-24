import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import OurStory from './OurStory';
import Milestones from './Milestones';
import OurValues from './OurValues';
import OurTeam from './OurTeam';
import CallToAction from './CallToAction';



const AboutUs = () => {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Our Story Section */}
            <OurStory />

            {/* Milestones Section */}
            <Milestones />

            {/* Our Values Section */}
            <OurValues />

            {/* Team Section */}
            <OurTeam />

            {/* Call to Action */}
            <CallToAction />
        </>
    );
};

export default AboutUs;