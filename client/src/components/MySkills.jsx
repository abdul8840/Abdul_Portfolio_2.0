import React, { useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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

  const handleClick = (e, index) => {
    setItem({ category: e.target.textContent });
    setActive(index);
  };

  const categories = [
    "all",
    ...new Set(userSkills.map((skill) => skill.category)),
  ];

  return (
    <div className="mt-20 mb-20">
      <div className="mb-6">
        <h2 className="text-center text-4xl font-bold">My Skills</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Technical Level
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-5 mb-6">
        {categories.map((category, index) => (
          <span
            onClick={(e) => handleClick(e, index)}
            className={`${
              active === index ? "bg-[#333] text-white" : ""
            } py-2 px-3 rounded-[7px] uppercase cursor-pointer`}
            key={index}
          >
            {category}
          </span>
        ))}
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-10 md:gap-5">
        {filteredSkills.map((skill) => (
          <div key={skill._id} className="w-36 h-36 mt-10">
            <CircularProgressbarWithChildren
              value={skill.percent}
              styles={{
                path: {
                  stroke: '#D044CA',
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
            <h1 className="text-center mt-2 font-bold text-xl">
              {skill.technology}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySkills;