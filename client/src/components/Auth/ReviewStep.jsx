import { memo } from 'react';
import { Link } from 'react-router';
import { ShieldCheck } from 'lucide-react';
import { FormCheckbox } from '../Shared/Form';

import { cropTypes } from '../../data/Crops/Crops';
import { vehicleTypes } from '../../data/Driver/Driver';
import { businessTypes } from '../../data/Vendor/Vendor';

const ReviewStep = ({ formData, errors, handleChange }) => {
    return (
        <>
            <h2 className="text-xl font-bold text-cambridge-blue-800 mb-6">Review & Submit</h2>

            <div className="mb-6 p-4 bg-cambridge-blue-50 rounded-lg border border-cambridge-blue-100">
                <h3 className="font-medium text-cambridge-blue-800 mb-2">Account Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-cambridge-blue-600">Role:</div>
                    <div className="font-medium">{formData.role ? formData.role.charAt(0).toUpperCase() + formData.role.slice(1) : 'Not selected'}</div>

                    <div className="text-cambridge-blue-600">Name:</div>
                    <div className="font-medium">{formData.fullName}</div>

                    <div className="text-cambridge-blue-600">Email:</div>
                    <div className="font-medium">{formData.email}</div>

                    <div className="text-cambridge-blue-600">Phone:</div>
                    <div className="font-medium">{formData.phone}</div>
                </div>
            </div>

            {formData.role === 'farmer' && (
                <div className="mb-6 p-4 bg-cal-poly-green-50 rounded-lg border border-cal-poly-green-100">
                    <h3 className="font-medium text-cal-poly-green-800 mb-2">Farm Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-cal-poly-green-600">Farm Name:</div>
                        <div className="font-medium">{formData.farmName || 'Not provided'}</div>

                        <div className="text-cal-poly-green-600">Location:</div>
                        <div className="font-medium">{formData.farmLocation}</div>

                        <div className="text-cal-poly-green-600">Crops:</div>
                        <div className="font-medium">
                            {formData.cropTypes.length > 0
                                ? formData.cropTypes.map(cropId => {
                                    const crop = cropTypes.find(c => c.id === cropId);
                                    return crop ? crop.label : cropId;
                                }).join(', ')
                                : 'None selected'
                            }
                        </div>
                    </div>
                </div>
            )}

            {formData.role === 'driver' && (
                <div className="mb-6 p-4 bg-cambridge-blue-50 rounded-lg border border-cambridge-blue-100">
                    <h3 className="font-medium text-cambridge-blue-800 mb-2">Vehicle & License Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-cambridge-blue-600">Vehicle Type:</div>
                        <div className="font-medium">
                            {formData.vehicleType
                                ? vehicleTypes.find(v => v.value === formData.vehicleType)?.label || formData.vehicleType
                                : 'Not selected'
                            }
                        </div>

                        <div className="text-cambridge-blue-600">Capacity:</div>
                        <div className="font-medium">{formData.vehicleCapacity}</div>

                        <div className="text-cambridge-blue-600">License Number:</div>
                        <div className="font-medium">{formData.licenseNumber}</div>

                        <div className="text-cambridge-blue-600">License Expiry:</div>
                        <div className="font-medium">{formData.licenseExpiry}</div>
                    </div>
                </div>
            )}

            {formData.role === 'vendor' && (
                <div className="mb-6 p-4 bg-golden-brown-50 rounded-lg border border-golden-brown-100">
                    <h3 className="font-medium text-golden-brown-800 mb-2">Business Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-golden-brown-600">Business Name:</div>
                        <div className="font-medium">{formData.businessName}</div>

                        <div className="text-golden-brown-600">Business Type:</div>
                        <div className="font-medium">
                            {formData.businessType
                                ? businessTypes.find(b => b.value === formData.businessType)?.label || formData.businessType
                                : 'Not selected'
                            }
                        </div>

                        <div className="text-golden-brown-600">Address:</div>
                        <div className="font-medium">{formData.businessAddress}</div>
                    </div>
                </div>
            )}

            <div className="mb-6 p-4 bg-cambridge-blue-50/50 rounded-lg border border-cambridge-blue-100/50">
                <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-cal-poly-green-500 mt-0.5 mr-2" />
                    <p className="text-sm text-cambridge-blue-600">
                        Your information is secure. We use industry-standard encryption to protect your data.
                    </p>
                </div>
            </div>

            <FormCheckbox
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                label={
                    <span className="text-sm">
                        I agree to the <Link to="/terms" className="text-golden-brown-600 hover:text-golden-brown-700 underline">Terms of Service</Link> and <Link to="/privacy" className="text-golden-brown-600 hover:text-golden-brown-700 underline">Privacy Policy</Link>
                    </span>
                }
                error={errors.agreeToTerms}
            />
        </>
    );
};

export default memo(ReviewStep);