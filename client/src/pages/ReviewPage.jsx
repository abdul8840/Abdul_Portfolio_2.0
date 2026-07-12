import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserAlt, FaTrash } from "react-icons/fa";

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
    <div className="p-3 max-w-5xl mx-auto min-h-screen mt-10">
      <div className="mb-10">
        <h2 className="text-center text-4xl font-bold">Testimonials</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Clients
        </p>
      </div>

      <div className="mb-4 flex justify-between">
            <div className="">
              <p className="font-bold text-md md:text-lg">
                Total Testimonials :{" "}
                <span className="ml-2 ">[{userRating.length}]</span>
              </p>
            </div>
            <div className="">
              <Link to="/create-rating">
                <button
                  type="button"
                  className="border-2 border-gray-800 py-1 px-3 font-bold rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Add Testimonial
                </button>
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

          <div className="w-full mb-10 flex flex-wrap justify-center items-center gap-5">
            {userRating.map((rating) => (
              <div
                className="w-[300px] border-2 border-gray-500 text-center rounded-[1rem] p-[1.25rem]"
                key={rating._id}
              >
                {currentUser &&
                  (currentUser._id === rating.userId || currentUser.isAdmin) && (
                    <span
                      onClick={() => handleDeleteRating(rating._id)}
                      className="text-sm cursor-pointer float-end"
                    >
                      <FaTrash />
                    </span>
                  )}

                <div className="">
                  {userData[rating.userId]?.profilePicture ? (
                    <img
                      className="w-20 h-20 object-cover shadow-md shadow-gray-900 rounded-full block mx-auto my-4 border-4"
                      src={userData[rating.userId].profilePicture}
                      alt={userData[rating.userId].name}
                    />
                  ) : (
                    <FaUserAlt className="w-20 h-20 block mx-auto my-4" />
                  )}
                </div>
                <p className="text-xl font-bold">
                  {userData[rating.userId]?.name || "Loading..."}
                </p>
                <p className="text-sm font-semibold mb-2">
                  {userData[rating.userId]?.username || "Loading..."}
                </p>
                <p className="starability-result" data-rating={rating.rating}>
                  Rated: {rating.rating} stars
                </p>
                <p className="mt-5 text-md ">{rating.review}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}


export default ReviewPage