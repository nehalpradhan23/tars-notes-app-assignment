export interface GlobalContextType {
  userObject: {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
    isAuthUser: boolean | undefined;
    setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  };
}

export interface userType {
  email: string;
  name: string;
  _id: string;
}
