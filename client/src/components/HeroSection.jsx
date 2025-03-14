// src/components/HeroSection.jsx
const HeroSection = () => {
  return (
    <div className="bg-green-100 py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to CropMate</h1>
        <p className="text-lg mb-8">
          Your one-stop solution for farming and crop management.
        </p>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
          Explore Crops
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
