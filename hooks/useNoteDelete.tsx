import { useGlobalContext } from "@/context/AppContext";
import { noteType } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetchNotes from "./useFetchNotes";

const useNoteDelete = () => {
  const [loading, setLoading] = useState(false);

  const {
    noteToDeleteObject: { noteToDelete },
    deleteNoteModalObject: { setDeleteNoteModalOpen },
  } = useGlobalContext();

  const { getUserNotes } = useFetchNotes();

  const deleteNote = async () => {
    setLoading(true);
    try {
      const response = await axios.delete("/api/notes", {
        data: { noteId: noteToDelete?._id },
      });

      if (response.data.success) {
        setDeleteNoteModalOpen(false);
        getUserNotes();
        toast.success("Note deleted successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error deleting note", error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteNote, loading };
};

export default useNoteDelete;
