import Rice from "../assets/images/rice.webp";
import Vegetables from "../assets/images/vegetables.webp";
import Tea from "../assets/images/tea.webp";
import Cinnamon from "../assets/images/cinnamon.webp";
import Coconut from "../assets/images/coconut.webp";
import BlackPepper from "../assets/images/black-pepper.webp";

export const FEATURED_CROPS = [
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
