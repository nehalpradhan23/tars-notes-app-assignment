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
}

export interface userType {
  email: string;
  name: string;
  _id: string;
}

export interface noteType {
  userId: string;
  title: string;
  noteContent: string;
  isFavorite: boolean;
  noteIsRecorded: boolean;
  creationDate: string;
}
