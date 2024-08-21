'use client'
import FavoriteListing from "@/components/common/Account/Favorite/FavoriteListing";
import Sidebar from "@/components/common/Account/Sidebar";
import Topbar from "@/components/common/Account/Topbar";
import React, { useState } from "react";

const Page = () => {
  const [openSide, setopenSide] = useState(false);
  const handleOpen = () => {
    setopenSide(!openSide);
  };
  return (
    <>
      <div className="relative w-full h-screen flex items-center gap-x-4 md:gap-0 md:grid md:grid-cols-12 ">
        <div className={` ${openSide? 'block absolute w-96 ' : 'hidden w-full '} left-0 top-0  h-full md:col-span-3 md:w-auto z-50 md:inline-block lg:col-span-2`}>
          <Sidebar openSidebar={handleOpen} />
        </div>
        <div className="w-full  md:col-span-9 lg:col-span-10 ">
          <Topbar openSidebar={handleOpen} />
          <div className="w-full mt-20">
            <div className="w-11/12 mx-auto mt-5">
              <h2>Favorites</h2>
              <p>List of your favorite properties</p>
            </div>
            <FavoriteListing />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
