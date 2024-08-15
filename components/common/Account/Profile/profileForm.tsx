"use client";
import { signUp } from "@/lib/auth";
import { Select } from "@headlessui/react";
import Link from "next/link";
import router from "next/router";
import React, { use, useEffect, useState } from "react";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";import "react-phone-number-input/style.css";
import { useParams } from "next/navigation";
import { readRecords, updateRecord } from "@/lib/crud";
import Loader from "../../Loader";

const ProfileForm = () => {
  const param = useParams();
  const [email, setEmail]: any = useState();
  const [loading, setLoading]: any = useState();
  const [name, setName]: any = useState();
  const [phone, setPhone]: any = useState();
  const [role, setRole]: any = useState();
  const [error, setError] = useState<string | null>(null);
  const handleUpdate = async () => {
    // setLoading(true);
    try {
      console.log({
        name: name,
        email: email,
        phone: phone,
        role: role,
      });

      updateRecord("users", param.id, {
        name: name,
        email: email,
        phone: phone,
        role: role,
      }).then((updatedData) => {
        console.log(updatedData);
        // Handle successful signup (e.g., redirect or show a success message)
        console.log(updatedData);
        setLoading(false);
        toast.success("Profile Updated successfully", {
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
      });
    } catch (error) {
      setLoading(false);

      toast.error("Failed to update profile.", {
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
    setLoading(true);

    const fetchUser = async () => {
      try {
        console.log(param);

        const userData: any = await readRecords(
          "users",
          { id: param.id },
          1,
          1
        );
        console.log(userData);

        setEmail(userData[0]?.email);
        setName(userData[0]?.name);
        setPhone(userData[0]?.phone);
        setRole(userData[0]?.role);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return loading ? (
    <>
      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          <Loader />
        </div>
      </div>
    </>
  ) : (
    <>
      <form>
        <div className="mt-4">
          <label className="text-sm">Name</label>
          <div className="relative flex items-center">
            <input
              name="name"
              type="text"
              defaultValue={name}
              required
              className="w-full md:w-96 text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none"
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
              defaultValue={email}
              required
              className="w-full md:w-96 text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm">Phone Number</label>
          <div className="relative flex items-center">
            <PhoneInputWithCountrySelect
              className="w-full md:w-96 text-sm border border-border/40 focus:border-third rounded-sm px-2 py-2 outline-none"
              placeholder="Phone Number"
              value={phone}
              onChange={(e: any) => setPhone(e)}
            />
          </div>
        </div>

        <div className="mt-12">
          <button
            type="button"
            className="btn btn-secondary w-full md:w-96"
            onClick={handleUpdate}
          >
            Save Profile
          </button>
        </div>
      </form>
      <ToastContainer/>
    </>
  );
};

export default ProfileForm;
