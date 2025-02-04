"use client";
import NewNoteModal from "@/components/modals/NewNoteModal";
import MainContainer from "@/components/main container/MainContainer";
import Sidebar from "@/components/Sidebar";
import { useGlobalContext } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";
import DeleteNoteConfirmModal from "@/components/modals/DeleteNoteConfirmModal";
import EditNoteModal from "@/components/modals/EditNoteModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {
    newNoteModalObject: { newNoteModalOpen },
    textRecordingObject: { isListening },
    deleteNoteModalObject: { deleteNoteModalOpen },
    editNoteModalObject: { editNoteModalOpen },
    userObject: { setIsAuthUser },
  } = useGlobalContext();

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  // console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // const currentUser = localStorage.getItem("currentUser");

    if (token) {
      setIsAuthUser(true);
      // setUser(currentUser)
      // router.push("/");
      setLoading(false);
    } else {
      setIsAuthUser(false);
      router.push("/login");
    }
  }, []);

  if (loading) return;

  // =================================
  return (
    <div className="flex relative">
      <ToastContainer position="top-center" />
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
      {deleteNoteModalOpen && <DeleteNoteConfirmModal />}
      {editNoteModalOpen && <EditNoteModal />}
    </div>
  );
}
