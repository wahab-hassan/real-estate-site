"use client";
import { deleteRecord, getPropertiesByUser, getTotalRecords } from "@/lib/crud";
import { Select } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsEye,
  BsPen,
  BsTrash,
} from "react-icons/bs";
import Loader from "../../Loader";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Listing = () => {
  const url = usePathname();
  const router = useParams();
  const userID: any = router.id;
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(5); // Default number of records per page
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(page, limit);

    fetchRecords(page, limit);
  }, [page, limit]);

  useEffect(() => {
    fetchRecords(page, limit);
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

  const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    const options: any = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getCount = async () => {
    const count: any = await getTotalRecords("property");
    console.log(count);

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

  const fetchRecords = async (page: any, limit: any) => {
    setLoading(true);
    try {
      const data: any = await getPropertiesByUser(
        { key: "created_by", value: String(userID) },
        page,
        limit
      );
      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
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
          <div className="relative h-5/6 sm:rounded-lg mt-6 mx-auto w-11/12 overflow-x-scroll border-border/40">
            <table className="w-full text-sm text-left rtl:text-right h-auto my-2 border ">
              <thead className="text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Sr#
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Property Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Property Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Land Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Building Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Bedrooms
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Bathrooms
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Living Room Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Pool Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Levels
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Parking
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Furnished
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Features
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Location Pin
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Land Zoning
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Construction Status
                  </th>

                  <th scope="col" className="px-6 py-3 text-[12px]">
                    List Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    List For
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-[12px]">
                    Actions
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
                      <span
                        className={`${
                          record.status === "review"
                            ? "bg-blue-200 text-blue-900"
                            : record.status === "listed"
                            ? "bg-green-200 text-green-900"
                            : record.status === "cancelled"
                            ? "bg-red-200 text-red-900"
                            : ""
                        } px-3 py-2 capitalize rounded-md text-sm`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {formatDate(record.created_at)}
                    </td>

                    <td className="px-6 py-4 text-[14px] flex justify-between gap-x-2 items-center">
                      <button className="btn btn-outline hover:bg-red-500 px-2 py-2" onClick={ () => deleteProperty(record.id)}>
                        <BsTrash className="text-lg" />
                      </button>
                      <Link href={`${url}/edit/${record?.id}`} className="btn btn-outline hover:bg-blue-500 px-2 py-2">
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
