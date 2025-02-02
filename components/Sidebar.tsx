"use client";
import { useGlobalContext } from "@/context/AppContext";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";

const Sidebar = () => {
  const {
    userObject: { user, setUser },
  } = useGlobalContext();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setUser(JSON.parse(user!));
  }, []);

  console.log("=============", user);

  // ==========================
  return (
    <div className="flex flex-col p-4 rounded-3xl border w-[350px]">
      <div className="flex items-center gap-2 text-xl font-bold">
        <Image src="/sidebar.png" alt="" width={40} height={40} />
        <span>AI Notes</span>
      </div>
      {/* ---------------------------------- */}
      <div className="*:flex *:items-center *:gap-2 *:text-xl flex-1 mt-5 flex flex-col gap-3 *:rounded-3xl *:p-2 *:font-semibold">
        <div className=" bg-purple-200 text-purple-800">
          <RiHome2Fill />
          <span>Home</span>
        </div>
        <div className="">
          <FaStar />
          <span>Favourites</span>
        </div>
      </div>
      {/* ---------------------- */}
      <div className="">{user?.name}</div>
    </div>
  );
};

export default Sidebar;
