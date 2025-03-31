import {
  ClipboardList,
  Leaf,
  LogOut,
  Package,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logout } from "../../slices/authSlice";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <User size={20} />,
        label: "Profile",
        href: "/profile",
        visible: ["vendor", "farmer", "driver"],
      },
      {
        icon: <ShoppingCart size={20} />,
        label: "My Orders",
        href: "/orders",
        visible: ["vendor", "farmer", "driver"],
      },
    ],
  },
  {
    title: "FARMER",
    items: [
      {
        icon: <Leaf size={20} />,
        label: "Manage Crops",
        href: "/farmer/crops",
        visible: ["farmer"],
      },
      {
        icon: <ClipboardList size={20} />,
        label: "Received Orders",
        href: "/farmer/orders",
        visible: ["farmer"],
      },
    ],
  },
  {
    title: "DRIVER",
    items: [
      {
        icon: <Package size={20} />,
        label: "Available Orders",
        href: "/driver/available-orders",
        visible: ["driver"],
      },
      {
        icon: <Truck size={20} />,
        label: "My Deliveries",
        href: "/driver/my-deliveries",
        visible: ["driver"],
      },
    ],
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo?.role;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => {
        // Filter items based on the user's role
        const visibleItems = section.items.filter((item) =>
          item.visible.includes(role)
        );

        // Only render the section if there are visible items
        if (visibleItems.length > 0) {
          return (
            <div className="flex flex-col gap-2" key={section.title}>
              {/* Render the title only if there are visible items */}
              <span className="hidden lg:block text-gray-400 font-light my-4">
                {section.title}
              </span>
              {visibleItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-skyLight"
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              ))}
            </div>
          );
        }

        // Return null if no visible items exist for this section
        return null;
      })}
      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center lg:justify-start gap-4 text-red-500 py-2 md:px-2 rounded-md hover:bg-red-50"
        >
          <LogOut size={20} />
          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
