import { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { motion } from 'motion/react';
import { getCategoryLabel } from '../utils/projectCategories';

const ProjectCard = ({ post }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-2xl hover:border-gray-900 dark:hover:border-white transition-[box-shadow,border-color] duration-300"
      >
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          {post.category && (
            <span className="absolute top-3 left-3 rounded-full bg-black/80 dark:bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-white dark:text-black">
              {getCategoryLabel(post.category)}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h1 className="text-lg font-bold">{post.title}</h1>
          <p className="mt-2 mb-5 text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-2">
            {post.description}
          </p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="mt-auto inline-flex w-fit items-center gap-1 self-start border-b-2 border-transparent pb-0.5 text-sm font-bold text-gray-900 dark:text-white group-hover:border-pink-500 transition-colors duration-300"
          >
            View More
            <FaArrowRightLong className="mt-0.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
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
