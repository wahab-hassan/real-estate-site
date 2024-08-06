"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useState } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import { Toggle } from "@/components/ui/toggle";
import {
  MdVilla,
  MdApartment,
  MdLandscape,
  MdHotel,
  MdHolidayVillage,
  MdPlusOne,
  MdAdd,
  MdRemove,
} from "react-icons/md";

const SearchBar = () => {
  const [location, setLocation] = useState(false);
  const [propertyType, setpropertyType] = useState(false);
  const [bedrooms, setbedrooms] = useState(false);
  const [selectedPropertyType, setselectedPropertyType]: any = useState([]);
  const [selectedLocation, setselectedLocation]: any = useState([]);
  const [noOfBedroom, setNoOfBedrooms] = useState(0);

  const southKoreanLocations = [
    { location: "Seoul" },
    { location: "Busan" },
    { location: "Daegu" },
    { location: "Incheon" },
    { location: "Gwangju" },
    { location: "Daejeon" },
    { location: "Ulsan" },
    { location: "Suwon" },
    { location: "Jeonju" },
    { location: "Cheonan" },
    { location: "Gyeongju" },
    { location: "Jeju City" },
  ];

  const openDropdown = (value: string) => {
    switch (value) {
      case "location":
        setLocation(!location);
        setpropertyType(false);
        setbedrooms(false);
        break;
      case "propertyType":
        setLocation(false);
        setbedrooms(false);
        setpropertyType(!propertyType);
        break;
      case "bedrooms":
        setbedrooms(!bedrooms);
        setLocation(false);
        setpropertyType(false);
        break;
      default:
        setLocation(false);
        setpropertyType(false);
        setbedrooms(false);
        break;
    }
  };

  const setPropertyTypeValue = (value: string) => {
    const newSelectedPropertyType = selectedPropertyType.includes(value)
      ? selectedPropertyType.filter((item: any) => item !== value)
      : [...selectedPropertyType, value];
    setselectedPropertyType(newSelectedPropertyType);
  };

  const setLocationValue = (value: string) => {
    const newSelectedLocation = selectedLocation.includes(value)
      ? selectedLocation.filter((item: any) => item !== value)
      : [...selectedLocation, value];
    setselectedLocation(newSelectedLocation);
  };

  return (
    <form className="flex flex-col items-center w-full mx-auto md:flex-row md:w-9/12 md:bg-white md:rounded-md">
      <div className="flex items-center justify-between bg-white w-full px-3 py-2 relative border-[1px] border-border/30 cursor-pointer md:border-y-0 md:py-3 md:bg-transparent">
        <input
          type="text"
          readOnly
          placeholder="Property type"
          value={selectedPropertyType.join(", ")}
          className="bg-white w-full focus:outline-none capitalize"
          onClick={() => openDropdown("propertyType")}
        />
        <BsChevronDown className="icons" />
        <div
          className={`${
            propertyType
              ? "transform opacity-100 scale-100"
              : "transform opacity-0 z-[-100000] scale-95"
          } transition ease-out duration-100 absolute top-10 right-0 z-40 mt-2 w-full origin-top-right`}
        >
          <div className="w-10/12 p-6 mx-auto rounded-md bg-white shadow-xl shadow-dark ring-1 ring-black ring-opacity-5 focus:outline-none py-4 md:w-96 md:mt-5">
            <h3>Property Type</h3>
            <ul className="overflow-y-auto w-11/12 mx-auto my-3">
              <li className="my-3 text-sm flex items-center">
                <span
                  className={`${
                    selectedPropertyType.includes("villa")
                      ? "bg-dark text-light hover:opacity-60s"
                      : "hover:bg-light"
                  } rounded flex justify-center items-center w-8 border-[1px] h-8 px-2  border-border/30 mr-4  transition-all ease-in-out duration-300`}
                  onClick={() => {
                    setPropertyTypeValue("villa");
                  }}
                >
                  <MdVilla />
                </span>
                Villa
              </li>
              <li className="my-3 text-sm flex items-center">
                <span
                  className={`${
                    selectedPropertyType.includes("appartment")
                      ? "bg-dark text-light hover:opacity-60s"
                      : "hover:bg-light"
                  } rounded flex justify-center items-center w-8 border-[1px] h-8 px-2  border-border/30 mr-4  transition-all ease-in-out duration-300`}
                  onClick={() => {
                    setPropertyTypeValue("appartment");
                  }}
                >
                  <MdApartment />
                </span>
                Appartment
              </li>
              <li className="my-3 text-sm flex items-center">
                <span
                  className={`${
                    selectedPropertyType.includes("land")
                      ? "bg-dark text-light hover:opacity-60s"
                      : "hover:bg-light"
                  } rounded flex justify-center items-center w-8 border-[1px] h-8 px-2  border-border/30 mr-4  transition-all ease-in-out duration-300`}
                  onClick={() => {
                    setPropertyTypeValue("land");
                  }}
                >
                  <MdLandscape />
                </span>
                Land
              </li>
              <li className="my-3 text-sm flex items-center">
                <span
                  className={`${
                    selectedPropertyType.includes("hotel")
                      ? "bg-dark text-light hover:opacity-60s"
                      : "hover:bg-light"
                  } rounded flex justify-center items-center w-8 border-[1px] h-8 px-2  border-border/30 mr-4  transition-all ease-in-out duration-300`}
                  onClick={() => {
                    setPropertyTypeValue("hotel");
                  }}
                >
                  <MdHotel />
                </span>
                Hotel/Villa Complex
              </li>
              <li className="my-3 text-sm flex items-center">
                <span
                  className={`${
                    selectedPropertyType.includes("commercial")
                      ? "bg-dark text-light hover:opacity-60s"
                      : "hover:bg-light"
                  } rounded flex justify-center items-center w-8 border-[1px] h-8 px-2  border-border/30 mr-4  transition-all ease-in-out duration-300`}
                  onClick={() => {
                    setPropertyTypeValue("commercial");
                  }}
                >
                  <MdHolidayVillage />
                </span>
                Commercial
              </li>
            </ul>
            <div className="flex items-center gap-x-4 my-3">
              <button
                className="border-0 text-sm font-semibold hover:text-third transition-all ease-in-out"
                onClick={(e: any) => {
                  e.preventDefault();
                  setselectedPropertyType([]);
                }}
              >
                Clear All
              </button>
              <button
                className="border-0 text-sm font-semibold hover:text-third transition-all ease-in-out"
                onClick={(e: any) => {
                  e.preventDefault();
                  setselectedPropertyType([
                    "villa",
                    "appartment",
                    "land",
                    "hotel",
                    "commercial",
                  ]);
                }}
              >
                Select All
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white w-full px-3 py-2 relative border-[1px] border-border/30 cursor-pointer md:border-y-0 md:py-3 md:bg-transparent">
        <input
          type="text"
          readOnly
          value={
            selectedLocation.length > 0
              ? `${selectedLocation.length} Locations Selected `
              : ""
          }
          placeholder="Location"
          className="bg-white w-full focus:outline-none"
          onClick={() => openDropdown("location")}
        />
        <BsChevronDown className="icons" />
        <div
          className={`${
            location
              ? "transform opacity-100 scale-100"
              : "transform opacity-0 z-[-100000] scale-95"
          } transition ease-out duration-100 absolute top-10 right-0 z-40 mt-2 w-full origin-top-right`}
        >
          <div className="w-10/12 p-6 mx-auto rounded-md bg-white shadow-xl shadow-dark ring-1 ring-black ring-opacity-5 focus:outline-none py-4 md:w-96 md:mt-5">
            <h3>Locations</h3>
            <ul className="overflow-auto h-56 my-5 w-11/12 mx-auto">
              {southKoreanLocations.map((location: any, index: number) => {
                return (
                  <li key={index} className="my-3 text-sm flex items-center">
                    <span
                      className={`${
                        selectedLocation.includes(location.location)
                          ? "bg-dark text-light hover:opacity-60s"
                          : "hover:bg-light"
                      } rounded flex justify-center items-center w-8 border-[1px] h-8 px-2  border-border/30 mr-4  transition-all ease-in-out duration-300`}
                      onClick={() => {
                        setLocationValue(location.location);
                      }}
                    >
                      {selectedLocation.includes(location.location) ? (
                        <MdRemove />
                      ) : (
                        <MdAdd />
                      )}
                    </span>
                    {location.location}
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-x-4 my-3">
              <button
                className="border-0 text-sm font-semibold hover:text-third transition-all ease-in-out"
                onClick={(e: any) => {
                  e.preventDefault();
                  setselectedLocation([]);
                }}
              >
                Clear All
              </button>
              <button
                className="border-0 text-sm font-semibold hover:text-third transition-all ease-in-out"
                onClick={(e: any) => {
                  e.preventDefault();
                  setselectedLocation(
                    southKoreanLocations.map((location: any) => {
                      return location.location;
                    })
                  );
                }}
              >
                Select All
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white w-full px-3 py-2 relative border-[1px] border-border/30 cursor-pointer md:border-y-0 md:py-3 md:bg-transparent">
        <input
          type="text"
          readOnly
          value={
            noOfBedroom === 0
              ? ""
              : `${noOfBedroom > 6 ? "6+" : noOfBedroom} Bedrooms`
          }
          placeholder="No of Bedrooms"
          className="bg-white w-full focus:outline-none"
          onClick={() => openDropdown("bedrooms")}
        />
        <BsChevronDown className="icons" />
        <div
          className={`${
            bedrooms
              ? "transform opacity-100 scale-100"
              : "transform opacity-0 z-[-100000] scale-95"
          } transition ease-out duration-100 absolute top-10 right-0 z-40 mt-2 w-full origin-top-right`}
        >
          <div className="w-10/12 p-6 mx-auto rounded-md bg-white shadow-xl shadow-dark ring-1 ring-black ring-opacity-5 focus:outline-none py-4 md:w-96 md:mt-5">
            <h3>No Of Bedrooms</h3>
            <div className="flex items-center my-7">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  noOfBedroom === 0 ? "" : setNoOfBedrooms(noOfBedroom - 1);
                }}
                className={` ${
                  noOfBedroom === 0 ? "opacity-50" : ""
                } flex justify-center items-center border-[1px] border-border/50 rounded-md w-10 h-10`}
              >
                <MdRemove />
              </button>
              <input
                type="text"
                className="w-10/12 border-0 bg-transparent text-center"
                placeholder="0"
                value={noOfBedroom}
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  noOfBedroom > 7 ? "" : setNoOfBedrooms(noOfBedroom + 1);
                }}
                className="flex justify-center items-center border-[1px] border-border/50 rounded-md w-10 h-10"
              >
                <MdAdd />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className="py-3 btn btn-outline rounded-none bg-white w-full flex items-center justify-center md:w-32 md:border-none md:py-4 md:rounded-e-md">
        <BsSearch className="" />
      </button>
    </form>
  );
};

export default SearchBar;
