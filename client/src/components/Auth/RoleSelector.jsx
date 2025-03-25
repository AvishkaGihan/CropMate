import { memo } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Truck, Store } from 'lucide-react';
import { itemVariants } from '../../util/Auth/animations';
import RoleCard from './RoleCard';

const roles = [
    { id: 'farmer', title: 'Farmer', icon: <Leaf size={20} className="text-white" /> },
    { id: 'driver', title: 'Driver', icon: <Truck size={20} className="text-white" /> },
    { id: 'vendor', title: 'Vendor', icon: <Store size={20} className="text-white" /> }
];

const RoleSelector = ({
    selectedRole = 'farmer',
    onSelectRole,
    label = "I am a:"
}) => {
    return (
        <motion.div
            variants={itemVariants}
            className="mb-6"
        >
            <label className="block text-cambridge-blue-700 text-sm font-medium mb-3">
                {label}
            </label>
            <div className="grid grid-cols-3 gap-3">
                {roles.map(role => (
                    <RoleCard
                        key={role.id}
                        role={role.id}
                        title={role.title}
                        icon={role.icon}
                        onClick={onSelectRole}
                        isSelected={selectedRole === role.id}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default memo(RoleSelector);