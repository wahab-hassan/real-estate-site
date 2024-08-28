"use client";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { BsChat, BsChevronRight, BsPerson } from "react-icons/bs";
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
import { Link } from "@/navigation";
import { useRouter } from "next/navigation";
import { handleKakaoLogout, signIn, signOut } from "@/lib/auth";
import KakaoLogin from "react-kakao-login";
import KakaoLoginButton from "./KakaoLoginButton";
import { BiExit } from "react-icons/bi";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const n = useTranslations("Navbar");

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [header, setheader] = useState(false);
  const [dropDown, setdropDown] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>();
  const [user, setUser]: any = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")!));
    setisLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")!));
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
        } w-full bg-primary/50 z-50 transition-all ease-in-out duration-300 px-4 py-2 flex justify-between items-center`}
      >
        <h2 className="text-white leading-none">
          {n("logo")} <span className="text-third text-5xl -ml-2">.</span>
        </h2>
        <div className="lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="bg-dark p-2 rounded-md hover:opacity-60 text-white transition-all duration-300 lg:hidden"
          >
            <HiOutlineMenuAlt3 className="text-white text-2xl" />
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link
              href={"/"}
              className="text-white text-sm font-medium hover:underline hover:text-third transition-all ease-in-out duration-100"
            >
              {n("nav1")}
            </Link>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <Link
              href={"/listing"}
              className="text-white text-sm font-medium hover:underline hover:text-third transition-all ease-in-out duration-100"
            >
              {n("nav2")}
            </Link>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <Link
              href={"/contact"}
              className="text-white text-sm font-medium hover:underline hover:text-third transition-all ease-in-out duration-100"
            >
              {n("nav3")}
            </Link>
          </li>
        </ul>
        <div className="hidden lg:flex lg:items-center lg:gap-x-4 lg:mr-4 ">
          <div className="relative inline-block text-left">
            {!isLoggedIn ? (
              <KakaoLogin
                className="bg-main text-white px-4 py-2 rounded-md hover:opacity-60 transition-all ease-in-out duration-300"
                token={"f171b4cd5cc94c5c30907bbe6ab41b48"}
                onSuccess={(obj: any) => {
                  if (obj) {
                    signIn(
                      String(obj?.profile?.id),
                      obj?.profile?.kakao_account?.profile?.nickname
                    ).then((value: any) => {
                      console.log(value);
                      setisLoggedIn(true);
                      window.location.reload();
                    });
                  }
                }}
                onFail={console.error}
                onLogout={console.info}
              >
                <div className="flex items-center justify-center text-center p-0 font-medium">
                  {" "}
                  <BsChat className="text-lg mr-2" />
                  {n("loginBtn")}
                </div>
              </KakaoLogin>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-secondary py-2  px-3 flex items-center"
                  onClick={() => setdropDown(!dropDown)}
                >
                  <LiaUserSolid className="inline text-xl mr-1" />{" "}
                  {n("accountBtn")}
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
                    <Link
                      href={`/account/${user?.id}/properties`}
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 border-b border-border/30 hover:bg-light transition-all ease-in-out duration-300"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      <span className="flex items-center">
                        {" "}
                        <BsPerson className="mr-2" /> {n("accountDDbtn")}{" "}
                      </span>{" "}
                      <BsChevronRight />
                    </Link>

                    <KakaoLoginButton />
                    <button
                      onClick={() => {
                        handleKakaoLogout();
                        setisLoggedIn(false);
                        localStorage.setItem("isLoggedIn", "false");
                      }}
                      type="button"
                      className="flex items-center w-full justify-between px-4 py-2 text-sm text-gray-700 border-b border-border/30 hover:bg-light transition-all ease-in-out duration-300"
                    >
                      <span className="flex items-center">
                        {" "}
                        <BiExit className="text-lg mr-2" /> {n("signoutBtn")}{" "}
                      </span>{" "}
                      <BsChevronRight className="" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            className="btn btn-main  py-2  px-3  flex items-center"
            onClick={() => {
              isLoggedIn
                ? router.push("/add-listing")
                : alert("Please Login to add listing");
            }}
          >
            <LiaHomeSolid className="inline text-xl mr-1" />{" "}
            {n("addListingBtn")}
          </button>
          <LanguageSwitcher />
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
                {n("logo")} <span className="text-third text-5xl -ml-2">.</span>
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
                {n("nav1")}
                <BsChevronRight />
              </Link>
              <Link
                href={"/listing"}
                className="cursor-pointer text-md px-2 py-3  border-b-[1px] border-border/30 hover:bg-dark/5 hover:font-medium flex justify-between"
              >
                {n("nav2")} <BsChevronRight />
              </Link>
              <Link
                href={"/contact"}
                className="cursor-pointer text-md px-2 py-3  border-b-[1px] border-border/30 hover:bg-dark/5 hover:font-medium flex justify-between"
              >
                {n("nav3")}
                <BsChevronRight />
              </Link>
            </div>

            <div className="my-8 border-b-[1px] border-border/80">
              <h3>{n("accountBtn")}</h3>
              <div className="flex items-center gap-x-3 my-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      href={user && `/account/${user?.id}/properties`}
                      className="btn btn-outline"
                    >
                      {n("accountDDbtn")}
                    </Link>
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        handleKakaoLogout();
                        setisLoggedIn(false);
                        localStorage.setItem("isLoggedIn", "false");
                      }}
                    >
                      {n("signoutBtn")}
                    </button>
                  </>
                ) : (
                  <>
                    <KakaoLogin
                      token={"f171b4cd5cc94c5c30907bbe6ab41b48"}
                      onSuccess={(obj: any) => {
                        signIn(
                          String(obj?.profile?.id),
                          obj?.profile?.kakao_account?.profile?.nickname
                        );
                        router.push("/listing");
                        setisLoggedIn(true);
                      }}
                      onFail={console.error}
                      onLogout={console.info}
                    >
                      <div className="flex items-center justify-center text-center w-full font-medium">
                        {" "}
                        <BsChat className="text-lg mr-2" /> {n("loginBtn")}
                      </div>
                    </KakaoLogin>
                  </>
                )}
              </div>
            </div>
            <div className="mt-8 border-b-[1px] border-border/80">
              <h3>{n("followLink")}</h3>
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
