import { memo } from 'react';
import { motion } from 'framer-motion';
import { roleCardClasses } from '../../constants/Auth/roleClasses';

const RoleCard = memo(({ role, title, icon, onClick, isSelected }) => {
    const roleClass = roleCardClasses[role];

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(role)}
            className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 flex flex-col items-center ${isSelected ? roleClass.selected : roleClass.default
                }`}
        >
            <div className={`w-10 h-10 rounded-full ${isSelected ? roleClass.iconBg.selected : roleClass.iconBg.default
                } flex items-center justify-center mb-2`}>
                {icon}
            </div>
            <span className={`${roleClass.text} font-medium text-sm`}>{title}</span>
        </motion.div>
    );
});

export default RoleCard;