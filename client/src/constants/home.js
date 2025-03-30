import Rice from "../assets/images/rice.webp";
import Vegetables from "../assets/images/vegetables.webp";
import Tea from "../assets/images/tea.webp";
import Cinnamon from "../assets/images/cinnamon.webp";
import Coconut from "../assets/images/coconut.webp";
import BlackPepper from "../assets/images/black-pepper.webp";

export const featuredCrops = [
  {
    id: 1,
    title: "Premium Rice",
    image: Rice,
    rating: 4.8,
    location: "Kandy",
    farmType: "Anyalapitiya",
    price: "Rs 180/kg",
    badge: "Best Seller",
    color: "from-golden-brown-400/10 to-golden-brown-300/5",
  },
  {
    id: 2,
    title: "Organic Vegetables",
    image: Vegetables,
    rating: 4.9,
    location: "Nuwara Eliya",
    farmType: "Demena Farm",
    price: "Rs 220/kg",
    badge: "Organic",
    color: "from-cal-poly-green-200/10 to-cal-poly-green-100/5",
  },
  {
    id: 3,
    title: "Fresh Tea Leaves",
    image: Tea,
    rating: 4.7,
    location: "Ella",
    farmType: "Sandy",
    price: "Rs 250/kg",
    badge: "Premium",
    color: "from-cambridge-blue-300/10 to-cambridge-blue-200/5",
  },
  {
    id: 4,
    title: "Ceylon Cinnamon",
    image: Cinnamon,
    rating: 4.9,
    location: "Galle",
    farmType: "Spice Garden",
    price: "Rs 350/kg",
    badge: "Export Quality",
    color: "from-persian-orange-400/10 to-persian-orange-300/5",
  },
  {
    id: 5,
    title: "King Coconut",
    image: Coconut,
    rating: 4.6,
    location: "Kurunegala",
    farmType: "Coconut Triangle",
    price: "Rs 120/nut",
    badge: "Fresh",
    color: "from-mindaro-400/10 to-mindaro-300/5",
  },
  {
    id: 6,
    title: "Black Pepper",
    image: BlackPepper,
    rating: 4.8,
    location: "Matale",
    farmType: "Organic Spice Farm",
    price: "Rs 1200/kg",
    badge: "High Grade",
    color: "from-golden-brown-500/10 to-golden-brown-400/5",
  },
];

export const features = [
  {
    id: 1,
    icon: "🌱",
    title: "Smart Farming",
    description:
      "Access real-time market prices and make informed decisions about your crops",
    color: "bg-gradient-to-br from-mindaro-400/10 to-cambridge-blue-300/10",
    iconBg: "bg-mindaro-400/20",
    borderColor: "border-mindaro-400/30",
    benefit: "30% yield increase",
  },
  {
    id: 2,
    icon: "🤝",
    title: "Direct Trading",
    description:
      "Connect directly with buyers and sellers, eliminating middlemen",
    color: "bg-gradient-to-br from-golden-brown-400/10 to-golden-brown-300/5",
    iconBg: "bg-golden-brown-400/20",
    borderColor: "border-golden-brown-400/30",
    benefit: "Higher profits",
  },
  {
    id: 3,
    icon: "🚚",
    title: "Seamless Logistics",
    description:
      "Efficient transportation solutions for your agricultural products",
    color:
      "bg-gradient-to-br from-persian-orange-400/10 to-persian-orange-300/5",
    iconBg: "bg-persian-orange-400/20",
    borderColor: "border-persian-orange-400/30",
    benefit: "Fast delivery",
  },
  {
    id: 4,
    icon: "📊",
    title: "Market Insights",
    description: "Data-driven insights to optimize your farming operations",
    color:
      "bg-gradient-to-br from-cal-poly-green-200/10 to-cal-poly-green-100/5",
    iconBg: "bg-cal-poly-green-300/20",
    borderColor: "border-cal-poly-green-400/30",
    benefit: "AI powered",
  },
];

export const steps = [
  {
    id: 0,
    number: "01",
    title: "Create Your Profile",
    description:
      "Get started with CropMate by creating your personalized profile:",
    features: [
      "Register as a Farmer, Vendor, or Transporter",
      "Add your location and business details",
      "Upload verification documents",
      "Set your preferences and specialties",
    ],
    image: "/src/assets/images/create-profile.jpg",
    color: "cambridge-blue",
    iconBg: "bg-cambridge-blue-500",
    decorColor:
      "bg-gradient-to-r from-cambridge-blue-400/10 to-cambridge-blue-500/5",
    buttonText: "Sign Up",
    buttonLink: "/signup",
  },
  {
    id: 1,
    number: "02",
    title: "Connect & Trade",
    description: "Connect with partners across the agricultural ecosystem:",
    features: [
      "Browse listings by location and category",
      "Message potential partners securely",
      "Compare prices and quality ratings",
      "Negotiate and agree on terms",
    ],
    image: "/src/assets/images/connect-trade.jpg",
    color: "golden-brown",
    iconBg: "bg-golden-brown-500",
    decorColor:
      "bg-gradient-to-r from-golden-brown-400/10 to-golden-brown-500/5",
    buttonText: "Browse Crops",
    buttonLink: "/marketplace",
  },
  {
    id: 2,
    number: "03",
    title: "Grow Together",
    description: "Build sustainable partnerships that grow your business:",
    features: [
      "Leave reviews for completed transactions",
      "Build reputation and earn badges",
      "Access data insights and trends",
      "Participate in the CropMate community",
    ],
    image: "/src/assets/images/grow-together.jpg",
    color: "cal-poly-green",
    iconBg: "bg-cal-poly-green-300",
    decorColor:
      "bg-gradient-to-r from-cal-poly-green-400/10 to-cal-poly-green-500/5",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
];
