import Listing from "@/components/common/Account/Properties/Listing";
import Sidebar from "@/components/common/Account/Sidebar";
import Topbar from "@/components/common/Account/Topbar";
import React from "react";

const Page = () => {

  return (
    <>
      <div className="w-full h-screen flex items-center">
        <div className="hidden h-screen lg:w-2/12 lg:block lg:col-span-3">
          <Sidebar />
        </div>
        <div className="w-full h-screen lg:w-10/12 lg:col-span-9 bg-[#f4f4f4]">
          <Topbar />
          <div className="overflow-auto h-5/6">
            <Listing/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
