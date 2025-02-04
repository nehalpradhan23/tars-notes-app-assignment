"use client";
import { useGlobalContext } from "@/context/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const {
    userObject: { user, setUser },
    sidebarMenuObject: { sidebarMenu, setSidebarMenu },
  } = useGlobalContext();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setUser(JSON.parse(user!));
  }, []);

  const handleShowLogout = () => {
    setShowLogout(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    router.push("/login");
  };
  // console.log("=============", user);

  // ==========================
  return (
    <div className="flex flex-col p-4 rounded-3xl border w-[350px]">
      <div className="flex items-center gap-2 text-xl font-bold">
        <Image src="/sidebar.png" alt="" width={40} height={40} />
        <span>AI Notes</span>
      </div>
      {/* ---------------------------------- */}
      <div className="*:flex *:items-center *:gap-2 *:text-xl flex-1 mt-5 flex flex-col gap-3 *:rounded-3xl *:p-2 *:font-semibold">
        <div
          onClick={() => setSidebarMenu(0)}
          className={`${
            sidebarMenu === 0 ? "bg-purple-200 text-purple-800" : ""
          } cursor-pointer`}
        >
          <RiHome2Fill />
          <span>Home</span>
        </div>
        <div
          onClick={() => setSidebarMenu(1)}
          className={`${
            sidebarMenu === 1 ? "bg-purple-200 text-purple-800" : ""
          } cursor-pointer`}
        >
          <FaStar />
          <span>Favourites</span>
        </div>
      </div>
      {/* logout ---------------------- */}
      {showLogout && (
        <div className="border flex flex-col bg-gray-200 items-center py-3 gap-4 rounded-2xl mb-4">
          <span className="text-lg font-bold">Confirm logout?</span>
          <div className="flex gap-6 *:px-3 *:py-1 *:border *:border-black *:rounded-2xl">
            <button onClick={handleLogout}>Log out</button>
            <button onClick={() => setShowLogout(false)}>Cancel</button>
          </div>
        </div>
      )}
      <button
        onClick={handleShowLogout}
        className="flex items-center justify-center gap-2"
      >
        <span className="px-2 py-0.5 bg-black rounded-full text-white">
          {user?.name[0].toUpperCase()}
        </span>
        {user?.name}
      </button>
    </div>
  );
};

export default Sidebar;
