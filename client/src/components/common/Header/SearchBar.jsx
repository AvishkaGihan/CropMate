import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../../redux/features/search/searchSlice';

const SearchBar = () => {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search crops, products, or sellers..."
                className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-200 focus:outline-none focus:border-green-500"
                onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
            </div>
        </div>
    );
};

export default SearchBar;