import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button, Modal } from "flowbite-react";

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
      <div className="mb-10">
        <h2 className="text-center text-4xl font-bold">Services</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          What I Offer
        </p>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-10 md:gap-5">
        {userServices.map((service) => (
          <div key={service._id} className="w-[250px] border-2 border-gray-500 rounded-[1rem] p-[1.25rem]">
            <img className="w-[50px] mb-5" src={service.image} alt={service.serviceTitle} />
            <h3 className="text-xl font-bold">{service.serviceTitle}</h3>
            <p onClick={() => handleViewMoreClick(service)} className="mt-5 flex gap-1 text-gray-500 cursor-pointer">
              View More 
              <FaArrowRightLong className="mt-[7px]" />
            </p>
          </div>
        ))}
      </div>

      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          {selectedService && (
            <div className="">
              <div className="text-center">
              <img className="w-[100px] block mx-auto mb-10" src={selectedService.image} alt={selectedService.serviceTitle} />
              <h1 className="text-2xl font-bold">{selectedService.serviceTitle}</h1>
            </div>
            <p className="mt-10 mb-5">{selectedService.serviceDescription}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Services;
