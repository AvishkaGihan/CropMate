import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import Sidebar from "../components/Dashboard/Sidebar";
import { Calendar, Leaf } from "lucide-react";

const DashboardLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Format current date without useEffect
  const getCurrentDate = () => {
    const now = new Date();
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    return now.toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header with Welcome and Date */}
        <header>
          {/* Welcome and date section */}
          <div className="bg-cambridge-blue-700 text-white p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center justify-between w-full">
                <div className="bg-white/10 p-2 rounded-lg mr-3">
                  <Leaf size={18} className="text-mindaro-300" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-lg font-semibold">
                    Welcome, {userInfo?.name?.split(' ')[0] || 'User'}!
                  </h1>
                  <div className="flex items-center text-white/80 text-sm">
                    <Calendar size={14} className="mr-1" />
                    <span>{getCurrentDate()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;