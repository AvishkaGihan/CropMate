import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ className = "", variant = "light" }) => {
    const [isFocused, setIsFocused] = useState(false);

    const isLight = variant === "light";

    return (
        <form
            className={`relative flex items-center transition-all duration-300 ${isFocused ? "w-72" : "w-60"
                } ${className}`}
        >
            <input
                type="text"
                placeholder="Search Crops..."
                className={`py-2 px-4 pr-10 w-full rounded-lg transition-all duration-300 outline-none ${isLight
                    ? "bg-white border border-cambridge-blue-600 placeholder-cambridge-blue-400 focus:ring-2 focus:ring-mindaro-400 focus:border-mindaro-400"
                    : "bg-cambridge-blue-900/20 border border-cambridge-blue-300/30 text-white placeholder-cambridge-blue-300/60 focus:bg-cambridge-blue-900/30 focus:border-mindaro-400/60 backdrop-blur-sm"
                    }`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <button
                type="submit"
                className={`absolute right-3 cursor-pointer transition-colors duration-200 ${isLight
                    ? "text-cambridge-blue-400 hover:text-mindaro-400"
                    : "text-cambridge-blue-300/70 hover:text-mindaro-400"
                    }`}
                aria-label="Search"
            >
                <Search size={20} />
            </button>
        </form>
    );
};

export default SearchBar;