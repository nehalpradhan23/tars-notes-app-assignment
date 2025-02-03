"use client";

import { useGlobalContext } from "@/context/AppContext";
import { useEffect, useState } from "react";

const useFetchNotes = () => {
  const {
    userObject: { user },
    allUserNotesObject: { setAllUserNotes },
  } = useGlobalContext();

  const [loading, setLoading] = useState(true);

  const getUserNotes = async () => {
    try {
      const response = await fetch(`/api/notes?userId=${user?._id}`);

      const data = await response.json();

      if (data.success) {
        setAllUserNotes(data.userNotes);
      } else {
        console.log("error fetcing data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getUserNotes();
    }
  }, [user]);

  return { loading, getUserNotes };
};

export default useFetchNotes;
