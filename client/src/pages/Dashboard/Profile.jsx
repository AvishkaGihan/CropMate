import { useEffect, useState } from "react";
import { Link } from "react-router"; // Fixed import from react-router to react-router-dom
import { useGetProfileQuery, useUpdateProfileMutation } from "../../slices/authApi";
import { User, Phone, Mail, MapPin, Save, Loader2, Shield, Key, CreditCard, Building, Banknote } from "lucide-react";

const Profile = () => {
    const { data: profile } = useGetProfileQuery();
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        bankDetails: {
            accountName: "",
            accountNumber: "",
            bankName: "",
            branch: ""
        }
    });
    const [activeTab, setActiveTab] = useState('personal');

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                email: profile.email,
                phone: profile.phone || "",
                address: profile.address || "",
                bankDetails: {
                    accountName: profile.bankDetails?.accountName || "",
                    accountNumber: profile.bankDetails?.accountNumber || "",
                    bankName: profile.bankDetails?.bankName || "",
                    branch: profile.bankDetails?.branch || ""
                }
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("bank_")) {
            const bankField = name.split("_")[1];
            setFormData({
                ...formData,
                bankDetails: {
                    ...formData.bankDetails,
                    [bankField]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(formData).unwrap();
            // Toast notification could be added here
        } catch (err) {
            console.error("Failed to update profile:", err);
        }
    };

    // Check if user is not a vendor - only display bank tab for non-vendors
    const isNonVendor = profile?.role && profile.role !== "vendor";

    return (
        <div>
            {/* Tab Navigation - Streamlined */}
            <div className="flex px-2">
                <button
                    className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === 'personal'
                        ? 'text-cambridge-blue-700 border-b-2 border-cambridge-blue-300'
                        : 'text-gray-500 hover:text-cambridge-blue-600'
                        } cursor-pointer`}
                    onClick={() => setActiveTab('personal')}
                >
                    <User size={16} className="inline mr-2" />
                    Personal Info
                </button>

                {/* Only show bank details tab for non-vendors */}
                {isNonVendor && (
                    <button
                        className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === 'bank'
                            ? 'text-cambridge-blue-700 border-b-2 border-cambridge-blue-300'
                            : 'text-gray-500 hover:text-cambridge-blue-600'
                            } cursor-pointer`}
                        onClick={() => setActiveTab('bank')}
                    >
                        <Banknote size={16} className="inline mr-2" />
                        Payment Info
                    </button>
                )}

                <button
                    className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === 'security'
                        ? 'text-cambridge-blue-700 border-b-2 border-cambridge-blue-300'
                        : 'text-gray-500 hover:text-cambridge-blue-600'
                        } cursor-pointer`}
                    onClick={() => setActiveTab('security')}
                >
                    <Shield size={16} className="inline mr-2" />
                    Security
                </button>
            </div>

            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
                <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-8 text-gray-800 flex items-center">
                        <User size={22} className="mr-3 text-cambridge-blue-600" />
                        Personal Information
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cambridge-blue-500 focus:border-cambridge-blue-500 outline-none transition"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                        disabled
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone size={16} className="text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cambridge-blue-500 focus:border-cambridge-blue-500 outline-none transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                                Address
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                                    <MapPin size={16} className="text-gray-400" />
                                </div>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cambridge-blue-500 focus:border-cambridge-blue-500 outline-none transition"
                                    rows="3"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex items-center px-5 py-3 bg-cambridge-blue-600 text-white font-medium hover:bg-cambridge-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cambridge-blue-500 disabled:opacity-60 transition-colors cursor-pointer rounded-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} className="mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bank Details Tab - Only displayed for non-vendors */}
            {activeTab === 'bank' && isNonVendor && (
                <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-8 text-gray-800 flex items-center">
                        <Banknote size={22} className="mr-3 text-cambridge-blue-600" />
                        Payment Information
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Bank Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="bank_bankName">
                                    Bank Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="bank_bankName"
                                        name="bank_bankName"
                                        value={formData.bankDetails.bankName}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cambridge-blue-500 focus:border-cambridge-blue-500 outline-none transition"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Branch */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="bank_branch">
                                    Branch
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="bank_branch"
                                        name="bank_branch"
                                        value={formData.bankDetails.branch}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cambridge-blue-500 focus:border-cambridge-blue-500 outline-none transition"
                                    />
                                </div>
                            </div>

                            {/* Account Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="bank_accountName">
                                    Account Holder Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="bank_accountName"
                                        name="bank_accountName"
                                        value={formData.bankDetails.accountName}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cambridge-blue-500 focus:border-cambridge-blue-500 outline-none transition"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Account Number */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="bank_accountNumber">
                                    Account Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CreditCard size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="bank_accountNumber"
                                        name="bank_accountNumber"
                                        value={formData.bankDetails.accountNumber}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cambridge-blue-500 focus:border-cambridge-blue-500 outline-none transition"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex items-center px-5 py-3 bg-cambridge-blue-600 text-white font-medium hover:bg-cambridge-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cambridge-blue-500 disabled:opacity-60 transition-colors cursor-pointer rounded-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} className="mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
                <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-8 text-gray-800 flex items-center">
                        <Shield size={22} className="mr-3 text-cambridge-blue-600" />
                        Security Settings
                    </h2>

                    <div className="space-y-8">
                        <div className="p-6 border-t border-b border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center text-gray-800">
                                        <Key size={18} className="mr-2 text-cambridge-blue-600" />
                                        Password
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        Update your password regularly to keep your account secure
                                    </p>
                                </div>
                                <Link
                                    to="/forgotpassword"
                                    className="px-4 py-2.5 text-cambridge-blue-700 border border-cambridge-blue-200 hover:bg-cambridge-blue-50 transition-colors text-sm font-medium inline-flex items-center cursor-pointer rounded-lg"
                                >
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;