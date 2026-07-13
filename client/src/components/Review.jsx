import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserAlt, FaTrash } from "react-icons/fa";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";
import {
  SPOTLIGHT_OVERLAY_CLASS,
  SPOTLIGHT_OVERLAY_STYLE,
  useSpotlight,
} from "../utils/useSpotlight";

const TestimonialCard = ({ rating, author, currentUser, onDelete }) => {
  const { ref, handleMouseMove } = useSpotlight();

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative overflow-hidden w-[250px] border-2 border-gray-300 dark:border-gray-700 text-center rounded-[1rem] p-[1.25rem] hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-xl hover:shadow-pink-500/10 transition-[border-color,box-shadow] duration-300"
    >
      <div className={SPOTLIGHT_OVERLAY_CLASS} style={SPOTLIGHT_OVERLAY_STYLE} />
      {currentUser &&
        (currentUser._id === rating.userId || currentUser.isAdmin) && (
          <span
            onClick={() => onDelete(rating._id)}
            className="text-sm cursor-pointer float-end hover:text-red-500 transition-colors"
          >
            <FaTrash />
          </span>
        )}
      <div className="">
        {author?.profilePicture ? (
          <img
            className="w-20 h-20 object-cover shadow-md shadow-gray-900 rounded-full block mx-auto my-4 border-4 border-transparent hover:border-pink-500 transition-colors duration-300"
            src={author.profilePicture}
            alt={author.name}
          />
        ) : (
          <FaUserAlt className="w-20 h-20 block mx-auto my-4" />
        )}
      </div>
      <p className="text-xl font-bold">{author?.name || "Loading..."}</p>
      <p className="text-sm font-semibold mb-2">
        {author?.username || "Loading..."}
      </p>
      <p className="starability-result" data-rating={rating.rating}>
        Rated: {rating.rating} stars
      </p>
      <p className="mt-3 text-md">{rating.review}</p>
    </motion.div>
  );
};

const Review = () => {
  const [userRating, setUserRating] = useState([]);
  const [userData, setUserData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch("/api/rating/getratings?limit=12");
        const data = await res.json();
        if (res.ok) {
          setUserRating(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRatings();
  }, []);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUserData((prevData) => ({ ...prevData, [userId]: data }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    userRating.forEach((rating) => {
      if (!userData[rating.userId]) {
        fetchUser(rating.userId);
      }
    });
  }, [userRating, userData]);

  const handleDeleteRating = async (ratingId) => {
    try {
      const res = await fetch(`/api/rating/deleterating/${ratingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
      } else {
        setUserRating((prevRatings) =>
          prevRatings.filter((rating) => rating._id !== ratingId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="review" className="mb-20">
      <Reveal className="mb-6">
        <h2 className="text-center text-4xl font-bold">Testimonials</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Clients
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600" />
      </Reveal>

      <div className="mb-4 flex justify-between">
            <div className="">
              <p className="font-bold text-md md:text-lg">
                Total Testimonials :{" "}
                <span className="ml-2 ">[{userRating.length}]</span>
              </p>
            </div>
            <div className="">
              <Link to="/create-rating">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-800 dark:border-gray-500 py-1 px-3 font-bold rounded-md hover:border-pink-500 hover:text-pink-500 dark:hover:border-pink-500 dark:hover:text-pink-500 transition-colors duration-300"
                >
                  Add Testimonial
                </motion.button>
              </Link>
            </div>
          </div>

      {userRating.length === 0 ? (
        <>

        <p className="text-center text-lg my-5 font-semibold text-gray-500">
          No Testimonials Yet
        </p>
        </>
      ) : (
        <>

          <StaggerGroup className="flex items-center overflow-x-scroll hide-scrollbar gap-5">
            {userRating.map((rating) => (
              <StaggerItem key={rating._id}>
                <TestimonialCard
                  rating={rating}
                  author={userData[rating.userId]}
                  currentUser={currentUser}
                  onDelete={handleDeleteRating}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </>
      )}
      <div className="mt-5 text-center">
        <Link
          to="/create-rating"
          className="relative inline-block text-cyan-500 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          See More Testimonials
        </Link>
      </div>
    </div>
  );
};

export default Review;
