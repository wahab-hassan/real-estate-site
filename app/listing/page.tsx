import Link from "next/link";
import React from "react";
import { BsFillHouseFill, BsChevronRight } from "react-icons/bs";
import PropertyList from "@/components/common/Listing/PropertyList";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
const Page = () => {
  return (
    <>
      <Navbar />
      <main className="w-full pt-20">
        <div className="flex justify-center items-center flex-col w-full h-96">
          <h1 className="text-center text-4xl md:text-5xl font-bold z-20">
            속성
          </h1>
          <div className="flex items-center justify-center text-[16px] z-20 my-4">
            <Link href={"/"} className="flex items-center gap-x-2 mr-4">
              <BsFillHouseFill /> 집
            </Link>
            <BsChevronRight className="text-sm" />
            <Link href={"/listing"} className="ml-4 flex items-center gap-x-2">
              속성
            </Link>
          </div>
        </div>
      </main>

      <PropertyList />
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Page;
