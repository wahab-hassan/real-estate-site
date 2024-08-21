"use client";
import {
  deleteRecord,
  getFilteredProperties,
  getPropertiesByUser,
  getTotalRecords,
  updateRecord,
} from "@/lib/crud";
import { Select } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsEye,
  BsFilter,
  BsPen,
  BsTrash,
} from "react-icons/bs";
import Loader from "../Loader";
import { useParams, usePathname } from "next/navigation";
import { Link } from "@/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSort } from "react-icons/bi";
import { Switch } from "@/components/ui/switch";
const Listing = () => {
  const url = usePathname();
  const router = useParams();
  const userID: any = router.id;
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(5); // Default number of records per page
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<any>();
  const [listType, setListType] = useState("");
  const [status, setStatus] = useState("");
  const [listFor, setListFor] = useState("");
  const [propertyType, setPropertyType] = useState("");

  useEffect(() => {
    fetchRecords(page, limit);
  }, [page, limit, sortBy, sortOrder]);

  useEffect(() => {
    getCount();
  }, []);

  const deleteProperty = async (recordId: any) => {
    const isConfirm = confirm("Are you sure you want to delete this record?");
    if (isConfirm) {
      await deleteRecord("property", recordId);
      fetchRecords(page, limit);
      toast.success("Records Deleted Successfully", {
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

  const handleFilter = async () => {
    // Prepare filters array
    const filters = [];
    if (status) filters.push({ key: "status", value: status });
    if (listType) filters.push({ key: "list_type", value: listType });
    if (listFor) filters.push({ key: "list_for", value: listFor });
    if (propertyType)
      filters.push({ key: "property_type", value: propertyType });

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
  };

  const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    const options: any = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getCount = async () => {
    const count: any = await getTotalRecords("property");

    setTotalRecords(count);
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

  const handleSort = (value: string) => {
    if (sortBy !== value) {
      setSortBy(value);
    } else {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    }
  };

  const fetchRecords = async (page: any, limit: any) => {
    setLoading(true);
    try {
      const data: any = await getFilteredProperties(
        page,
        limit,
        sortBy,
        sortOrder
      );
      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (record: any, event: any) => {
    const isConfirm = confirm("Are you sure you want to change the status?");
    if (isConfirm) {
      if (event === "published") {
        record.is_active = true;
      }
      const { additionalData, data } = record;
      const updatedRecord = { ...data, status: event };
      updateRecord("property", record.id, updatedRecord).then(() => {
        toast.success("Status changed Successfully", {
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
      });
      fetchRecords(page, limit);
    }
  };

  const toggleIsactive = (record: any) => {
    const isConfirm = confirm(
      `Are you sure you want to ${
        record.is_active ? "deactivate" : "activate"
      } this property?`
    );
    if (isConfirm) {
      const { additionalData, data } = record;
      const updatedRecord = { ...data, is_active: !record.is_active };
      updateRecord("property", record.id, updatedRecord).then(() => {
        toast.success(`Property ${record.is_active ?'deactivated':  'activated' } Successfully`, {
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
      });
      fetchRecords(page, limit);      
    }
  };

  return (
    <>
      {loading ? (
        <div className="relative w-full h-full">
          <div className="absolute inset-0">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          <div className="block my-5 w-11/12 mx-auto">
            <h4 className="my-3">Filters</h4>
            <div className="flex items-center flex-shrink-0 flex-grow flex-wrap gap-x-4 border border-border/30 rounded-md px-2 py-3">
              <div className="w-full sm:w-52">
                <label htmlFor="" className="text-sm font-medium">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Name, Email, Property Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white border mt-1 border-border/30 rounded-md w-full text-sm p-2"
                />
              </div>
              <div className="w-full sm:w-52">
                <label htmlFor="" className="text-sm font-medium">
                  List Type*
                </label>
                <Select
                  className="bg-white border mt-1 border-border/30 rounded-md w-full text-sm p-2"
                  value={listType}
                  onChange={(e) => setListType(e.target.value)}
                >
                  <option value="" selected>
                    All Types
                  </option>
                  <option value="rent">Rent</option>
                  <option value="sell">Sell</option>
                </Select>
              </div>
              <div className="w-full sm:w-52">
                <label htmlFor="" className="text-sm font-medium">
                  List for*
                </label>
                <select
                  value={listFor}
                  onChange={(e) => setListFor(e.target.value)}
                  className="bg-white border mt-1 border-border/30 rounded-md w-full text-sm p-2"
                >
                  <option value="" selected>
                    All Lists
                  </option>
                  {listType === "rent" ? (
                    <>
                      <option value="yearly">Rent Yearly</option>
                      <option value="monthly">Rent Monthly</option>
                      <option value="daily">Rent Daily</option>
                    </>
                  ) : listType === "sell" ? (
                    <>
                      <option value="leasehold">Sell Leasehold</option>
                      <option value="freehold">Sell Freehold</option>
                    </>
                  ) : (
                    <option value="">Choose Listing Type first</option>
                  )}
                </select>
              </div>
              <div className="w-full sm:w-52">
                <label htmlFor="" className="text-sm font-medium">
                  Property Type*
                </label>
                <Select
                  className="bg-white border mt-1 border-border/30 rounded-md w-full text-sm p-2"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="" selected>
                    All Types
                  </option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land</option>
                  <option value="hotel">Hotel</option>
                  <option value="commercial">Commercial</option>
                </Select>
              </div>
              <div className="w-full sm:w-52">
                <label htmlFor="" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  className="bg-white border mt-1 border-border/30 rounded-md w-full text-sm p-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" selected>
                    All Status
                  </option>
                  <option value="published">Published</option>
                  <option value="review">Review</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </div>
              <button
                className="btn btn-secondary flex items-center my-3"
                onClick={handleFilter}
              >
                {" "}
                <BsFilter className="icon mr-1" /> Filter
              </button>
            </div>
          </div>
          <div className="relative h-5/6 sm:rounded-lg mt-6 mx-auto w-11/12 overflow-x-scroll border-border/40">
            <table className="w-full text-sm text-left rtl:text-right h-auto my-2 border ">
              <thead className="text-gray-700 uppercase bg-gray-50  ">
                <tr className="">
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Sr#
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("name");
                    }}
                  >
                    Name{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("phone_number");
                    }}
                  >
                    Phone Number{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("email");
                    }}
                  >
                    Email{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("property_name");
                    }}
                  >
                    Property Name{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("property_type");
                    }}
                  >
                    Property Type{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("land_size");
                    }}
                  >
                    Land Size{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("building_size");
                    }}
                  >
                    Building Size{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("bedrooms");
                    }}
                  >
                    Bedrooms{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("bathrooms");
                    }}
                  >
                    Bathrooms{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Living Room Type{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Pool Type{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("levels");
                    }}
                  >
                    Levels{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Parking{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("");
                    }}
                  >
                    Furnished{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Features{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Location Pin{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Land Zoning{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Construction Status{" "}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("list_type");
                    }}
                  >
                    List Type{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("list_for");
                    }}
                  >
                    List For{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("status");
                    }}
                  >
                    Status{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Is Active{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                    onClick={() => {
                      handleSort("created_at");
                    }}
                  >
                    Created Date{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Actions{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record: any, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4 text-[14px]">{record.id}</td>
                    <td className="px-6 py-4 text-[14px]">{record.name}</td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.phone_number}
                    </td>
                    <td className="px-6 py-4 text-[14px]">{record.email}</td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.property_name}
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.property_type}
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.land_size}
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.building_size}
                    </td>
                    <td className="px-6 py-4 text-[14px]">{record.bedrooms}</td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.bathrooms}
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.living_room_type}
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.pool_type}
                    </td>
                    <td className="px-6 py-4 text-[14px]">{record.levels}</td>
                    <td className="px-6 py-4 text-[14px]">{record.parking}</td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.furnished}
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.features.join(", ") || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      <a
                        href={record.location_pin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500"
                      >
                        View Location
                      </a>
                    </td>

                    <td className="px-6 py-4 text-[14px]">
                      {record.land_zoning}
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {record.construction_status}
                    </td>

                    <td className="px-6 py-4 text-[14px]">
                      {record.list_type}
                    </td>
                    <td className="px-6 py-4 text-[14px]">{record.list_for}</td>
                    <td className="px-6 py-4 text-[14px]">
                      <Select
                        className={`${
                          record.status === "review"
                            ? "bg-blue-200 text-blue-900"
                            : record.status === "published"
                            ? "bg-green-200 text-green-900"
                            : record.status === "cancelled"
                            ? "bg-red-200 text-red-900"
                            : ""
                        } px-3 py-2 capitalize rounded-md text-sm`}
                        value={record.status}
                        onChange={(e) => {
                          handleStatusChange(record, e.target.value);
                        }}
                      >
                        <option value="" selected>
                          All Status
                        </option>
                        <option value="published">Published</option>
                        <option value="review">Review</option>
                        <option value="cancelled">Cancelled</option>
                      </Select>
                    </td>
                    <td>
                      <Switch
                        checked={record.is_active}
                        onCheckedChange={()=>{toggleIsactive(record)}}
                      />
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {formatDate(record.created_at)}
                    </td>

                    <td className="px-6 py-4 text-[14px] flex justify-between gap-x-2 items-center">
                      <button
                        className="btn btn-outline hover:bg-red-500 px-2 py-2"
                        onClick={() => deleteProperty(record.id)}
                      >
                        <BsTrash className="text-lg" />
                      </button>
                      <Link
                        href={`${url}/edit/${record?.id}`}
                        className="btn btn-outline hover:bg-blue-500 px-2 py-2"
                      >
                        <BsPen className="text-lg" />
                      </Link>
                      <Link
                        className="btn btn-outline hover:bg-green-500 px-2 py-2"
                        href={`/listing/${record.id}`}
                        target="_blank"
                      >
                        <BsEye className="text-lg" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center py-7 w-11/12 mx-auto">
            <div className="flex items-center justify-between w-full">
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
                <h5 className="font-medium mr-4">
                  {" "}
                  Showing
                  <span className="ml-2">
                    {startingIndex}- {endingIndex} of {totalRecords}
                  </span>
                </h5>
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
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Listing;
