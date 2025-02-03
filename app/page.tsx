"use client";
import NewNoteModal from "@/components/main container/AddNote/NewNoteModal";
import MainContainer from "@/components/main container/MainContainer";
import Sidebar from "@/components/Sidebar";
import { useGlobalContext } from "@/context/AppContext";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const {
    newNoteModalObject: { newNoteModalOpen },
    textRecordingObject: { isListening },
    userObject: { user },
  } = useGlobalContext();
  // console.log(user);

  // =================================
  return (
    <div className="flex relative">
      <ToastContainer />
      {isListening && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-10 py-5 rounded-2xl text-4xl shadow-2xl shadow-black text-white bg-purple-600">
          Voice recording. Start speaking. Press stop to finish.
        </div>
      )}
      <div className="flex w-full h-screen p-4">
        <Sidebar />
        <MainContainer />
      </div>
      {newNoteModalOpen && <NewNoteModal />}
    </div>
  );
}
