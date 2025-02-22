"use client";
import { useGlobalContext } from "@/context/AppContext";
import useFetchNotes from "@/hooks/useFetchNotes";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { FaExpandAlt, FaPlay, FaPlus, FaStar } from "react-icons/fa";
import { GrContract } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const EditNoteModal = () => {
  const {
    userObject: { user },
    noteIsRecorded,
    setNoteIsRecorded,
    textRecordingObject: { text },
    editNoteModalObject: { setEditNoteModalOpen },
    currentNoteToEditObject: { currentNoteToEdit },
  } = useGlobalContext();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [noteTitle, setNoteTitle] = useState<string | undefined>("");
  const [noteContent, setNoteContent] = useState<string | undefined>("");
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[] | []>([]);

  const { getUserNotes } = useFetchNotes();

  // ===============================================================

  // useEffect(() => {
  //   if (noteIsRecorded === true) {
  //     setNoteContent(text);
  //   }
  // }, [text]);

  useEffect(() => {
    setNoteTitle(currentNoteToEdit?.title);
    setNoteContent(currentNoteToEdit?.noteContent);
    setIsFavorite(currentNoteToEdit?.isFavorite);
    setImages(currentNoteToEdit?.images!);
  }, [currentNoteToEdit]);

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
      const response = await axios.put("/api/notes", {
        id: currentNoteToEdit?._id,
        title: noteTitle,
        noteContent,
        isFavorite,
        images,
      });
      // console.log(response);

      if (response.data.success) {
        toast.success("Note updated");
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
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload_preset_1");
    data.append("cloud_name", "dslottvms");
    toast.info("uploading image");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dslottvms/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedImageUrl = await res.json();

    if (!uploadedImageUrl) {
      toast.error("uploading error");
      return;
    }

    setImages([...images, uploadedImageUrl.url]);
    toast.success("Image uploaded successfully");
  };

  // ================================================
  const handleTextToSpeechPlay = () => {
    const text = noteContent;
    const value = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
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
                  toast.success("Removed from favorite");
                } else {
                  toast.success("Added to favorite");
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
                setEditNoteModalOpen(false);
                setNoteIsRecorded(false);
              }}
              className="p-3"
            >
              <MdClose />
            </button>
          </div>
        </div>
        {/* title -------------------------------------------- */}
        <div className="flex flex-col h-full mt-4 gap-4 overflow-y-scroll">
          <p className="text-xl font-bold">Title:</p>
          <input
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
            type="text"
            placeholder="Title"
            className="p-3 border bg-gray-100 rounded-2xl outline-none"
            required
          />
          {/* note ===================================================== */}
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Note:</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(noteContent!);
                toast.info("Note copied");
              }}
              className="bg-gray-200 p-2 rounded-full text-2xl"
            >
              <BiCopyAlt />
            </button>
          </div>
          {currentNoteToEdit?.noteIsRecorded && (
            <button
              onClick={handleTextToSpeechPlay}
              className="w-fit bg-gray-200 rounded-2xl px-4 py-1 flex items-center gap-2"
            >
              <FaPlay />
              Play
            </button>
          )}
          <textarea
            onChange={(e) => setNoteContent(e.target.value)}
            value={noteContent}
            name=""
            id=""
            placeholder="Add Note here"
            className="rounded-2xl p-3 border bg-gray-100 h-[150px] outline-none"
            required
          />
          {/* image upload ============================================== */}
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">Images:</p>
            <div className="flex gap-4 items-center flex-wrap overflow-y-auto">
              {/* show images ----------------------- */}
              {images.length > 0 && (
                <div className="flex gap-4">
                  {images.map((image) => (
                    <div className="h-[100px] bg-gray-200 w-[100px] rounded-2xl relative overflow-hidden border border-black/50">
                      <Image
                        src={image}
                        key={image}
                        alt=""
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              )}
              {/* upload button */}
              <label
                htmlFor="uploadImg"
                className="flex flex-col items-center justify-center h-[100px] w-[100px] bg-gray-100 rounded-2xl border border-black/40 cursor-pointer"
              >
                <FaPlus />
                Image
                <input
                  id="uploadImg"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end"> */}
        <button
          disabled={loading}
          onClick={() => handleSaveNote()}
          className="px-4 py-3 mt-4 rounded-full bg-purple-700 hover:bg-purple-900 font-bold text-white"
        >
          {loading ? <span>Updating...</span> : <span>Update note</span>}
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default EditNoteModal;
