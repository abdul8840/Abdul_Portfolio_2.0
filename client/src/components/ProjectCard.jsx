import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import { motion } from 'motion/react';
import { getCategoryLabel } from '../utils/projectCategories';

const ProjectCard = ({ post }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-2xl hover:border-gray-900 dark:hover:border-white transition-[box-shadow,border-color] duration-300"
    >
      <Link to={`/post/${post.slug}`} className="relative overflow-hidden">
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
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link to={`/post/${post.slug}`}>
          <h1 className="text-lg font-bold hover:text-pink-500 transition-colors duration-300">
            {post.title}
          </h1>
        </Link>
        <p className="mt-2 mb-5 text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-2">
          {post.description}
        </p>
        <Link
          to={`/post/${post.slug}`}
          className="mt-auto inline-flex w-fit items-center gap-1 self-start border-b-2 border-transparent pb-0.5 text-sm font-bold text-gray-900 dark:text-white group-hover:border-pink-500 transition-colors duration-300"
        >
          View More
          <FaArrowRightLong className="mt-0.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
