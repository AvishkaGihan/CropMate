import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { overlayVariants } from './animations';

const MobileOverlay = ({ mobileOpen, onClose }) => (
  <AnimatePresence>
    {mobileOpen && (
      <motion.div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        variants={overlayVariants}
        initial="closed"
        animate="open"
        exit="closed"
        onClick={onClose}
      />
    )}
  </AnimatePresence>
);

export default React.memo(MobileOverlay);