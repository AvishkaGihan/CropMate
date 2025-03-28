import {memo} from 'react';
import { motion } from 'framer-motion';
import { textVariants } from './animations';

const Logo = ({ collapsed = false }) => (
  <div className="flex items-center">
    <div className={`rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-md ${collapsed ? 'w-10 h-10' : 'w-8 h-8 mr-3'}`}>
      <div className="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>
    </div>
    {!collapsed && <span className="text-xl font-bold text-white">CropMate</span>}
  </div>
);

export default memo(Logo);