"use client";
import { useEffect } from "react";
import { BiExit } from "react-icons/bi";
import { BsChat, BsChevronRight } from "react-icons/bs";

const KakaoLoginButton = () => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("f171b4cd5cc94c5c30907bbe6ab41b48");
    }
  }, []);

  const userObj = JSON.parse(localStorage.getItem("userData")!);

  //   const handleKakaoLogin = () => {
  //     window.Kakao.Auth.login({
  //       success: (authObj: any) => {
  //         console.log("Kakao login successful", authObj);
  //         localStorage.setItem("userObj", JSON.stringify(authObj));
  //         // Handle the login logic, such as sending authObj to your backend
  //       },
  //       fail: (err: any) => {
  //         console.error("Kakao login failed", err);
  //       },
  //     });
  //   };


  return (
<></>
  );
};

export default KakaoLoginButton;
