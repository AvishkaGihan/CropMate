import { memo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const SuccessMessage = memo(({ message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-cal-poly-green-50 border border-cal-poly-green-200 rounded-lg text-cal-poly-green-700 text-sm flex items-start"
        >
            <CheckCircle2 size={18} className="mr-2 flex-shrink-0 mt-0.5" />
            <span>{message}</span>
        </motion.div>
    );
});

export default SuccessMessage;