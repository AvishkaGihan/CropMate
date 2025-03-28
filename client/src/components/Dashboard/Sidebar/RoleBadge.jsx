import {memo} from 'react';
import { motion } from 'framer-motion';

const RoleBadge = ({ role, animated = false }) => {
  const content = (
    <div className="bg-white/10 rounded-full py-1 px-3 text-xs font-medium text-white text-center">
      {role.charAt(0).toUpperCase() + role.slice(1)} Portal
    </div>
  );

  if (!animated) {
    return <div className="p-4 border-t border-white/10">{content}</div>;
  }

  return (
    <motion.div
      className="p-4 border-t border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.div>
  );
};

export default memo(RoleBadge);