import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from 'flowbite-react';
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
        setUserServices((prev) => [...prev, ...data.services]);
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
          <Button color='purple'>Create Service</Button>
        </Link>
      </div>

      {currentUser.isAdmin && userServices.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Service image</TableHeadCell>
              <TableHeadCell>Service title</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
            </TableHead>
            {userServices.map((service) => (
              <TableBody className='divide-y' key={service._id}>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>
                    {new Date(service.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/`}>
                      <img
                        src={service.image}
                        alt={service.serviceTitle}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/`}
                    >
                      {service.serviceTitle}
                    </Link>
                  </TableCell>
                  <TableCell>{service.serviceDescription}</TableCell>
                  <TableCell>
                  <span
                      onClick={() => {
                        setShowModal(true);
                        setserviceIdToDelete(service._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/`}
                    >
                      <span>Edit</span>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
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
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteService}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DashService;
