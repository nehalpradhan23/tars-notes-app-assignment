import React from "react";
import Card from "./Card";

const CardsContainer = () => {
  return (
    <div className="flex gap-4 mt-5 flex-wrap overflow-scroll h-full">
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default CardsContainer;
