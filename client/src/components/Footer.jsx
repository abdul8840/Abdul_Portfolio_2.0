import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer container className="border border-t-8 py-10 border-teal-500">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h2 className="my-10 text-xl sm:text-4xl font-bold">Abdul Rahman</h2>

        <div className="flex justify-center font-semibold text-xl mb-5 gap-5">
          <Link to="/" className="">
            <span>Home</span>
          </Link>
          <Link to="/reviews" className="">
            <span>Testimonials</span>
          </Link>
        </div>

        <div className="flex justify-center text-2xl mb-5 gap-5">
          <Link
            to="https://github.com/abdul8840?tab=repositories
"
            className="bg-[#333] text-white p-2 rounded-lg dark:bg-white dark:text-[#333]"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </Link>
          <Link
            to="https://www.linkedin.com/in/abdul-rahman-290662220
"
            className="bg-[#333] text-white p-2 rounded-lg dark:bg-white dark:text-[#333]"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </Link>
          <Link
            to="#"
            className="bg-[#333] text-white p-2 rounded-lg dark:bg-white dark:text-[#333]"
          >
            <FaDiscord />
          </Link>
          <Link
            to="https://www.instagram.com/_abdul_0_rahman_?igsh=MXV6eTZjMjBudzZrYQ==
"
            className="bg-[#333] text-white p-2 rounded-lg dark:bg-white dark:text-[#333]"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </Link>
          <Link
            to="https://www.linkedin.com/in/abdul-rahman-naseer-290662220?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app  "
            className="bg-[#333] text-white p-2 rounded-lg dark:bg-white dark:text-[#333]"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </Link>
          <Link
            to="https://www.facebook.com/abdulrahman.laiq.7?mibextid=ZbWKwL
"
            className="bg-[#333] text-white p-2 rounded-lg dark:bg-white dark:text-[#333]"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </Link>
        </div>

        <div className="flex justify-center text-sm font-semibold mb-10 gap-5">
          <p>&copy; Abdul Rahman. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
