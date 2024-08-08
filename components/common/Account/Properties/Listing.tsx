"use client";
import { readPaginatedRecords, readRecords } from "@/lib/crud";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

const Listing = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(10); // Default number of records per page
  const [loading, setLoading] = useState(false);
  const [user, setUser]: any = useState();
  useEffect(() => {
    fetchRecords(page, limit);
  }, [user, page, limit]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")!));
  }, []);

  const fetchRecords = async (page: any, limit: any) => {
    setLoading(true);
    try {
      const { records, count }: any = await readRecords(
        "property",
        { created_by: user?.id},
        limit,
        page
      );
      setRecords(records);
      setTotalRecords(count);
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
        <div className="relative overflow-x-auto shadow-md shadow-dark/10 sm:rounded-lg m-6 ">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className="text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {/* <tbody>
              <tr className="bg-white  border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white  border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody> */}
          </table>
        </div>
      )}
    </>
  );
};

export default Listing;
