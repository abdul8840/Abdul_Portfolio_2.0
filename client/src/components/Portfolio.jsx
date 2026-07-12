import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import { PROJECT_CATEGORIES } from "../utils/projectCategories";

const TABS = [{ value: "all", label: "All" }, ...PROJECT_CATEGORIES];

const Portfolio = () => {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query =
          activeCategory === "all"
            ? "limit=4"
            : `limit=4&category=${activeCategory}`;
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
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600" />
      </Reveal>
      <div className="mt-10">
        <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`relative py-2 px-4 rounded-[7px] uppercase cursor-pointer text-sm font-semibold transition-colors duration-300 ${
                activeCategory === tab.value
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-pink-500"
              }`}
            >
              {activeCategory === tab.value && (
                <motion.span
                  layoutId="portfolioTabPill"
                  className="absolute inset-0 rounded-[7px] bg-linear-to-r from-pink-500 to-purple-600 pointer-events-none -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="flex flex-wrap gap-10 justify-center"
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
              className="group relative flex items-center gap-2 overflow-hidden py-3 px-6 font-bold rounded-[20px] bg-[#222] text-white dark:bg-white dark:text-black shadow-lg hover:shadow-pink-500/40 transition-shadow duration-500"
            >
              <span className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">View More Projects</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
