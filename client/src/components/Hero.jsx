import { FaDiscord, FaGithub, FaHandSpock, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import HeroImg from "../assets/abdulpf.jpg";

const socialLinks = [
  { href: "https://github.com/abdul8840?tab=repositories", icon: FaGithub },
  {
    href: "https://www.linkedin.com/in/abdul-rahman-290662220",
    icon: FaLinkedin,
  },
  { href: "#", icon: FaDiscord },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = () => {
  return (
    <div className="relative w-full min-h-[90vh] py-10 flex flex-col md:flex-row items-center gap-10 md:gap-20 overflow-hidden">
      {/* animated gradient blobs */}
      <div className="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-pink-500/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-10 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* social links */}
      <motion.div
        className="text-xl flex flex-row md:flex-col gap-6 dark:text-white"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {socialLinks.map(({ href, icon: Icon }, index) => (
          <motion.a
            key={index}
            href={href}
            target="_blank"
            rel="noreferrer"
            variants={item}
            whileHover={{ scale: 1.25, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            className="inline-block transition-colors hover:text-pink-500"
          >
            <Icon />
          </motion.a>
        ))}
      </motion.div>

      {/* leftside */}
      <motion.div
        className="flex-1 order-1 md:order-0"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.span
          variants={item}
          className="text-2xl text-gray-500 block mb-1"
        >
          Hello, I Am
        </motion.span>
        <motion.div variants={item}>
          <Link
            to="/"
            className="font-bold text-[#222] dark:text-white text-5xl transition-all duration-500 hover:bg-clip-text hover:text-transparent hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-600"
          >
            Abdul Rahman
          </Link>
        </motion.div>
        <motion.div variants={item} className="flex items-center mt-3">
          <div className="h-0.5 bg-linear-to-r from-pink-500 to-purple-600 w-17.5 mr-4"></div>
          <span className="text-xl md:2xl font-[600] dark:text-white">
            Full Stack Web Developer
          </span>
        </motion.div>
        <motion.p
          variants={item}
          className="text-sm mt-5 font-medium text-gray-500 max-w-md"
        >
          I&apos;m a creative web designer based in Maharastra India, and
          i&apos;m very passionate and dedicated to my work.
        </motion.p>
        <motion.a
          variants={item}
          href="#helloCont"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="group relative inline-flex gap-2 items-center overflow-hidden py-4 px-8 mt-8 md:mt-10 text-xl font-bold rounded-[20px] bg-[#222] text-white dark:bg-white dark:text-black shadow-lg hover:shadow-pink-500/40 transition-shadow duration-500"
        >
          <span className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10">Say Hii</span>
          <FaHandSpock className="relative z-10 mt-1" />
        </motion.a>
      </motion.div>

      {/* right side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.3 },
          scale: { duration: 0.8, delay: 0.3 },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.1,
          },
        }}
      >
        <img
          src={HeroImg}
          alt=""
          className="home-img border-4 dark:border-gray-600"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
