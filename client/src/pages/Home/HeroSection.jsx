import { motion } from "framer-motion";

import BackgroundOrbs from "../../components/Hero/BackgroundOrbs";
import HeroButton from "../../components/Hero/HeroButton";
import HeroCard from "../../components/Hero/HeroCard";

import HeroImage from '../../assets/hero-image.jpg';

import {
  containerVariants,
  itemVariants,
  heroCardVariants,
} from "../../util/animations";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden
            bg-gradient-to-br from-cambridge-blue-900 via-cambridge-blue-800
            to-cal-poly-green-600 py-16"
    >
      {/* Background Elements */}
      <BackgroundOrbs />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Column - Order last on mobile, first on desktop */}
          <motion.div
            className="flex-1 order-last lg:order-first"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Subtitle */}
            <motion.div
              className="hidden md:flex items-center space-x-3 mb-6"
              variants={itemVariants}
            >
              <div className="w-10 h-[2px] bg-mindaro-400"></div>
              <span className="text-sm font-medium text-mindaro-300 uppercase tracking-wider">
                Agricultural Innovation
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-8 text-white leading-tight"
              variants={itemVariants}
            >
              Cultivating{" "}
              <span className="text-mindaro-400 relative group">
                Connections
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-1 bg-mindaro-400/30"
                  whileHover={{ backgroundColor: "rgba(243, 255, 182, 0.5)" }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </span>{" "}
              in Agriculture
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl mb-12 text-gray-100/90 leading-relaxed max-w-xl"
              variants={itemVariants}
            >
              CropMate bridges the gap between farmers, vendors, and
              transporters with real-time market insights and seamless
              connections.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-5"
              variants={itemVariants}
            >
              <HeroButton to="/signup" primary>
                Get Started
              </HeroButton>
              <HeroButton to="/about">Learn More</HeroButton>
            </motion.div>
          </motion.div>

          {/* Hero Card Component */}
          <motion.div
            variants={heroCardVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:flex-1 lg:max-w-2xl relative order-first lg:order-last mx-auto lg:mx-0 mt-16 lg:mt-0"
          >
            <HeroCard
              image={HeroImage}
              tag="Farm Smarter"
              title="Grow Your Business"
              description="Join Cropmate and unlock the power of direct sales, fair pricing, and hassle-free logistics—because your harvest deserves the best!"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
