import {
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashContact = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [contacts, setContacts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [contactIdToDelete, setContactIdToDelete] = useState('');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`/api/contact/getContact`);
        const data = await res.json();
        if (res.ok) {
          setContacts(data.contacts);
          if (data.contacts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchContact();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = contacts.length;
    try {
      const res = await fetch(
        `/api/contact/getContact?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setContacts((prev) => [...prev, ...data.contacts]);
        if (data.contacts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteContact = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/contact/deleteContact/${contactIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setContacts((prev) =>
          prev.filter((contact) => contact._id !== contactIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && contacts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            {contacts.map((contact) => (
              <TableBody className='divide-y' key={contact._id}>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>
                    {new Date(contact.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.message}</TableCell>
                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setContactIdToDelete(contact._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <ModalHeader />
        <ModalBody>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteContact}>
                Yes, I&apos;m sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DashContact;
