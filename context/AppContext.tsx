"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContextType, userType } from "@/types/types";

const ContextProvider = createContext<GlobalContextType>({
  userObject: {
    user: null,
    setUser: () => {},
    isAuthUser: undefined,
    setIsAuthUser: () => {},
  },
});

export default function GlobalCOntextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthUser, setIsAuthUser] = useState<boolean | undefined>(false);
  const [user, setUser] = useState<userType | null>(null);

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
      value={{ userObject: { user, setUser, isAuthUser, setIsAuthUser } }}
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
