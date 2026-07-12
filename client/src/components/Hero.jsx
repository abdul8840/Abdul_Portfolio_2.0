import React from "react";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeroImg from "../assets/abdulpf.jpg";
import { FaHandSpock } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="w-full min-h-[90vh] py-10 flex flex-col md:flex-row items-center gap-10 md:gap-20">
      {/* links */}
      <div className="text-xl flex flex-row md:flex-col gap-6 dark:text-white">
        <Link to="https://github.com/abdul8840?tab=repositories
" target="_blank" rel="noreferrer">
          <FaGithub />
        </Link>
        <Link to="https://www.linkedin.com/in/abdul-rahman-290662220
" target="_blank" rel="noreferrer">
          <FaLinkedin />
        </Link>
        <Link to='#' >
          <FaDiscord />
        </Link>
      </div>
      {/* leftside */}
      <div className="flex-1 order-1 md:order-none">
        <span className="text-2xl text-gray-500 block mb-1">Hello, I Am</span>
        <Link to="/" className="font-bold text-[#222] dark:text-white text-5xl">
          Abdul Rahman
        </Link>
        <div className="flex items-center mt-3">
          <div className="h-[1px] bg-[#222] w-[70px] dark:bg-white mr-4"></div>
          <span className="text-xl md:2xl font-[600] dark:text-white">
            Full Stack Web Developer
          </span>
        </div>
        <p className="text-sm mt-5 font-[500] text-gray-500">
          I'm a creative web designer based in Maharastra India, and i'm very
          passionate and dedicated to my work.
        </p>
        <button className="flex gap-2 py-4  bg-[#222] hover:bg-[#111] text-white dark:bg-white dark:text-black font-bold px-8 rounded-[20px] mt-8 md:mt-10 text-xl"><a href="#helloCont">Say Hii</a>
          <FaHandSpock className="mt-1" /></button>
      </div>
      {/* right side */}
      <div className="">
        <img
          src={HeroImg}
          alt=""
          className="home-img border-4 dark:border-gray-600"
        />
      </div>
    </div>
  );
};

export default Hero;
