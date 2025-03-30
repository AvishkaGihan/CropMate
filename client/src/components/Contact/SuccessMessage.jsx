import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { FormButton } from '../Shared/FormButton';

const SuccessMessage = ({ onReset }) => (
    <motion.div
        className="bg-mindaro-50 border border-mindaro-200 rounded-xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
    >
        <div className="w-16 h-16 mx-auto rounded-full bg-mindaro-100 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-cambridge-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-cambridge-blue-800 mb-2">
            Thank You!
        </h3>
        <p className="text-cambridge-blue-700/80 mb-6">
            Your message has been received. We'll get back to you shortly.
        </p>
        <FormButton
            variant="primary"
            onClick={onReset}
            size="md"
            className="rounded-full"
        >
            Send Another Message
        </FormButton>
    </motion.div>
);

export default SuccessMessage;