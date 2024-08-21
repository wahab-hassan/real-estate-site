"use client";
import { useEffect, useState } from "react";
import { BiFilterAlt, BiMinus } from "react-icons/bi";

import { Select } from "@headlessui/react";
import { BsChevronLeft, BsChevronRight, BsPlus } from "react-icons/bs";
import {
  getFilteredProperties,
  getProperties,
  getTotalRecords,
  readPaginatedRecords,
} from "@/lib/crud";
import Card from "../Card";
import Loader from "../Loader";
import { useTranslations } from "next-intl";

const PropertyList = () => {
  const t = useTranslations("ListingPage");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPropertyType, setselectedPropertyType]: any = useState([]);
  const [selectedLocations, setselectedLocations]: any = useState([]);
  const [selectedOwnerShip, setselectedOwnerShip]: any = useState([]);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(10); // Default number of records per page
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("asc");
  const [landSizeMin, setlandSizeMin] = useState("");
  const [landSizeMax, setlandSizeMax] = useState("");
  const [bedrooms, setbedrooms] = useState("");
  const [bathrooms, setbathrooms] = useState("");
  useEffect(() => {
    fetchRecords(page, limit);
    getCount();
  }, [page, limit, sortBy, sortOrder]);

  const getCount = async () => {
    const count: any = await getTotalRecords("property");

    setTotalRecords(count);
  };

  const fetchRecords = async (page: any, limit: any) => {
    setLoading(true);
    try {
      const data: any = await getFilteredProperties(
        page,
        limit,
        sortBy,
        sortOrder,
        [
          {
            key: "is_active",
            value: true,
          },
          {
            key: "status",
            value: "published",
          },
        ]
      );

      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlefilters = async () => {
    // Prepare filters array
    const filters = [];
    let search: any;
    if (landSizeMax && landSizeMax !== "") {
      search = { ...search, landSizeMax: landSizeMax };
    }
    if (landSizeMin && landSizeMin !== "") {
      search = { ...search, landSizeMin: landSizeMin };
    }
    if (bedrooms && bedrooms !== "") {
      search = { ...search, bedrooms: bedrooms };
    }
    if (bathrooms && bathrooms !== "") {
      search = { ...search, bathrooms: bathrooms };
    }
    if (selectedOwnerShip && selectedOwnerShip.length > 0) {
      filters.push({ key: "list_for", value: selectedOwnerShip });
    }
    if (selectedPropertyType && selectedPropertyType.length > 0) {
      filters.push({ key: "property_type", value: selectedPropertyType });
    }

    // Fetch filtered properties
    const filteredProperties: any = await getFilteredProperties(
      page,
      limit,
      sortBy,
      sortOrder,
      filters,
      search
    );

    // Update properties state with the filtered results
    setRecords(filteredProperties);
    setIsOpen(false);
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
      value: "villa",
      count: 100,
      checked: false,
    },
    {
      name: "Apartment",
      value: "apartment",
      count: 100,
      checked: false,
    },
    {
      name: "Land",
      value: "land",
      count: 100,
      checked: false,
    },
    {
      name: "Hotel/Villa Complex",
      value: "hotel",
      count: 100,
      checked: false,
    },
    {
      name: "Commercial",
      value: "commercial",
      count: 100,
      checked: false,
    },
  ];

  const ownerShip: any = [
    {
      name: "Freehold",
      value: "freehold",
      checked: false,
    },
    {
      name: "Leasehold",
      value: "leasehold",
      checked: false,
    },
    {
      name: "Yearly Rental",
      value: "yearly",
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
      <section className="py-10 pb-32">
        <div className="w-full mx-auto block gap-x-5">
          <div className="w-9/12 mx-auto col-span-6 ">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-x-2">
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
                  className="btn btn-outline p-2 rounded-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <BiFilterAlt className="text-xl inline-block mr-3" />{" "}
                  {t("filterTitle")}
                </button>
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
                {records?.map((value: any) => {
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
            } fixed inset-0 w-full h-screen  bg-dark/30 transition-all ease-in-out duration-300`}
          >
            <div className="overflow-auto rounded-md h-4/6 mx-auto shadow-lg w-8/12 px-8 py-10 shadow-black/40 my-32 bg-white ">
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5 ">
                <h3 className="font-bold">{t("filterTitle")}</h3>
                <div className="flex gap-x-2 mt-3">
                  <button
                    className="btn btn-outline px-2 font-semibold text-sm py-1 "
                    onClick={() => {
                      setlandSizeMin("");
                      setlandSizeMax("");
                      setselectedOwnerShip("");
                      setselectedPropertyType("");
                      setbathrooms("");
                      setbedrooms("");
                      setIsOpen(!isOpen);
                      fetchRecords(page, limit);
                    }}
                  >
                    {t("filterbtn1")}
                    {">"}
                  </button>
                  <button
                    className="btn btn-outline px-2 font-semibold text-sm py-1 "
                    onClick={handlefilters}
                  >
                    {t("filterbtn2")}
                    {">"}
                  </button>
                </div>
              </div>

              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>{t("landSize")}</h4>
                <div className="flex items-center justify-between gap-x-2 my-3">
                  <div className="w-full">
                    <input
                      type="number"
                      min={0}
                      max={10000000}
                      placeholder="Sqm, Min"
                      defaultValue={landSizeMin}
                      onChange={(e) => {
                        Number(e.target.value) > 0 &&
                        landSizeMax > e.target.value
                          ? setlandSizeMin(e.target.value)
                          : "";
                      }}
                      className="bg-white border border-border/40 rounded-sm w-full py-2 pl-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      min={0}
                      max={10000000}
                      placeholder="Sqm, Max"
                      defaultValue={landSizeMax}
                      onChange={(e) => {
                        Number(e.target.value) > Number(landSizeMin)
                          ? setlandSizeMax(e.target.value)
                          : "";
                      }}
                      className="bg-white border border-border/40 rounded-sm w-full py-2 pl-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>{t("ownership")}</h4>
                <div className="flex items-center flex-wrap my-3">
                  {ownerShip.map((type: any, index: number) => (
                    <span
                      key={index}
                      className={`${
                        selectedOwnerShip.includes(type.value)
                          ? "bg-dark text-light hover:opacity-60"
                          : "hover:bg-light"
                      } rounded-md flex justify-center text-sm items-center text-nowrap border-[1px] py-1 px-2  border-border/30 mr-4 mb-2  transition-all ease-in-out duration-300`}
                      onClick={() => {
                        SetOwnerShip(type.value);
                      }}
                    >
                      {" "}
                      {type.name}{" "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>{t("bedroom")}</h4>
                <div className="flex items-center flex-wrap my-3">
                  <div className="flex items-center justify-between border border-border/40 rounded-md w-full">
                    <span
                      onClick={() => setbedrooms("")}
                      className={` ${
                        bedrooms === "" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      Any
                    </span>
                    <span
                      onClick={() => setbedrooms("1")}
                      className={` ${
                        bedrooms === "1" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      1
                    </span>
                    <span
                      onClick={() => setbedrooms("2")}
                      className={` ${
                        bedrooms === "2" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      2
                    </span>
                    <span
                      onClick={() => setbedrooms("3")}
                      className={` ${
                        bedrooms === "3" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      3
                    </span>
                    <span
                      onClick={() => setbedrooms("4")}
                      className={` ${
                        bedrooms === "4" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      4
                    </span>
                    <span
                      onClick={() => setbedrooms("5")}
                      className={` ${
                        bedrooms === "5" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      5
                    </span>
                    <span
                      onClick={() => setbedrooms("6")}
                      className={` ${
                        bedrooms === "6" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      6+
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>{t("bathroom")}</h4>
                <div className="flex items-center flex-wrap my-3">
                  <div className="flex items-center justify-between border border-border/40 rounded-md w-full">
                    <span
                      onClick={() => setbathrooms("")}
                      className={` ${
                        bathrooms === "" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      Any
                    </span>
                    <span
                      onClick={() => setbathrooms("1")}
                      className={` ${
                        bathrooms === "1" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      1
                    </span>
                    <span
                      onClick={() => setbathrooms("2")}
                      className={` ${
                        bathrooms === "2" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      2
                    </span>
                    <span
                      onClick={() => setbathrooms("3")}
                      className={` ${
                        bathrooms === "3" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      3
                    </span>
                    <span
                      onClick={() => setbathrooms("4")}
                      className={` ${
                        bathrooms === "4" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      4
                    </span>
                    <span
                      onClick={() => setbathrooms("5")}
                      className={` ${
                        bathrooms === "5" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r border-border/40 text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      5
                    </span>
                    <span
                      onClick={() => setbathrooms("6")}
                      className={` ${
                        bathrooms === "6" ? "bg-dark text-white" : ""
                      } w-full text-center py-2 border-r text-sm hover:bg-light transition-all ease-in-out duration-300 `}
                    >
                      6+
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full border-b border-border/50 rounded-sm pb-6 mb-5">
                <h4>{t("propertyType")}</h4>
                <ul className="w-full mt-5 space-y-3">
                  {propertyTypes.map((type: any, index: any) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-between gap-x-2 text-dark/90 text-[16px]"
                      >
                        <span className="flex items-center gap-x-2">
                          <span
                            className={`${
                              selectedPropertyType.includes(type.value)
                                ? "bg-dark text-light hover:opacity-60"
                                : "hover:bg-light"
                            } rounded flex justify-center items-center w-8 border-[1px] h-8 px-2  border-border/30 mr-4  transition-all ease-in-out duration-300`}
                            onClick={() => {
                              setPropertyTypeValue(type.value);
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyList;
