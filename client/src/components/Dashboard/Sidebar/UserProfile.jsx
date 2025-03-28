import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { textVariants } from './animations';

const UserProfile = ({ isOpen, accent, role, animated = false }) => {
  const avatar = (
    <div className={`${accent} w-8 h-8 rounded-full flex items-center justify-center`}>
      <span className="text-sm font-medium text-white">J</span>
    </div>
  );

  const userInfo = animated ? (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={textVariants}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          className="ml-3"
        >
          <p className="text-sm font-medium text-white">John Doe</p>
          <p className="text-xs text-white/60 capitalize">{role}</p>
        </motion.div>
      )}
    </AnimatePresence>
  ) : (
    <div className="ml-3">
      <p className="text-sm font-medium text-white">John Doe</p>
      <p className="text-xs text-white/60 capitalize">{role}</p>
    </div>
  );

  const logoutText = animated ? (
    <AnimatePresence>
      {isOpen && (
        <motion.span
          variants={textVariants}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          className="ml-3 text-sm text-white"
        >
          Sign out
        </motion.span>
      )}
    </AnimatePresence>
  ) : (
    <span className="ml-3 text-sm text-white">Sign out</span>
  );

  return (
    <div className={`${animated ? 'mt-auto' : ''} border-t border-white/20 p-3`}>
      <div className="px-3 py-3 rounded-lg flex items-center transition-all duration-200 hover:bg-white/10 cursor-pointer group">
        {avatar}
        {animated ? userInfo : isOpen && userInfo}
      </div>
      <button
        onClick={() => console.log("Logout...")}
        className="w-full flex items-center p-3 mt-2 cursor-pointer transition-all duration-200 rounded-lg hover:bg-white/10 group"
      >
        <LogOut size={20} className="text-white" />
        {animated ? logoutText : isOpen && logoutText}
      </button>
    </div>
  );
};

export default React.memo(UserProfile);