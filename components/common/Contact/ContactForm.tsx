"use client";
import { createRecord } from "@/lib/crud";
import React, { useState } from "react";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const t = useTranslations('ContactPage')
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !phone || !message) {
      toast.error(t('error'), {
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

    setIsSubmitting(true);

    try {
      await createRecord("messages", { name, email, phone, message });

      toast.info(
        t('success'),
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

      // Reset form after successful submission
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error(
        t('error2'),
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium  dark:text-gray-300"
        >
          {t('name')}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow-sm  border border-border/40  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder={t('name')}
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium  dark:text-gray-300"
        >
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow-sm  border border-border/40  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="example@example.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium  dark:text-gray-300"
        >
          {t('phone')}
        </label>
        <PhoneInputWithCountrySelect
          id="subject"
          value={phone}
          onChange={(e: any) => setPhone(e)}
          className="block p-3 w-full text-sm   rounded-lg border border-border/40 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="+1234567890"
          required
        />
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium  dark:text-gray-400"
        >
          {t('message')}
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block p-2.5 w-full h-40 text-sm   rounded-lg shadow-sm border border-border/40 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="어떻게 도와드릴 수 있는지 알려주세요."
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn btn-secondary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "제출 중..." : t('contactBtn')}
      </button>
      <ToastContainer />
    </form>
  );
};

export default ContactForm;
