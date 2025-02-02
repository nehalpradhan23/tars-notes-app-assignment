"use client";
import React from "react";
import TextRecording from "./TextRecording";
import { LuPencilLine } from "react-icons/lu";
import { FaRegImage } from "react-icons/fa";

const AddNote = () => {
  // ============================================
  return (
    <div className="p-4 flex justify-center h-[120px]">
      <div className="w-[80%] flex items-center border border-black/30 shadow-2xl rounded-full justify-between">
        <div className="flex ml-8 gap-8 *:text-2xl">
          <button>
            <LuPencilLine />
          </button>
          <button>
            <FaRegImage />
          </button>
        </div>
        <TextRecording />
      </div>
    </div>
  );
};

export default AddNote;
