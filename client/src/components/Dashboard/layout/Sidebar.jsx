import React from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    Menu,
    X,
    FileText,
    ShoppingCart,
    DollarSign,
    CreditCard,
    Package,
    BarChart2,
    Settings,
    LogOut,
    ChevronRight,
    ChevronLeft,
    Truck,
    Sprout,
    Users,
    Calendar,
    Map,
    MapPin,
    Search,
    TrendingUp
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, role = 'farmer' }) => {
    // Define role-specific pages
    const getPages = () => {
        // Common pages for all roles
        const commonPages = [
            { path: `/dashboard/${role}`, title: "Dashboard", icon: <Home size={20} /> },
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
    };
    
    const pages = getPages();
    
    // Role-based styling
    const getRoleClasses = () => {
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
    };
    
    const { bg, hover, active, border, text, accent } = getRoleClasses();

    // Animation variants for smooth transitions
    const sidebarVariants = {
        expanded: { 
            width: "16rem",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3
            }
        },
        collapsed: { 
            width: "5rem",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3
            }
        }
    };
    
    const textVariants = {
        expanded: { 
            opacity: 1, 
            x: 0,
            display: "block",
            transition: { delay: 0.1, duration: 0.2 }
        },
        collapsed: { 
            opacity: 0, 
            x: -10, 
            transitionEnd: { display: "none" },
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.div
            variants={sidebarVariants}
            animate={isOpen ? "expanded" : "collapsed"}
            initial={isOpen ? "expanded" : "collapsed"}
            className={`${bg} h-full flex flex-col shadow-lg z-20 relative`}
        >
            {/* Toggle button positioned on middle right */}
            <div className="absolute inset-y-0 -right-5 flex items-center pointer-events-none z-10">
                <button
                    onClick={toggleSidebar}
                    className={`${accent} w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-white/20 pointer-events-auto`}
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isOpen ? (
                        <ChevronLeft size={20} className="text-white" />
                    ) : (
                        <ChevronRight size={20} className="text-white" />
                    )}
                </button>
            </div>
            
            {/* Sidebar Header */}
            <div className="h-16 flex items-center justify-center border-b border-white/10">
                <div className="flex items-center">
                    <div className={`rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-md ${isOpen ? 'w-8 h-8 mr-3' : 'w-10 h-10'}`}>
                        <div className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                            </svg>
                        </div>
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.span
                                variants={textVariants}
                                initial="collapsed"
                                animate="expanded"
                                exit="collapsed"
                                className="text-xl font-bold text-white"
                            >
                                CropMate
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Menu Label */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="px-6 py-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <p className="text-sm text-white/60">Main Menu</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar Navigation */}
            <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto">
                {pages.map((page) => (
                    <NavLink
                        key={page.path}
                        to={page.path}
                        className={({ isActive }) =>
                            `flex items-center py-3 px-3 rounded-lg transition-all duration-200 ${
                                isActive ? active : hover
                            } text-white relative overflow-hidden`
                        }
                    >
                        <div className="flex items-center">
                            <span className={`${isOpen ? 'mr-3' : ''} transition-all duration-300`}>{page.icon}</span>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.span
                                        variants={textVariants}
                                        initial="collapsed"
                                        animate="expanded"
                                        exit="collapsed"
                                        className="text-sm font-medium"
                                    >
                                        {page.title}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    variants={textVariants}
                                    initial="collapsed"
                                    animate="expanded"
                                    exit="collapsed"
                                    className="ml-auto"
                                >
                                    <ChevronRight 
                                        size={16}
                                        className="transition-transform duration-200 group-hover:translate-x-1 opacity-70"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </NavLink>
                ))}
            </nav>

            {/* Role badge */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="p-4 border-t border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="bg-white/10 rounded-full py-1 px-3 text-xs font-medium text-white text-center">
                            {role.charAt(0).toUpperCase() + role.slice(1)} Portal
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* User Profile and Logout Section */}
            <div className="mt-auto border-t border-white/20 p-3">
                <div className="px-3 py-3 rounded-lg flex items-center transition-all duration-200 hover:bg-white/10 cursor-pointer group">
                    <div className={`${accent} w-8 h-8 rounded-full flex items-center justify-center`}>
                        <span className="text-sm font-medium text-white">J</span>
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                variants={textVariants}
                                initial="collapsed"
                                animate="expanded"
                                exit="collapsed"
                                className="ml-3"
                            >
                                <p className="text-sm font-medium text-white">John Doe</p>
                                <p className="text-xs text-white/60 capitalize">{role}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <button
                    onClick={() => console.log("Logout...")}
                    className="w-full flex items-center p-3 mt-2 cursor-pointer transition-all duration-200 rounded-lg hover:bg-white/10 group"
                >
                    <LogOut size={20} className="text-white" />
                    <AnimatePresence>
                        {isOpen && (
                            <motion.span
                                variants={textVariants}
                                initial="collapsed"
                                animate="expanded"
                                exit="collapsed" 
                                className="ml-3 text-sm text-white"
                            >
                                Sign out
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;