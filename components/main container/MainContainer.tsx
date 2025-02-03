import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import { BsSliders } from "react-icons/bs";
import Card from "./Card";
import CardsContainer from "./CardsContainer";
import AddNote from "./AddNote/AddNote";
import { useGlobalContext } from "@/context/AppContext";
import useFetchNotes from "@/hooks/useFetchNotes";
import { FaSpinner } from "react-icons/fa";

const MainContainer = () => {
  const {
    userObject: { user },
    allUserNotesObject: { allUserNotes, setAllUserNotes },
  } = useGlobalContext();

  const { getUserNotes, loading } = useFetchNotes();

  // console.log(user?._id);
  // fetch user notes ===============================
  // const getUserNotes = async () => {
  //   try {
  //     const response = await fetch(`/api/notes?userId=${user?._id}`);

  //     const data = await response.json();

  //     if (data.success) {
  //       setAllUserNotes(data.userNotes);
  //     } else {
  //       console.log("error fetcing data");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (user?._id) {
      getUserNotes();
    }
  }, [user]);

  console.log("user notes", allUserNotes);

  // ========================================
  return (
    <div className="w-full px-4 flex flex-col">
      <div className="flex gap-3">
        <SearchBar />
        {/* sort */}
        <button className="flex items-center rounded-full px-4 py-2 bg-slate-100 gap-2 text-lg font-medium">
          <BsSliders />
          <span>Sort</span>
        </button>
      </div>
      {/* cards ------------------------ */}
      {loading ? (
        <div className="w-full flex flex-1 justify-center items-center text-6xl">
          <div className="flex gap-4">
            <div className="animate-spin">
              <FaSpinner />
            </div>
            Fetching notes
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto flex flex-1">
          {allUserNotes.length === 0 ? (
            <div className="w-full flex flex-1 justify-center items-center text-6xl">
              No notes
            </div>
          ) : (
            <CardsContainer notes={allUserNotes} />
          )}
        </div>
        // <CardsContainer notes={allUserNotes} />
      )}
      {/* ======================================= */}
      <AddNote />
    </div>
  );
};

export default MainContainer;
