"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const ContextProvider = createContext({});

export default function GlobalCOntextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthUser, setIsAuthUser] = useState(false);

  const router = useRouter();
  // authenticate ---------------------------
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      // const userData: any = JSON.parse(localStorage.getItem("user")!) || {};
      // setUser(userData);
    } else {
      setIsAuthUser(false);
      router.push("/login");
    }
  }, [Cookies]);

  // =====================================================
  return (
    <ContextProvider.Provider value={{}}>{children}</ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useGlobalContext must be within a GlobalContextProvider");
  }
  return context;
};
