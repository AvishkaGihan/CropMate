import Navbar from "../components/Navbar";
import CropCard from "../components/CropCard";
import Footer from "../components/Footer";

const AllCrops = () => {
  const allCrops = [
    {
      id: 1,
      name: "Tomato",
      description: "Fresh and juicy tomatoes from local farms.",
      image: "https://unsplash.it/600/400",
    },
    {
      id: 2,
      name: "Potato",
      description: "Organic potatoes for your kitchen.",
      image: "https://unsplash.it/600/400",
    },
    {
      id: 3,
      name: "Carrot",
      description: "Sweet and crunchy carrots.",
      image: "https://unsplash.it/600/400",
    },
    // Add more crops here
  ];

  return (
    <div>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-8">All Crops</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allCrops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCrops;
