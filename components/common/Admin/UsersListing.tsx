"use client";
import {
  deleteRecord,
  getFilteredUsers,
  getTotalUsers,
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
import Link from "next/link";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSort } from "react-icons/bi";
import { Switch } from "@/components/ui/switch";

const UsersListing = () => {
  const url = usePathname();
  const router = useParams();
  const userID: any = router.id;
  const [users, setUsers]: any = useState();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalUsers, setTotalUsers] = useState(0);
  const [limit, setLimit] = useState(5); // Default number of users per page
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<any>("");

  useEffect(() => {
    fetchUsers(page, limit);
  }, [page, limit, sortBy, sortOrder]);

  useEffect(() => {
    getCount();
  }, []);

  const deleteUser = async (userId: any) => {
    const isConfirm = confirm("Are you sure you want to delete this user?");
    if (isConfirm) {
      await deleteRecord("adminusers", userId);
      fetchUsers(page, limit);
      toast.success("User Deleted Successfully", {
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

    const filteredUsers: any = await getFilteredUsers(
      "users",
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      search
    );

    setUsers(filteredUsers.data);
  };

  const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    const options: any = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getCount = async () => {
    const count: any = await getTotalUsers("adminusers");
    setTotalUsers(count);
  };

  const handleNextPage = () => {
    if (page * limit < totalUsers) {
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
    setPage(1);
  };

  const startingIndex = (page - 1) * limit + 1;
  const endingIndex = Math.min(page * limit, totalUsers);
  const totalPages = Math.ceil(totalUsers / limit);

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

  const fetchUsers = async (page: any, limit: any) => {
    setLoading(true);
    try {
      const data: any = await getFilteredUsers(
        "users",
        page,
        limit,
        sortBy,
        sortOrder,
        [],
        null
      );
      console.log(data.data);

      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleIsActive = (user: any) => {
    const isConfirm = confirm(
      `Are you sure you want to ${
        user.is_active ? "deactivate" : "activate"
      } this user?`
    );
    if (isConfirm) {
      const updatedUser = { ...user, is_active: !user.is_active };
      updateRecord("adminusers  ", user.id, updatedUser).then(() => {
        toast.success(
          `User ${user.is_active ? "deactivated" : "activated"} Successfully`,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      });
      fetchUsers(page, limit);
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
              <div className="w-full sm:w-96">
                <label htmlFor="" className="text-sm font-medium">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Name, Email, Phone"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white border mt-1 border-border/30 rounded-md w-full text-sm p-2"
                />
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
                <tr>
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
                      handleSort("phone");
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
                      handleSort("created_at");
                    }}
                  >
                    Created On{" "}
                    <span className="">
                      <BiSort className="text-sm inline-block" />
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-[12px] text-nowrap w-32 cursor-pointer"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user: any) => (
                  <tr
                    className="bg-white border-b h-[70px] "
                    key={user.id}
                    onClick={() => {}}
                  >
                    <td className="px-6 py-3">
                      <span className="">{user.id}</span>
                    </td>
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3">{user.phone}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">{formatDate(user.created_at)}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center">
                        <Switch
                          checked={user.is_active}
                          onCheckedChange={() => toggleIsActive(user)}
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[14px] flex justify-between gap-x-2 items-center">
                      <button
                        className="btn btn-outline hover:bg-red-500 px-2 py-2"
                        onClick={() => deleteUser(user.id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ToastContainer />
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
                  disabled={page * limit >= totalUsers}
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
                    {startingIndex}- {endingIndex} of {totalUsers}
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
    </>
  );
};

export default UsersListing;
