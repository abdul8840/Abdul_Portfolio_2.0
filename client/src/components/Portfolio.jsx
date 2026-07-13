import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { PROJECT_CATEGORIES } from "../utils/projectCategories";

const TABS = [{ value: "all", label: "All" }, ...PROJECT_CATEGORIES];
const HOME_LIMIT = 6;

const Portfolio = () => {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query =
          activeCategory === "all"
            ? `limit=${HOME_LIMIT}`
            : `limit=${HOME_LIMIT}&category=${activeCategory}`;
        const res = await fetch(`/api/post/getposts?${query}`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [activeCategory]);

  return (
    <div className="min-h-screen pt-10">
      <Reveal className="mb-10">
        <h2 className="text-center text-4xl font-bold">Portfolio</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Recent Projects
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-pink-500" />
      </Reveal>
      <div className="mt-10">
        <div className="-mx-3 px-3 overflow-x-auto sm:overflow-visible scrollbar-none">
          <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center items-center gap-2 sm:gap-3 mb-8 w-max sm:w-auto mx-auto">
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`relative shrink-0 py-2 px-3 sm:px-4 rounded-[7px] uppercase cursor-pointer text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                  activeCategory === tab.value
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-pink-500"
                }`}
              >
                {activeCategory === tab.value && (
                  <motion.span
                    layoutId="portfolioTabPill"
                    className="absolute inset-0 rounded-[7px] bg-linear-to-r from-pink-500 to-purple-600 pointer-events-none z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post) => (
              <ProjectCard key={post._id} post={post} />
            ))}
          </motion.div>
        </AnimatePresence>
        {posts.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No projects in this category yet.
          </p>
        )}
        <div className="flex justify-center mt-10">
          <Magnetic strength={0.2}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block"
            >
              <Link
                to={
                  activeCategory === "all"
                    ? "/projects"
                    : `/projects?category=${activeCategory}`
                }
                className="flex items-center gap-2 py-3 px-6 font-bold rounded-[20px] bg-[#222] hover:bg-[#111] text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black shadow-lg transition-colors duration-300"
              >
                View More Projects
              </Link>
            </motion.div>
          </Magnetic>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
