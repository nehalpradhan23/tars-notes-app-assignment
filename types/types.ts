export interface GlobalContextType {
  userObject: {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
    isAuthUser: boolean | undefined;
    setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  };
  textRecordingObject: {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    isListening: boolean;
    setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  };
  noteIsRecorded: boolean;
  setNoteIsRecorded: React.Dispatch<React.SetStateAction<boolean>>;
  newNoteModalObject: {
    newNoteModalOpen: boolean;
    setNewNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allUserNotesObject: {
    allUserNotes: noteType[];
    setAllUserNotes: React.Dispatch<React.SetStateAction<noteType[] | []>>;
  };
  deleteNoteModalObject: {
    deleteNoteModalOpen: boolean;
    setDeleteNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  noteToDeleteObject: {
    noteToDelete: noteType | null;
    setNoteToDelete: React.Dispatch<React.SetStateAction<noteType | null>>;
  };
  editNoteModalObject: {
    editNoteModalOpen: boolean;
    setEditNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  currentNoteToEditObject: {
    currentNoteToEdit: noteType | null;
    setCurrentNoteToEdit: React.Dispatch<React.SetStateAction<noteType | null>>;
  };
  searchNoteObject: {
    searchNoteText: string;
    setSearchNoteText: React.Dispatch<React.SetStateAction<string>>;
  };
  sidebarMenuObject: {
    sidebarMenu: number;
    setSidebarMenu: React.Dispatch<React.SetStateAction<number>>;
  };
}

export interface userType {
  email: string;
  name: string;
  _id: string;
}

export interface noteType {
  _id: string;
  userId: string;
  title: string;
  noteContent: string;
  isFavorite: boolean;
  noteIsRecorded: boolean;
  creationDate: string;
  images: string[];
}
