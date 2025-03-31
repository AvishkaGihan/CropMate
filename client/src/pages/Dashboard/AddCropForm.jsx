import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateCropMutation } from "../../slices/cropApi";
import { useForm } from "react-hook-form";

const AddCropForm = () => {
  const [createCrop, { isLoading }] = useCreateCropMutation();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => prevImages.concat(filesArray));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append all form data
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("category", data.category);
      formData.append("harvestDate", data.harvestDate);
      formData.append("isOrganic", data.isOrganic);

      // Append each image file
      const fileInput = document.querySelector('input[type="file"]');
      Array.from(fileInput.files).forEach((file) => {
        formData.append("images", file);
      });

      await createCrop(formData).unwrap();
      navigate("/dashboard/crops");
    } catch (err) {
      console.error("Failed to add crop:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Crop</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Crop Name *
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Crop name is required" })}
                className={`w-full p-2 border rounded ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                rows="4"
                {...register("description", {
                  required: "Description is required",
                })}
                className={`w-full p-2 border rounded ${
                  errors.description ? "border-red-500" : ""
                }`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className={`w-full p-2 border rounded ${
                  errors.category ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a category</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains</option>
                <option value="spices">Spices</option>
                <option value="flowers">Flowers</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="price">
                Price per kg (LKR) *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                className={`w-full p-2 border rounded ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="quantity">
                Available Quantity (kg) *
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Minimum quantity is 1kg" },
                })}
                className={`w-full p-2 border rounded ${
                  errors.quantity ? "border-red-500" : ""
                }`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="harvestDate">
                Harvest Date *
              </label>
              <input
                id="harvestDate"
                type="date"
                {...register("harvestDate", {
                  required: "Harvest date is required",
                })}
                className={`w-full p-2 border rounded ${
                  errors.harvestDate ? "border-red-500" : ""
                }`}
              />
              {errors.harvestDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.harvestDate.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("isOrganic")}
                  className="mr-2"
                />
                <span>Certified Organic</span>
              </label>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Crop Images *</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload at least one image (max 5)
          </p>

          {/* Image Preview */}
          <div className="flex flex-wrap gap-2 mt-3">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/farmer/crops")}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Adding Crop..." : "Add Crop"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCropForm;
