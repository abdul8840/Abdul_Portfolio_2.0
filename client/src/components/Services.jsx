import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";

const Services = () => {
  const [userServices, setUserServices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch("/api/service/getservice");
        const data = await res.json();
        if (res.ok) {
          setUserServices(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchService();
  }, []);

  const handleViewMoreClick = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  return (
    <div className="mb-20 mt-10">
      <Reveal className="mb-10">
        <h2 className="text-center text-4xl font-bold">Services</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          What I Offer
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600" />
      </Reveal>

      <StaggerGroup className="w-full flex flex-wrap items-center justify-center gap-10 md:gap-5">
        {userServices.map((service) => (
          <StaggerItem key={service._id}>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group w-[250px] border-2 border-gray-300 dark:border-gray-700 rounded-[1rem] p-[1.25rem] hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-xl hover:shadow-pink-500/10 transition-[border-color,box-shadow] duration-300"
            >
              <motion.img
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-[50px] mb-5"
                src={service.image}
                alt={service.serviceTitle}
              />
              <h3 className="text-xl font-bold">{service.serviceTitle}</h3>
              <p
                onClick={() => handleViewMoreClick(service)}
                className="mt-5 flex items-center gap-1 text-gray-500 cursor-pointer group-hover:text-pink-500 transition-colors duration-300"
              >
                View More
                <FaArrowRightLong className="mt-0.5 transition-transform duration-300 group-hover:translate-x-1" />
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          {selectedService && (
            <div className="">
              <div className="text-center">
              <img className="w-[100px] block mx-auto mb-10" src={selectedService.image} alt={selectedService.serviceTitle} />
              <h1 className="text-2xl font-bold">{selectedService.serviceTitle}</h1>
            </div>
            <p className="mt-10 mb-5">{selectedService.serviceDescription}</p>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Services;
