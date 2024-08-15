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
import Card from "../../Card";
const FavoriteListing = () => {
  const url = usePathname();
  const router = useParams();
  const userID: any = router.id;
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // Default number of records per page
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(page, limit);

    fetchRecords(page, limit);
  }, [page, limit]);

  useEffect(() => {
    fetchRecords(page, limit);
  }, []);

  const deleteProperty = async (recordId: any) => {
    const isConfirm = confirm(
      "Are you sure you want to remove this Property from Favorites?"
    );
    if (isConfirm) {
      try {
        await deleteRecord("favorite", recordId);
        fetchRecords(page, limit);
        toast.success("Property removed from Favorites", {
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
      } catch (error) {
        toast.error("Failed to remove Property from Favorites", {
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
    }
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

          <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
            {records.map((value: any) => {
              return <Card key={value.id} property={value} />;
            })}
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default FavoriteListing;
