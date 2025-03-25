import { memo } from 'react';
import FarmerForm from './RoleForms/FarmerForm';
import DriverForm from './RoleForms/DriverForm';
import VendorForm from './RoleForms/VendorForm';

const RoleSpecificForms = ({
    role,
    formData,
    errors,
    handleChange,
    handleCropTypeChange
}) => {
    if (role === 'farmer') {
        return (
            <FarmerForm
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleCropTypeChange={handleCropTypeChange}
            />
        );
    } else if (role === 'driver') {
        return (
            <DriverForm
                formData={formData}
                errors={errors}
                handleChange={handleChange}
            />
        );
    } else if (role === 'vendor') {
        return (
            <VendorForm
                formData={formData}
                errors={errors}
                handleChange={handleChange}
            />
        );
    }

    return (
        <div className="text-center py-8">
            <p className="text-cambridge-blue-800">Please select a role to continue.</p>
        </div>
    );
};

export default memo(RoleSpecificForms);