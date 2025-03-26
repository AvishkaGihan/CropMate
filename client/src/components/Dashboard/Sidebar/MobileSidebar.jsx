import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { mobileSidebarVariants } from './animations';
import Logo from './Logo';
import NavItem from './NavItem';
import RoleBadge from './RoleBadge';
import UserProfile from './UserProfile';

const MobileSidebar = ({ 
  mobileOpen, 
  toggleMobileSidebar, 
  bg, 
  role, 
  pages,
  active,
  hover,
  accent
}) => {
  const onClose = () => toggleMobileSidebar(false);

  return (
    <motion.div
      className={`${bg} fixed inset-y-0 left-0 w-64 z-50 lg:hidden flex flex-col shadow-xl`}
      variants={mobileSidebarVariants}
      initial="closed"
      animate={mobileOpen ? "open" : "closed"}
    >
      {/* Mobile Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        <Logo collapsed={false} />
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Mobile Menu Label */}
      <div className="px-6 py-2">
        <p className="text-sm text-white/60">Main Menu</p>
      </div>

      {/* Mobile Navigation */}
      <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto">
        {pages.map((page) => (
          <NavItem 
            key={page.path}
            page={page} 
            isMobile={true} 
            onMobileClose={onClose}
            active={active}
            hover={hover}
          />
        ))}
      </nav>

      {/* Mobile Role Badge */}
      <RoleBadge role={role} />

      {/* Mobile User Profile */}
      <UserProfile 
        isOpen={true} 
        accent={accent} 
        role={role}
      />
    </motion.div>
  );
};

export default React.memo(MobileSidebar);