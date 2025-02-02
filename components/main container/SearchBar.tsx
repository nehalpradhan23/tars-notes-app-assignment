import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="w-full border px-4 py-2 rounded-full flex items-center text-gray-400 gap-2 text-lg font-semibold">
      <CiSearch />
      <input type="text" placeholder="Search" className="w-full outline-none" />
    </div>
  );
};

export default SearchBar;
