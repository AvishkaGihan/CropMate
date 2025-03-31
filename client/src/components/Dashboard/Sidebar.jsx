import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Leaf,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  Truck,
  User,
  X
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logout } from "../../slices/authSlice";
import { useState, useEffect } from "react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo?.role;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full bg-cambridge-blue-600 text-white shadow-lg"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay backdrop */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      ></div>

      {/* Sidebar container */}
      <div
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-40 ${isCollapsed ? 'w-[70px]' : 'w-[280px]'} lg:w-auto ${isCollapsed ? 'lg:w-[70px]' : 'lg:min-w-[260px]'} max-w-full flex-shrink-0 
          bg-gradient-to-b from-cal-poly-green-900 via-cal-poly-green-800 to-cal-poly-green-900 
          shadow-2xl lg:shadow-xl text-sm flex flex-col h-screen
          transition-all duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Toggle collapse button (desktop only) */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-5 top-1/2 hidden lg:flex h-12 w-12 items-center justify-center rounded-full bg-cambridge-blue-500 text-white shadow-md hover:bg-cambridge-blue-600 transition-colors cursor-pointer"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Logo and App Name */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 p-5 border-b border-cambridge-blue-700/20 cursor-pointer"
        >
          <div className="flex-shrink-0 p-1.5 bg-cambridge-blue-500 rounded-xl border border-white/10 shadow-inner cursor-pointer">
            <Leaf size={isCollapsed ? 24 : 32} className="text-white" />
          </div>
          <span className={`text-white font-bold text-lg tracking-tight transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            CropMate
          </span>
        </div>

        {/* User info card */}
        <div className={`mt-5 mx-4 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 ${isCollapsed ? 'px-2' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} mb-2`}>
            <div className="w-8 h-8 rounded-full bg-cambridge-blue-600/50 flex items-center justify-center text-white font-medium">
              {userInfo?.name?.charAt(0) || 'U'}
            </div>
            {!isCollapsed && (
              <div className="ml-2 truncate">
                <p className="text-white font-medium truncate">{userInfo?.name || 'User'}</p>
                <p className="text-cambridge-blue-300 text-xs capitalize">{role || 'User'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu sections */}
        <div className="mt-6 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-cambridge-blue-700/20 scrollbar-track-transparent">
          {menuItems.map((section) => {
            const visibleItems = section.items.filter(item => item.visible.includes(role));

            if (visibleItems.length > 0) {
              return (
                <div className="mb-8" key={section.title}>
                  {!isCollapsed && (
                    <h3 className="text-cambridge-blue-300 text-xs font-medium tracking-wider mb-3 mx-4">
                      {section.title}
                    </h3>
                  )}

                  <div className="space-y-1 px-2">
                    {visibleItems.map((item) => (
                      <Link
                        href={item.href}
                        key={item.label}
                        className={`flex items-center ${isCollapsed ? 'justify-center' : ''} gap-3 text-gray-300 py-2.5 
                          ${isCollapsed ? 'px-2' : 'px-4'} rounded-lg mx-1 relative
                          hover:bg-white/10 active:bg-white/20 transition-all duration-200 group`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="text-cambridge-blue-300 group-hover:text-mindaro-400">
                          {item.icon}
                        </div>

                        {!isCollapsed && (
                          <span className="font-medium">{item.label}</span>
                        )}

                        {/* Tooltip when collapsed */}
                        {isCollapsed && (
                          <div className="absolute left-14 bg-cal-poly-green-800 text-white text-sm py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap z-10">
                            {item.label}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Logout button */}
        <div className="mt-auto border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-3'} bg-white/5 hover:bg-red-900/20 
              text-gray-300 hover:text-red-300 py-3 px-4 rounded-lg transition-all duration-200 group relative cursor-pointer`}
          >
            <LogOut size={18} />
            {!isCollapsed && <span className="font-medium">Logout</span>}

            {/* Tooltip when collapsed */}
            {isCollapsed && (
              <div className="absolute left-14 bottom-3 bg-cal-poly-green-800 text-white text-sm py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap z-10">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;