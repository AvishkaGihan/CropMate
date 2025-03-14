import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
