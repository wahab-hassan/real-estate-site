"use client";
import {
  getPropertiesByUser,
  readPaginatedRecords,
  readRecords,
} from "@/lib/crud";
import { Select } from "@headlessui/react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Listing = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(5); // Default number of records per page
  const [loading, setLoading] = useState(false);
  const [user, setUser]: any = useState();
  useEffect(() => {
    fetchRecords(page, limit);
  }, [page, limit]);

  useEffect(() => {
    fetchRecords(page, limit);
    setUser(JSON.parse(localStorage.getItem("userData")!));
  }, []);

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
      const data: any = await getPropertiesByUser(user?.id, page, limit);
      console.log(data);

      setRecords(data);
      setTotalRecords(data.length);
      console.log(records);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="relative w-full">
          <div className="absolute inset-0">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          <div className="relative h-auto shadow-md shadow-dark/10 sm:rounded-lg mt-6 mx-3 ">
            <table className="w-full  text-sm text-left rtl:text-right ">
              <thead className="text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sr#
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Property Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Property Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Land Size
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Building Size
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bedrooms
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bathrooms
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Living Room Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pool Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Levels
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Parking
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Furnished
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Features
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location Pin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Land Zoning
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Construction Status
                  </th>

                  <th scope="col" className="px-6 py-3">
                    List Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    List For
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record: any, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{record.name}</td>
                    <td className="px-6 py-4">{record.phone_number}</td>
                    <td className="px-6 py-4">{record.email}</td>
                    <td className="px-6 py-4">{record.property_name}</td>
                    <td className="px-6 py-4">{record.property_type}</td>
                    <td className="px-6 py-4">{record.land_size}</td>
                    <td className="px-6 py-4">{record.building_size}</td>
                    <td className="px-6 py-4">{record.bedrooms}</td>
                    <td className="px-6 py-4">{record.bathrooms}</td>
                    <td className="px-6 py-4">{record.living_room_type}</td>
                    <td className="px-6 py-4">{record.pool_type}</td>
                    <td className="px-6 py-4">{record.levels}</td>
                    <td className="px-6 py-4">{record.parking}</td>
                    <td className="px-6 py-4">{record.furnished}</td>
                    <td className="px-6 py-4">
                      {record.features.join(", ") || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={record.location_pin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Location
                      </a>
                    </td>

                    <td className="px-6 py-4">{record.land_zoning}</td>
                    <td className="px-6 py-4">{record.construction_status}</td>

                    <td className="px-6 py-4">{record.list_type}</td>
                    <td className="px-6 py-4">{record.list_for}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center py-7 px-2">
           
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
        </>
      )}
    </>
  );
};

export default Listing;
