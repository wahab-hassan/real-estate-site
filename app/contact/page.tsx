import ContactForm from "@/components/common/Contact/ContactForm";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";

const Page = () => {



  return (
    <div className="h-screen">
      <Navbar />

      <div className="w-screen h-full mx-auto flex items-center justify-center">
        <section className="bg-white dark:bg-gray-900 w-full">
          <div className="py-8 lg:py-16 px-4 mx-auto w-10/12 md:w-9/12 lg:w-7/12 xl:w-5/12">
            <h1 className="mb-4 tracking-tight font-extrabold text-center  dark:text-white">
              문의하기
            </h1>
            <p className="mb-8 lg:mb-16 font-light text-center  dark:text-gray-400 ">
              무엇을 해야할지 모르시나요? 도움이 필요하면 알려주세요.
            </p>
           <ContactForm/>
          </div>
        </section>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
