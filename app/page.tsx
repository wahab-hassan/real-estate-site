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
        <main className="h-screen w-screen bg-image before:absolute before:w-full before:bg-primary/60 before:h-screen before:z-10">
          <div className="flex flex-col items-center justify-center  h-full z-30">
            <h1 className="mb-7 text-white text-5xl leading-[60px] font-semibold text-center z-30 md:text-[60px] md:leading-[70px] lg:text-[5rem] lg:leading-[80px] transition-all ease-in-out duration-300">
              Your perfect getaway <br />{" "}
              <span className="font-outline-2 text-transparent">awaits.</span>
            </h1>
            <Tabs defaultValue="buy" className="w-96 md:w-11/12 mx-auto z-30 ">
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
            </Tabs>
          </div>
        </main>
        <div className=" bg-white w-full py-10 ">
          <div className="flex flex-col max-w-lg md:max-w-2xl mx-auto lg:flex-row-reverse lg:justify-between lg:max-w-none lg:w-9/12 lg:gap-x-12 lg:my-20">
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
                  <BiSolidHomeSmile /> About Us
                </h4>
                <h1 className="mb-3">We Provide Right Choice of Properties</h1>
                <p className="mb-10 text-md">
                  We believe in more than just buying and selling properties. we
                  believe in turning dreams into reality. Explore our curated
                  selection of homes tailored to your unique lifestyle.
                </p>
                <ul className="my-3">
                  <li className="flex items-center mb-3 font-medium">
                    <span className="rounded-full bg-third relative w-8 h-8 flex justify-end items-center mr-7">
                      <BsArrowRight className="-mr-3 text-2xl font-bold text-clip" />
                    </span>{" "}
                    Buy your Dream Property
                  </li>
                  <li className="flex items-center mb-3 font-medium">
                    <span className="rounded-full bg-third relative w-8 h-8 flex justify-end items-center mr-7">
                      <BsArrowRight className="-mr-3 text-2xl font-bold text-clip" />
                    </span>{" "}
                    Sell your Property
                  </li>
                  <li className="flex items-center mb-3 font-medium">
                    <span className="rounded-full bg-third relative w-8 h-8 flex justify-end items-center mr-7">
                      <BsArrowRight className="-mr-3 text-2xl font-bold text-clip" />
                    </span>{" "}
                    Book your stay with us
                  </li>
                </ul>
                <div className="block my-8">
                  <button className="relative flex items-center gap-x-4 group transition-all ease-in-out duration-300">
                    <span className="flex items-center w-10 h-10 border border-dark group-hover:w-36   group-hover:text-third group-hover:border-third transition-all ease-in-out duration-300">
                      <BsArrowRight className="ml-3" />
                    </span>
                    <span className="absolute text-nowrap font-medium left-14 group-hover:left-10 group-hover:text-third transition-all ease-in-out duration-300">
                      Know more
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full py-10">
          <div className="w-10/12 mx-auto">
            <div className="flex justify-between items-center w-full">
              <div className="w-full mx-auto">
                <h4 className="text-md text-third flex gap-2 items-center mb-2">
                  {" "}
                  <BiSolidHomeSmile /> Listing
                </h4>
                <h1 className="mb-3">Featured Properties</h1>
              </div>
              <div className="flex items-center gap-x-3">
                <button className="btn btn-outline w-24 py-3 text-md bg-third text-white">
                  Buy
                </button>
                <button className="btn btn-outline w-24 py-3 text-md">
                  Sell
                </button>
                <button className="btn btn-outline w-24 py-3 text-md">
                  Rent
                </button>
              </div>
            </div>
            <div className="w-full">
              <FeaturedListing />
            </div>
            <div className="flex justify-center items-center w-full mt-10">
              <Link className="btn btn-main flex items-center gap-x-3 py-3" href={'/listing'}>
                View All Listing <BsChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
