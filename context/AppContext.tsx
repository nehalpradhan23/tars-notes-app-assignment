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

  // text recording states ---------------------------
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const router = useRouter();

  // authenticate ---------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

    if (token) {
      setIsAuthUser(true);
      // setUser(currentUser)
      router.push("/");
    } else {
      setIsAuthUser(false);
      router.push("/login");
    }
  }, []);

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
