import React, { useState } from "react";
import { FaArrowRight, FaTelegram } from "react-icons/fa";
import { IoMdMail, IoLogoWhatsapp } from "react-icons/io";
import { Button, TextInput, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";

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
      <div className="mb-8">
        <h2 className="text-center text-4xl font-bold">Get In Touch</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          Contact Me
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h3 className="text-xl text-center font-bold">Talk to me via</h3>
          <div className="w-full flex flex-col justify-center gap-5">
            <div className="w-[300px] mt-10 mx-auto text-center border-2 rounded-lg p-2">
              <IoMdMail className="block w-full mx-auto text-4xl my-2" />
              <h2 className="text-xl font-bold">Email</h2>
              <p className="text-lg font-semibold my-1">
                abdul14941naseer@gmail.com
              </p>
              <a
                className="text-md flex items-center justify-center gap-1"
                href="mailto:abdul14941naseer@gmail.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                Write me <FaArrowRight className="mt-1" />
              </a>
            </div>

            <div className="w-[300px] mt-5 mx-auto text-center border-2 rounded-lg p-2">
              <IoLogoWhatsapp className="block w-full mx-auto text-4xl my-2" />
              <h2 className="text-xl font-bold">Whatsapp</h2>
              <p className="text-lg font-semibold my-1">+91 8840351748</p>
              <a
                className="text-md flex items-center justify-center gap-1"
                href="https://wa.me/+918840351748"
                target="_blank"
                rel="noreferrer noopener"
              >
                Write me <FaArrowRight className="mt-1" />
              </a>
            </div>

            <div className="w-[300px] mt-5 mx-auto text-center border-2 rounded-lg p-2">
              <FaTelegram className="block w-full mx-auto text-4xl my-2" />
              <h2 className="text-xl font-bold">Telegram</h2>
              <p className="text-lg font-semibold my-1">+91 8840351748</p>
              <a
                className="text-md flex items-center justify-center gap-1"
                href="https://t.me/@abdul8840"
                target="_blank"
                rel="noreferrer noopener"
              >
                Write me <FaArrowRight className="mt-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl text-center font-bold">Contact Form</h3>

          <div className="w-full flex flex-col justify-center gap-5">
            <form
              onSubmit={handleSubmit}
              className="w-full mt-10 border-2 border-gary-500 p-5 rounded-xl"
            >
              <div className="my-3 text-center text-xl font-bold">
                Send Message
              </div>
              <div className="">
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
              <div className="mt-5">
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
              <div className="mt-5">
                <Textarea
                  id="message"
                  placeholder="Enter Your Message"
                  className="w-full p-2 text-md font-semibold text-gray-700 h-60 mt-2"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full flex gap-2 py-2 bg-[#222] hover:bg-[#111] text-white dark:bg-white dark:text-black font-bold px-8 rounded-[20px] mt-8 md:mt-7 text-xl"
              >
                Submit
              </Button>
              {errors && (
                <Alert color='failure' className=" my-2">{errors}</Alert>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
