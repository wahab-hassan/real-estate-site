import SearchBar from "@/components/common/Homepage/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsArrowRight, BsChevronRight } from "react-icons/bs";
import { BiSolidHomeSmile } from "react-icons/bi";

import FeaturedListing from "@/components/common/Homepage/FeaturedListing";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="">
        <main className="pt-48 pb-24 w-screen  ">
          <div className="flex flex-col items-center justify-center  h-full z-30">
            <h1 className="mb-7 text-5xl leading-[60px] font-semibold text-center z-30 md:text-[60px] md:leading-[70px] lg:text-[5rem] lg:leading-[80px] transition-all ease-in-out duration-300">
              완벽한 휴가 기다리고 <br /> 있습니다.
            </h1>
            {/* <Tabs defaultValue="buy" className="w-96 md:w-11/12 mx-auto z-30 ">
              <TabsList className="min-w-md bg-transparent w-full flex-wrap gap-y-3 md:flex-nowrap mb-16 md:mb-4">
                <TabsTrigger
                  value="buy"
                  className="border-[1px] inline-block border-border text-sm px-5 py-2 mx-2 bg-white/10 backdrop-blur-sm active:bg-third text-white hover:bg-white hover:text-dark "
                >
                  Buy
                </TabsTrigger>
                <TabsTrigger
                  value="sell"
                  className="border-[1px] inline-block border-border text-sm px-5 py-2 mx-2 bg-white/10 backdrop-blur-sm active:bg-third text-white hover:bg-white hover:text-dark "
                >
                  Sell
                </TabsTrigger>
                <TabsTrigger
                  value="rent"
                  className="border-[1px] inline-block border-border text-sm px-5 py-2 mx-2 bg-white/10 backdrop-blur-sm active:bg-third text-white hover:bg-white hover:text-dark "
                >
                  Rent
                </TabsTrigger>
                <TabsTrigger
                  value="management"
                  className="border-[1px] inline-block border-border text-sm px-5 py-2 mx-2 bg-white/10 backdrop-blur-sm active:bg-third text-white hover:bg-white hover:text-dark "
                >
                  Management
                </TabsTrigger>
              </TabsList>
              <TabsContent value="buy">
                <SearchBar />
              </TabsContent>
              <TabsContent value="sell">
                <SearchBar />
              </TabsContent>
            </Tabs> */}
          </div>
        </main>
        <div className="w-10/12 mx-auto">
          <div className="bg-white w-full py-10">
            <div className="w-10/12 mx-auto">
              <div className="flex justify-between items-center w-full">
                <div className="w-full mx-auto">
                  <h4 className="text-md text-third flex gap-2 items-center mb-2">
                    {" "}
                    <BiSolidHomeSmile /> 상장
                  </h4>
                  <h1 className="mb-3">추천 목록</h1>
                </div>
                {/* <div className="flex items-center gap-x-3">
                  <button className="btn btn-outline w-24 py-3 text-md">
                    Sell
                  </button>
                  <button className="btn btn-outline w-24 py-3 text-md">
                    Rent
                  </button>
                </div> */}
              </div>
              <div className="w-full">
                <FeaturedListing />
              </div>
              <div className="flex justify-center items-center w-full mt-10">
                <Link
                  className="btn btn-main flex items-center gap-x-3 py-3"
                  href={"/listing"}
                >
                  View All Listing <BsChevronRight />
                </Link>
              </div>
            </div>
          </div>
          <div className=" bg-white w-full py-10 ">
            <div className="flex flex-col mx-auto lg:flex-row-reverse lg:justify-between  lg:w-10/12 lg:gap-x-12 lg:my-20">
              <div className="flex items-center w-11/12 mx-auto lg:max-w-2xl ">
                <img
                  src="/about.jpg"
                  alt=""
                  className="w-full mx-auto my-auto shadow-lg shadow-dark/40"
                />
              </div>

              <div className="block w-11/12 mx-auto mt-10 gap-y-10">
                <div className="w-full xl:w-11/12 mx-auto xl:mx-0">
                  <h4 className="text-md text-third flex gap-2 items-center mb-2">
                    {" "}
                    <BiSolidHomeSmile />
                    회사 소개
                  </h4>
                  <h1 className="mb-3">해외 AIRBNB 매물 제공 서비스입니다</h1>
                  <p className="mb-10 text-md">
                    국내 에어비앤비, 외국인도시민박업, 그리고 단기임대
                    비즈니스에 대한 규제가 세지면서 해외적으로 보게 되었습니다.
                    일본, 베트남, 미국, 발리, 여러가지 국가에서 에어비앤비
                    가능한 매물 제공해드립니다.
                  </p>
                  <ul className="my-3">
                    <li className="flex items-center mb-3 font-medium">
                      <span className="rounded-full bg-third relative w-8 h-8 flex justify-end items-center mr-7">
                        <BsArrowRight className="-mr-3 text-2xl font-bold text-clip" />
                      </span>{" "}
                      허락 받은 매물
                    </li>
                    <li className="flex items-center mb-3 font-medium">
                      <span className="rounded-full bg-third relative w-8 h-8 flex justify-end items-center mr-7">
                        <BsArrowRight className="-mr-3 text-2xl font-bold text-clip" />
                      </span>{" "}
                      월세 / 연세
                    </li>
                    <li className="flex items-center mb-3 font-medium">
                      <span className="rounded-full bg-third relative w-8 h-8 flex justify-end items-center mr-7">
                        <BsArrowRight className="-mr-3 text-2xl font-bold text-clip" />
                      </span>{" "}
                      공인중개사 직접 연락!
                    </li>
                  </ul>
                  <div className="block my-8">
                    <button className="relative flex items-center gap-x-4 group transition-all ease-in-out duration-300">
                      <span className="flex items-center w-10 h-10 border border-dark group-hover:w-36   group-hover:text-third group-hover:border-third transition-all ease-in-out duration-300">
                        <BsArrowRight className="ml-3" />
                      </span>
                      <span className="absolute text-nowrap font-medium left-14 group-hover:left-10 group-hover:text-third transition-all ease-in-out duration-300">
                        구경하기
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
              <Footer />
      
    </>
  );
}
