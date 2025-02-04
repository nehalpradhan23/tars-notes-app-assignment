import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { BsSliders } from "react-icons/bs";
import Card from "./Card";
import CardsContainer from "./CardsContainer";
import AddNote from "./AddNote/AddNote";
import { useGlobalContext } from "@/context/AppContext";
import useFetchNotes from "@/hooks/useFetchNotes";
import { FaSpinner } from "react-icons/fa";
import { noteType } from "@/types/types";
import { toast } from "react-toastify";

const MainContainer = () => {
  const {
    userObject: { user },
    allUserNotesObject: { allUserNotes },
    searchNoteObject: { searchNoteText },
    sidebarMenuObject: { sidebarMenu },
  } = useGlobalContext();

  const { getUserNotes, loading } = useFetchNotes();
  const [sortOldestToNewest, setSortOldestToNewest] = useState(false);
  const [sortedNotes, setSortedNotes] = useState<noteType[] | []>([]);
  const [filteredNotes, setFilteredNotes] = useState<noteType[] | []>([]);
  const [favoriteNotes, setFavoriteNotes] = useState<noteType[] | []>([]);

  // sort notes ==================================================================================================
  useEffect(() => {
    // show newest to oldest
    if (sortOldestToNewest) {
      const sortedRecentFirst = [...allUserNotes].sort(
        (a, b) => Number(b.creationDate) - Number(a.creationDate)
      );
      setSortedNotes(sortedRecentFirst);
    } else {
      const sortedOldestFirst = [...allUserNotes].sort(
        (a, b) => Number(a.creationDate) - Number(b.creationDate)
      );
      setSortedNotes(sortedOldestFirst);
    }
  }, [sortOldestToNewest]);

  // fetch all notes ========================================================================================
  useEffect(() => {
    if (user?._id) {
      getUserNotes();
    }
  }, [user]);

  //  ======================================================================================
  useEffect(() => {
    // show newest to oldest
    if (sortOldestToNewest) {
      const sortedRecentFirst = [...allUserNotes].sort(
        (a, b) => Number(b.creationDate) - Number(a.creationDate)
      );
      setSortedNotes(sortedRecentFirst);
    } else {
      const sortedOldestFirst = [...allUserNotes].sort(
        (a, b) => Number(a.creationDate) - Number(b.creationDate)
      );
      setSortedNotes(sortedOldestFirst);
    }
    const filterFavoriteNotes = allUserNotes.filter(
      (note) => note.isFavorite === true
    );
    setFavoriteNotes(filterFavoriteNotes);
  }, [allUserNotes]);

  // console.log("fav: ====", favoriteNotes);

  // search note =================================================================================================
  useEffect(() => {
    if (searchNoteText.length === 0) {
      setFilteredNotes(sortedNotes);
    }
    if (searchNoteText.length > 0) {
      const searchedNotes = sortedNotes.filter((note) =>
        note.title.toLowerCase().includes(searchNoteText)
      );
      setFilteredNotes(searchedNotes);
    }
  }, [searchNoteText]);

  // console.log("user notes", allUserNotes);

  const handleSorting = () => {
    setSortOldestToNewest(!sortOldestToNewest);
    if (sortOldestToNewest) {
      toast.info("Showing Old to New");
    } else {
      toast.info("Showing New to Old");
    }
  };
  // ================================================================================================
  return (
    <div className="w-full px-4 flex flex-col">
      <div className="flex gap-3">
        <SearchBar />
        {/* sort */}
        <button
          onClick={handleSorting}
          className="flex items-center rounded-full px-4 py-2 bg-slate-100 gap-2 text-lg font-medium"
        >
          <BsSliders />
          <span>Sort</span>
        </button>
      </div>
      {/* cards ------------------------ */}
      {loading ? (
        <div className="w-full flex flex-1 justify-center items-center text-3xl lg:text-6xl">
          <div className="flex gap-4 items-center">
            <div className="animate-spin">
              <FaSpinner />
            </div>
            Fetching notes
          </div>
        </div>
      ) : (
        // show all notes or favorite notes ----------------------
        <>
          {sidebarMenu === 0 ? (
            <div className="overflow-y-auto flex flex-1">
              {allUserNotes.length === 0 ? (
                <div className="w-full flex flex-1 justify-center items-center text-3xl lg:text-6xl">
                  No notes
                </div>
              ) : (
                <CardsContainer
                  notes={
                    searchNoteText.length === 0 ? sortedNotes : filteredNotes
                  }
                />
              )}
            </div>
          ) : (
            <div className="flex flex-1 overflow-y-auto">
              {favoriteNotes.length === 0 ? (
                <div className="w-full flex flex-1 justify-center items-center text-3xl lg:text-6xl">
                  No favorites
                </div>
              ) : (
                <CardsContainer notes={favoriteNotes} />
              )}
            </div>
          )}
        </>
        // <CardsContainer notes={allUserNotes} />
      )}
      {/* ======================================= */}
      <AddNote />
    </div>
  );
};

export default MainContainer;
