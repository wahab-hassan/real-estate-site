import Footer2 from "@/components/common/Footer2";
import Navbar2 from "@/components/common/Navbar2";
import Link from "next/link";
import React from "react";
import { BsFillHouseFill, BsChevronRight } from "react-icons/bs";
import PropertyList from "@/components/common/Listing/PropertyList";
import { ToastContainer } from "react-toastify";
const Page = () => {
  return (
    <>
      <Navbar2 />
      <main className="w-full pt-20">
        <div className="flex justify-center items-center flex-col w-full h-96 banner-image text-white relative before:absolute before:w-full before:h-full before:bg-black/70 before:z-10">
          <h1 className="text-center text-4xl md:text-5xl font-bold z-20">
            Properties
          </h1>
          <div className="flex items-center justify-center text-[16px] z-20 my-4">
            <Link href={"/"} className="flex items-center gap-x-2 mr-4">
              <BsFillHouseFill /> Home
            </Link>
            <BsChevronRight className="text-sm" />
            <Link href={"/listing"} className="ml-4 flex items-center gap-x-2">
              Properties
            </Link>
          </div>
        </div>
      </main>

      <PropertyList />
      <ToastContainer/>
      <Footer2 />
    </>
  );
};

export default Page;
