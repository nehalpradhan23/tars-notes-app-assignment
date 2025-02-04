"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContextType, noteType, userType } from "@/types/types";

const ContextProvider = createContext<GlobalContextType>({
  userObject: {
    user: null,
    setUser: () => {},
    isAuthUser: undefined,
    setIsAuthUser: () => {},
  },
  textRecordingObject: {
    text: "",
    setText: () => {},
    isListening: false,
    setIsListening: () => {},
  },
  noteIsRecorded: false,
  setNoteIsRecorded: () => {},
  newNoteModalObject: {
    newNoteModalOpen: false,
    setNewNoteModalOpen: () => {},
  },
  allUserNotesObject: {
    allUserNotes: [],
    setAllUserNotes: () => {},
  },
  deleteNoteModalObject: {
    deleteNoteModalOpen: false,
    setDeleteNoteModalOpen: () => {},
  },
  noteToDeleteObject: {
    noteToDelete: null,
    setNoteToDelete: () => {},
  },
  editNoteModalObject: {
    editNoteModalOpen: false,
    setEditNoteModalOpen: () => {},
  },
  currentNoteToEditObject: {
    currentNoteToEdit: null,
    setCurrentNoteToEdit: () => {},
  },
  searchNoteObject: {
    searchNoteText: "",
    setSearchNoteText: () => {},
  },
  sidebarMenuObject: {
    sidebarMenu: 0,
    setSidebarMenu: () => {},
  },
});

export default function GlobalCOntextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthUser, setIsAuthUser] = useState<boolean | undefined>(false);
  const [user, setUser] = useState<userType | null>(null);

  const [noteIsRecorded, setNoteIsRecorded] = useState(false);
  const [newNoteModalOpen, setNewNoteModalOpen] = useState(false);
  const [allUserNotes, setAllUserNotes] = useState<noteType[] | []>([]);
  const [searchNoteText, setSearchNoteText] = useState("");

  const [sidebarMenu, setSidebarMenu] = useState(0);

  // edit note -----------------------------
  const [editNoteModalOpen, setEditNoteModalOpen] = useState(false);
  const [currentNoteToEdit, setCurrentNoteToEdit] = useState<noteType | null>(
    null
  );

  // delete note ----------------------
  const [deleteNoteModalOpen, setDeleteNoteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<noteType | null>(null);

  // text recording states ---------------------------
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const router = useRouter();

  // authenticate ---------------------------
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   // const currentUser = localStorage.getItem("currentUser");

  //   if (token) {
  //     setIsAuthUser(true);
  //     // setUser(currentUser)
  //     router.push("/");
  //   } else {
  //     setIsAuthUser(false);
  //     router.push("/login");
  //   }
  // }, []);

  // =====================================================
  return (
    <ContextProvider.Provider
      value={{
        userObject: { user, setUser, isAuthUser, setIsAuthUser },
        textRecordingObject: { text, setText, isListening, setIsListening },
        noteIsRecorded,
        setNoteIsRecorded,
        newNoteModalObject: { newNoteModalOpen, setNewNoteModalOpen },
        allUserNotesObject: { allUserNotes, setAllUserNotes },
        deleteNoteModalObject: { deleteNoteModalOpen, setDeleteNoteModalOpen },
        noteToDeleteObject: { noteToDelete, setNoteToDelete },
        editNoteModalObject: { editNoteModalOpen, setEditNoteModalOpen },
        currentNoteToEditObject: { currentNoteToEdit, setCurrentNoteToEdit },
        searchNoteObject: { searchNoteText, setSearchNoteText },
        sidebarMenuObject: { sidebarMenu, setSidebarMenu },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useGlobalContext must be within a GlobalContextProvider");
  }
  return context;
};
