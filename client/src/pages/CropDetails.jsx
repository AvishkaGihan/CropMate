const CropDetails = () => {
  const crop = {
    id: 1,
    name: "Tomato",
    description: "Fresh and juicy tomatoes from local farms.",
    image: "https://unsplash.it/600/400",
    price: "$5 per kg",
    farmer: "John Doe",
    location: "Farmville, USA",
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={crop.image} alt={crop.name} className="w-full rounded-lg" />
        <div>
          <h1 className="text-4xl font-bold mb-4">{crop.name}</h1>
          <p className="text-gray-600 mb-4">{crop.description}</p>
          <p className="text-lg font-bold mb-4">Price: {crop.price}</p>
          <p className="text-gray-600 mb-4">Farmer: {crop.farmer}</p>
          <p className="text-gray-600 mb-4">Location: {crop.location}</p>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
