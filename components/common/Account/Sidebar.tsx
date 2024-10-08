"use client";
import { signOut } from "@/lib/auth";
import { Link } from "@/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { HiHeart, HiOutlineHome, HiUsers } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdClose } from "react-icons/md";

const Sidebar = ({ openSidebar }: any) => {
  const router = useRouter();
  const [user, setUser]: any = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")!));
  }, []);

  return (
    <>
      <aside
        className={`bg-white w-full  overflow-hidden border-r z-50 border-border/40 h-screen  transition-all ease-in-out duration-300`}
      >
        <div className="overflow-auto h-full">
          <div className="w-10/12 mx-auto py-4 ">
            <div className="flex items-center justify-between pb-4 border-b-[1px] border-border/80">
              <h1>
                ABNB <span className="text-third text-5xl -ml-2">.</span>
              </h1>
              <button
                className=" btn btn-outline rounded-full p-3 block md:hidden"
                onClick={openSidebar}
              >
                <MdClose />
              </button>
            </div>
            <div className="block mt-8 mb-12">
              <Link
                href={`/listing`}
                className="cursor-pointer text-md px-2 py-3  border-b-[1px] border-border/30 hover:bg-dark/5 hover:font-medium flex justify-between"
              >
                <span className="flex items-center gap-x-2">
                  <HiOutlineHome />
                  Listing
                </span>
                <BsChevronRight />
              </Link>
              <Link
                href={`/account/${user?.id}/properties`}
                className="cursor-pointer text-md px-2 py-3  border-b-[1px] border-border/30 hover:bg-dark/5 hover:font-medium flex justify-between"
              >
                <span className="flex items-center gap-x-2">
                  <HiOutlineBuildingOffice2 />
                  Properties
                </span>
                <BsChevronRight />
              </Link>
              <Link
                href={`/account/${user?.id}/favorite`}
                className="cursor-pointer text-md px-2 py-3  border-b-[1px] border-border/30 hover:bg-dark/5 hover:font-medium flex justify-between"
              >
                <span className="flex items-center gap-x-2">
                  <HiHeart />
                  Favorite
                </span>
                <BsChevronRight />
              </Link>
              <Link
                href={`/account/${user?.id}/profile`}
                className="cursor-pointer text-md px-2 py-3  border-b-[1px] border-border/30 hover:bg-dark/5 hover:font-medium flex justify-between"
              >
                <span className="flex items-center gap-x-2">
                  <HiUsers />
                  Profile
                </span>
                <BsChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
