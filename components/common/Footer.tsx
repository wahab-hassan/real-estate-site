import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light/30  border-t-[1px] border-border/80 absolute bottom-0 w-full">
      <div className="mx-auto w-11/12 px-4 py-4 sm:px-6 lg:px-8 flex flex-row gap-x-4">
        © 2024 비앤비마켓
        <li>Terms</li>
        <li>Sitemap</li>
        <li>Privacy</li>
        <li>Have Feedback?</li>
      </div>
    </footer>
  );
};

export default Footer;
