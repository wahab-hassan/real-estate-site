"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LiaMapMarkerAltSolid,
  LiaEnvelope,
  LiaPhoneSolid,
  LiaFacebookF,
  LiaYoutube,
  LiaLinkedin,
  LiaTwitter,
} from "react-icons/lia";
import { CgMenuGridO } from "react-icons/cg";
import { BsArrowRight, BsChevronRight, BsChevronDown } from "react-icons/bs";

import { GrClose } from "react-icons/gr";

const Navbar2 = () => {
  const [open, setOpen] = useState(false);
  const [header, setheader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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
  return (
    <>
      <nav className={`${
              header ? 'sticky top-0' : 'absolute top-0'
            } w-full bg-white z-50 transition-all ease-in-out duration-300`}>
        <div className={`${
              header ? "hidden" : "block"
            }  border-b border-border/40 transition-all ease-in-out duration-300`}>
          <div className="w-11/12 mx-auto flex flex-auto flex-shrink-0 flex-grow flex-wrap justify-center md:justify-between items-center py-3 gap-y-2">
            <div className="flex justify-center md:justify-start flex-auto flex-grow flex-wrap items-center gap-2">
              <a
                href="#"
                className="flex items-center flex-nowrap text-sm md:text-[16px] mr-5 transition-all ease-in-out"
              >
                <LiaPhoneSolid className="text-xl mr-2" />{" "}
                <span className="hover:text-third transition-all ease-in-out duration-300">
                  {" "}
                  +415-864-8728-99{" "}
                </span>
              </a>
              <a
                href="#"
                className="flex items-center flex-nowrap text-sm md:text-[16px] mr-5 transition-all ease-in-out"
              >
                <LiaEnvelope className="text-xl mr-2" />{" "}
                <span className="hover:text-third transition-all ease-in-out duration-300">
                  {" "}
                  support@abnb.com{" "}
                </span>
              </a>
            </div>
            <div className="flex items-center justify-center gap-x-2">
              <button className="btn-outline rounded-md w-7 h-7 flex items-center justify-center transition-all ease-in-out duration-300">
                <LiaFacebookF className="text-lg" />
              </button>
              <button className="btn-outline rounded-md w-7 h-7 flex items-center justify-center transition-all ease-in-out duration-300">
                <LiaLinkedin className="text-lg" />
              </button>
              <button className="btn-outline rounded-md w-7 h-7 flex items-center justify-center transition-all ease-in-out duration-300">
                <LiaTwitter className="text-lg" />
              </button>
              <button className="btn-outline rounded-md w-7 h-7 flex items-center justify-center transition-all ease-in-out duration-300">
                <LiaYoutube className="text-lg" />
              </button>
            </div>
          </div>
        </div>
        <div className="border-b border-border/40">
          <div className="w-full flex">
            <div className="w-11/12 mx-auto flex justify-between items-center gap-y-2 relative">
              <h1 className="ml-4">
                ABNB <span className="text-third text-5xl -ml-2">.</span>
              </h1>
              <div className="hidden lg:flex items-center gap-x-5 text-dark/40">
                <Link
                  href={"/"}
                  className="flex items-center gap-x-2 text-dark font-medium text/md hover:underline hover:text-third transition-all ease-in-out duration-300"
                >
                  Home <BsChevronDown />
                </Link>{" "}
                /
                <Link
                  href={"/"}
                  className="flex items-center gap-x-2 text-dark font-medium text/md hover:underline hover:text-third transition-all ease-in-out duration-300"
                >
                  Listing <BsChevronDown />
                </Link>{" "}
                /
                <Link
                  href={"/"}
                  className="flex items-center gap-x-2 text-dark font-medium text/md hover:underline hover:text-third transition-all ease-in-out duration-300"
                >
                  About Us <BsChevronDown />
                </Link>
              </div>
              <button className="relative flex items-center gap-x-4 w-36 group transition-all ease-in-out duration-300 mr-3 xl:mr-0">
                <span className="flex items-center w-12 h-12 border border-dark group-hover:w-36 group-hover:text-third group-hover:border-third transition-all ease-in-out duration-300">
                  <BsArrowRight className="ml-4" />
                </span>
                <span className="absolute text-nowrap font-medium left-16 group-hover:left-10 group-hover:text-third transition-all ease-in-out duration-300">
                  Add Listing
                </span>
              </button>
            </div>
            <button
              className="w-20 h-20 bg-dark flex items-center justify-center hover:bg-third transition-all ease-in-out duration-300"
              onClick={() => setOpen(!open)}
            >
              <CgMenuGridO className="text-[40px] text-white " />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`${
          open ? "opacity-100 z-20" : "opacity-0 -z-20"
        } fixed top-0 right-0 h-screen w-screen bg-dark/40`}
        onClick={() => setOpen(!open)}
      ></div>
      <aside
        className={`${
          open ? "mr-0" : "-mr-96"
        } fixed top-0 right-0 bg-white w-96 z-50 overflow-hidden shadow-md  h-screen  transition-all ease-in-out duration-300`}
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
            <div className="mt-8 mb-12 hidden lg:block">
              <h3>About Us</h3>
              <p className="text-[16px] font-medium text-dark/80 mt-3">
                The Property of real estate where you can embark on a journey to
                discover your perfect lifestyle home and floors and countertops
                space.
              </p>
            </div>
            <div className="block lg:hidden mt-8 mb-12">
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
                <button className="btn btn-outline">Login</button>
                <button className="btn btn-outline">Sign Up</button>
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

export default Navbar2;
