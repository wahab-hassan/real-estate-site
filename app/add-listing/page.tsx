"use client";
import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import Footer2 from "@/components/common/Footer2";
import Navbar2 from "@/components/common/Navbar2";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { Select } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import { MdAdd, MdRemove } from "react-icons/md";
import { storePropertyData, uploadImages } from "@/lib/crud";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/common/Loader";

const amenities = [
  { id: 1, value: "air_conditioning", label: "Air Conditioning" },
  { id: 2, value: "airport_pickups", label: "Airport pick-up" },
  { id: 3, value: "baby_crib", label: "Baby crib" },
  { id: 4, value: "baby_stroller", label: "Baby stroller" },
  { id: 5, value: "bathtub", label: "Bathtub" },
  { id: 6, value: "bbq_grill", label: "BBQ Grill" },
  { id: 7, value: "beachfront", label: "Beachfront" },
  { id: 8, value: "bed_linens_towels", label: "Bed linens, towels" },
  { id: 9, value: "blender", label: "Blender" },
  { id: 10, value: "breakfast", label: "Breakfast" },
  { id: 11, value: "breakfast_free", label: "Breakfast (free)" },
  { id: 12, value: "car_parking", label: "Car Parking" },
  { id: 13, value: "coffee_maker", label: "Coffee Maker" },
  { id: 14, value: "cooking_basics", label: "Cooking basics" },
  { id: 15, value: "dining_table", label: "Dining table" },
  { id: 16, value: "dishes_silverware", label: "Dishes and silverware" },
  { id: 17, value: "extra_bed", label: "Extra bed" },
  { id: 18, value: "fire_extinguisher", label: "Fire extinguisher" },
  { id: 19, value: "first_aid_kit", label: "First aid kit" },
  { id: 20, value: "garden_backyard", label: "Garden/Backyard" },
  { id: 21, value: "hair_dryer", label: "Hair dryer" },
  { id: 22, value: "hangers", label: "Hangers" },
  { id: 23, value: "high_chair", label: "High chair" },
  { id: 24, value: "hot_water", label: "Hot Water" },
  { id: 25, value: "iron", label: "Iron" },
  { id: 26, value: "laundry_service", label: "Laundry service" },
  { id: 27, value: "microwave", label: "Microwave" },
  { id: 28, value: "mosquito_net", label: "Mosquito net" },
  { id: 29, value: "ocean_view", label: "Ocean View" },
  { id: 30, value: "outdoor_bbq", label: "Outdoor BBQ" },
  { id: 31, value: "outdoor_furniture", label: "Outdoor furniture" },
  { id: 32, value: "outdoor_shower", label: "Outdoor Shower" },
  { id: 33, value: "oven", label: "Oven" },
  {
    id: 34,
    value: "patio_balcony_private",
    label: "Patio or Balcony (Private)",
  },
  { id: 35, value: "patio_balcony_shared", label: "Patio or Balcony (Shared)" },
  { id: 36, value: "pool_gate", label: "Pool gate" },
  { id: 37, value: "private_chef", label: "Private chef" },
  { id: 38, value: "private_driver", label: "Private driver" },
  { id: 39, value: "private_kitchen", label: "Private kitchen" },
  { id: 40, value: "reception", label: "Reception" },
  { id: 41, value: "refrigerator", label: "Refrigerator" },
  { id: 42, value: "safe_box", label: "Safe Box" },
  { id: 43, value: "saltwater_pool", label: "Saltwater Pool" },
  { id: 44, value: "security", label: "Security" },
  { id: 45, value: "shampoo", label: "Shampoo" },
  { id: 46, value: "shared_kitchen", label: "Shared Kitchen" },
  { id: 47, value: "tv", label: "TV" },
  { id: 48, value: "cable_tv", label: "Cable TV" },
  { id: 49, value: "smart_tv", label: "Smart TV" },
  { id: 50, value: "toaster", label: "Toaster" },
  { id: 51, value: "wardrobe", label: "Wardrobe" },
  { id: 52, value: "washing_machine", label: "Washing Machine" },
  { id: 53, value: "pool_private", label: "Pool private" },
  { id: 54, value: "pool_shared", label: "Pool shared" },
  { id: 55, value: "part_of_the_complex", label: "Part of the complex" },
];

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

  useEffect(() => {
    setUser(
      JSON.parse(localStorage.getItem("sb-bttvroyktkjlseeiblwt-auth-token")!)
    );
  }, []);

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
      created_by: user?.user.id,
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
        console.log(urls);
        console.log(data);
        storePropertyData(data, rent, sell).then((response: any) => {
          console.log("Property data stored successfully:", response);
          setisLoading(false);
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
  };

  return isLoading ? (
    <div className="w-screen h-screen">
      <Loader />
    </div>
  ) : (
    <>
      <Navbar2 />
      <main className="w-full pt-52">
        <div className="text-center w-full">
          <h2>Listing Form</h2>
          <p>Fill this form and our manager will get back to you shortly.</p>
        </div>
        <div className="w-full flex justify-center items-center my-8">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="w-11/12 md:w-9/12 lg:w-8/12 xl:w-7/12 mx-auto border border-border/50 shadow-xl shadow-dark/10 rounded-md py-6 px-3 flex flex-col md:flex-row gap-3 flex-wrap"
          >
            <div className="mb-3 w-full md:w-5/12 mx-auto">
              <label htmlFor="" className="text-sm font-medium">
                Name*
              </label>
              <input
                type="text"
                placeholder="Name*"
                required
                value={name}
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
                required
                value={phoneNumber}
                onChange={(e: any) => {
                  console.log(e);
                  setPhoneNumber(e);
                }}
              />
              {errorType.some((obj: any) => obj["title"] === "phoneNumber") && (
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
                required
                value={email}
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
                required
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                value={listType}
                onChange={(e) => setListType(e.target.value)}
              >
                <option value="" selected>
                  Choose type
                </option>
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
              </Select>
              {errorType.some((obj: any) => obj["title"] === "listType") && (
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
                required
                value={listFor}
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
              {errorType.some((obj: any) => obj["title"] === "listFor") && (
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
                required
                value={propertyName}
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
                required
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                value={propertyType}
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
                required
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
              />
              {errorType.some((obj: any) => obj["title"] === "landSize") && (
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
                required
                value={buildingSize}
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
                required
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
              />
              {errorType.some((obj: any) => obj["title"] === "bedrooms") && (
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
                required
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
              />
              {errorType.some((obj: any) => obj["title"] === "bathrooms") && (
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
                required
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                value={livingRoomtype}
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
                required
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                value={poolType}
                onChange={(e) => setPoolType(e.target.value)}
              >
                <option value="" selected>
                  Choose type
                </option>
                <option value="private">Private</option>
                <option value="shared">Shared</option>
                <option value="noPool">No Pool</option>
              </Select>
              {errorType.some((obj: any) => obj["title"] === "poolType") && (
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
                required
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                value={levels}
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
              {errorType.some((obj: any) => obj["title"] === "levels") && (
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
                required
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                value={parking}
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
              {errorType.some((obj: any) => obj["title"] === "parking") && (
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
                required
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                value={furnished}
                onChange={(e) => setFurnished(e.target.value)}
              >
                <option value="" selected>
                  Choose furnishing
                </option>
                <option value="fully_furnished">Fully Furnished</option>
                <option value="semi_furnished">Semi Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </Select>
              {errorType.some((obj: any) => obj["title"] === "levels") && (
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
                  value={
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

              {errorType.some((obj: any) => obj["title"] === "levels") && (
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
                required
                value={locationPin}
                onChange={(e) => setLocationPin(e.target.value)}
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
              />
              {errorType.some((obj: any) => obj["title"] === "locationPin") && (
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
                required
                value={propertyDescrption}
                onChange={(e) => setPropertyDescription(e.target.value)}
                className="bg-white border mt-1 border-border/30 h-32 rounded-md w-full p-2"
              ></textarea>
              {errorType.some((obj: any) => obj["title"] === "description") && (
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
                        fill-rule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clip-rule="evenodd"
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
                required
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                value={landZoning}
                onChange={(e) => setlandZoning(e.target.value)}
              >
                <option value="" selected>
                  Choose Land Zoning
                </option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
              </Select>
              {errorType.some((obj: any) => obj["title"] === "levels") && (
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
                required
                className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                value={constructionStatus}
                onChange={(e) => setConstructionStatus(e.target.value)}
              >
                <option value="" selected>
                  Choose Construction Status
                </option>
                <option value="off_plan">Off Plan</option>
                <option value="under_construction">under Construction</option>
                <option value="not_started">Not started yet</option>
                <option value="completed">Completed</option>
              </Select>
              {errorType.some((obj: any) => obj["title"] === "levels") && (
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
                      required
                      value={yearlyRentalPrice}
                      onChange={(e) => setyearlyRentalPrice(e.target.value)}
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
                      required
                      value={monthlyRentalPrice}
                      onChange={(e) => setmonthlyRentalPrice(e.target.value)}
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
                      required
                      value={dailyRentalLow}
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
                      required
                      value={dailyRentalHigh}
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
                      required
                      value={dailyRentalPeak}
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
                      required
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                      value={rentalPackage}
                      onChange={(e) => setrentalPackage(e.target.value)}
                    >
                      <option value="" selected>
                        Choose Packages
                      </option>
                      <option value="non_exclusive_rental">
                        Non Exclusive Rentals
                      </option>
                      <option value="online_marketing">Online Marketing</option>
                      <option value="full_management">Full Management</option>
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
                      required
                      value={rentalNote}
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
                      required
                      value={freeHoldPrice}
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
                      required
                      value={leaseHoldPrice}
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
                      required
                      value={leaseExpiryDate}
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
                      required
                      value={leaseHoldExtensionTerm}
                      onChange={(e) =>
                        setleaseHoldExtensionTerm(e.target.value)
                      }
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    />
                    {errorType.some(
                      (obj: any) => obj["title"] === "leaseHoldExtensionTerm"
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
                      required
                      value={completionHandoverDate}
                      onChange={(e) =>
                        setcompletionHandoverDate(e.target.value)
                      }
                      className="bg-white border mt-1 border-border/30 rounded-md w-full p-2"
                    />
                    {errorType.some(
                      (obj: any) => obj["title"] === "completionHandoverDate"
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
                      required
                      value={yearBuilt}
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
                      required
                      value={noOfUnitandTypes}
                      onChange={(e) => setnoOfUnitandTypes(e.target.value)}
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
            <div className="w-11/12 mx-auto my-3">
              <button className="btn w-full py-3 btn-secondary">Submit</button>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer />
      <Footer2 />
    </>
  );
};

export default Page;
