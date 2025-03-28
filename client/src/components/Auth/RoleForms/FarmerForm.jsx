import { memo } from 'react';
import { MapPin } from 'lucide-react';
import { FormInput, FormTextarea, FormCheckbox } from '../../Shared/Form';

import { cropTypes } from '../../../data/Crops/Crops';

const FarmerForm = ({ formData, errors, handleChange, handleCropTypeChange }) => {
    return (
        <>
            <h2 className="text-xl font-bold text-cal-poly-green-800 mb-6">Farm Details</h2>

            <FormInput
                label="Farm Name (optional)"
                id="farmName"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                placeholder="Enter your farm name"
                error={errors.farmName}
            />

            <FormTextarea
                label="Farm Location"
                id="farmLocation"
                name="farmLocation"
                value={formData.farmLocation}
                onChange={handleChange}
                placeholder="Enter your farm address or location"
                required
                error={errors.farmLocation}
                rows={3}
                iconLeft={<MapPin size={20} className="text-cal-poly-green-400" />}
            />

            <div className="mb-6">
                <label className="block text-cambridge-blue-700 text-sm font-medium mb-2">
                    Crops You Grow <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-2 gap-2 p-3 bg-white rounded-lg border border-cal-poly-green-200">
                    {cropTypes.map(crop => (
                        <div key={crop.id} className="flex items-center">
                            <FormCheckbox
                                id={`crop-${crop.id}`}
                                checked={formData.cropTypes.includes(crop.id)}
                                onChange={() => handleCropTypeChange(crop.id)}
                                label={crop.label}
                            />
                        </div>
                    ))}
                </div>

                {errors.cropTypes && (
                    <p className="mt-2 text-red-600 text-sm">{errors.cropTypes}</p>
                )}
            </div>
        </>
    );
};

export default memo(FarmerForm);