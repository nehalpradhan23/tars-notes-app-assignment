"use client";

import { useGlobalContext } from "@/context/AppContext";
import useNoteDelete from "@/hooks/useNoteDelete";

const DeleteNoteConfirmModal = () => {
  const {
    deleteNoteModalObject: { deleteNoteModalOpen, setDeleteNoteModalOpen },
  } = useGlobalContext();

  const { deleteNote, loading } = useNoteDelete();

  const handleConfirmDelete = async () => {
    deleteNote();
  };
  // ---------------------------------
  return (
    <div className="absolute z-10 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="w-[500px] h-[200px] bg-white rounded-2xl flex flex-col p-5">
        <div className="flex flex-1">
          <span className="text-3xl font-bold">Delete note?</span>
        </div>
        <div className="flex justify-end gap-5 *:px-4 *:py-2 *:border *:rounded-2xl">
          <button
            disabled={loading}
            onClick={() => handleConfirmDelete()}
            className="bg-red-500 text-white"
          >
            {loading ? "Deleting..." : "Confirm"}
          </button>
          <button
            onClick={() => setDeleteNoteModalOpen(false)}
            className="bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteConfirmModal;
