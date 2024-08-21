import Sidebar from "@/components/common/Account/Sidebar";
import Topbar from "@/components/common/Account/Topbar";
import React from "react";

const Page = () => {
  return (
    <>
       <div className="w-full h-screen flex items-center gap-x-4 md:gap-0 md:grid md:grid-cols-12 ">
        <div className=" relative w-full hidden h-full md:col-span-3 ms:w-full md:inline-block lg:col-span-2">
          <Sidebar />
        </div>
        <div className="w-full  md:col-span-9 lg:col-span-10 ">
          <Topbar />
          <div className="w-full">
            <div className="w-11/12 mx-auto mt-4">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
