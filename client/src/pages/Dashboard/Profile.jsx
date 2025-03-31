import { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../slices/authApi";

const Profile = () => {
  const { data: profile } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
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
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
