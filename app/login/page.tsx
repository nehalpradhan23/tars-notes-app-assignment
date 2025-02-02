"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>(undefined);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // console.log("is URL: ==============", isUrl);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      <div className="flex flex-col w-[400px] border border-black h-fit p-5 rounded-3xl shadow-xl bg-slate-200">
        <h2 className="font-bold text-3xl mx-auto">Login</h2>
        <form className="flex flex-1 flex-col gap-4 *:flex *:gap-3 *:justify-between p-3 h-fit">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="enail"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-full"
            />
          </div>
          <button className="bg-blue-600 w-full p-2 rounded-full text-white hover:bg-blue-700 mt-4">
            <span className="mx-auto">
              {loading ? "Logging in..." : "Login"}
            </span>
          </button>
        </form>
        <span
          className="underline cursor-pointer mt-4 text-center"
          onClick={() => router.push("/register")}
        >
          Go to Register
        </span>
        {errorMessage && (
          <span className="text-red-500">{JSON.stringify(errorMessage)}</span>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
