"use client";
import { useGlobalContext } from "@/context/AppContext";
import useFetchNotes from "@/hooks/useFetchNotes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaExpandAlt, FaStar } from "react-icons/fa";
import { GrContract } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const NewNoteModal = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const { getUserNotes } = useFetchNotes();

  const {
    userObject: { user },
    newNoteModalObject: { setNewNoteModalOpen },
    noteIsRecorded,
    setNoteIsRecorded,
    textRecordingObject: { text },
  } = useGlobalContext();

  // ===============================================================

  useEffect(() => {
    if (noteIsRecorded === true) {
      setNoteContent(text);
    }
  }, [text]);

  // ===============================================================

  const handleSaveNote = async () => {
    if (noteTitle === "") {
      toast.error("Enter note title");
      return;
    }
    if (noteContent === "") {
      toast.error("Enter note content");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/notes", {
        userId: user?._id,
        title: noteTitle,
        noteContent,
        isFavorite,
        noteIsRecorded,
        creationDate: Date.now(),
      });
      // console.log(response);

      if (response.data.success) {
        toast("Note added");
        setNewNoteModalOpen(false);
        setNoteIsRecorded(false);
        getUserNotes();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // ==========================================
  return (
    <div className="absolute z-10 w-full h-full bg-black/50 flex justify-center items-center">
      <div
        className={`${
          isFullScreen
            ? "w-full h-full"
            : "w-[90%] h-[80%] lg:w-[1200px] lg:h-[700px] rounded-2xl"
        } bg-white p-6 flex flex-col`}
      >
        {/* top buttons ------------------------- */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="bg-gray-100 p-3 rounded-full"
          >
            {isFullScreen ? <GrContract /> : <FaExpandAlt />}
          </button>
          {/* right side ----------------- */}
          <div className="flex items-center gap-3 *:rounded-full *:bg-gray-100 *:text-lg *:font-semibold">
            <button
              onClick={() => {
                if (isFavorite) {
                  toast("Removed from favorite");
                } else {
                  toast("Added to favorite");
                }
                setIsFavorite(!isFavorite);
              }}
              className="p-3 font-bold"
            >
              {isFavorite ? (
                <FaStar className="text-purple-700" />
              ) : (
                <FaStar className="text-gray-400" />
              )}
            </button>
            {/* <button className="px-5 py-2">Share</button> */}
            <button
              onClick={() => {
                setNewNoteModalOpen(false);
                setNoteIsRecorded(false);
              }}
              className="p-3"
            >
              <MdClose />
            </button>
          </div>
        </div>
        {/* title -------------------------------------------- */}
        <div className="flex flex-col h-full mt-4 gap-4">
          <p className="text-xl font-bold">Add Title:</p>
          <input
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
            type="text"
            placeholder="Title"
            className="p-3 border bg-gray-100 rounded-2xl outline-none"
            required
          />
          <p className="text-xl font-bold">Add note:</p>
          <textarea
            onChange={(e) => setNoteContent(e.target.value)}
            value={noteContent}
            name=""
            id=""
            placeholder="Add Note here"
            className="rounded-2xl p-3 border bg-gray-100 h-[180px] outline-none"
            required
          />
          <div className="">
            <p>Add images</p>
          </div>
        </div>
        {/* <div className="flex justify-end"> */}
        <button
          disabled={loading}
          onClick={() => handleSaveNote()}
          className="px-4 py-3 rounded-full bg-purple-700 hover:bg-purple-900 font-bold text-white"
        >
          {loading ? <span>Saving...</span> : <span>Save note</span>}
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default NewNoteModal;
