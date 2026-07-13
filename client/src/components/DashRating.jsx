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

const DashRating = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [ratings, setRatings] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [ratingIdToDelete, setRatingIdToDelete] = useState('');

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(`/api/rating/getreviews`);
        const data = await res.json();
        if (res.ok) {
          setRatings(data.ratings);
          if (data.ratings.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchRating();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = ratings.length;
    try {
      const res = await fetch(
        `/api/rating/getreviews?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setRatings((prev) => [...prev, ...data.ratings]);
        if (data.ratings.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteRating = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/rating/deleterating/${ratingIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setRatings((prev) =>
          prev.filter((rating) => rating._id !== ratingIdToDelete)
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
      {currentUser.isAdmin && ratings.length > 0 ? (
        <>
          <Table hoverable className='shadow-md min-w-max'>
            <TableHead>
              <TableRow>
                <TableHeadCell>Date updated</TableHeadCell>
                <TableHeadCell>Review</TableHeadCell>
                <TableHeadCell>Rating</TableHeadCell>
                <TableHeadCell>UserId</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>
            {ratings.map((rating) => (
              <TableBody className='divide-y' key={rating._id}>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>
                    {new Date(rating.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{rating.review}</TableCell>
                  <TableCell>{rating.rating}</TableCell>
                  <TableCell>{rating.userId}</TableCell>
                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setRatingIdToDelete(rating._id);
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
              <Button color='failure' onClick={handleDeleteRating}>
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

export default DashRating;
