import React from 'react';
import HeroImg from "../assets/abdulpf.jpg";
import Resume from "../assets/Abdul_Rahman_cv.pdf";
import { FaBriefcase } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";

const About = () => {
  return (
    <div id='about' className='mt-10'>
      <div className="mb-14">
        <h2 className='text-center text-4xl font-bold'>About Me</h2>
        <p className='text-center text-lg font-semibold text-gray-500'>My Introduction</p>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">

        {/* left */}
        <div className="flex-1">
          <img src={HeroImg} alt="" className='w-[350px] h-[400px] object-cover justify-self rounded' />
        </div>

        {/* right */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-5 justify-center md:justify-start">
            <div className="w-[150px] h-[160px] border-[8px] text-center border-[#ddd] p-5 rounded-[20px]">
            <FaBriefcase className='w-full mx-auto mb-2 text-3xl text-[#333] dark:text-white' />
              <h3 className='text-lg font-semibold mb-1 text-[#333] dark:text-white'>Completed</h3>
              <p className='text-center text-sm text-gray-500'>10 + Projects</p>
            </div>
            <div className="w-[150px] h-[160px] border-[8px] text-center border-[#ddd] p-5 rounded-[20px]">
            <MdSupportAgent className='w-full mx-auto mb-2 text-3xl text-[#333] dark:text-white' />
              <h3 className='text-lg font-semibold mb-1 text-[#333] dark:text-white'>Support</h3>
              <p className='text-center text-sm text-gray-500'>Online 24/7</p>
            </div>
          </div>
          <div className="w-full mt-10">
            <p className='text-lg text-gray-500'>I'm Abdul, a passionate and dedicated
              developer with a strong focus on building scalable, efficient, and
              user-friendly applications. </p>
          </div>
          <a download='Abdul_Rahman_cv.pdf' href={Resume} className='w-[250px] flex gap-4 py-4  bg-[#222] hover:bg-[#111] text-white dark:bg-white dark:text-black font-bold px-8 rounded-[20px] mt-8 md:mt-10 text-xl'>Download CV <IoDocumentText className="text-3xl" /></a>
        </div>
      </div>
    </div>
  )
}

export default About