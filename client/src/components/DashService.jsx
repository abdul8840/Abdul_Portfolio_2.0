import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashService = () => {
  const [userServices, setUserServices] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [serviceIdToDelete, setserviceIdToDelete] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `/api/service/getservices?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserServices(data.services);
          if(data.services.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(currentUser.isAdmin){
      fetchServices();
    }
  });

  const handleShowMore = async () => {
    const startIndex = userServices.length;
    try {
      const res = await fetch(`/api/service/getservices?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.services]);
        if(data.services.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
        console.log(error.message);
      }

  }

  const handleDeleteService = async() => {
    setShowModal(false)
    try {
      const res = await fetch(`api/service/deleteservice/${serviceIdToDelete}/${currentUser._id}`,{
        method: 'DELETE',
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.error)
      } else {
        setUserServices(userServices.filter((service) => service._id !== serviceIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <div className="w-full flex justify-end mt-2 mb-2">
        <Link to="/create-service">
          <Button gradientDuoTone="purpleToPink">Create Service</Button>
        </Link>
      </div>

      {currentUser.isAdmin && userServices.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Service image</Table.HeadCell>
              <Table.HeadCell>Service title</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userServices.map((service) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(service.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/`}>
                      <img
                        src={service.image}
                        alt={service.serviceTitle}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/`}
                    >
                      {service.serviceTitle}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{service.serviceDescription}</Table.Cell>
                  <Table.Cell>
                  <span
                      onClick={() => {
                        setShowModal(true);
                        setserviceIdToDelete(service._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                Show more
              </button>
            )
          }
        </>
      ) : (
        <p>You have no services yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteService}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashService;
