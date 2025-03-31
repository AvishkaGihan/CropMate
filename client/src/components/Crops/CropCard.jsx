import { Link } from "react-router";

const CropCard = ({ crop, onDelete, showEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img
        src={crop.images[0]}
        alt={crop.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{crop.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{crop.category}</p>
        <p className="font-semibold text-blue-600 mb-3">₹{crop.price} per kg</p>
        <p className="text-sm mb-4">{crop.description.substring(0, 100)}...</p>

        <div className="flex justify-between items-center">
          <span className="text-sm">
            Quantity: <span className="font-medium">{crop.quantity} kg</span>
          </span>

          <div className="space-x-2">
            {showEdit && (
              <Link
                to={`/dashboard/crops/edit/${crop._id}`}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </Link>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(crop._id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
