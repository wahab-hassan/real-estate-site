"use client";
import { readPaginatedRecords } from "@/lib/crud";
import React, { useEffect, useState } from "react";
import Card from "../Card";

const FeaturedListing = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(8); 
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

  return (
    <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-none lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
      {records.map((value: any) => {
        return <Card key={value.id} property={value} />;
      })}
    </div>
  );
};

export default FeaturedListing;
