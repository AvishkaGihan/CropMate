import { Leaf, Truck, Store } from "lucide-react";

import Rice from "./assets/images/rice.webp";
import Vegetables from "./assets/images/vegetables.webp";
import Tea from "./assets/images/tea.webp";
import Cinnamon from "./assets/images/cinnamon.webp";
import Coconut from "./assets/images/coconut.webp";
import BlackPepper from "./assets/images/black-pepper.webp";

//Home
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

//About Us
export const milestones = [
  {
    date: "January 2023",
    title: "Idea Conception",
    description:
      "CropMate began as a concept during an agricultural hackathon in Colombo.",
  },
  {
    date: "March 2023",
    title: "Seed Funding",
    description:
      "Secured initial funding from local angel investors who believe in our vision.",
  },
  {
    date: "June 2023",
    title: "Beta Launch",
    description:
      "Released our first prototype to 50 farmers and 10 vendors in Kandy district.",
  },
  {
    date: "October 2023",
    title: "Team Expansion",
    description:
      "Grew our team to include agricultural experts and additional developers.",
  },
  {
    date: "January 2024",
    title: "Official Launch",
    description:
      "Publicly launched CropMate platform with improved features based on beta feedback.",
  },
];

export const values = [
  {
    icon: "🌱",
    title: "Sustainability",
    description:
      "Building technology that promotes environmentally responsible farming from day one.",
  },
  {
    icon: "🤝",
    title: "Community",
    description:
      "Creating connections between farmers, vendors, and transporters for a stronger agricultural ecosystem.",
  },
  {
    icon: "💡",
    title: "Innovation",
    description:
      "Applying cutting-edge technology to solve age-old problems in agriculture.",
  },
  {
    icon: "⚖️",
    title: "Fairness",
    description:
      "Developing transparent processes that ensure equitable outcomes for all platform participants.",
  },
];

//Navigation/Footer
export const legalLinks = [
  {
    id: 1,
    label: "Terms of Service",
    path: "/terms",
  },
  {
    id: 2,
    label: "Privacy Policy",
    path: "/privacy",
  },
  {
    id: 3,
    label: "Cookie Policy",
    path: "/cookies",
  },
];

export const navItems = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "Marketplace",
    path: "/marketplace",
  },
  {
    id: 3,
    label: "About",
    path: "/about",
  },
];

export const socialPlatforms = [
  {
    id: 1,
    name: "Facebook",
    icon: "📘",
    url: "https://facebook.com",
  },
  {
    id: 2,
    name: "Twitter",
    icon: "🐦",
    url: "https://twitter.com",
  },
  {
    id: 3,
    name: "Instagram",
    icon: "📷",
    url: "https://instagram.com",
  },
];

//Marketplace
export const categories = [
  { value: "all", label: "All Categories" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "grains", label: "Grains & Rice" },
  { value: "spices", label: "Spices" },
  { value: "tea", label: "Tea & Coffee" },
  { value: "coconut", label: "Coconut Products" },
];

export const locations = [
  { value: "", label: "All Locations" },
  { value: "kandy", label: "Kandy" },
  { value: "colombo", label: "Colombo" },
  { value: "galle", label: "Galle" },
  { value: "jaffna", label: "Jaffna" },
  { value: "nuwara-eliya", label: "Nuwara Eliya" },
];

export const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export const certifications = [
  { id: "organic", label: "Organic Certified" },
  { id: "fair-trade", label: "Fair Trade" },
  { id: "pesticide-free", label: "Pesticide-Free" },
  { id: "export-quality", label: "Export Quality" },
];

export const cropTypes = [
  { id: "corn", label: "Corn" },
  { id: "wheat", label: "Wheat" },
  { id: "rice", label: "Rice" },
  { id: "soybeans", label: "Soybeans" },
  { id: "potatoes", label: "Potatoes" },
  { id: "tomatoes", label: "Tomatoes" },
  { id: "cotton", label: "Cotton" },
  { id: "sugarcane", label: "Sugarcane" },
];

//Driver
export const vehicleTypes = [
  { value: "pickup", label: "Pickup Truck" },
  { value: "small_truck", label: "Small Truck" },
  { value: "medium_truck", label: "Medium Truck" },
  { value: "large_truck", label: "Large Truck / Semi" },
  { value: "refrigerated", label: "Refrigerated Truck" },
  { value: "van", label: "Van" },
];

//Vendor
export const businessTypes = [
  { value: "retailer", label: "Retailer" },
  { value: "wholesaler", label: "Wholesaler" },
  { value: "processor", label: "Processor" },
  { value: "distributor", label: "Distributor" },
  { value: "exporter", label: "Exporter" },
];

//Login
export const benefits = [
  "Access to market insights and pricing trends",
  "Direct connections with buyers, sellers, and transporters",
  "Secure payment processing and transaction history",
];

export const roles = [
  {
    id: "farmer",
    title: "Farmer",
    icon: <Leaf size={20} className="text-white" />,
  },
  {
    id: "driver",
    title: "Driver",
    icon: <Truck size={20} className="text-white" />,
  },
  {
    id: "vendor",
    title: "Vendor",
    icon: <Store size={20} className="text-white" />,
  },
];

export const roleCardClasses = {
  farmer: {
    selected:
      "bg-cal-poly-green-100 border-cal-poly-green-500 ring-2 ring-cal-poly-green-500",
    default:
      "bg-cal-poly-green-50 border-cal-poly-green-200 hover:bg-cal-poly-green-100",
    iconBg: {
      selected: "bg-cal-poly-green-600",
      default: "bg-cal-poly-green-500",
    },
    icon: <Leaf size={20} className="text-white" />,
    text: "text-cal-poly-green-700",
  },
  driver: {
    selected:
      "bg-cambridge-blue-100 border-cambridge-blue-500 ring-2 ring-cambridge-blue-500",
    default:
      "bg-cambridge-blue-50 border-cambridge-blue-200 hover:bg-cambridge-blue-100",
    iconBg: {
      selected: "bg-cambridge-blue-600",
      default: "bg-cambridge-blue-500",
    },
    icon: <Truck size={20} className="text-white" />,
    text: "text-cambridge-blue-700",
  },
  vendor: {
    selected:
      "bg-golden-brown-100 border-golden-brown-500 ring-2 ring-golden-brown-500",
    default:
      "bg-golden-brown-50 border-golden-brown-200 hover:bg-golden-brown-100",
    iconBg: {
      selected: "bg-golden-brown-600",
      default: "bg-golden-brown-500",
    },
    icon: <Store size={20} className="text-white" />,
    text: "text-golden-brown-700",
  },
};
