import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";

const MySkills = () => {
  const [userSkills, setUserSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [tabs, setTabs] = useState([{ value: "all", label: "all" }]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/category/getcategories?type=skill`);
        const data = await res.json();
        if (res.ok) {
          setTabs([
            { value: "all", label: "all" },
            ...data.map((category) => ({
              value: category.name,
              label: category.name,
            })),
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`/api/skill/getskill`);
        const data = await res.json();
        if (res.ok) {
          setUserSkills(data);
          setFilteredSkills(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredSkills(userSkills);
    } else {
      setFilteredSkills(
        userSkills.filter((skill) => skill.category === activeCategory)
      );
    }
  }, [activeCategory, userSkills]);

  return (
    <div className="mt-20 mb-20">
      <Reveal className="mb-6">
        <h2 className="text-center text-4xl font-bold">My Skills</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Technical Level
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-pink-500" />
      </Reveal>

      <div className="-mx-3 px-3 overflow-x-auto sm:overflow-visible scrollbar-none mb-10">
        <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center items-center gap-2 sm:gap-3 w-max sm:w-auto mx-auto">
          {tabs.map((tab) => (
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
                  layoutId="skillTabPill"
                  className="absolute inset-0 rounded-[7px] bg-linear-to-r from-pink-500 to-purple-600 pointer-events-none z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredSkills.map((skill) => (
          <StaggerItem key={skill._id}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-xl hover:border-pink-500 dark:hover:border-pink-500 transition-[box-shadow,border-color] duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                <img
                  src={skill.image}
                  alt={skill.technology}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h1 className="text-center font-bold text-sm sm:text-base">
                {skill.technology}
              </h1>
              {skill.category && (
                <span className="rounded-full bg-black/80 dark:bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white dark:text-black">
                  {skill.category}
                </span>
              )}
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {filteredSkills.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No skills in this category yet.
        </p>
      )}
    </div>
  );
};

export default MySkills;
