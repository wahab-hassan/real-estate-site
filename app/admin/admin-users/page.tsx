'use client'
import AdminUserListing from "@/components/common/Admin/AdminUserListing";
import Sidebar from "@/components/common/Admin/Sidebar";
import Topbar from "@/components/common/Admin/Topbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [openSide, setopenSide] = useState(false);
  const [adminUser, setadminUser] = useState()
  useEffect(() => {
   setadminUser(JSON.parse(localStorage.getItem("adminData")!));
  }, [])
  const handleOpen = () => {
    setopenSide(!openSide);
  };
  return  adminUser === null ? (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="block text-center leading-10">
          <h1>Acccess Denied</h1>
          <p>Please Login First</p>
          <Link href={"/admin/auth/login"} className="btn btn-secondary">
            Go to Login
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="relative w-full h-screen flex items-center gap-x-4 md:gap-0 md:grid md:grid-cols-12 ">
        <div
          className={` ${
            openSide ? "block absolute w-96 " : "hidden w-full "
          } left-0 top-0  h-full md:col-span-3 md:w-auto z-50 md:inline-block lg:col-span-2`}
        >
          <Sidebar openSidebar={handleOpen} />
        </div>
        <div className="w-full h-full  md:col-span-9 lg:col-span-10 ">
          <Topbar openSidebar={handleOpen} />
          <div className="w-full mt-20">
            <div className="w-11/12 mx-auto mt-24 flex justify-between items-center">
              <div className="block">
                <h2>Admin Users</h2>
                <p>people having access to admin panel</p>
              </div>
              
            </div>
            <AdminUserListing />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
