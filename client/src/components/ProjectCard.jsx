import { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { motion } from 'motion/react';

const ProjectCard = ({ post }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="group border-2 border-gray-300 dark:border-gray-700 rounded-[1rem] p-[1.25rem] hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-xl hover:shadow-pink-500/10 transition-[border-color,box-shadow] duration-300"
      >
        <div className="relative overflow-hidden rounded-[1rem] mb-3">
          <img
            src={post.image}
            alt={post.title}
            className="w-[295px] h-[180px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <h1 className="text-xl font-bold">{post.title}</h1>
        <p className="text-lg mt-2 mb-5 font-semibold text-gray-600">
          {post.description}
        </p>
        <span
          className="mt-5 flex items-center gap-1 text-gray-500 cursor-pointer group-hover:text-pink-500 transition-colors duration-300"
          onClick={() => setShowModal(true)}
        >
          View More{' '}
          <FaArrowRightLong className="mt-0.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </motion.div>

      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
        className="mb-10"
      >
        <ModalHeader />
        <ModalBody>
          <div>
            <img
              className="w-full mb-5 rounded-lg"
              src={post.image}
              alt={post.title}
            />
            <h1 className="text-2xl font-bold text-center">{post.title}</h1>
            <h3 className="text-lg text-gray-500 font-semibold text-center">
              {post.description}
            </h3>
            <hr className="mt-5 mb-4" />
            <div
              className="p-3 max-w-2xl mx-auto w-full post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProjectCard;
