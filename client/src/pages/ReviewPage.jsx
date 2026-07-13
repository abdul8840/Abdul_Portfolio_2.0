import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { StaggerGroup, StaggerItem } from "../components/StaggerGroup";
import TestimonialCard from "../components/TestimonialCard";

const ReviewPage = () => {
  const [userRating, setUserRating] = useState([]);
  const [userData, setUserData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch("/api/rating/getratings");
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
    <div className="px-4 sm:px-8 pt-20 max-w-7xl mx-auto min-h-screen mt-10">
      <Reveal className="mb-10">
        <h2 className="text-center text-4xl font-bold">Testimonials</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          What my clients say about working with me
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-pink-500" />
      </Reveal>

      <div className="mb-8 flex items-center justify-between">
        <p className="font-bold text-md md:text-lg">
          Total Testimonials{" "}
          <span className="text-pink-500">[{userRating.length}]</span>
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
        <StaggerGroup className="w-full mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userRating.map((rating) => (
            <StaggerItem key={rating._id}>
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
      )}
    </div>
  );
};

export default ReviewPage;
