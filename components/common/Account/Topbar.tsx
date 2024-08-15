"use client";
import { handleKakaoLogout, signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";

const Topbar = ({ openSidebar }: any) => {
  const router = useRouter();
  const [user, setUser]: any = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")!));
    console.log(user);
  }, []);

  const logout = async () => {
    handleKakaoLogout();
    router.push("/");
  };
  return (
    <div className="w-full fixed top-0 left-0 z-10 bg-white border-b-[1px] border-border/40">
      <div className="w-11/12 mx-auto flex justify-between items-center py-4">
        <button onClick={openSidebar} className="btn btn-outline p-2">
          <BiMenu className="icon" />
        </button>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-4 border-r border-border/30 pr-3 mr-3">
            <h5 className="font-semibold">Welcome, {user?.name}</h5>
          
          </div>
          <button onClick={logout} className="btn btn-outline">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
