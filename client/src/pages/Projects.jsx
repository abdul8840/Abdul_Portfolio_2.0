import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import { StaggerGroup, StaggerItem } from '../components/StaggerGroup';
import { PROJECT_CATEGORIES } from '../utils/projectCategories';

const TABS = [{ value: 'all', label: 'All' }, ...PROJECT_CATEGORIES];
const PAGE_SIZE = 9;

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query =
          activeCategory === 'all'
            ? `limit=${PAGE_SIZE}`
            : `limit=${PAGE_SIZE}&category=${activeCategory}`;
        const res = await fetch(`/api/post/getposts?${query}`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setShowMore(data.posts.length === PAGE_SIZE);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [activeCategory]);

  const handleTabClick = (value) => {
    setActiveCategory(value);
    setSearchParams(value === 'all' ? {} : { category: value });
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const query =
        activeCategory === 'all'
          ? `startIndex=${startIndex}&limit=${PAGE_SIZE}`
          : `startIndex=${startIndex}&limit=${PAGE_SIZE}&category=${activeCategory}`;
      const res = await fetch(`/api/post/getposts?${query}`);
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        setShowMore(data.posts.length === PAGE_SIZE);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 pt-20 max-w-7xl mx-auto min-h-screen mt-10">
      <Reveal className="mb-10">
        <h2 className="text-center text-4xl font-bold">My Projects</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          Everything I&apos;ve built, by category
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-pink-500" />
      </Reveal>

      <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`relative py-2 px-4 rounded-[7px] uppercase cursor-pointer text-sm font-semibold transition-colors duration-300 ${
              activeCategory === tab.value
                ? 'text-white dark:text-black'
                : 'text-gray-600 dark:text-gray-300 hover:text-pink-500'
            }`}
          >
            {activeCategory === tab.value && (
              <motion.span
                layoutId="projectsTabPill"
                className="absolute inset-0 rounded-[7px] bg-[#222] dark:bg-white pointer-events-none -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <StaggerItem key={post._id}>
            <ProjectCard post={post} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {posts.length === 0 && (
        <p className="text-center text-lg my-5 font-semibold text-gray-500">
          No projects in this category yet.
        </p>
      )}

      {showMore && posts.length > 0 && (
        <div className="flex justify-center">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShowMore}
            className="w-full text-teal-500 hover:text-pink-500 self-center text-sm py-7 transition-colors duration-300"
          >
            Show more
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Projects;
