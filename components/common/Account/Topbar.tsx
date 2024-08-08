'use client'
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Topbar = () => {
  const router = useRouter();
  const [user, setUser]: any = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")!));
    console.log(user);
    
  }, []);

  const logout = async () => {
    await signOut();
    router.push("/auth/login");
  };
  return (
    <div className="w-full bg-white border-b-[1px] border-border/40">
      <div className="w-11/12 mx-auto flex justify-end items-center py-4">
        <div className="flex items-center gap-x-4 border-r border-border/30 pr-3 mr-3">
          <h5 className="font-semibold">{user?.email}</h5>
          <span className="bg-third/20 px-2 py-1 rounded-lg">{user?.role}</span>
        </div> 
        <button onClick={logout} className="btn btn-outline">Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
