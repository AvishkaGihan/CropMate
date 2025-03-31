import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { Calendar, Menu } from "lucide-react";

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
        {/* Header with Welcome, Date and Mobile Menu */}
        <header>
          {/* Welcome and date section */}
          <div className="bg-cambridge-blue-700 text-white p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center justify-between w-full">
                {/* Welcome message and date */}
                <div className="flex items-center justify-between md:w-full">
                  <h1 className="text-lg font-semibold">
                    Welcome, {userInfo?.name?.split(' ')[0] || 'User'}!
                  </h1>
                  <div className="hidden md:flex items-center text-white/80 text-sm">
                    <Calendar size={14} className="mr-1" />
                    <span>{getCurrentDate()}</span>
                  </div>
                </div>

                {/* Mobile menu hamburger icon */}
                <div className="flex items-center">
                  <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden mr-3 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                    aria-label="Toggle mobile menu"
                  >
                    <Menu size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 bg-cal-poly-green-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;