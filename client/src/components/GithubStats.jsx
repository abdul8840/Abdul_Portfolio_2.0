import { useEffect, useState } from 'react';
import { FaCodeBranch, FaGithub, FaUsers } from 'react-icons/fa';
import { HiOutlineCollection } from 'react-icons/hi';
import { motion } from 'motion/react';
import Reveal from './Reveal';
import { StaggerGroup, StaggerItem } from './StaggerGroup';

const CountUp = ({ value, duration = 1.2 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
};

const GithubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/github/stats');
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || error || !stats) {
    return null;
  }

  const statCards = [
    {
      icon: HiOutlineCollection,
      title: 'Contributions',
      value: stats.totalContributions,
      suffix: 'total',
    },
    {
      icon: FaCodeBranch,
      title: 'Repositories',
      value: stats.totalRepos,
      suffix: 'owned',
    },
    {
      icon: FaUsers,
      title: 'Collaborations',
      value: stats.totalCollaborations,
      suffix: 'repos',
    },
  ];

  return (
    <div className="mt-20 mb-20">
      <Reveal className="mb-6">
        <h2 className="text-center text-4xl font-bold">GitHub Activity</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Contribution Timeline
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600" />
      </Reveal>

      <StaggerGroup className="flex flex-wrap justify-center gap-5 mb-10">
        {statCards.map(({ icon: Icon, title, value, suffix }) => (
          <StaggerItem key={title}>
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-[150px] h-[160px] border-[8px] text-center border-[#ddd] dark:border-gray-700 p-5 rounded-[20px] hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/20 transition-[border-color,box-shadow] duration-300"
            >
              <Icon className="w-full mx-auto mb-2 text-3xl text-[#333] dark:text-white" />
              <h3 className="text-lg font-semibold mb-1 text-[#333] dark:text-white">
                {title}
              </h3>
              <p className="text-center text-sm text-gray-500">
                <CountUp value={value} /> {suffix}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.15}>
        <div className="w-full overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 pb-3">
          <div className="flex gap-1 w-max mx-auto">
            {stats.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.contributionDays.map((day) => (
                  <motion.div
                    key={day.date}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                    whileHover={{ scale: 1.4 }}
                    className={`w-3 h-3 rounded-sm ring-1 ring-black/5 dark:ring-white/10 ${
                      day.contributionCount === 0
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : ''
                    }`}
                    style={
                      day.contributionCount === 0
                        ? undefined
                        : { backgroundColor: day.color }
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="flex justify-center mt-6">
        <motion.a
          href={stats.profileUrl}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center gap-2 overflow-hidden py-3 px-6 font-bold rounded-[20px] bg-[#222] text-white dark:bg-white dark:text-black shadow-lg hover:shadow-pink-500/40 transition-shadow duration-500"
        >
          <span className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <FaGithub className="relative z-10" />
          <span className="relative z-10">View GitHub Profile</span>
        </motion.a>
      </div>
    </div>
  );
};

export default GithubStats;
