// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CropCard from "../components/CropCard";
import Footer from "../components/Footer";
import { Link } from "react-router";

const Home = () => {
  const featuredCrops = [
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
  ];

  return (
    <div>
      <HeroSection />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-8">Featured Crops</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCrops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/all-crops"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            View All Crops
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
