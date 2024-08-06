"use client";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const ContactForm = () => {
  const [value, setValue] = useState();
  return (
    <form action="" className="my-3 flex items-center flex-col gap-3">
      <input
        type="text"
        className="bg-white py-2 px-3 border text-sm rounded-md border-border/50 w-full"
        placeholder="Name"
      />
      <PhoneInput
        className="bg-white py-2 px-3 border text-sm rounded-md border-border/50 w-full"
        placeholder="Phone Number"
        value={value}
        onChange={(e: any) => {
          console.log(e);
          setValue(e);
        }}
      />
      <input
        type="text"
        className="bg-white py-2 px-3 border text-sm rounded-md border-border/50 w-full"
        placeholder="Email"
      />
      <textarea className="bg-white py-2 px-3 border text-sm rounded-md border-border/50 w-full" placeholder="Message" ></textarea>
      <button className="btn btn-secondary py-2 px-3 text-sm w-full">Send Message</button>
    </form>
  );
};

export default ContactForm;
