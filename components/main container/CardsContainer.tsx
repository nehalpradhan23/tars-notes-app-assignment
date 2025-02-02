import React from "react";
import Card from "./Card";

const CardsContainer = () => {
  return (
    <div className="flex flex-1 overflow-y-auto">
      <div className="flex gap-4 mt-5 flex-wrap overflow-y-scroll w-full">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default CardsContainer;
