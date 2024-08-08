import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { IoBedOutline, IoExpand } from "react-icons/io5";
import { LuShowerHead } from "react-icons/lu";
import { MdStairs } from "react-icons/md";

const Card = (props: any) => {
  const property = props.property;

  return (
    <>
      <div key={property.id} className="border-[1px] border-border/40 rounded-md w-full mx-auto md:max-w-none md:w-full hover:shadow-lg hover:shadow-dark/30 transition-all ease-in-out duration-300">
        <div className="w-full h-52 relative">
          <div className="absolute left-1 top-1 gap-x-2">
            <span className="border border-border/40 bg-white rounded-lg px-2 text-sm mx-1 font-medium">
              Featured
            </span>
            <span className="border border-border/40 bg-white rounded-lg px-2 text-sm mx-1 font-medium">
              Off Plan
            </span>
          </div>
          <img src={`${property.images_urls[0]}`} alt="" className="w-full rounded-md h-full object-cover" />
          <h5 className="absolute right-1 bottom-1 border border-border/40 bg-white rounded-lg px-2 text-md mx-1 font-medium">
            $ {property.additionalData.monthly_rental_price}/month
          </h5>
        </div>
        <div className="p-3 border-b border-border/40">
          <h5 className="text-lg font-semibold ml-6 mb-2 hover:text-third capitalize">{property.property_type}</h5>
          <h3 className="flex items-center ml-6 gap-x-2">
           {property.property_name}
          </h3>
        </div>
        <div className="flex items-center gap-x-6 w-11/12 mx-auto py-5">
          <span className="flex items-center gap-x-2">
            <IoBedOutline className="text-third icon" /> { property?.bedrooms && property?.bedrooms > 0 ?  property?.bedrooms : '1'} Bed
          </span>
          <span className="flex items-center gap-x-2">
            <LuShowerHead className="text-third icon" /> {property?.bathrooms && property?.bathrooms > 0 ?  property?.bathrooms : '1'} Bath
          </span>
          <span className="flex items-center gap-x-2">
            <MdStairs className="text-third icon" />
            1
          </span>
        </div>
        <div className="border-t border-border/40 py-4">
          <Link href={`/listing/${property.id}`} className="flex items-center w-10/12 mx-auto gap-x-4 hover:text-third transition-all ease-in-out duration-300 font-medium">
            Get Contact Info <BsArrowRight className="text-lg" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
