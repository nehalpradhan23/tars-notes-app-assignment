import React from "react";
import Card from "./Card";
import { noteType } from "@/types/types";
import useFetchNotes from "@/hooks/useFetchNotes";

const CardsContainer = ({ notes }: { notes: noteType[] }) => {
  return (
    <div className="flex flex-1 overflow-y-auto">
      <div className="flex gap-4 mt-5 flex-wrap overflow-y-scroll w-full">
        {notes?.map((note, index) => (
          <Card note={note} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
