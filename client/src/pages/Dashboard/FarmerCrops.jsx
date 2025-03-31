import {
  useGetMyCropsQuery,
  useDeleteCropMutation,
} from "../../slices/cropApi";
import CropCard from "../../components/Crops/CropCard";
import { Link } from "react-router";

const FarmerCrops = () => {
  const { data: crops, isLoading, isError } = useGetMyCropsQuery();
  const [deleteCrop] = useDeleteCropMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this crop?")) {
      try {
        await deleteCrop(id).unwrap();
      } catch (err) {
        console.error("Failed to delete crop:", err);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading crops</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Crops</h2>
        <Link
          to="/farmer/crops/add"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add New Crop
        </Link>
      </div>

      {crops?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't added any crops yet.</p>
          <Link
            to="/farmer/crops/add"
            className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Add Your First Crop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops?.map((crop) => (
            <CropCard
              key={crop._id}
              crop={crop}
              onDelete={handleDelete}
              showEdit={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerCrops;
