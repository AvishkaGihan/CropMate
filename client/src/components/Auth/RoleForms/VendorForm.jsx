import { memo } from 'react';
import { MapPin } from 'lucide-react';
import { FormInput, FormSelect, FormTextarea } from '../../Shared/Form';

import { businessTypes } from '../../../data/Vendor/Vendor';

const VendorForm = ({ formData, errors, handleChange }) => {
    return (
        <>
            <h2 className="text-xl font-bold text-golden-brown-800 mb-6">Business Details</h2>

            <FormInput
                label="Business Name"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
                required
                error={errors.businessName}
            />

            <FormSelect
                label="Business Type"
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                options={businessTypes}
                placeholder="Select your business type"
                required
                error={errors.businessType}
            />

            <FormTextarea
                label="Business Address"
                id="businessAddress"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                placeholder="Enter your business address"
                required
                error={errors.businessAddress}
                rows={3}
                iconLeft={<MapPin size={20} className="text-golden-brown-400" />}
            />
        </>
    );
};

export default memo(VendorForm);