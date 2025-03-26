import { NavLink } from "react-router";
import { ChevronRight } from "lucide-react";
import React from "react";

const SidebarItem = ({ page, isOpen }) => {
    return (
        <NavLink
            to={page.path}
            className={({ isActive }) =>
                `group flex items-center py-3 px-3 rounded-r cursor-pointer transition-all duration-200 hover:bg-blue-500 hover:pl-5 ${isActive ? "bg-blue-500 border-l-2 border-white" : ""
                }`
            }
            aria-label={page.title}
        >
            <div className="transform transition-transform duration-200 group-hover:scale-110">
                {page.icon}
            </div>
            {isOpen && (
                <span className="ml-4 transition-opacity duration-300">
                    {page.title}
                </span>
            )}
            {isOpen && (
                <ChevronRight
                    size={20}
                    className="ml-auto transition-transform duration-200 group-hover:translate-x-1"
                />
            )}
        </NavLink>
    );
};

export default React.memo(SidebarItem);