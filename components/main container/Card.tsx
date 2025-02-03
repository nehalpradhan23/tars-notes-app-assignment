import { useGlobalContext } from "@/context/AppContext";
import useNoteDelete from "@/hooks/useNoteDelete";
import { noteType } from "@/types/types";
import React from "react";
import { BiCopyAlt } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md";
import { RiText } from "react-icons/ri";

const Card = ({ note }: { note: noteType }) => {
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  const {
    deleteNoteModalObject: { setDeleteNoteModalOpen },
    noteToDeleteObject: { setNoteToDelete },
  } = useGlobalContext();

  const handleNoteDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: noteType
  ) => {
    e.stopPropagation();
    setNoteToDelete(note);
    setDeleteNoteModalOpen(true);
  };

  // =========================================
  return (
    <div className="flex flex-col border hover:border-black rounded-2xl p-5 w-[350px] h-[400px] hover:bg-gray-50 cursor-pointer">
      <div className="flex flex-col flex-1 gap-3">
        {/* time ------------------- */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400 font-semibold">
            {formatTimestamp(Number(note.creationDate))}
          </span>
          {note?.noteIsRecorded ? (
            <div className="flex items-center gap-1 bg-gray-100 rounded-full py-0.5 px-2 font-bold">
              <FaPlay />
              <span>00:00</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-gray-100 rounded-full py-0.5 px-2 font-bold">
              {/* <span className="bg-black text-white p-1 h-min">T</span> */}
              <RiText className="bg-black text-white" />
              Text
            </div>
          )}
        </div>
        {/* title --------------------- */}
        <span className="text-xl font-bold">{note.title}</span>
        <div className="text-gray-600 text-lg">{note.noteContent}</div>
        <span>image</span>
      </div>
      {/* buttons ------------------------- */}
      <div className="flex items-end justify-end *:text-2xl gap-1 *:text-slate-400 *:p-2">
        <button className="hover:bg-gray-200 rounded-full">
          <BiCopyAlt />
        </button>
        <button className="hover:bg-gray-200 rounded-full">
          <MdDriveFileRenameOutline />
        </button>
        <button
          onClick={(e) => handleNoteDelete(e, note)}
          className="hover:bg-gray-200 rounded-full"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Card;
