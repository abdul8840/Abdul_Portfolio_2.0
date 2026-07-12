import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Portfolio = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [item, setItem] = useState({ category: "all" });
  const [active, setActive] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getpost`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data);
          setFilteredPosts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (item.category === "all") {
      setFilteredPosts(userPosts);
    } else {
      const filtered = userPosts.filter(
        (post) => post.category === item.category
      );
      setFilteredPosts(filtered);
    }
  }, [item, userPosts]);

  const handleClick = (e, index) => {
    setItem({ category: e.target.textContent });
    setActive(index);
  };

  const handleViewMoreClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  // Get unique categories for the filter
  const categories = [
    "all",
    ...new Set(userPosts.map((post) => post.category)),
  ];

  return (
    <div className="min-h-screen pt-10">
      <div className="mb-10">
        <h2 className="text-center text-4xl font-bold">Portfolio</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Recent Projects
        </p>
        <div className="mt-10">
          <div className="flex flex-wrap justify-center items-center gap-5 mb-6">
            {categories.map((category, index) => (
              <span
                onClick={(e) => handleClick(e, index)}
                className={`${
                  active === index ? "bg-[#333] text-white" : ""
                } py-2 px-3 rounded-[7px] uppercase cursor-pointer`}
                key={index}
              >
                {category}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-10 justify-center">
            {filteredPosts.map((post) => (
              <div
                className="border-2 border-gray-500 rounded-[1rem] p-[1.25rem]"
                key={post._id}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-[295px] h-[180px] rounded-[1rem] mb-3"
                />
                <h1 className="text-xl font-bold">{post.title}</h1>
                <p className="text-lg mt-2 mb-5 font-semibold text-gray-600">
                  {post.description}
                </p>
                {/* Render other post details here */}
                <span
                  className="mt-5 flex gap-1 text-gray-500 cursor-pointer"
                  onClick={() => handleViewMoreClick(post)}
                >
                  View More <FaArrowRightLong className="mt-[7px]" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedPost && (
        <Modal
          show={showModal}
          size="md"
          onClose={() => setShowModal(false)}
          popup
          className="mb-10"
        >
          <Modal.Header />
          <Modal.Body>
            <div>
              <img
                className="w-full mb-5"
                src={selectedPost.image}
                alt="Post Image"
              />
              <h1 className="text-2xl font-bold text-center">
                {selectedPost.title}
              </h1>
              <h3 className="text-lg text-gray-500 font-semibold text-center">
                {selectedPost.description}
              </h3>
              <hr className="mt-5 mb-4" />
              <div
                className="p-3 max-w-2xl mx-auto w-full post-content"
                dangerouslySetInnerHTML={{
                  __html: selectedPost.content,
                }}
              ></div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Portfolio;
