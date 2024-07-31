import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import {
  LiaMapMarkerAltSolid,
  LiaEnvelope,
  LiaPhoneSolid,
  LiaFacebookF,
  LiaYoutube,
  LiaLinkedin,
  LiaTwitter,
  LiaHomeSolid,
} from "react-icons/lia";
const Footer2 = () => {
  return (
    <>
      <footer className="w-full bg-dark text-white">
        <div className="w-10/12 mx-auto py-10">
          <div className="flex items-center justify-between flex-auto flex-grow flex-shrink-0 flex-wrap border-b border-border/80 py-5 pb-10">
            <h1 className="text-3xl lg:text-4xl mb-6 md:mb-0 w-full md:w-[400px] transition-all ease-in-out duration-300">
              Start your journey with our{" "}
              <span className="text-third">
                ABNB <span className="-ml-2">.</span>
              </span>{" "}
              property
            </h1>
            <button className="btn btn-main text-dark flex items-center gap-x-3 py-4">
              <BsArrowRight className="icon" /> Get In Touch
            </button>
          </div>
          <div className="flex justify-between flex-auto flex-grow flex-shrink-0 flex-wrap my-7 gap-x-6 gap-y-10">
            <div className="text-left px-4">
              <h2>
                ABNB <span className="text-third text-5xl -ml-2">.</span>
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-center mb-3 text-sm  hover:text-third transition-all ease-in-out">
                  <span className="border-[1px] border-third/20 p-2 rounded-full mr-3">
                    <LiaMapMarkerAltSolid className="text-xl text-third" />
                  </span>{" "}
                  1426 Center StreetBend, 97702, California, USA
                </li>
                <li className="flex items-center mb-3 text-sm text-nowrap hover:text-third transition-all ease-in-out">
                  <span className="border-[1px] border-third/20 p-2 rounded-full mr-3">
                    <LiaPhoneSolid className="text-xl text-third" />
                  </span>{" "}
                  +415-864-8728-99
                </li>
                <li className="flex items-center mb-3 text-sm text-nowrap hover:text-third transition-all ease-in-out">
                  <span className="border-[1px] border-third/20 p-2 rounded-full mr-3">
                    <LiaEnvelope className="text-xl text-third" />
                  </span>{" "}
                  support@abnb.com
                </li>
                <li className="flex items-center gap-x-3 mb-3 py-3 text-sm text-nowrap transition-all ease-in-out">
                  <button className="btn-outline rounded-md w-9 h-9 flex items-center justify-center transition-all ease-in-out duration-300">
                    <LiaFacebookF className="text-2xl" />
                  </button>
                  <button className="btn-outline rounded-md w-9 h-9 flex items-center justify-center transition-all ease-in-out duration-300">
                    <LiaLinkedin className="text-2xl" />
                  </button>
                  <button className="btn-outline rounded-md w-9 h-9 flex items-center justify-center transition-all ease-in-out duration-300">
                    <LiaTwitter className="text-2xl" />
                  </button>
                  <button className="btn-outline rounded-md w-9 h-9 flex items-center justify-center transition-all ease-in-out duration-300">
                    <LiaYoutube className="text-2xl" />
                  </button>
                </li>
              </ul>
            </div>
            <div className="text-left px-4">
              <h3 className="mt-4">Company</h3>
              <ul className="mt-5 space-y-6 text-sm">
                <li>
                  <Link
                    href={"/"}
                    className="flex items-center mb-3 text-sm group hover:text-third transition-all ease-in-out"
                  >
                    <span className="mr-3 group-hover:mr-4 transition-all ease-in-out">
                      <BsArrowRight className="text-lg text-third" />
                    </span>{" "}
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/listing"}
                    className="flex items-center mb-3 text-sm group hover:text-third transition-all ease-in-out"
                  >
                    <span className="mr-3 group-hover:mr-4 transition-all ease-in-out">
                      <BsArrowRight className="text-lg text-third" />
                    </span>{" "}
                    Listing
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/"}
                    className="flex items-center mb-3 text-sm group hover:text-third transition-all ease-in-out"
                  >
                    <span className="mr-3 group-hover:mr-4 transition-all ease-in-out">
                      <BsArrowRight className="text-lg text-third" />
                    </span>{" "}
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-left px-4">
              <h3>Subscribe for Update</h3>
              <div className="mx-auto mt-8 max-w-md sm:ms-0">
                <p className="text-left leading-relaxed  ltr:sm:text-left rtl:sm:text-right">
                  Don't miss out! Subscribe now for early access and discounts.
                </p>

                <form className="mt-4">
                  <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                    <label className="sr-only">Email</label>

                    <input
                      className="w-full rounded-md border-border/30 px-6 py-3 shadow-md"
                      type="email"
                      placeholder="Enter your email"
                    />

                    <button className="btn btn-outline" type="submit">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t w-full border-border/70 copy-image relative before:absolute before:w-full before:h-full before:bg-black/70 before:z-20">
          <div className="w-10/12 mx-auto flex flex-col md:flex-row gap-3 items-center justify-between py-2 md:py-4">
            <h2 className="z-30">
              ABNB <span className="text-third text-5xl -ml-2">.</span>
            </h2>{" "}
            <p className="z-30 md:text-[16px] font-medium">
              &copy; 2024 design by <span className="text-third">ABNB</span>.
              All Right Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer2;
