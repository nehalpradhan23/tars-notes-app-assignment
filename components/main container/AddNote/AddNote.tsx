"use client";
import React from "react";
import TextRecording from "./TextRecording";
import { LuPencilLine } from "react-icons/lu";
import { FaRegImage } from "react-icons/fa";
import { useGlobalContext } from "@/context/AppContext";

const AddNote = () => {
  const {
    newNoteModalObject: { setNewNoteModalOpen },
  } = useGlobalContext();
  // ============================================
  return (
    <div className="p-4 flex justify-center h-[120px]">
      <div className="w-[90%] max-md:m-4 md:w-[80%] flex items-center border border-black/30 shadow-2xl rounded-full justify-between">
        <div className="flex ml-8 gap-8 *:md:text-2xl *:max-md:text-xl">
          <button onClick={() => setNewNoteModalOpen(true)}>
            <LuPencilLine />
          </button>
          <button onClick={() => setNewNoteModalOpen(true)}>
            <FaRegImage />
          </button>
        </div>
        <TextRecording />
      </div>
    </div>
  );
};

export default AddNote;
