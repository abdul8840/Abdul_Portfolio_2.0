import HeroImg from "../assets/abdulpf.jpg";
import Resume from "../assets/Abdul_Rahman_cv.pdf";
import { FaBriefcase } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { motion } from "motion/react";
import Reveal from "./Reveal";

const stats = [
  { icon: FaBriefcase, title: "Completed", value: "10 + Projects" },
  { icon: MdSupportAgent, title: "Support", value: "Online 24/7" },
];

const About = () => {
  return (
    <div id="about" className="mt-10">
      <Reveal className="mb-14">
        <h2 className="text-center text-4xl font-bold">About Me</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Introduction
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600" />
      </Reveal>
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
        {/* left */}
        <Reveal direction="left" className="flex-1">
          <motion.img
            src={HeroImg}
            alt=""
            whileHover={{ scale: 1.03, rotate: -1 }}
            transition={{ duration: 0.4 }}
            className="w-[350px] h-[400px] object-cover justify-self rounded-2xl shadow-xl shadow-pink-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-500"
          />
        </Reveal>

        {/* right */}
        <Reveal direction="right" className="flex-1">
          <div className="flex flex-wrap gap-5 justify-center md:justify-start">
            {stats.map(({ icon: Icon, title, value }, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-[150px] h-[160px] border-[8px] text-center border-[#ddd] dark:border-gray-700 p-5 rounded-[20px] hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/20 transition-[border-color,box-shadow] duration-300"
              >
                <Icon className="w-full mx-auto mb-2 text-3xl text-[#333] dark:text-white" />
                <h3 className="text-lg font-semibold mb-1 text-[#333] dark:text-white">
                  {title}
                </h3>
                <p className="text-center text-sm text-gray-500">{value}</p>
              </motion.div>
            ))}
          </div>
          <div className="w-full mt-10">
            <p className="text-lg text-gray-500">
              I&apos;m Abdul, a passionate and dedicated developer with a
              strong focus on building scalable, efficient, and
              user-friendly applications.
            </p>
          </div>
          <motion.a
            download="Abdul_Rahman_cv.pdf"
            href={Resume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group relative w-[250px] flex gap-4 items-center overflow-hidden py-4 px-8 mt-8 md:mt-10 text-xl font-bold rounded-[20px] bg-[#222] text-white dark:bg-white dark:text-black shadow-lg hover:shadow-pink-500/40 transition-shadow duration-500"
          >
            <span className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10">Download CV</span>
            <IoDocumentText className="relative z-10 text-3xl" />
          </motion.a>
        </Reveal>
      </div>
    </div>
  );
};

export default About;
