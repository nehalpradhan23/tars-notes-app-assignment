"use client";
import { useGlobalContext } from "@/context/AppContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    userObject: { user, setUser, setIsAuthUser },
  } = useGlobalContext();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // ==================================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    e.preventDefault();
    if (email.length === 0) {
      setErrorMessage("Enter email");
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("invalid email");
      setLoading(false);
      return;
    }
    if (password.length === 0) {
      setErrorMessage("Password error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      // const data = response
      // console.log("resp ----------", response.data);

      if (response.data.success === true) {
        setIsAuthUser(true);
        setUser(response.data.finalData.user);
        localStorage.setItem("token", response.data.finalData.token);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(response.data.finalData.user)
        );
        router.push("/");
      } else {
        setErrorMessage(response.data.message);
        setIsAuthUser(false);
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };
  // ====================================================
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      <div className="flex flex-col w-[400px] border border-black h-fit p-5 rounded-3xl shadow-xl bg-slate-200">
        <h2 className="font-bold text-3xl mx-auto">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 *:flex *:gap-3 *:justify-between p-3 h-fit"
        >
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
