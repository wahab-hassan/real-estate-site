"use client";
import { adminSignIn, signIn } from "@/lib/auth";
import { Link } from "@/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setError("");
    try {
      const result = await adminSignIn(email, password);
      // Handle successful signup (e.g., redirect or show a success message)
      if (result.success) {
        // User exists, store their data in localStorage
        toast.success("Login successful", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        router.push("/admin/properties");
      } else {
        toast.error("Login failed.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Login failed.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 w-11/12 md:w-5/12 lg:max-w-lg p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="w-full px-4 py-4">
            <form>
              <div className="mb-12">
                <h2 className=" font-extrabold text-center">Admin Login </h2>
              </div>

              <div>
                <label className="text-sm">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    required
                    className="w-full text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-sm mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="btn btn-secondary w-full"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Page;
