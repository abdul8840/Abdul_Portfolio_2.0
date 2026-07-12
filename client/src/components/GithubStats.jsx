import { useEffect, useState } from 'react';
import { FaCodeBranch, FaGithub, FaUsers } from 'react-icons/fa';
import { HiOutlineCollection } from 'react-icons/hi';

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

  return (
    <div className="mt-20 mb-20">
      <div className="mb-6">
        <h2 className="text-center text-4xl font-bold">GitHub Activity</h2>
        <p className="text-center text-lg font-semibold text-gray-500">
          My Contribution Timeline
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-5 mb-10">
        <div className="w-[150px] h-[160px] border-[8px] text-center border-[#ddd] p-5 rounded-[20px]">
          <HiOutlineCollection className="w-full mx-auto mb-2 text-3xl text-[#333] dark:text-white" />
          <h3 className="text-lg font-semibold mb-1 text-[#333] dark:text-white">
            Contributions
          </h3>
          <p className="text-center text-sm text-gray-500">
            {stats.totalContributions} total
          </p>
        </div>
        <div className="w-[150px] h-[160px] border-[8px] text-center border-[#ddd] p-5 rounded-[20px]">
          <FaCodeBranch className="w-full mx-auto mb-2 text-3xl text-[#333] dark:text-white" />
          <h3 className="text-lg font-semibold mb-1 text-[#333] dark:text-white">
            Repositories
          </h3>
          <p className="text-center text-sm text-gray-500">
            {stats.totalRepos} owned
          </p>
        </div>
        <div className="w-[150px] h-[160px] border-[8px] text-center border-[#ddd] p-5 rounded-[20px]">
          <FaUsers className="w-full mx-auto mb-2 text-3xl text-[#333] dark:text-white" />
          <h3 className="text-lg font-semibold mb-1 text-[#333] dark:text-white">
            Collaborations
          </h3>
          <p className="text-center text-sm text-gray-500">
            {stats.totalCollaborations} repos
          </p>
        </div>
      </div>

      <div className="w-full overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 pb-3">
        <div className="flex gap-1 w-max mx-auto">
          {stats.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  title={`${day.contributionCount} contributions on ${day.date}`}
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

      <div className="flex justify-center mt-6">
        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 py-3 px-6 bg-[#222] hover:bg-[#111] text-white dark:bg-white dark:text-black font-bold rounded-[20px]"
        >
          <FaGithub /> View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default GithubStats;
