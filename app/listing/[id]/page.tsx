"use client";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import {
  createRecord,
  getFilteredProperties,
  getPropertiesByUser,
  readRecords,
  selectSpecificRecord,
} from "@/lib/crud";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Link from "next/link";

const Page = ({ params }: { params: { id: string } }) => {
  const [property, setproperty]: any = useState();
  const [images_url, setImages_url]: any = useState([]);
  const [user, setuser]: any = useState();
  const [isLoading, setisLoading] = useState(true);
  const [isFavorite, setisFavorite] = useState(false);

  useEffect(() => {
    setisLoading(true);
    setuser(JSON.parse(localStorage.getItem("userData") || "{}"));
    fetchSpecificRecord().then((data: any) => {
      setproperty(data[0]);
      if (
        data[0].images_urls &&
        data[0].images_urls.length > data[0].uploaded_urls.length
      ) {
        setImages_url(data[0].images_urls);
      } else if (
        data[0].uploaded_urls &&
        data[0].images_urls.length < data[0].uploaded_urls.length
      ) {
        setImages_url(data[0].uploaded_urls);
      }
      setisLoading(false);
    });
  }, [params.id]);

  useEffect(() => {
    const inFavorite = async () => {
      try {
        const result = await readRecords("favorite", {
          property_id: property?.id,
          user_id: user?.id,
        });
        return await result;
      } catch (err) {
        console.log(err);
      }
    };

    inFavorite().then((val: any) => {
      if (val?.length > 0) {
        setisFavorite(true);
      }
    });
  }, [property]);

  const handleFavorite = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (!userData || !userData.id) {
      toast.info("Please log in to save this property as a favorite.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      // Call the createRecord function to store the favorite data
      const favoriteData = {
        user_id: userData.id,
        property_id: property.id,
      };
      await createRecord("favorite", favoriteData);

      toast.success("Property saved as favorite!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setisFavorite(true);
    } catch (error) {
      console.error("Error saving favorite property:", error);
      toast.error("Error saving favorite property.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const fetchSpecificRecord = async () => {
    try {
      const table = "property";
      const conditions = {
        key: "id",
        value: params.id,
      };

      return await getPropertiesByUser(conditions, 1, 1);
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
      <Navbar />
      <main className="w-full pt-48 lg:pt-40">
        <div className="w-10/12 lg:w-11/12 mx-auto h-fit">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {images_url?.map((image: any, index: any) => {
                return (
                  <CarouselItem
                    key={index}
                    className={` ${
                      property.images_urls.length > 3
                        ? "md:basis-1/2 lg:basis-1/3"
                        : "md:basis-1/2 lg:basis-1/2"
                    } block   h-fit object-cover`}
                  >
                    <img
                      src={`${image}`}
                      alt=""
                      className="w-full object-cover h-96 "
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="bg-white h-14 shadow-xl text-xl w-14 ml-10" />
            <CarouselNext className="bg-white h-14 shadow-xl text-xl w-14 mr-10">
              Next
            </CarouselNext>
          </Carousel>
        </div>
      </main>
      <section className="w-full mt-10 pb-32">
        <div className="w-11/12 mx-auto grid grid-cols-1  lg:w-11/12 xl:w-9/12 lg:grid-cols-6 gap-4">
          <div className="col-span-1 lg:col-span-4">
            <div className="block mt-10 mb-8 leading-loose border-b border-border/50 pb-5">
              <div className="flex items-center justify-between lg:hidden">
                <p className="flex items-center flex-col font-medium text-lg">
                  <span className="flex items-center">
                    <LiaDollarSignSolid className="text-third mr-1 icon" />
                    {property?.additionalData?.monthly_rental_price}/month
                  </span>
                  <span className="flex items-center">
                    <LiaDollarSignSolid className="text-third mr-1 icon" />
                    {property?.additionalData?.yearly_rental_price}/annual
                  </span>
                </p>
                <h5 className="opacity-60">#{property?.id}</h5>
              </div>
              <h1 className="my-4">{property?.property_name}</h1>
              <div className="flex items-center gap-x-3">
                <span className="bg-third px-4 py-1 text-sm text-white rounded-sm md:text-[16px]">
                  Featured
                </span>
                <span className="bg-third px-4 py-1 text-sm text-white rounded-sm md:text-[16px] caption-bottom">
                  {property?.property_type}
                </span>
                <span className="flex items-center text-sm md:text-[16px]">
                  <BsCalendar className="text-third mr-2 text-lg" />{" "}
                  {formatDate(property?.created_at)}
                </span>
              </div>
            </div>
            <div className="block mb-8 leading-loose border-b border-border/50 pb-5">
              <h3>Summary</h3>
              <div className="flex items-center flex-wrap gap-3 my-3">
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaHomeSolid className="icon mr-2" />{" "}
                  {property?.property_type}
                </span>

                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaFileAlt className="icon mr-2" /> {property?.list_type}
                </span>
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center justify-between">
                  {" "}
                  <span className="flex items-center border-r-2 w-1/2">
                    <BiBed className="icon mr-2" />{" "}
                    {property?.bedrooms ? property?.bedrooms : "1"}
                  </span>
                  <span className="flex items-center">
                    <BiShower className="icon mr-2" />{" "}
                    {property?.bathrooms ? property?.bathrooms : "1"}
                  </span>
                </span>
                {/* <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaRulerSolid className="icon mr-2" />
                  <span className=" flex flex-col">
                    {" "}
                    150 Sqm{" "}
                    <span className="opacity-60 text-[12px] -mt-2">
                      Land Size
                    </span>{" "}
                  </span>
                </span> */}
                {/* <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaExpandSolid className="icon mr-2" />
                  <span className=" flex flex-col">
                    {" "}
                    150 Sqm{" "}
                    <span className="opacity-60 text-[12px] -mt-2">
                      Building Size
                    </span>{" "}
                  </span>
                </span> */}
                {/* <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <LiaCalendarAlt className="icon mr-2" />
                  <span className=" flex flex-col">
                    {" "}
                    29 Years
                    <span className="opacity-60 text-[12px] -mt-2">
                      Leash Period
                    </span>{" "}
                  </span>
                </span> */}
              </div>
            </div>
            <div className="block mb-8 leading-loose border-b border-border/50 pb-5">
              <h3 className="mb-5">Description</h3>
              <p>{property?.property_description}</p>

              <div className="flex items-center flex-wrap gap-3 my-3">
                <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <BiCabinet className="icon mr-2" /> Furnished
                </span>
                {property?.pool_type && (
                  <>
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
                  </>
                )}
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
                    {property?.levels}
                    <span className="opacity-60 text-[12px] -mt-2">
                      Levels
                    </span>{" "}
                  </span>
                </span>
                {/* <span className="capitalize font-medium border rounded-md w-40 border-border/50 px-3 py-2 flex items-center">
                  {" "}
                  <span className=" flex flex-col">
                    $1,145
                    <span className="opacity-60 text-[12px] -mt-2">
                      Price Per Sqm
                    </span>{" "}
                  </span>
                </span> */}
              </div>
            </div>
            {property?.location_pin && (
              <MapSection url={property?.location_pin} />
            )}
          </div>
          <div className="col-span-1 lg:col-span-2 relative">
            <div className="block border border-border/50 p-3 rounded-sm sticky top-20">
              <div className="w-11/12 mx-auto my-3">
                <div className="border-b border-border/50 pb-4 mb-4">
                  <div className="hidden lg:flex lg:items-center lg:justify-between ">
                    <h4 className="flex  items-start flex-col font-medium">
                      <span className="flex items-center">
                        <LiaDollarSignSolid className="text-third mr-1 icon" />
                        {property?.additionalData?.monthly_rental_price}/month
                      </span>
                      <span className="flex items-center">
                        <LiaDollarSignSolid className="text-third mr-1 icon" />
                        {property?.additionalData?.yearly_rental_price}/annual
                      </span>
                    </h4>
                    <h5 className="opacity-60">#{property?.id}</h5>
                  </div>
                </div>
                <div className="flex items-center flex-wrapc gap-3 border-b border-border/50 pb-4 mb-4">
                  <Link
                    className="btn btn-outline text-center w-full"
                    href={"/contact"}
                  >
                    Get a Quote
                  </Link>
                  <div className="flex items-center">
                    {user !== null && (
                      <button
                        className={`btn btn-outline px-3 py-3  ${
                          isFavorite
                            ? "bg-red-500 text-white hover:bg-white hover:text-red-500"
                            : "hover:bg-red-500"
                        } `}
                        title="Add to Favorites"
                        onClick={handleFavorite}
                      >
                        <BiHeart />
                      </button>
                    )}
                  </div>
                </div>
                <div className="block">
                  <h4>Get In Touch</h4>
                  <ContactForm
                    recordData={{ id: property.id, name: property.name }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
