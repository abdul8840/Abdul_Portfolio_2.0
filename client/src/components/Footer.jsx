import {
  FaGithub,
  FaLinkedin,
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Reveal from "./Reveal";

const socialLinks = [
  {
    icon: FaGithub,
    to: "https://github.com/abdul8840?tab=repositories",
    external: true,
  },
  {
    icon: FaLinkedin,
    to: "https://www.linkedin.com/in/abdul-rahman-290662220",
    external: true,
  },
  { icon: FaDiscord, to: "#", external: false },
  {
    icon: FaInstagram,
    to: "https://www.instagram.com/_abdul_0_rahman_?igsh=MXV6eTZjMjBudzZrYQ==",
    external: true,
  },
  {
    icon: FaTwitter,
    to: "https://www.linkedin.com/in/abdul-rahman-naseer-290662220?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    external: true,
  },
  {
    icon: FaFacebook,
    to: "https://www.facebook.com/abdulrahman.laiq.7?mibextid=ZbWKwL",
    external: true,
  },
];

const navLinkClass =
  "relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-linear-to-r after:from-pink-500 after:to-purple-600 after:transition-all after:duration-300 hover:after:w-full hover:text-pink-500 transition-colors duration-300";

const Footer = () => {
  return (
    <footer className="relative pt-10 pb-10">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 via-purple-600 to-pink-500" />
      <Reveal className="w-full max-w-3xl mx-auto text-center">
        <h2 className="my-10 text-xl sm:text-4xl font-bold">Abdul Rahman</h2>

        <div className="flex justify-center font-semibold text-xl mb-5 gap-5">
          <Link to="/" className={navLinkClass}>
            <span>Home</span>
          </Link>
          <Link to="/reviews" className={navLinkClass}>
            <span>Testimonials</span>
          </Link>
        </div>

        <div className="flex justify-center text-2xl mb-5 gap-5">
          {socialLinks.map(({ icon: Icon, to, external }, index) => (
            <motion.a
              key={index}
              href={to}
              whileHover={{ scale: 1.15, rotate: -8 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#333] text-white p-2 rounded-lg dark:bg-white dark:text-[#333] transition-colors duration-300 hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white dark:hover:text-white"
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        <div className="flex justify-center text-sm font-semibold mb-10 gap-5">
          <p>&copy; Abdul Rahman. All rights reserved.</p>
        </div>
      </Reveal>
    </footer>
  );
};

export default Footer;
