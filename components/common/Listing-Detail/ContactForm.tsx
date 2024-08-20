"use client";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRecord } from "@/lib/crud";

const ContactForm = ({ recordData }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      toast.info("Please fill out all fields.", {
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
      return;
    }

    // Prepare data to be saved
    const dataToSave = { ...formData, related_to: JSON.stringify(recordData) };

    try {
      // Save the data to the database
      console.log(dataToSave);
      
      await createRecord("messages", dataToSave);

      // Display success message
      toast.success(
        "Message sent Successfully, Our Agent will contact you shortly",
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

      // Clear form
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Failed to send the message. Please try again.", {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="my-3 flex items-center flex-col gap-3"
    >
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={handleInputChange}
        className="bg-white py-2 px-3 border text-sm rounded-md border-border/50 w-full"
        placeholder="Name"
      />
      <PhoneInput
        id="phone"
        className="bg-white py-2 px-3 border text-sm rounded-md border-border/50 w-full"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value || "" })}
      />
      <input
        type="text"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
        className="bg-white py-2 px-3 border text-sm rounded-md border-border/50 w-full"
        placeholder="Email"
      />
      <textarea
        id="message"
        value={formData.message}
        onChange={handleInputChange}
        className="bg-white py-2 px-3 border text-sm rounded-md border-border/50 w-full"
        placeholder="Message"
      />
      <button
        type="submit"
        className="btn btn-secondary py-2 px-3 text-sm w-full"
      >
        Send Message
      </button>
      <ToastContainer/>
    </form>
  );
};

export default ContactForm;
