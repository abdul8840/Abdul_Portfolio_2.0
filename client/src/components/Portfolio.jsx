import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
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
      <div className="mb-10">
        <h2 className="text-center text-4xl font-bold">Portfolio</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Recent Projects
        </p>
        <div className="mt-10">
          <div className="flex flex-wrap justify-center items-center gap-5 mb-6">
            {TABS.map((tab) => (
              <span
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`${
                  activeCategory === tab.value ? "bg-[#333] text-white" : ""
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
            <p className="text-center text-gray-500">
              No projects in this category yet.
            </p>
          )}
          <div className="flex justify-center mt-10">
            <Link
              to={
                activeCategory === "all"
                  ? "/projects"
                  : `/projects?category=${activeCategory}`
              }
              className="flex items-center gap-2 py-3 px-6 bg-[#222] hover:bg-[#111] text-white dark:bg-white dark:text-black font-bold rounded-[20px]"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
