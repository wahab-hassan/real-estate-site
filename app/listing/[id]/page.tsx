"use client";
import Footer2 from "@/components/common/Footer2";
import Navbar2 from "@/components/common/Navbar2";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BsCalendar } from "react-icons/bs";
import {
  LiaCalendarAlt,
  LiaDollarSignSolid,
  LiaExpandSolid,
  LiaFile,
  LiaFileAlt,
  LiaHomeSolid,
  LiaMapMarkerAltSolid,
  LiaRulerSolid,
} from "react-icons/lia";
import { BiBed, BiCabinet, BiHeart, BiShower, BiSwim } from "react-icons/bi";
import { TbStairs } from "react-icons/tb";
import MapSection from "@/components/common/Listing-Detail/MapSection";
import ContactForm from "@/components/common/Listing-Detail/ContactForm";
import { selectSpecificRecord } from "@/lib/crud";
import Loader from "@/components/common/Loader";

const Page = ({ params }: { params: { id: string } }) => {
  const [property, setproperty]: any = useState();
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setisLoading(true);
    fetchSpecificRecord().then((data: any) => {
      setproperty(data);
      setisLoading(false);
    });
  }, [params.id]);

  const fetchSpecificRecord = async () => {
    try {
      const table = "properties";
      const conditions = {
        id: params.id,
      };

      return await selectSpecificRecord(table, conditions);
    } catch (error: any) {
      console.error("Error fetching specific record:", error.message);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return isLoading ? (
    <div className="w-screen h-screen">
      <Loader />
    </div>
  ) : (
    <>
      <Navbar2 />
      <main className="w-full pt-48 lg:pt-40">
        <div className="w-10/12 lg:w-11/12 mx-auto h-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              <CarouselItem className="block md:basis-1/2 lg:basis-1/3">
                <img src="/about.jpg" alt="" className="w-full" />
              </CarouselItem>
              <CarouselItem className="block md:basis-1/2 lg:basis-1/3">
                <img src="/about.jpg" alt="" className="w-full" />
              </CarouselItem>
              <CarouselItem className="block md:basis-1/2 lg:basis-1/3">
                <img src="/about.jpg" alt="" className="w-full" />
              </CarouselItem>
              <CarouselItem className="block md:basis-1/2 lg:basis-1/3">
                <img src="/about.jpg" alt="" className="w-full" />
              </CarouselItem>
              <CarouselItem className="block md:basis-1/2 lg:basis-1/3">
                <img src="/about.jpg" alt="" className="w-full" />
              </CarouselItem>
              <CarouselItem className="block md:basis-1/2 lg:basis-1/3">
                <img src="/about.jpg" alt="" className="w-full" />
              </CarouselItem>
              <CarouselItem className="block md:basis-1/2 lg:basis-1/3">
                <img src="/about.jpg" alt="" className="w-full" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-white h-14 shadow-xl text-xl w-14 ml-10" />
            <CarouselNext className="bg-white h-14 shadow-xl text-xl w-14 mr-10">
              Next
            </CarouselNext>
          </Carousel>
        </div>
      </main>
      <section className="w-full my-10">
        <div className="w-11/12 mx-auto grid grid-cols-1  lg:w-11/12 xl:w-9/12 lg:grid-cols-6 gap-4">
          <div className="col-span-1 lg:col-span-4">
            <div className="block mt-10 mb-8 leading-loose border-b border-border/50 pb-5">
              <div className="flex items-center justify-between lg:hidden">
                <p className="flex items-center font-medium text-lg">
                  <LiaDollarSignSolid className="text-third mr-1 icon" />#
                  {property?.rent_usd_monthly}
                </p>
                <h5 className="opacity-60">#{property?.id}</h5>
              </div>
              <h1 className="my-4">{property?.name}</h1>
              <div className="flex items-center gap-x-3">
                <span className="bg-third px-4 py-1 text-sm text-white rounded-sm md:text-[16px]">
                  Featured
                </span>
                <span className="bg-third px-4 py-1 text-sm text-white rounded-sm md:text-[16px]">
                  For Rent
                </span>
                <span className="flex items-center text-sm md:text-[16px]">
                  <BsCalendar className="text-third mr-2 text-lg" />{" "}
                  {formatDate(property?.last)}
                </span>
              </div>
            </div>
            <div className="block mb-8 leading-loose border-b border-border/50 pb-5">
              <h3>Summary</h3>
              <div className="flex items-center flex-wrap gap-3 my-3">
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaHomeSolid className="icon mr-2" /> Villa
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaMapMarkerAltSolid className="icon mr-2" /> Location
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaFileAlt className="icon mr-2" /> Leashold
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center justify-between">
                  {" "}
                  <span className="flex items-center border-r-2 w-1/2">
                    <BiBed className="icon mr-2" /> 3
                  </span>
                  <span className="flex items-center">
                    <BiShower className="icon mr-2" /> 4
                  </span>
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaRulerSolid className="icon mr-2" />
                  <span className=" flex flex-col">
                    {" "}
                    150 Sqm{" "}
                    <span className="opacity-60 text-[12px] -mt-2">
                      Land Size
                    </span>{" "}
                  </span>
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaExpandSolid className="icon mr-2" />
                  <span className=" flex flex-col">
                    {" "}
                    150 Sqm{" "}
                    <span className="opacity-60 text-[12px] -mt-2">
                      Building Size
                    </span>{" "}
                  </span>
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaCalendarAlt className="icon mr-2" />
                  <span className=" flex flex-col">
                    {" "}
                    29 Years
                    <span className="opacity-60 text-[12px] -mt-2">
                      Leash Period
                    </span>{" "}
                  </span>
                </span>
              </div>
            </div>
            <div className="block mb-8 leading-loose border-b border-border/50 pb-5">
              <h3 className="mb-5">Description</h3>
              <p>{property?.notes}</p>

              <div className="flex items-center flex-wrap gap-3 my-3">
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <BiCabinet className="icon mr-2" /> Furnished
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <BiSwim className="icon mr-2" />
                  <span className=" flex flex-col">
                    {" "}
                    Private
                    <span className="opacity-60 text-[12px] -mt-2">
                      Pool
                    </span>{" "}
                  </span>
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaFile className="icon mr-2" />
                  <span className=" flex flex-col">
                    {" "}
                    Residential
                    <span className="opacity-60 text-[12px] -mt-2">
                      Zoning
                    </span>{" "}
                  </span>
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <TbStairs className="icon mr-2" />
                  <span className=" flex flex-col">
                    2
                    <span className="opacity-60 text-[12px] -mt-2">Levels</span>{" "}
                  </span>
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <span className=" flex flex-col">
                    $1,145
                    <span className="opacity-60 text-[12px] -mt-2">
                      Price Per Sqm
                    </span>{" "}
                  </span>
                </span>
              </div>
            </div>
            <MapSection url={property?.address} />
          </div>
          <div className="col-span-1 lg:col-span-2 relative">
            <div className="block border border-border/50 p-3 rounded-sm sticky top-20">
              <div className="w-11/12 mx-auto my-3">
                <div className="border-b border-border/50 pb-4 mb-4">
                  <div className="hidden lg:flex lg:items-center lg:justify-between ">
                    <h4 className="flex items-center font-medium">
                      <LiaDollarSignSolid className="text-third icon" />
                      {property?.rent_usd_monthly}
                    </h4>
                    <h5 className="opacity-60">#{property?.id}</h5>
                  </div>
                </div>
                <div className="flex items-center flex-wrapc gap-3 border-b border-border/50 pb-4 mb-4">
                  <button className="btn btn-outline w-full">
                    Get a Quote
                  </button>
                  <div className="flex items-center">
                    <button
                      className="btn btn-outline px-3 py-3 hover:bg-red-500"
                      title="Add to Favorites"
                    >
                      <BiHeart />
                    </button>
                  </div>
                </div>
                <div className="block">
                  <h4>Get In Touch</h4>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer2 />
    </>
  );
};

export default Page;
