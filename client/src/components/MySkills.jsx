import { useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";

const MySkills = () => {
  const [userSkills, setUserSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [item, setItem] = useState({ category: "all" });
  const [active, setActive] = useState(0);

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
    if (item.category === "all") {
      setFilteredSkills(userSkills);
    } else {
      const filtered = userSkills.filter(
        (skill) => skill.category === item.category
      );
      setFilteredSkills(filtered);
    }
  }, [item, userSkills]);

  const handleClick = (category, index) => {
    setItem({ category });
    setActive(index);
  };

  const categories = [
    "all",
    ...new Set(userSkills.map((skill) => skill.category)),
  ];

  return (
    <div className="mt-20 mb-20">
      <Reveal className="mb-6">
        <h2 className="text-center text-4xl font-bold">My Skills</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Technical Level
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600" />
      </Reveal>

      <div className="-mx-3 px-3 overflow-x-auto sm:overflow-visible scrollbar-none mb-6">
        <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center items-center gap-2 sm:gap-3 w-max sm:w-auto mx-auto">
          {categories.map((category, index) => (
            <button
              type="button"
              key={category}
              onClick={() => handleClick(category, index)}
              className={`relative shrink-0 py-2 px-3 sm:px-4 rounded-[7px] uppercase cursor-pointer text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                active === index
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-pink-500"
              }`}
            >
              {active === index && (
                <motion.span
                  layoutId="skillTabPill"
                  className="absolute inset-0 rounded-[7px] bg-linear-to-r from-pink-500 to-purple-600 pointer-events-none z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </div>

      <StaggerGroup className="w-full flex flex-wrap items-center justify-center gap-10 md:gap-5">
        {filteredSkills.map((skill) => (
          <StaggerItem key={skill._id} className="w-36 h-36 mt-10">
            <motion.div
              whileHover={{ y: -6, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="rounded-full transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(219,39,119,0.35)]">
                <CircularProgressbarWithChildren
                  value={skill.percent}
                  styles={{
                    path: {
                      stroke: "#D044CA",
                      padding: "10px",
                    },
                  }}
                >
                  <img
                    style={{ width: 70, marginTop: -5 }}
                    src={skill.image}
                    alt={skill.technology}
                  />
                  <div style={{ fontSize: 20, marginTop: -5 }}>
                    <strong className="text-sm">{skill.percent}%</strong>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <h1 className="text-center mt-2 font-bold text-xl">
                {skill.technology}
              </h1>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
};

export default MySkills;
