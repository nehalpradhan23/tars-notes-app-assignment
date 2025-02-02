import React from "react";
import SearchBar from "./SearchBar";
import { BsSliders } from "react-icons/bs";
import Card from "./Card";
import CardsContainer from "./CardsContainer";
import AddNote from "./AddNote/AddNote";

const MainContainer = () => {
  return (
    <div className="w-full px-4 flex flex-col">
      <div className="flex gap-3">
        <SearchBar />
        {/* sort */}
        <button className="flex items-center rounded-full px-4 py-2 bg-slate-100 gap-2 text-lg font-medium">
          <BsSliders />
          <span>Sort</span>
        </button>
      </div>
      {/* cards ------------------------ */}
      <CardsContainer />
      {/* ======================================= */}
      <AddNote />
    </div>
  );
};

export default MainContainer;
