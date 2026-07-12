import { useState } from "react";
import { FaArrowRight, FaTelegram } from "react-icons/fa";
import { IoMdMail, IoLogoWhatsapp } from "react-icons/io";
import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";

const contactMethods = [
  {
    icon: IoMdMail,
    title: "Email",
    value: "abdul14941naseer@gmail.com",
    href: "mailto:abdul14941naseer@gmail.com",
  },
  {
    icon: IoLogoWhatsapp,
    title: "Whatsapp",
    value: "+91 8840351748",
    href: "https://wa.me/+918840351748",
  },
  {
    icon: FaTelegram,
    title: "Telegram",
    value: "+91 8840351748",
    href: "https://t.me/@abdul8840",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/contact/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser._id,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if(res.ok){
        setFormData('')
      }
      if (!res.ok) {
        setErrors(data.message || 'Something went wrong');
      } else {
        setErrors(null);
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <div className="my-20" id="helloCont">
      <Reveal className="mb-8">
        <h2 className="text-center text-4xl font-bold">Get In Touch</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          Contact Me
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600" />
      </Reveal>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h3 className="text-xl text-center font-bold">Talk to me via</h3>
          <StaggerGroup className="w-full flex flex-col justify-center gap-5">
            {contactMethods.map(({ icon: Icon, title, value, href }, index) => (
              <StaggerItem key={title} className={index === 0 ? 'mt-10' : 'mt-5'}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group w-[300px] mx-auto text-center border-2 border-gray-300 dark:border-gray-700 rounded-lg p-2 hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/10 transition-[border-color,box-shadow] duration-300"
                >
                  <Icon className="block w-full mx-auto text-4xl my-2 transition-transform duration-300 group-hover:scale-110 group-hover:text-pink-500" />
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="text-lg font-semibold my-1">{value}</p>
                  <a
                    className="text-md flex items-center justify-center gap-1 group-hover:text-pink-500 transition-colors"
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Write me{' '}
                    <FaArrowRight className="mt-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal direction="right" className="flex-1">
          <h3 className="text-xl text-center font-bold">Contact Form</h3>

          <div className="w-full flex flex-col justify-center gap-5">
            <form
              onSubmit={handleSubmit}
              className="w-full mt-10 border-2 border-gray-300 dark:border-gray-700 hover:border-pink-500/50 p-5 rounded-xl transition-colors duration-500"
            >
              <div className="my-3 text-center text-xl font-bold">
                Send Message
              </div>
              <div className="rounded-lg transition-shadow duration-300 focus-within:shadow-lg focus-within:shadow-pink-500/20">
                <TextInput
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  className="w-full p-2 text-md font-semibold text-gray-700"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="mt-5 rounded-lg transition-shadow duration-300 focus-within:shadow-lg focus-within:shadow-pink-500/20">
                <TextInput
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  className="w-full p-2 text-md font-semibold text-gray-700"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="mt-5 rounded-lg transition-shadow duration-300 focus-within:shadow-lg focus-within:shadow-pink-500/20">
                <Textarea
                  id="message"
                  placeholder="Enter Your Message"
                  className="w-full p-2 text-md font-semibold text-gray-700 h-60 mt-2"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  className="group relative w-full overflow-hidden flex gap-2 py-2 bg-[#222] hover:bg-[#111] text-white dark:bg-white dark:text-black font-bold px-8 rounded-[20px] mt-8 md:mt-7 text-xl"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 w-full text-center">Submit</span>
                </Button>
              </motion.div>
              {errors && (
                <Alert color='failure' className=" my-2">{errors}</Alert>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Contact;
