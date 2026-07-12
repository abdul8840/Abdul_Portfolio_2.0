import { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { FaArrowRightLong } from 'react-icons/fa6';

const ProjectCard = ({ post }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="border-2 border-gray-500 rounded-[1rem] p-[1.25rem]">
        <img
          src={post.image}
          alt={post.title}
          className="w-[295px] h-[180px] rounded-[1rem] mb-3 object-cover"
        />
        <h1 className="text-xl font-bold">{post.title}</h1>
        <p className="text-lg mt-2 mb-5 font-semibold text-gray-600">
          {post.description}
        </p>
        <span
          className="mt-5 flex gap-1 text-gray-500 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          View More <FaArrowRightLong className="mt-[7px]" />
        </span>
      </div>

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
              className="w-full mb-5"
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
