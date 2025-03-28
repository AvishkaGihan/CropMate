import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sidebarVariants } from './animations';
import Logo from './Logo';
import NavItem from './NavItem';
import RoleBadge from './RoleBadge';
import UserProfile from './UserProfile';

const DesktopSidebar = ({ 
  isOpen, 
  toggleSidebar, 
  bg, 
  accent, 
  active, 
  hover, 
  role, 
  pages
}) => {
  return (
    <motion.div
      variants={sidebarVariants}
      animate={isOpen ? "expanded" : "collapsed"}
      initial={isOpen ? "expanded" : "collapsed"}
      className={`${bg} hidden lg:flex flex-col h-full shadow-lg z-20 relative`}
    >
      {/* Toggle button positioned on middle right */}
      <div className="absolute inset-y-0 -right-5 flex items-center pointer-events-none z-10">
        <button
          onClick={toggleSidebar}
          className={`${accent} w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-white/20 pointer-events-auto`}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeft size={20} className="text-white" />
          ) : (
            <ChevronRight size={20} className="text-white" />
          )}
        </button>
      </div>

      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        <Logo collapsed={!isOpen} />
      </div>

      {/* Menu Label */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="px-6 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-white/60">Main Menu</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto">
        {pages.map((page) => (
          <NavItem 
            key={page.path} 
            page={page} 
            isOpen={isOpen} 
            active={active} 
            hover={hover} 
          />
        ))}
      </nav>

      {/* Role badge */}
      <AnimatePresence>
        {isOpen && (
          <RoleBadge role={role} animated />
        )}
      </AnimatePresence>

      {/* User Profile and Logout Section */}
      <UserProfile 
        isOpen={isOpen} 
        accent={accent} 
        role={role} 
        animated 
      />
    </motion.div>
  );
};

export default React.memo(DesktopSidebar);