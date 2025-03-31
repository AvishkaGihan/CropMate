import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { Calendar, Mail, Menu, User } from "lucide-react";

const DashboardLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Format current date without useEffect
  const getCurrentDate = () => {
    const now = new Date();
    const options = {
      weekday: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    return now.toLocaleDateString('en-US', options);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Pass mobileMenuOpen state to Sidebar */}
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Enhanced Header with Profile Style */}
        <header className="bg-white shadow-sm">
          <div className="relative bg-gradient-to-r from-cal-poly-green-800 to-cambridge-blue-700 py-6 px-6">
            <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Welcome, {userInfo?.name?.split(' ')[0] || 'User'}!
                  </h1>
                  <div className="flex items-center mt-1">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-mindaro-200 text-xs flex items-center">
                      {userInfo?.role?.charAt(0).toUpperCase() + userInfo?.role?.slice(1) || "User"}
                    </span>
                    {userInfo?.email && (
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-mindaro-200 text-xs flex items-center ml-2">
                        <Mail size={10} className="mr-1" />
                        {userInfo.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="hidden md:flex items-center text-white/80 text-sm bg-white/10 backdrop-blur-sm py-1.5 px-3 rounded-lg">
                  <Calendar size={14} className="mr-1.5" />
                  <span>{getCurrentDate()}</span>
                </div>

                {/* Mobile menu hamburger icon */}
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors self-center h-full"
                  aria-label="Toggle mobile menu"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;