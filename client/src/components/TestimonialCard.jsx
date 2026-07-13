import { FaUserAlt, FaTrash, FaQuoteRight, FaStar } from "react-icons/fa";
import { motion } from "motion/react";
import {
  SPOTLIGHT_OVERLAY_CLASS,
  SPOTLIGHT_OVERLAY_STYLE,
  useSpotlight,
} from "../utils/useSpotlight";

const TestimonialCard = ({ rating, author, currentUser, onDelete, className = "" }) => {
  const { ref, handleMouseMove } = useSpotlight();

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-center p-6 shadow-sm hover:shadow-2xl hover:shadow-pink-500/10 hover:border-pink-500 dark:hover:border-pink-500 transition-[box-shadow,border-color] duration-300 ${className}`}
    >
      <div className={SPOTLIGHT_OVERLAY_CLASS} style={SPOTLIGHT_OVERLAY_STYLE} />

      <FaQuoteRight className="absolute top-5 right-5 text-4xl text-gray-100 dark:text-gray-800" />

      {currentUser &&
        (currentUser._id === rating.userId || currentUser.isAdmin) && (
          <button
            type="button"
            onClick={() => onDelete(rating._id)}
            className="absolute top-4 left-4 text-sm text-gray-400 hover:text-red-500 transition-colors z-10"
          >
            <FaTrash />
          </button>
        )}

      <div className="relative">
        {author?.profilePicture ? (
          <img
            className="w-20 h-20 object-cover rounded-full block mx-auto mt-2 mb-4 border-4 border-gray-100 dark:border-gray-800 group-hover:border-pink-500/40 transition-colors duration-300"
            src={author.profilePicture}
            alt={author.name}
          />
        ) : (
          <FaUserAlt className="w-20 h-20 p-5 rounded-full bg-gray-100 dark:bg-gray-800 block mx-auto mt-2 mb-4" />
        )}
      </div>

      <p className="text-lg font-bold">{author?.name || "Loading..."}</p>
      <p className="text-sm font-medium text-gray-500 mb-3">
        @{author?.username || "..."}
      </p>

      <div className="flex justify-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <FaStar
            key={n}
            className={
              n <= rating.rating
                ? "text-pink-500"
                : "text-gray-200 dark:text-gray-700"
            }
          />
        ))}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 flex-1">
        {rating.review}
      </p>
    </motion.div>
  );
};

export default TestimonialCard;
