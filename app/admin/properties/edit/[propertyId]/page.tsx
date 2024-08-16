"use client";
import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { Select } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import { MdAdd, MdRemove } from "react-icons/md";
import {
  getPropertiesByUser,
  storePropertyData,
  updatePropertyData,
  uploadImages,
} from "@/lib/crud";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/common/Loader";
import { amenities } from "@/lib/data/dropdownData";
import { useParams, usePathname, useRouter } from "next/navigation";
import Topbar from "@/components/common/Account/Topbar";
import Sidebar from "@/components/common/Account/Sidebar";
import Link from "next/link";

const Page = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [listType, setListType] = useState("");
  const [listFor, setListFor] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [landSize, setLandSize] = useState("");
  const [buildingSize, setBuildingSize] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [livingRoomtype, setLivingRoomType] = useState("");
  const [poolType, setPoolType] = useState("");
  const [levels, setlevels] = useState("");
  const [parking, setParking] = useState("");
  const [furnished, setFurnished] = useState("");
  const [features, setFeatures] = useState("");
  const [locationPin, setLocationPin] = useState("");
  const [imagesUrls, setImagesUrls] = useState([]);
  const [propertyDescrption, setPropertyDescription] = useState("");
  const [landZoning, setlandZoning] = useState("");
  const [constructionStatus, setConstructionStatus] = useState("");
  const [errorType, seterrorType]: any = useState([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [location, setLocation] = useState(false);
  const [selectedFeature, setSelectedFeature]: any = useState([]);
  const [leaseHoldPrice, setleaseHoldPrice] = useState("");
  const [freeHoldPrice, setfreeHoldPrice] = useState("");
  const [leaseExpiryDate, setleaseExpiryDate] = useState("");
  const [leaseHoldExtensionTerm, setleaseHoldExtensionTerm] = useState("");
  const [completionHandoverDate, setcompletionHandoverDate] = useState("");
  const [yearBuilt, setyearBuilt] = useState("");
  const [noOfUnitandTypes, setnoOfUnitandTypes] = useState("");
  const [yearlyRentalPrice, setyearlyRentalPrice] = useState("");
  const [monthlyRentalPrice, setmonthlyRentalPrice] = useState("");
  const [dailyRentalLow, setdailyRentalLow] = useState("");
  const [dailyRentalHigh, setdailyRentalHigh] = useState("");
  const [dailyRentalPeak, setdailyRentalPeak] = useState("");
  const [rentalNote, setrentalNote] = useState("");
  const [rentalPackage, setrentalPackage] = useState("");
  const [user, setUser]: any = useState();
  const [isLoading, setisLoading]: any = useState(false);
  const [propertyData, setPropertyData]: any = useState([]);
  const navigate = useRouter();
  const router = useParams();
  const propertyId: any = router.propertyId;
  const userID: any = router.id;
  const [openSide, setopenSide] = useState(false);
  const handleOpen = () => {
    setopenSide(!openSide);
  };
  useEffect(() => {
    setisLoading(true);
    console.log(propertyId, router);
    if (propertyId) {
      fetchPropertyData(propertyId);
    } else {
      setisLoading(false);
    }
  }, [propertyId]);

  const fetchPropertyData = async (id: any) => {
    // Fetch property data based on the id (you would replace this with your actual data fetching logic)
    setisLoading(true);
    try {
      const data: any = await getPropertiesByUser(
        { key: "id", value: String(id) },
        1,
        1
      );
      console.log(data);

      setPropertyData(data[0]);

      if (data[0]?.name) setName(data[0]?.name);
      if (data[0]?.phone_number) setPhoneNumber(data[0]?.phone_number);
      if (data[0]?.email) setEmail(data[0]?.email);
      if (data[0]?.list_type) setListType(data[0]?.list_type);
      if (data[0]?.list_for) setListFor(data[0]?.list_for);
      if (data[0]?.property_type) setPropertyType(data[0]?.property_type);
      if (data[0]?.property_name) setPropertyName(data[0]?.property_name);
      if (data[0]?.land_size) setLandSize(data[0]?.land_size);
      if (data[0]?.building_size) setBuildingSize(data[0]?.building_size);
      if (data[0]?.bedrooms) setBedrooms(data[0]?.bedrooms);
      if (data[0]?.bathrooms) setBathrooms(data[0]?.bathrooms);
      if (data[0]?.living_room_type)
        setLivingRoomType(data[0]?.living_room_type);
      if (data[0]?.pool_type) setPoolType(data[0]?.pool_type);
      if (data[0]?.levels) setlevels(data[0]?.levels);
      if (data[0]?.parking) setParking(data[0]?.parking);
      if (data[0]?.furnished) setFurnished(data[0]?.furnished);
      if (data[0]?.features) setFeatures(data[0]?.features);
      if (data[0]?.location_pin) setLocationPin(data[0]?.location_pin);
      if (data[0]?.images_urls) {
        setPreviewUrls(data[0]?.images_urls);
        setImagesUrls(data[0]?.images_urls);
        setUploadedUrls(data[0]?.images_urls);
        console.log(data[0]?.images_urls);
      }
      if (data[0]?.property_description)
        setPropertyDescription(data[0]?.property_description);
      if (data[0]?.land_zoning) setlandZoning(data[0]?.land_zoning);
      if (data[0]?.construction_status)
        setConstructionStatus(data[0]?.construction_status);

      if (data[0]?.selected_feature)
        setSelectedFeature(data[0]?.selected_feature);
      if (data[0]?.additionalData?.lease_hold_price)
        setleaseHoldPrice(data[0]?.additionalData?.lease_hold_price);
      if (data[0]?.additionalData?.free_hold_price)
        setfreeHoldPrice(data[0]?.additionalData?.free_hold_price);
      if (data[0]?.additionalData?.lease_expiry_date)
        setleaseExpiryDate(data[0]?.additionalData?.lease_expiry_date);
      if (data[0]?.additionalData?.lease_hold_extension_term)
        setleaseHoldExtensionTerm(
          data[0]?.additionalData?.lease_hold_extension_term
        );
      if (data[0]?.additionalData?.completion_handover_date)
        setcompletionHandoverDate(
          data[0]?.additionalData?.completion_handover_date
        );
      if (data[0]?.additionalData?.year_built)
        setyearBuilt(data[0]?.additionalData?.year_built);
      if (data[0]?.additionalData?.no_of_unit_and_types)
        setnoOfUnitandTypes(data[0]?.additionalData?.no_of_unit_and_types);
      if (data[0]?.additionalData?.yearly_rental_price)
        setyearlyRentalPrice(data[0]?.additionalData?.yearly_rental_price);
      if (data[0]?.additionalData?.monthly_rental_price)
        setmonthlyRentalPrice(data[0]?.additionalData?.monthly_rental_price);
      if (data[0]?.additionalData?.daily_rental_low)
        setdailyRentalLow(data[0]?.additionalData?.daily_rental_low);
      if (data[0]?.additionalData?.daily_rental_high)
        setdailyRentalHigh(data[0]?.additionalData?.daily_rental_high);
      if (data[0]?.additionalData?.daily_rental_peak)
        setdailyRentalPeak(data[0]?.additionalData?.daily_rental_peak);
      if (data[0]?.additionalData?.rental_note)
        setrentalNote(data[0]?.additionalData?.rental_note);
      if (data[0]?.additionalData?.rental_package)
        setrentalPackage(data[0]?.additionalData?.rental_package);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setisLoading(false);
    }
  };

  const setLocationValue = (value: string) => {
    const newSelectedLocation = selectedFeature.includes(value)
      ? selectedFeature.filter((item: any) => item !== value)
      : [...selectedFeature, value];
    setSelectedFeature(newSelectedLocation);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...previewUrls];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoading) {
      setisLoading(true);
      var data = {
        name,
        phone_number: phoneNumber,
        email,
        list_type: listType,
        list_for: listFor,
        property_type: propertyType,
        property_name: propertyName,
        land_size: Number(landSize),
        building_size: Number(buildingSize),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        living_room_type: livingRoomtype,
        pool_type: poolType,
        levels: Number(levels),
        parking,
        furnished,
        features: selectedFeature,
        location_pin: locationPin,
        images_urls: imagesUrls,
        property_description: propertyDescrption,
        land_zoning: landZoning,
        construction_status: constructionStatus,
        uploaded_urls: uploadedUrls,
        created_by: userID,
      };
      var sell = {
        lease_hold_price: Number(leaseHoldPrice),
        free_hold_price: Number(freeHoldPrice),
        lease_expiry_date: leaseExpiryDate,
        lease_hold_extension_term: leaseHoldExtensionTerm,
        completion_handover_date: completionHandoverDate,
        year_built: Number(yearBuilt),
        no_of_unit_and_types: noOfUnitandTypes,
      };
      var rent = {
        yearly_rental_price: Number(yearlyRentalPrice),
        monthly_rental_price: Number(monthlyRentalPrice),
        daily_rental_low: Number(dailyRentalLow),
        daily_rental_high: Number(dailyRentalHigh),
        daily_rental_peak: Number(dailyRentalPeak),
        rental_note: rentalNote,
        rental_package: rentalPackage,
      };

      try {
        uploadImages(selectedFiles).then((urls) => {
          setUploadedUrls(urls);

          data.images_urls = urls;
          updatePropertyData(propertyData?.id,data, rent, sell).then((response: any) => {
            console.log("Property data updated successfully:", response);
            setisLoading(false);
            setImagesUrls([]);
            setUploadedUrls([]);
            setPreviewUrls([]);
            toast.success("Listing added successfully", {
              position: "bottom-right",
              autoClose: 7000,
              delay: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            navigate.push(`/account/${userID}/properties`);
          });
        });
      } catch (error) {
        setisLoading(false);

        toast.error("Failed to add listing.", {
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

  return localStorage.getItem("adminData") === null ? (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="block text-center leading-10">
          <h1>Acccess Denied</h1>
          <p>Please Login First</p>
          <Link href={"/admin/auth/login"} className="btn btn-secondary">
            Go to Login
          </Link>
        </div>
      </div>
    </>
  ) : isLoading ? (
    <div className="w-screen h-screen">
      <Loader />
    </div>
  ) : (
    <>
     <div className="relative w-full h-screen flex items-center gap-x-4 md:gap-0 md:grid md:grid-cols-12 ">
        <div
          className={` ${
            openSide ? "block absolute w-96 " : "hidden w-full "
          } left-0 top-0  h-full md:col-span-3 md:w-auto z-50 md:inline-block lg:col-span-2`}
        >
          <Sidebar openSidebar={handleOpen} />
        </div>
        <div className="w-full  md:col-span-9 lg:col-span-10 ">
          <Topbar openSidebar={handleOpen} />
          <div className="w-full mt-20">
            <div className="w-11/12 mx-auto pt-7">
              <h2>Edit Listing</h2>
              <p>Edit Propery data that you wantz</p>
            </div>
            <main className="w-full">
              <div className="w-full flex justify-center items-center my-8">
                <form className="w-11/12  mx-auto border border-border/50 shadow-xl shadow-dark/10 rounded-md py-6 px-3 flex flex-col md:flex-row gap-3 flex-wrap">
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Name*
                    </label>
                    <input
                      type="text"
                      placeholder="Name*"
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    />
                    {errorType.some((obj: any) => obj["title"] === "name") && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <PhoneInputWithCountrySelect
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e: any) => {
                        console.log(e);
                        setPhoneNumber(e);
                      }}
                    />
                    {errorType.some(
                      (obj: any) => obj["title"] === "phoneNumber"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Email*
                    </label>
                    <input
                      type="email"
                      placeholder="Email*"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    />
                    {errorType.some((obj: any) => obj["title"] === "email") && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      List Type*
                    </label>
                    <Select
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      defaultValue={listType}
                      onChange={(e) => setListType(e.target.value)}
                    >
                      <option value="" selected>
                        Choose type
                      </option>
                      <option value="rent">Rent</option>
                      <option value="sell">Sell</option>
                    </Select>
                    {errorType.some(
                      (obj: any) => obj["title"] === "listType"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      List for*
                    </label>
                    <select
                      defaultValue={listFor}
                      onChange={(e) => setListFor(e.target.value)}
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    >
                      <option value="" selected>
                        Choose List for
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
                    {errorType.some(
                      (obj: any) => obj["title"] === "listFor"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Property Name*
                    </label>
                    <input
                      type="text"
                      placeholder="Property Name*"
                      defaultValue={propertyName}
                      onChange={(e) => setPropertyName(e.target.value)}
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    />
                    {errorType.some(
                      (obj: any) => obj["title"] === "propertyName"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Property Type*
                    </label>
                    <Select
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      defaultValue={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="" selected>
                        Choose type
                      </option>
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="land">Land</option>
                      <option value="hotel">Hotel</option>
                      <option value="commercial">Commercial</option>
                    </Select>
                    {errorType.some(
                      (obj: any) => obj["title"] === "propertyType"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Land Size, sqm*
                    </label>
                    <input
                      type="number"
                      placeholder="Land Size, sqm"
                      defaultValue={landSize}
                      onChange={(e) => setLandSize(e.target.value)}
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    />
                    {errorType.some(
                      (obj: any) => obj["title"] === "landSize"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Building Size, sqm*
                    </label>
                    <input
                      type="number"
                      placeholder="Building Size, sqm"
                      defaultValue={buildingSize}
                      onChange={(e) => setBuildingSize(e.target.value)}
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    />
                    {errorType.some(
                      (obj: any) => obj["title"] === "buildingSize"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Bedrooms*
                    </label>
                    <input
                      type="number"
                      placeholder="Bedrooms*"
                      defaultValue={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    />
                    {errorType.some(
                      (obj: any) => obj["title"] === "bedrooms"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Bathrooms*
                    </label>
                    <input
                      type="number"
                      placeholder="Bathrooms*"
                      defaultValue={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    />
                    {errorType.some(
                      (obj: any) => obj["title"] === "bathrooms"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Living Room Type*
                    </label>
                    <Select
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      defaultValue={livingRoomtype}
                      onChange={(e) => setLivingRoomType(e.target.value)}
                    >
                      <option value="" selected>
                        Choose type
                      </option>
                      <option value="open">Open</option>
                      <option value="enclosed">Enclosed</option>
                    </Select>
                    {errorType.some(
                      (obj: any) => obj["title"] === "livingRoomType"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Pool Type*
                    </label>
                    <Select
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      defaultValue={poolType}
                      onChange={(e) => setPoolType(e.target.value)}
                    >
                      <option value="" selected>
                        Choose type
                      </option>
                      <option value="private">Private</option>
                      <option value="shared">Shared</option>
                      <option value="noPool">No Pool</option>
                    </Select>
                    {errorType.some(
                      (obj: any) => obj["title"] === "poolType"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Level*
                    </label>
                    <Select
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      defaultValue={levels}
                      onChange={(e) => setlevels(e.target.value)}
                    >
                      <option value="" selected>
                        Choose Level
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </Select>
                    {errorType.some(
                      (obj: any) => obj["title"] === "levels"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Parking*
                    </label>
                    <Select
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      defaultValue={parking}
                      onChange={(e) => setParking(e.target.value)}
                    >
                      <option value="" selected>
                        Choose Parking
                      </option>
                      <option value="public_street_parking">
                        Public Street Parking
                      </option>
                      <option value="yes">Yes</option>
                      <option value="bike_parking">Bike Parking</option>
                      <option value="1_car">Yes ( 1 Car )</option>
                      <option value="2_car">Yes ( 2 Car )</option>
                      <option value="3_car">Yes ( 3 Car )</option>
                    </Select>
                    {errorType.some(
                      (obj: any) => obj["title"] === "parking"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Furnishing*
                    </label>
                    <Select
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      defaultValue={furnished}
                      onChange={(e) => setFurnished(e.target.value)}
                    >
                      <option value="" selected>
                        Choose furnishing
                      </option>
                      <option value="fully_furnished">Fully Furnished</option>
                      <option value="semi_furnished">Semi Furnished</option>
                      <option value="unfurnished">Unfurnished</option>
                    </Select>
                    {errorType.some(
                      (obj: any) => obj["title"] === "levels"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Facilities / Amenities / Features
                    </label>
                    <div
                      className="flex items-center justify-center relative cursor-pointer md:bg-transparent bg-white border 
               border-border/30 rounded-md w-full"
                    >
                      <input
                        type="text"
                        readOnly
                        defaultValue={
                          selectedFeature.length > 0
                            ? `${selectedFeature.length} Features Selected `
                            : ""
                        }
                        placeholder="Location"
                        className="bg-white border-0 w-11/12 focus:outline-none   p-2"
                        onClick={() => setLocation(!location)}
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
                          <h3>Facilities / Amenities </h3>
                          <ul className="overflow-auto h-56 my-5 w-11/12 mx-auto">
                            {amenities.map((feature: any) => {
                              return (
                                <li
                                  className="my-3 text-sm flex items-center"
                                  key={feature.id}
                                >
                                  <span
                                    className={`${
                                      selectedFeature.includes(feature.value)
                                        ? "bg-dark text-light hover:opacity-60s"
                                        : "hover:bg-light"
                                    } rounded flex justify-center items-center w-8 border-[1px] h-8 px-2  border-border/30 mr-4  transition-all ease-in-out duration-300`}
                                    onClick={() => {
                                      setLocationValue(feature.value);
                                    }}
                                  >
                                    {selectedFeature.includes(feature.value) ? (
                                      <MdRemove />
                                    ) : (
                                      <MdAdd />
                                    )}
                                  </span>
                                  {feature.label}
                                </li>
                              );
                            })}
                          </ul>
                          <div className="flex items-center gap-x-4 my-3">
                            <button
                              className="border-0 text-sm font-semibold hover:text-third transition-all ease-in-out"
                              onClick={(e: any) => {
                                e.preventDefault();
                                setSelectedFeature([]);
                              }}
                            >
                              Clear All
                            </button>
                            <button
                              className="border-0 text-sm font-semibold hover:text-third transition-all ease-in-out"
                              onClick={(e: any) => {
                                e.preventDefault();
                                setSelectedFeature(
                                  amenities.map((location: any) => {
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

                    {errorType.some(
                      (obj: any) => obj["title"] === "levels"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Location Pin*
                    </label>
                    <input
                      type="text"
                      placeholder="Location*"
                      defaultValue={locationPin}
                      onChange={(e) => setLocationPin(e.target.value)}
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    />
                    {errorType.some(
                      (obj: any) => obj["title"] === "locationPin"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-11/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Property Description
                    </label>
                    <textarea
                      placeholder="Property Description*"
                      defaultValue={propertyDescrption}
                      onChange={(e) => setPropertyDescription(e.target.value)}
                      className="bg-white border mt-1 border-border/30 h-32 rounded-md w-full p-2"
                    ></textarea>
                    {errorType.some(
                      (obj: any) => obj["title"] === "description"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-11/12 mx-auto">
                    <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Property Images
                      </label>
                      <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        {previewUrls.length > 0 ? (
                          <div className="w-full flex items-center flex-wrap">
                            {previewUrls.map((url, index) => (
                              <div className="relative" key={index}>
                                <img
                                  key={index}
                                  src={url}
                                  alt={`Preview ${index}`}
                                  className="w-44 h-44 object-cover mr-2 mb-2"
                                />
                                <button
                                  onClick={() => handleRemoveImage(index)}
                                  className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-300"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-third focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Land Zoning*
                    </label>
                    <Select
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      defaultValue={landZoning}
                      onChange={(e) => setlandZoning(e.target.value)}
                    >
                      <option value="" selected>
                        Choose Land Zoning
                      </option>
                      <option value="green">Green</option>
                      <option value="red">Red</option>
                      <option value="yellow">Yellow</option>
                    </Select>
                    {errorType.some(
                      (obj: any) => obj["title"] === "levels"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  <div className="mb-3 w-full md:w-5/12 mx-auto">
                    <label htmlFor="" className="text-sm font-medium">
                      Construction Status*
                    </label>
                    <Select
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      defaultValue={constructionStatus}
                      onChange={(e) => setConstructionStatus(e.target.value)}
                    >
                      <option value="" selected>
                        Choose Construction Status
                      </option>
                      <option value="off_plan">Off Plan</option>
                      <option value="under_construction">
                        under Construction
                      </option>
                      <option value="not_started">Not started yet</option>
                      <option value="completed">Completed</option>
                    </Select>
                    {errorType.some(
                      (obj: any) => obj["title"] === "levels"
                    ) && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        Field is required
                      </p>
                    )}
                  </div>
                  {listType === "rent" ? (
                    <>
                      <div className="w-full my-3 flex flex-col md:flex-row gap-3 flex-wrap">
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Yearly rental price, $ USD
                          </label>
                          <input
                            type="number"
                            defaultValue={yearlyRentalPrice}
                            onChange={(e) =>
                              setyearlyRentalPrice(e.target.value)
                            }
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) => obj["title"] === "yearlyRentalPrice"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Monthly rental price, $ USD
                          </label>
                          <input
                            type="number"
                            defaultValue={monthlyRentalPrice}
                            onChange={(e) =>
                              setmonthlyRentalPrice(e.target.value)
                            }
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) => obj["title"] === "monthlyRentalPrice"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Daily rental price Low Season, $ USD
                          </label>
                          <input
                            type="number"
                            defaultValue={dailyRentalLow}
                            onChange={(e) => setdailyRentalLow(e.target.value)}
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) => obj["title"] === "dailyRentalLow"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Daily rental price High Season, $ USD
                          </label>
                          <input
                            type="number"
                            defaultValue={dailyRentalHigh}
                            onChange={(e) => setdailyRentalHigh(e.target.value)}
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) => obj["title"] === "dailyRentalHigh"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Daily rental price Peak Season, $ USD
                          </label>
                          <input
                            type="number"
                            defaultValue={dailyRentalPeak}
                            onChange={(e) => setdailyRentalPeak(e.target.value)}
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) => obj["title"] === "dailyRentalPeak"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Select rental property management package
                          </label>
                          <Select
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                            defaultValue={rentalPackage}
                            onChange={(e) => setrentalPackage(e.target.value)}
                          >
                            <option value="" selected>
                              Choose Packages
                            </option>
                            <option value="non_exclusive_rental">
                              Non Exclusive Rentals
                            </option>
                            <option value="online_marketing">
                              Online Marketing
                            </option>
                            <option value="full_management">
                              Full Management
                            </option>
                          </Select>
                          {errorType.some(
                            (obj: any) => obj["title"] === "packages"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-11/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Notes
                          </label>
                          <textarea
                            defaultValue={rentalNote}
                            onChange={(e) => setrentalNote(e.target.value)}
                            className="bg-white border mt-1 border-border/30 h-32 rounded-md w-full p-2"
                          ></textarea>
                          {errorType.some(
                            (obj: any) => obj["title"] === "rentalNote"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : listType === "sell" ? (
                    <>
                      <div className="w-full my-3 flex flex-col md:flex-row gap-3 flex-wrap">
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Freehold price, $ USD
                          </label>
                          <input
                            type="number"
                            defaultValue={freeHoldPrice}
                            onChange={(e) => setfreeHoldPrice(e.target.value)}
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) => obj["title"] === "freeHoldPrice"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Leasehold price, $ USD
                          </label>
                          <input
                            type="number"
                            defaultValue={leaseHoldPrice}
                            onChange={(e) => setleaseHoldPrice(e.target.value)}
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) => obj["title"] === "leaseHoldPrice"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Lease expiry date
                          </label>
                          <input
                            type="date"
                            defaultValue={leaseExpiryDate}
                            onChange={(e) => setleaseExpiryDate(e.target.value)}
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) => obj["title"] === "leaseExpiryDate"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Leasehold extension terms
                          </label>
                          <input
                            type="text"
                            defaultValue={leaseHoldExtensionTerm}
                            onChange={(e) =>
                              setleaseHoldExtensionTerm(e.target.value)
                            }
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) =>
                              obj["title"] === "leaseHoldExtensionTerm"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Completion Handover Term & Date
                          </label>
                          <input
                            type="text"
                            defaultValue={completionHandoverDate}
                            onChange={(e) =>
                              setcompletionHandoverDate(e.target.value)
                            }
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) =>
                              obj["title"] === "completionHandoverDate"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Year Built
                          </label>
                          <input
                            type="number"
                            defaultValue={yearBuilt}
                            onChange={(e) => setyearBuilt(e.target.value)}
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) => obj["title"] === "yearBuilt"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                        <div className="mb-3 w-full md:w-5/12 mx-auto">
                          <label htmlFor="" className="text-sm font-medium">
                            Total number of units and unit types for sale
                          </label>
                          <input
                            type="text"
                            defaultValue={noOfUnitandTypes}
                            onChange={(e) =>
                              setnoOfUnitandTypes(e.target.value)
                            }
                            className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                          />
                          {errorType.some(
                            (obj: any) => obj["title"] === "noOfUnitandTypes"
                          ) && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              Field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="w-11/12 mx-auto my-3 flex justify-end items-center gap-x-5">
                    <button
                      className="btn  py-3 btn-secondary"
                      onClick={(e) =>
                        navigate.push(`/account/${userID}/properties`)
                      }
                    >
                      Cancel
                    </button>
                    <button
                      className="btn  py-3 btn-outline"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Page;
