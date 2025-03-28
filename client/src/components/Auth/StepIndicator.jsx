import { memo } from 'react';

const StepIndicator = ({ step, role = 'farmer' }) => {
    const getProgressClass = (stepNum) => {
        const baseClasses = "rounded-full transition-all duration-300";

        // Role-specific colors
        const progressColors = {
            farmer: "bg-cal-poly-green-500",
            driver: "bg-cambridge-blue-500",
            vendor: "bg-golden-brown-500"
        };

        const progressColor = progressColors[role] || progressColors.farmer;

        if (stepNum === step) {
            return `${baseClasses} w-8 h-2.5 ${progressColor}`;
        } else if (stepNum < step) {
            return `${baseClasses} w-2.5 h-2.5 ${progressColor}`;
        } else {
            return `${baseClasses} w-2.5 h-2.5 bg-gray-300`;
        }
    };

    return (
        <div className="flex items-center justify-center space-x-2 mb-6">
            <div className={getProgressClass(1)}></div>
            <div className={getProgressClass(2)}></div>
            <div className={getProgressClass(3)}></div>
        </div>
    );
};

export default memo(StepIndicator);