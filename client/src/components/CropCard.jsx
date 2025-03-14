// src/components/CropCard.jsx
import { Link } from "react-router";

const CropCard = ({ crop }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={crop.image}
        alt={crop.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{crop.name}</h3>
      <p className="text-gray-600 mb-4">{crop.description}</p>
      <Link
        to={`/crop/${crop.id}`}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default CropCard;
