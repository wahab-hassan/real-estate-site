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

  return (
<></>
  );
};

export default KakaoLoginButton;
