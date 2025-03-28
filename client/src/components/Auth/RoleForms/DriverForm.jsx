import { memo } from 'react';
import { Upload } from 'lucide-react';
import { FormInput, FormSelect } from '../../Shared/Form';

import { vehicleTypes } from '../../../data/Driver/Driver';

const DriverForm = ({ formData, errors, handleChange }) => {
    return (
        <>
            <h2 className="text-xl font-bold text-cambridge-blue-800 mb-6">Vehicle & License Details</h2>

            <FormSelect
                label="Vehicle Type"
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                options={vehicleTypes}
                placeholder="Select your vehicle type"
                required
                error={errors.vehicleType}
            />

            <FormInput
                label="Vehicle Capacity"
                id="vehicleCapacity"
                name="vehicleCapacity"
                value={formData.vehicleCapacity}
                onChange={handleChange}
                placeholder="e.g., 2 tons, 5000 kg"
                required
                error={errors.vehicleCapacity}
            />

            <FormInput
                label="Driver's License Number"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="Enter your license number"
                required
                error={errors.licenseNumber}
            />

            <FormInput
                label="License Expiry Date"
                id="licenseExpiry"
                name="licenseExpiry"
                type="date"
                value={formData.licenseExpiry}
                onChange={handleChange}
                required
                error={errors.licenseExpiry}
            />

            <div className="mb-6">
                <label className="block text-cambridge-blue-700 text-sm font-medium mb-2">
                    License Image (Optional)
                </label>

                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-cambridge-blue-300 rounded-md">
                    <div className="space-y-1 text-center">
                        <Upload size={24} className="mx-auto text-cambridge-blue-400" />
                        <div className="flex text-sm text-cambridge-blue-600">
                            <label
                                htmlFor="license-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-cambridge-blue-600 hover:text-cambridge-blue-500 focus-within:outline-none"
                            >
                                <span>Upload a file</span>
                                <input id="license-upload" name="license-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-cambridge-blue-500">
                            PNG, JPG, GIF up to 10MB
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(DriverForm);