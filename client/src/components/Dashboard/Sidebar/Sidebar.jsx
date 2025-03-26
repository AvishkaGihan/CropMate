import React, { useEffect, useMemo } from "react";
import MobileOverlay from './MobileOverlay';
import MobileSidebar from './MobileSidebar';
import DesktopSidebar from './DesktopSidebar';

import { Home, Sprout, TrendingUp, Package, CreditCard, Truck, MapPin, BarChart2, DollarSign, Search, ShoppingCart, Clipboard } from 'lucide-react';

const Sidebar = ({
  isOpen,
  toggleSidebar,
  role = 'farmer',
  mobileOpen = false,
  toggleMobileSidebar
}) => {
  // Handle window resize to close mobile sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) {
        toggleMobileSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen, toggleMobileSidebar]);

  // Get role-specific navigation pages
  const pages = usePages(role);
  
  // Get role-specific styling
  const { bg, hover, active, border, text, accent } = useRoleClasses(role);

  // Handler for mobile close
  const handleMobileClose = () => toggleMobileSidebar(false);

  return (
    <>
      {/* Mobile Overlay */}
      <MobileOverlay 
        mobileOpen={mobileOpen} 
        onClose={handleMobileClose} 
      />
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        mobileOpen={mobileOpen}
        toggleMobileSidebar={toggleMobileSidebar}
        bg={bg}
        role={role}
        pages={pages}
        active={active}
        hover={hover}
        accent={accent}
      />
      
      {/* Desktop Sidebar */}
      <DesktopSidebar 
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        bg={bg}
        accent={accent}
        active={active}
        hover={hover}
        role={role}
        pages={pages}
      />
    </>
  );
};

const usePages = (role) => {
    return useMemo(() => {
      // Common pages for all roles
      const commonPages = [
        { path: `/dashboard/${role}`, title: "Dashboard", icon: <Home size={20} />, exact: true },
      ];
  
      // Role-specific pages
      const rolePages = {
        farmer: [
          { path: `/dashboard/${role}/crops`, title: 'My Crops', icon: <Sprout size={20} /> },
          { path: `/dashboard/${role}/market`, title: 'Market Analysis', icon: <TrendingUp size={20} /> },
          { path: `/dashboard/${role}/orders`, title: 'Orders', icon: <Package size={20} /> },
          { path: `/dashboard/${role}/finances`, title: 'Finances', icon: <CreditCard size={20} /> },
        ],
        driver: [
          { path: `/dashboard/${role}/jobs`, title: 'Available Jobs', icon: <Truck size={20} /> },
          { path: `/dashboard/${role}/active`, title: 'Active Deliveries', icon: <MapPin size={20} /> },
          { path: `/dashboard/${role}/performance`, title: 'Performance', icon: <BarChart2 size={20} /> },
          { path: `/dashboard/${role}/earnings`, title: 'Earnings', icon: <DollarSign size={20} /> },
        ],
        vendor: [
          { path: `/dashboard/${role}/search`, title: 'Find Crops', icon: <Search size={20} /> },
          { path: `/dashboard/${role}/orders`, title: 'My Orders', icon: <ShoppingCart size={20} /> },
          { path: `/dashboard/${role}/delivery`, title: 'Deliveries', icon: <Truck size={20} /> },
          { path: `/dashboard/${role}/reports`, title: 'Reports', icon: <Clipboard size={20} /> },
        ]
      };
  
      return [...commonPages, ...(rolePages[role] || [])];
    }, [role]);
  };

const useRoleClasses = (role) => {
    return useMemo(() => {
      switch (role) {
        case 'farmer':
          return {
            bg: 'bg-cal-poly-green-800',
            hover: 'hover:bg-cal-poly-green-700',
            active: 'bg-cal-poly-green-600',
            border: 'border-cal-poly-green-700',
            text: 'text-cal-poly-green-800',
            accent: 'bg-cal-poly-green-600'
          };
        case 'driver':
          return {
            bg: 'bg-cambridge-blue-800',
            hover: 'hover:bg-cambridge-blue-700',
            active: 'bg-cambridge-blue-600',
            border: 'border-cambridge-blue-700',
            text: 'text-cambridge-blue-800',
            accent: 'bg-cambridge-blue-600'
          };
        case 'vendor':
          return {
            bg: 'bg-golden-brown-800',
            hover: 'hover:bg-golden-brown-700',
            active: 'bg-golden-brown-600',
            border: 'border-golden-brown-700',
            text: 'text-golden-brown-800',
            accent: 'bg-golden-brown-600'
          };
        default:
          return {
            bg: 'bg-cal-poly-green-800',
            hover: 'hover:bg-cal-poly-green-700',
            active: 'bg-cal-poly-green-600',
            border: 'border-cal-poly-green-700',
            text: 'text-cal-poly-green-800',
            accent: 'bg-cal-poly-green-600'
          };
      }
    }, [role]);
  };
export default Sidebar;