import Link from "next/link";
import React from "react";
import {
  LiaMapMarkerAltSolid,
  LiaEnvelope,
  LiaPhoneSolid,
  LiaFacebookF,
  LiaYoutube,
  LiaLinkedin,
  LiaTwitter,
  LiaHomeSolid,
} from "react-icons/lia";
const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto w-11/12 px-4 pb-6 pt-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex justify-center sm:justify-start">
            <h1>
              ABNB <span className="text-third text-5xl -ml-2">.</span>
            </h1>
          </div>

          <p className="mt-4 max-w-md mx-auto sm:mx-0 text-center leading-relaxed  sm:text-left lg:mt-0">
            Leading vacation rental property management and real estate agency
            in Bali.Trusted vacation rental investment consultants and reliable
            partners for all Bali property services, offering end to end
            solutions for real estate investors, landlords and tenants.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-gray-100 pt-16 md:grid-cols-4 lg:grid-cols-6">
          <div className="text-center sm:text-left col-span-1 md:col-span-2 lg:col-span-1">
            <h3>Company</h3>

            <ul className="mt-8 space-y-4">
              <li>
                <Link href={'/'} className="text-md hover:underline" >
                  Home
                </Link>
              </li>

              <li>
                <Link href="/" className="text-md hover:underline">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/listing" className="text-md hover:underline">
                  Listing
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left  col-span-1 md:col-span-2 lg:col-span-1">
            <h3>Contact Us</h3>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center text-md mb-6 text-sm text-nowrap hover:text-third transition-all ease-in-out">
                <span className="border-[1px] border-border/20 p-2 rounded-full mr-4">
                  <LiaMapMarkerAltSolid className="icon" />
                </span>{" "}
                1426 Center StreetBend, 97702, California, USA
              </li>
              <li className="flex items-center text-md mb-6 text-sm text-nowrap hover:text-third transition-all ease-in-out">
                <span className="border-[1px] border-border/20 p-2 rounded-full mr-4">
                  <LiaPhoneSolid className="icon" />
                </span>{" "}
                +415-864-8728-99
              </li>
              <li className="flex items-center text-md mb-6 text-sm text-nowrap hover:text-third transition-all ease-in-out">
                <span className="border-[1px] border-border/20 p-2 rounded-full mr-4">
                  <LiaEnvelope className="icon" />
                </span>{" "}
                support@abnb.com
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left md:col-span-4 lg:col-span-4 lg:ml-auto">
            <h3>Subscribe for Update</h3>

            <div className="mx-auto mt-8 max-w-md sm:ms-0">
              <p className="text-left leading-relaxed  ltr:sm:text-left rtl:sm:text-right">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
                id, iure consectetur et error hic!
              </p>

              <form className="mt-4">
                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                  <label className="sr-only">Email</label>

                  <input
                    className="w-full rounded-md border-border/30 px-6 py-3 shadow-md"
                    type="email"
                    placeholder="Enter your email"
                  />

                  <button className="btn btn-secondary" type="submit">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-6 sm:flex sm:items-center sm:justify-between">
          <p className="text-center text-sm  sm:text-left">
            Copyright &copy; 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
