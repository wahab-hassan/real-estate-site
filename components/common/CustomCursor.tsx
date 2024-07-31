"use client";
import { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector(".cursor");
      if (cursor instanceof HTMLElement) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor fixed w-10 h-10 border-[1px] border-third z-[1000] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform ease-in duration-300 delay-500 flex justify-center items-center">
      <span className="bg-third rounded-full p-1 "></span>
    </div>
  );
};

export default CustomCursor;
