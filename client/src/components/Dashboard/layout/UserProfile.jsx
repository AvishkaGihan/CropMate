import { ChevronRight } from "lucide-react";
import React from "react";

const UserProfile = ({ isOpen }) => {
    const user = {
        name: "John Doe",
        role: "Admin",
        avatar: "https://picsum.photos/40",
    };

    return (
        <div
            className="px-3 py-3 rounded flex items-center transition-all duration-200 hover:bg-blue-500 hover:pl-5 cursor-pointer group"
            onClick={() => console.log("Viewing profile...")}
            aria-label="User Profile"
        >
            <img
                src={user.avatar}
                alt={`${user.name}'s profile`}
                className={`rounded-full object-cover transition-all duration-200 ${isOpen ? "w-10 h-10" : "w-5 h-5"
                    } group-hover:scale-110`}
            />
            {isOpen && (
                <div className="ml-3">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-blue-200">{user.role}</p>
                </div>
            )}
            {isOpen && (
                <ChevronRight
                    size={20}
                    className="ml-auto transition-transform duration-200 group-hover:translate-x-1"
                />
            )}
        </div>
    );
};

export default React.memo(UserProfile);