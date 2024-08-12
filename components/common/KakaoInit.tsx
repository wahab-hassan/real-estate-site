"use client";
import Script from "next/script";
import React from "react";

const KakaoInit = () => {
  return (
    <>
      <script
        src=""
        
        ></script>
      <Script
       
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        // integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        strategy="beforeInteractive"
        onLoad={() => {
          // Initialize Kakao SDK
          window.Kakao.init("f171b4cd5cc94c5c30907bbe6ab41b48");
          console.log("Kakao SDK initialized");
        }}
      />
    </>
  );
};

export default KakaoInit;
