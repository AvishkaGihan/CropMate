import {memo} from 'react';
import { NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { textVariants } from './animations';

const NavItem = ({ page, isOpen, active, hover, isMobile = false, onMobileClose }) => (
  <NavLink
    key={page.path}
    to={page.path}
    end={page.exact}
    className={({ isActive }) =>
      `flex items-center py-3 px-3 rounded-lg transition-all duration-200 ${
        isActive ? active : hover
      } text-white relative overflow-hidden`
    }
    onClick={isMobile && onMobileClose ? onMobileClose : undefined}
  >
    <div className="flex items-center">
      <span className={`${(!isMobile && !isOpen) ? '' : 'mr-3'} transition-all duration-300`}>
        {page.icon}
      </span>
      {(isMobile || isOpen) && (
        isMobile ? (
          <span className="text-sm font-medium">{page.title}</span>
        ) : (
          <AnimatePresence>
            <motion.span
              variants={textVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="text-sm font-medium"
            >
              {page.title}
            </motion.span>
          </AnimatePresence>
        )
      )}
    </div>
    {(isMobile || isOpen) && (
      isMobile ? (
        <div className="ml-auto">
          <ChevronRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1 opacity-70"
          />
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            variants={textVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="ml-auto"
          >
            <ChevronRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1 opacity-70"
            />
          </motion.div>
        </AnimatePresence>
      )
    )}
  </NavLink>
);

export default memo(NavItem);