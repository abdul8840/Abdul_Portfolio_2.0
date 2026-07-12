import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
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
    <div className="p-3 pt-20 max-w-5xl mx-auto min-h-screen mt-10">
      <div className="mb-10">
        <h2 className="text-center text-4xl font-bold">My Projects</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          Everything I&apos;ve built, by category
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-5 mb-10">
        {TABS.map((tab) => (
          <span
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`${
              activeCategory === tab.value ? 'bg-[#333] text-white' : ''
            } py-2 px-3 rounded-[7px] uppercase cursor-pointer`}
          >
            {tab.label}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-10 justify-center">
        {posts.map((post) => (
          <ProjectCard key={post._id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-lg my-5 font-semibold text-gray-500">
          No projects in this category yet.
        </p>
      )}

      {showMore && posts.length > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleShowMore}
            className="w-full text-teal-500 self-center text-sm py-7"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
