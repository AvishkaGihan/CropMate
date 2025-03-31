import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../slices/authApi";
import { User, Phone, Mail, MapPin, Save, Loader2, Shield, Key } from "lucide-react";

const Profile = () => {
    const { data: profile } = useGetProfileQuery();
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [activeTab, setActiveTab] = useState('personal');

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                email: profile.email,
                phone: profile.phone || "",
                address: profile.address || "",
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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

    return (
        <div className="bg-white rounded-xl shadow-sm max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-xl overflow-hidden mb-8">
                <div className="relative bg-gradient-to-r from-cal-poly-green-800 to-cambridge-blue-700 py-10 px-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                        <div className="w-24 h-24 bg-white/20 flex items-center justify-center rounded-xl text-white text-4xl font-medium shadow-lg border border-white/20">
                            {formData.name?.charAt(0) || "U"}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-white">{formData.name}</h1>
                            <div className="mt-2 flex items-center justify-center md:justify-start gap-3">
                                <span className="px-3 py-1 bg-white/10 rounded-full text-mindaro-200 text-sm">
                                    {profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1) || "User"}
                                </span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-mindaro-200 text-sm flex items-center">
                                    <Mail size={12} className="mr-1" />
                                    {formData.email}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b px-2">
                    <button
                        className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 -mb-px ${activeTab === 'personal'
                            ? 'border-cambridge-blue-600 text-cambridge-blue-700'
                            : 'border-transparent text-gray-500 hover:text-cambridge-blue-600 hover:border-cambridge-blue-200'
                            }`}
                        onClick={() => setActiveTab('personal')}
                    >
                        <User size={16} className="inline mr-2" />
                        Personal Info
                    </button>
                    <button
                        className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 -mb-px ${activeTab === 'security'
                            ? 'border-cambridge-blue-600 text-cambridge-blue-700'
                            : 'border-transparent text-gray-500 hover:text-cambridge-blue-600 hover:border-cambridge-blue-200'
                            }`}
                        onClick={() => setActiveTab('security')}
                    >
                        <Shield size={16} className="inline mr-2" />
                        Security
                    </button>
                </div>
            </div>

            {activeTab === 'personal' && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
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
                                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cambridge-blue-500 focus:border-transparent outline-none transition"
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
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cambridge-blue-500 focus:border-transparent outline-none transition"
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
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cambridge-blue-500 focus:border-transparent outline-none transition"
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
                                className="inline-flex items-center px-5 py-3 bg-cambridge-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-cambridge-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cambridge-blue-500 disabled:opacity-60 transition-colors"
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

            {activeTab === 'security' && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-semibold mb-8 text-gray-800 flex items-center">
                        <Shield size={22} className="mr-3 text-cambridge-blue-600" />
                        Security Settings
                    </h2>

                    <div className="space-y-8">
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
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
                                    className="px-4 py-2.5 bg-cambridge-blue-50 border border-cambridge-blue-200 text-cambridge-blue-700 rounded-lg hover:bg-cambridge-blue-100 transition-colors text-sm font-medium inline-flex items-center"
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