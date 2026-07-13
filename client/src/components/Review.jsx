import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";
import TestimonialCard from "./TestimonialCard";

const Review = () => {
  const [userRating, setUserRating] = useState([]);
  const [userData, setUserData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const scrollerRef = useRef(null);

  const scrollByAmount = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

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
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-pink-500" />
      </Reveal>

      <div className="mb-6 flex items-center justify-between">
        <p className="font-bold text-md md:text-lg">
          Total Testimonials <span className="text-pink-500">[{userRating.length}]</span>
        </p>
        <Magnetic strength={0.2}>
          <Link to="/create-rating">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-2 px-4 font-bold rounded-[20px] bg-[#222] hover:bg-[#111] text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black shadow-md transition-colors duration-300"
            >
              Add Testimonial
            </motion.button>
          </Link>
        </Magnetic>
      </div>

      {userRating.length === 0 ? (
        <p className="text-center text-lg my-5 font-semibold text-gray-500">
          No Testimonials Yet
        </p>
      ) : (
        <div className="relative">
          <StaggerGroup
            ref={scrollerRef}
            className="flex items-stretch overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar gap-5 py-2"
          >
            {userRating.map((rating) => (
              <StaggerItem key={rating._id} className="w-70 shrink-0 snap-start">
                <TestimonialCard
                  rating={rating}
                  author={userData[rating.userId]}
                  currentUser={currentUser}
                  onDelete={handleDeleteRating}
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerGroup>

          {userRating.length > 3 && (
            <div className="hidden md:flex justify-center gap-3 mt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollByAmount(-1)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 hover:border-pink-500 hover:text-pink-500 transition-colors duration-300"
              >
                <FaChevronLeft />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollByAmount(1)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 hover:border-pink-500 hover:text-pink-500 transition-colors duration-300"
              >
                <FaChevronRight />
              </motion.button>
            </div>
          )}
        </div>
      )}
      <div className="mt-5 text-center">
        <Link
          to="/reviews"
          className="relative inline-block text-cyan-500 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          See More Testimonials
        </Link>
      </div>
    </div>
  );
};

export default Review;
