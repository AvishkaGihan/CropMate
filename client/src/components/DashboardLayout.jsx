import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
