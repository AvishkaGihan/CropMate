import { memo } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FormInput } from '../Shared/Form';
import RoleSelector from './RoleSelector';

const AccountInformationStep = ({
    formData,
    errors,
    handleChange,
    selectRole,
    showPassword,
    toggleShowPassword,
    showConfirmPassword,
    toggleShowConfirmPassword
}) => {
    return (
        <>
            <h2 className="text-xl font-bold text-cambridge-blue-800 mb-6">Account Information</h2>

            <RoleSelector
                selectedRole={formData.role}
                onSelectRole={selectRole}
                label="I am a:"
            />

            <FormInput
                label="Full Name"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                error={errors.fullName}
            />

            <FormInput
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                error={errors.email}
            />

            <FormInput
                label="Phone Number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                error={errors.phone}
            />

            <div className="relative">
                <FormInput
                    label="Password"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    error={errors.password}
                    iconRight={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    iconRightClassName='text-cambridge-blue-500 cursor-pointer'
                    onIconRightClick={toggleShowPassword}
                    helpText="Password must be at least 8 characters"
                />
            </div>

            <div className="relative">
                <FormInput
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    error={errors.confirmPassword}
                    iconRight={showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    iconRightClassName='text-cambridge-blue-500 cursor-pointer'
                    onIconRightClick={toggleShowConfirmPassword}
                />
            </div>
        </>
    );
};

export default memo(AccountInformationStep);