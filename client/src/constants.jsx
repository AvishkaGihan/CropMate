import { Leaf, Truck, Store } from "lucide-react";

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
