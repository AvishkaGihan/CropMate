import { memo } from 'react';
import { XCircle } from 'lucide-react';

const ErrorMessage = memo(({ message }) => {
    return (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start">
            <XCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
            <span>{message}</span>
        </div>
    );
});

export default ErrorMessage;