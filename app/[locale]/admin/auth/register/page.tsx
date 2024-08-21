"use client";
import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Select } from "@headlessui/react";
import { Link } from "@/navigation";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { signUp } from "@/lib/auth";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter(); // Initialize useRouter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp(email, password, role, name, phone);
      // Handle successful signup (e.g., redirect or show a success message)

      toast.success("Registration successful", {
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
      router.push("/auth/login");
    } catch (error) {
      toast.error("Sign up failed.", {
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

  useEffect(() => {
    if (password !== confirmPassword && password.length > 0) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(null);
    }
  }, [password, confirmPassword]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div className="md:max-w-md w-full px-4 py-4">
          <form>
            <div className="mb-12">
              <h2 className=" font-extrabold">Register</h2>
              <p className="text-sm mt-4">
                Have an account{" "}
                <Link
                  href="/auth/login"
                  className="text-third font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Login
                </Link>
              </p>
            </div>

            <div className="mt-4">
              <label className="text-sm">Account Type</label>
              <div className="relative flex items-center">
                <Select
                  className={
                    "w-full text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none bg-white"
                  }
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option className="p-4" selected>
                    Choose Account Type
                  </option>{" "}
                  <option className="p-4" value="seller">
                    Seller
                  </option>
                  <option className="p-4" value="buyer">
                    Buyer
                  </option>
                  <option className="p-4" value="owner">
                    Owner
                  </option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm">Name</label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  required
                  className="w-full text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm">Phone Number</label>
              <div className="relative flex items-center">
                <PhoneInputWithCountrySelect
                  className="w-full text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e: any) => setPhone(e)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm mb-2">Confirm Password</label>
              <div className="relative flex items-center">
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <div className="mt-12">
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={handleSignUp}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        <div className="md:h-full bg-primary rounded-xl lg:p-12 p-8">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="w-full h-full object-contain"
            alt="login-image"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
