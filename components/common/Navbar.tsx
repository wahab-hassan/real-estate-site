"use client";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { BsChevronRight } from "react-icons/bs";
import {
  LiaMapMarkerAltSolid,
  LiaEnvelope,
  LiaPhoneSolid,
  LiaFacebookF,
  LiaYoutube,
  LiaLinkedin,
  LiaTwitter,
  LiaHomeSolid,
  LiaUserSolid,
} from "react-icons/lia";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [header, setheader] = useState(false);
  const [dropDown, setdropDown] = useState(false);
  const [user, setUser]: any = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")!));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setheader(true);
      } else {
        setheader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const logout = async () => {
    await signOut();
    router.push("/auth/login");
  };

  return (
    <>
      <nav
        className={`${
          header ? "bg-primary/90 sticky top-0 left-0 " : "absolute top-0"
        } w-full bg-primary/50 z-50 transition-all ease-in-out duration-300`}
      >
        <div className="w-11/12 mx-auto flex justify-between items-center py-4 lg:border-b-[1px] lg:border-white/30">
          <h1 className="text-white">
            ABNB <span className="text-third text-5xl -ml-2">.</span>
          </h1>

          <div className="hidden lg:flex items-center text-white">
            <p className="text-md w-40 font-medium text-start mr-3">
              12/A, New Hilton Tower, NYC, USA
            </p>
            <p className="text-md w-40 text-start mr-3">
              Mon to Sat: 8:00 - 16:00 <br /> Sunday Closed
            </p>
            <p className="text-md w-40 text-start">
              +(123) 456 789 00 <br />
              info@abnb.com
            </p>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="bg-dark p-3 rounded-md hover:opacity-60 text-white transition-all duration-300 lg:hidden"
          >
            <HiOutlineMenuAlt3 className="text-white text-3xl" />
          </button>
        </div>
        <div className="hidden w-11/12 mx-auto lg:flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link
              href={"/"}
              className="text-white px-5 py-2 font-medium hover:underline hover:text-third transition-all ease-in-out duration-100"
            >
              Home
            </Link>
            <Link
              href={"/listing"}
              className="text-white px-5 py-2 font-medium hover:underline hover:text-third transition-all ease-in-out duration-100"
            >
              Listing
            </Link>
            <Link
              href={"/"}
              className="text-white px-5 py-2 font-medium hover:underline hover:text-third transition-all ease-in-out duration-100"
            >
              About us
            </Link>
          </div>
          <div className="flex items-center gap-x-4 mr-4">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="btn btn-secondary py-3 flex items-center"
                onClick={() => setdropDown(!dropDown)}
              >
                <LiaUserSolid className="inline text-xl mr-1" /> Account
              </button>
              <div
                className={`${
                  dropDown
                    ? "transform opacity-100 scale-100"
                    : "transform opacity-0 scale-95"
                } transition ease-out duration-100 absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  {user !== (null || undefined) ? (
                    <>
                      <Link
                        href={`/account/${user?.id}`}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 border-b border-border/30 hover:bg-light transition-all ease-in-out duration-300"
                        role="menuitem"
                        id="menu-item-0"
                      >
                        Account <BsChevronRight />
                      </Link>
                      <button
                        className="flex items-center w-full justify-between px-4 py-2 text-sm text-gray-700 border-b border-border/30 hover:bg-light transition-all ease-in-out duration-300"
                        role="menuitem"
                        id="menu-item-0"
                        onClick={() => logout()}
                      >
                        Sign Out <BsChevronRight />
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/register"
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 border-b border-border/30 hover:bg-light transition-all ease-in-out duration-300"
                        role="menuitem"
                        id="menu-item-0"
                      >
                        Register <BsChevronRight />
                      </Link>
                      <Link
                        href="/auth/login"
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 border-b border-border/30 hover:bg-light transition-all ease-in-out duration-300"
                        role="menuitem"
                        id="menu-item-0"
                      >
                        Login <BsChevronRight />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              className="btn btn-main py-3 flex items-center"
              onClick={() => {
                localStorage.getItem("sb-bttvroyktkjlseeiblwt-auth-token")
                  ? router.push("/add-listing")
                  : router.push("/auth/login");
              }}
            >
              <LiaHomeSolid className="inline text-xl mr-1" /> Add Listing
            </button>
          </div>
        </div>
      </nav>
      {/* mobile menu */}
      <div
        className={`${
          open ? "opacity-100 z-20" : "opacity-0 -z-20"
        } absolute top-0 right-0 h-screen w-screen bg-dark/40 transition-all ease-in-out duration-300 lg:hidden`}
        onClick={() => setOpen(!open)}
      ></div>
      <aside
        className={`${
          open ? "mr-0" : "-mr-96"
        } fixed top-0 right-0 bg-white w-96 z-50 overflow-hidden shadow-md  h-screen  transition-all ease-in-out duration-300 lg:hidden`}
      >
        <div className="overflow-auto h-full">
          <div className="w-10/12 mx-auto py-4 ">
            <div className="flex justify-between items-center pb-4 border-b-[1px] border-border/80">
              <h1>
                ABNB <span className="text-third text-5xl -ml-2">.</span>
              </h1>
              <button
                onClick={() => setOpen(!open)}
                className="bg-transparent border-0 rounded-full hover:rotate-90 transition-all duration-300"
              >
                <GrClose className="icon" />
              </button>
            </div>
            <div className="mt-8 mb-12">
              <Link
                href={"/"}
                className="cursor-pointer text-md px-2 py-3  border-b-[1px] border-border/30 hover:bg-dark/5 hover:font-medium flex justify-between"
              >
                Home <BsChevronRight />
              </Link>
              <Link
                href={"/listing"}
                className="cursor-pointer text-md px-2 py-3  border-b-[1px] border-border/30 hover:bg-dark/5 hover:font-medium flex justify-between"
              >
                Listing <BsChevronRight />
              </Link>
              <Link
                href={"/"}
                className="cursor-pointer text-md px-2 py-3  border-b-[1px] border-border/30 hover:bg-dark/5 hover:font-medium flex justify-between"
              >
                About <BsChevronRight />
              </Link>
            </div>

            <div className="my-8 border-b-[1px] border-border/80">
              <h3>Contact Info</h3>
              <ul className="my-7">
                <li className="flex items-center text-md mb-6">
                  <span className="border-[1px] border-border/20 p-2 rounded-full mr-4">
                    <LiaMapMarkerAltSolid className="icon" />
                  </span>{" "}
                  1426 Center StreetBend, 97702, California, USA
                </li>
                <li className="flex items-center text-md mb-6">
                  <span className="border-[1px] border-border/20 p-2 rounded-full mr-4">
                    <LiaPhoneSolid className="icon" />
                  </span>{" "}
                  +415-864-8728-99
                </li>
                <li className="flex items-center text-md mb-6">
                  <span className="border-[1px] border-border/20 p-2 rounded-full mr-4">
                    <LiaEnvelope className="icon" />
                  </span>{" "}
                  support@abnb.com
                </li>
              </ul>
            </div>
            <div className="my-8 border-b-[1px] border-border/80">
              <h3>Account</h3>
              <div className="flex items-center gap-x-3 my-4">
                {user ? (
                  <>
                    <Link
                      href={`/account/${user?.id}`}
                      className="btn btn-outline"
                    >
                      Account
                    </Link>
                    <button
                      className="btn btn-outline"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={"/auth/login"} className="btn btn-outline">
                      Login
                    </Link>
                    <Link href={"/auth/register"} className="btn btn-outline">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="mt-8 border-b-[1px] border-border/80">
              <h3>Subscribe & Follow</h3>
              <div className="flex items-center gap-x-3 my-4">
                <button className="btn-outline rounded-md w-10 h-10 flex items-center justify-center transition-all ease-in-out duration-300">
                  <LiaFacebookF className="text-2xl" />
                </button>
                <button className="btn-outline rounded-md w-10 h-10 flex items-center justify-center transition-all ease-in-out duration-300">
                  <LiaLinkedin className="text-2xl" />
                </button>
                <button className="btn-outline rounded-md w-10 h-10 flex items-center justify-center transition-all ease-in-out duration-300">
                  <LiaTwitter className="text-2xl" />
                </button>
                <button className="btn-outline rounded-md w-10 h-10 flex items-center justify-center transition-all ease-in-out duration-300">
                  <LiaYoutube className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
