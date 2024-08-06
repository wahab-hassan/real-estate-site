"use client";
import { useEffect, useState } from "react";
import { BiFilterAlt, BiMinus } from "react-icons/bi";

import { Select } from "@headlessui/react";
import { BsChevronLeft, BsChevronRight, BsPlus } from "react-icons/bs";
import { readPaginatedRecords } from "@/lib/crud";
import Card from "../Card";
import Loader from "../Loader";

const PropertyList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPropertyType, setselectedPropertyType]: any = useState([]);
  const [selectedLocations, setselectedLocations]: any = useState([]);
  const [selectedOwnerShip, setselectedOwnerShip]: any = useState([]);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(10); // Default number of records per page
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchRecords(page, limit);
  }, [page, limit]);

  const fetchRecords = async (page: any, limit: any) => {
    setLoading(true);
    try {
      const { records, count }: any = await readPaginatedRecords(
        "properties",
        limit,
        page
      );
      setRecords(records);
      setTotalRecords(count);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (page * limit < totalRecords) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleLimitChange = (event: any) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page when limit changes
  };

  const startingIndex = (page - 1) * limit + 1;
  const endingIndex = Math.min(page * limit, totalRecords);
  const totalPages = Math.ceil(totalRecords / limit);

  const getDisplayedPages = () => {
    const displayedPages = [];
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    if (page <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    } else if (page > totalPages - 3) {
      startPage = Math.max(1, totalPages - 4);
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      displayedPages.push(i);
    }

    return displayedPages;
  };

  var propertyTypes: any = [
    {
      name: "Villa",
      count: 100,
      checked: false,
    },
    {
      name: "Apartment",
      count: 100,
      checked: false,
    },
    {
      name: "Land",
      count: 100,
      checked: false,
    },
    {
      name: "Hotel/Villa Complex",
      count: 100,
      checked: false,
    },
    {
      name: "Commercial",
      count: 100,
      checked: false,
    },
  ];

  const ownerShip: any = [
    {
      name: "Freehold",
      checked: false,
    },
    {
      name: "Leasehold",
      checked: false,
    },
    {
      name: "Yearly Rental",
      checked: false,
    },
  ];

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

  const setPropertyTypeValue = (value: any) => {
    const newSelectedPropertyType = selectedPropertyType.includes(value)
      ? selectedPropertyType.filter((item: any) => item !== value)
      : [...selectedPropertyType, value];
    setselectedPropertyType(newSelectedPropertyType);
  };
  const SetOwnerShip = (value: any) => {
    const newOwnerShip = selectedOwnerShip.includes(value)
      ? selectedOwnerShip.filter((item: any) => item !== value)
      : [...selectedOwnerShip, value];
    setselectedOwnerShip(newOwnerShip);
  };
  const setLocationValue = (value: string) => {
    const newSelectedLocation = selectedLocations.includes(value)
      ? selectedLocations.filter((item: any) => item !== value)
      : [...selectedLocations, value];
    setselectedLocations(newSelectedLocation);
  };
  return (
    <>
      <section className="py-10">
        <div className="w-11/12 mx-auto block lg:grid lg:grid-cols-8 gap-x-5">
          <div className="w-11/12 mx-auto col-span-6 lg:border-e lg:border-border/50 lg:pr-10">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-x-2">
                {/* <button className="btn btn-outline p-2 rounded-none">
                  <CgMenuGridR className="icon" />
                </button>
                <button className="btn btn-outline p-2 rounded-none">
                  <CgMenu className="icon" />
                </button> */}
                <h5 className="opacity-60 text-lg ml-4">
                  Showing{" "}
                  <span className="font-semibold">
                    {startingIndex} - {endingIndex}
                  </span>{" "}
                  of <span className="font-semibold">{totalRecords}</span>{" "}
                  results
                </h5>
              </div>
              <div className="flex items-center gap-x-2">
                <button
                  className="btn btn-outline p-2 rounded-none lg:hidden "
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <BiFilterAlt className="text-xl" />
                </button>
                <Select
                  className={
                    "bg-white border border-border/60 w-52 pl-3 pr-6 py-2  focus:outline-none rounded-sm"
                  }
                >
                  <option className="p-4" value="active">
                    Active
                  </option>
                  <option className="p-4" value="paused">
                    Paused
                  </option>
                  <option className="p-4" value="delayed">
                    Delayed
                  </option>
                  <option className="p-4" value="canceled">
                    Canceled
                  </option>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="relative w-full">
                <div className="absolute inset-0 w-full h-96">
                  <Loader />
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-none lg:w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 my-10">
                {records.map((value: any) => {
                  return <Card key={value.id} property={value} />;
                })}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className={`mx-1 w-8 h-8 flex justify-center items-center border border-border/40 rounded-md hover:bg-light transition-all ease-in-out `}
                >
                  <BsChevronLeft />
                </button>
                {getDisplayedPages().map((pageNumber: any) => (
                  <button
                    className={` ${
                      page === pageNumber
                        ? "bg-dark text-white hover:text-dark"
                        : ""
                    } mx-1 w-8 h-8 flex justify-center items-center border border-border/40 rounded-md hover:bg-light transition-all ease-in-out `}
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    disabled={page === pageNumber}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={page * limit >= totalRecords}
                  className={`mx-1 w-8 h-8 flex justify-center items-center border border-border/40 rounded-md hover:bg-light transition-all ease-in-out `}
                >
                  <BsChevronRight />
                </button>
              </div>
              <div className="flex items-center">
                <p>Show</p>
                <Select
                  className={
                    "bg-white border border-border/40 mx-1 pr-6 py-1 text-sm  focus:outline-none rounded-sm"
                  }
                  value={limit}
                  onChange={handleLimitChange}
                >
                  <option className="p-4" value={5}>
                    5
                  </option>
                  <option className="p-4" value={10}>
                    10
                  </option>
                  <option className="p-4" value={25}>
                    25
                  </option>
                  <option className="p-4" value={50}>
                    50
                  </option>
                </Select>
                <p>records per page</p>
              </div>
            </div>
          </div>
          <div
            className={`${
              isOpen
                ? "opacity-100  z-[1000]"
                : "opacity-0 pointer-events-none -z-50"
            } fixed inset-0 w-full h-screen  bg-dark/30 lg:bg-transparent lg:block lg:opacity-100 lg:static lg:pointer-events-auto lg:z-0 lg:h-auto lg:col-span-2 transition-all ease-in-out duration-300`}
          >
            <div className="overflow-auto rounded-md h-4/6 mx-auto shadow-lg w-8/12 px-8 py-10 shadow-black/40 my-32 bg-white lg:w-full lg:h-full lg:bg-transparent lg:shadow-none lg:p-0 lg:my-0 lg:rounded-none">
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5 ">
                <h3 className="font-bold">Filters</h3>
                <div className="flex gap-x-2 mt-3">
                  <button
                    className="btn btn-outline px-2 font-semibold text-sm py-1 "
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Clear All {">"}
                  </button>
                  <button className="btn btn-outline px-2 font-semibold text-sm py-1 ">
                    Show Options {">"}
                  </button>
                </div>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>Price Range</h4>
                <div className="flex items-center justify-between gap-x-2 my-3">
                  <div className="w-full">
                    <input
                      type="number"
                      min={0}
                      max={10000000}
                      placeholder="$ 0"
                      className="bg-white border border-border/40 rounded-sm w-full py-2 pl-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      min={0}
                      max={10000000}
                      placeholder="$ 10 000 000"
                      className="bg-white border border-border/40 rounded-sm w-full py-2 pl-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>Land Size</h4>
                <div className="flex items-center justify-between gap-x-2 my-3">
                  <div className="w-full">
                    <input
                      type="number"
                      min={0}
                      max={10000000}
                      placeholder="Sqm, Min"
                      className="bg-white border border-border/40 rounded-sm w-full py-2 pl-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      min={0}
                      max={10000000}
                      placeholder="Sqm, Max"
                      className="bg-white border border-border/40 rounded-sm w-full py-2 pl-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>OwnerShip Type</h4>
                <div className="flex items-center flex-wrap my-3">
                  {ownerShip.map((type: any, index: number) => (
                    <span
                    key={index}
                      className={`${
                        selectedOwnerShip.includes(type.name)
                          ? "bg-dark text-light hover:opacity-60"
                          : "hover:bg-light"
                      } rounded-md flex justify-center text-sm items-center text-nowrap border-[1px] py-1 px-2  border-border/30 mr-4 mb-2  transition-all ease-in-out duration-300`}
                      onClick={() => {
                        SetOwnerShip(type.name);
                      }}
                    >
                      {" "}
                      {type.name}{" "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>Bedroom</h4>
                <div className="flex items-center flex-wrap my-3">
                  <div className="flex items-center justify-between border border-border/40 rounded-md w-full">
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      Any
                    </span>
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      1
                    </span>
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      2
                    </span>
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      3
                    </span>
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      4
                    </span>
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      5
                    </span>
                    <span className="w-full text-center py-2 border-r text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      6+
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>Bathrooms</h4>
                <div className="flex items-center flex-wrap my-3">
                  <div className="flex items-center justify-between border border-border/40 rounded-md w-full">
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      Any
                    </span>
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      1
                    </span>
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      2
                    </span>
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      3
                    </span>
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      4
                    </span>
                    <span className="w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      5
                    </span>
                    <span className="w-full text-center py-2 border-r text-sm hover:bg-light transition-all ease-in-out duration-300 ">
                      6+
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>Property type</h4>
                <ul className="w-full mt-5 space-y-3">
                  {propertyTypes.map((type: any, index: any) => {
                    return (
                      <li key={index} className="flex items-center justify-between gap-x-2 text-dark/90 text-[16px]">
                        <span className="flex items-center gap-x-2">
                          <span
                            className={`${
                              selectedPropertyType.includes(type.name)
                                ? "bg-dark text-light hover:opacity-60"
                                : "hover:bg-light"
                            } rounded flex justify-center items-center w-8 border-[1px] h-8 px-2  border-border/30 mr-4  transition-all ease-in-out duration-300`}
                            onClick={() => {
                              setPropertyTypeValue(type.name);
                            }}
                          >
                            <BsPlus
                              className={`${
                                selectedPropertyType.includes(type.name)
                                  ? "hidden"
                                  : "hover:bg-light"
                              } text-lg`}
                            />
                            <BiMinus
                              className={`${
                                selectedPropertyType.includes(type.name)
                                  ? "bg-dark text-light hover:opacity-60"
                                  : "hidden"
                              } text-lg`}
                            />
                          </span>
                          {type.name}
                        </span>
                        <span>{type.count}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6">
                <h4>Location</h4>
                <ul className="w-full mt-5 space-y-3">
                  {southKoreanLocations.map((location: any,  index: any) => {
                    return (
                      <li key={index} className="flex items-center justify-between gap-x-2 text-dark/90 text-[16px]">
                        <span className="flex items-center gap-x-2">
                          <span
                            className={`${
                              selectedLocations.includes(location.location)
                                ? "bg-dark text-light hover:opacity-60"
                                : "hover:bg-light"
                            } rounded flex justify-center items-center w-8 border-[1px] h-8 px-2  border-border/30 mr-4  transition-all ease-in-out duration-300`}
                            onClick={() => {
                              setLocationValue(location.location);
                            }}
                          >
                            <BsPlus
                              className={`${
                                selectedLocations.includes(location.location)
                                  ? "hidden"
                                  : "hover:bg-light"
                              } text-lg`}
                            />
                            <BiMinus
                              className={`${
                                selectedLocations.includes(location.location)
                                  ? "bg-dark text-light hover:opacity-60"
                                  : "hidden"
                              } text-lg`}
                            />
                          </span>
                          {location.location}
                        </span>
                        <span>{location.location}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyList;
