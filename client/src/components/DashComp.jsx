import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
  HiTag,
} from 'react-icons/hi';
import { GiSkills } from 'react-icons/gi';
import { FaServicestack } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getCategoryLabel } from '../utils/projectCategories';

const STAT_COLORS = {
  teal: 'bg-teal-600',
  indigo: 'bg-indigo-600',
  lime: 'bg-lime-600',
  pink: 'bg-pink-600',
  purple: 'bg-purple-600',
};

const StatCard = ({ label, value, lastMonth, icon: Icon, color }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="flex flex-col gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
  >
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wide">
          {label}
        </h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className={`${STAT_COLORS[color]} text-white rounded-xl p-3 shadow-md`}>
        <Icon className="text-2xl" />
      </div>
    </div>
    <div className="flex items-center gap-1.5 text-sm">
      <span className="flex items-center gap-0.5 text-green-500 font-semibold">
        <HiArrowNarrowUp />
        {lastMonth}
      </span>
      <span className="text-gray-400">last month</span>
    </div>
  </motion.div>
);

const RecentPanel = ({ title, seeAllTab, children, isEmpty }) => (
  <div className="flex flex-col flex-1 min-w-70 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-5">
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-bold">{title}</h2>
      <Link
        to={`/dashboard?tab=${seeAllTab}`}
        className="text-xs font-bold uppercase tracking-wide text-pink-500 hover:text-pink-600 transition-colors"
      >
        See all →
      </Link>
    </div>
    {isEmpty ? (
      <p className="text-sm text-gray-500">Nothing here yet.</p>
    ) : (
      <div className="flex flex-col gap-1">{children}</div>
    )}
  </div>
);

const RecentRow = ({ image, title, subtitle }) => (
  <div className="flex items-center gap-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors px-2 -mx-2">
    <img
      src={image}
      alt=""
      className="w-11 h-11 rounded-lg object-cover bg-gray-200 dark:bg-gray-700 shrink-0"
    />
    <div className="min-w-0">
      <p className="text-sm font-semibold truncate">{title}</p>
      {subtitle && (
        <p className="text-xs text-gray-500 truncate">{subtitle}</p>
      )}
    </div>
  </div>
);

const DashComp = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalSkills, setTotalSkills] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthContacts, setLastMonthContacts] = useState(0);
  const [lastMonthServices, setLastMonthServices] = useState(0);
  const [lastMonthSkills, setLastMonthSkills] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/contact/getcontact?limit=5');
        const data = await res.json();
        if (res.ok) {
          setContacts(data.contacts);
          setTotalContacts(data.totalContacts);
          setLastMonthContacts(data.lastMonthContacts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/service/getservices?limit=5');
        const data = await res.json();
        if (res.ok) {
          setServices(data.services);
          setTotalServices(data.totalServices);
          setLastMonthServices(data.lastMonthServices);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skill/getskills?limit=5');
        const data = await res.json();
        if (res.ok) {
          setSkills(data.skills);
          setTotalSkills(data.totalSkills);
          setLastMonthSkills(data.lastMonthSkills);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchCategories = async () => {
      try {
        const [projectRes, skillRes] = await Promise.all([
          fetch('/api/category/getcategories?type=project'),
          fetch('/api/category/getcategories?type=skill'),
        ]);
        const [projectData, skillData] = await Promise.all([
          projectRes.json(),
          skillRes.json(),
        ]);
        if (projectRes.ok && skillRes.ok) {
          setTotalCategories(projectData.length + skillData.length);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchContacts();
      fetchServices();
      fetchSkills();
      fetchCategories();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:p-6 max-w-6xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Users"
          value={totalUsers}
          lastMonth={lastMonthUsers}
          icon={HiOutlineUserGroup}
          color="teal"
        />
        <StatCard
          label="Total Projects"
          value={totalPosts}
          lastMonth={lastMonthPosts}
          icon={HiDocumentText}
          color="lime"
        />
        <StatCard
          label="Total Skills"
          value={totalSkills}
          lastMonth={lastMonthSkills}
          icon={GiSkills}
          color="pink"
        />
        <StatCard
          label="Total Services"
          value={totalServices}
          lastMonth={lastMonthServices}
          icon={FaServicestack}
          color="indigo"
        />
        <StatCard
          label="Total Contacts"
          value={totalContacts}
          lastMonth={lastMonthContacts}
          icon={HiAnnotation}
          color="indigo"
        />
        <div className="flex flex-col gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wide">
                Categories
              </h3>
              <p className="text-3xl font-bold mt-1">{totalCategories}</p>
            </div>
            <div className="bg-purple-600 text-white rounded-xl p-3 shadow-md">
              <HiTag className="text-2xl" />
            </div>
          </div>
          <Link
            to="/dashboard?tab=categories"
            className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors"
          >
            Manage categories →
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <RecentPanel title="Recent Users" seeAllTab="users" isEmpty={!users?.length}>
          {users?.map((user) => (
            <RecentRow key={user._id} image={user.profilePicture} title={user.username} />
          ))}
        </RecentPanel>

        <RecentPanel title="Recent Contacts" seeAllTab="contact" isEmpty={!contacts?.length}>
          {contacts?.map((contact) => (
            <div key={contact._id} className="py-2">
              <p className="text-sm font-semibold truncate">{contact.name}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{contact.message}</p>
            </div>
          ))}
        </RecentPanel>

        <RecentPanel title="Recent Projects" seeAllTab="posts" isEmpty={!posts?.length}>
          {posts?.map((post) => (
            <RecentRow
              key={post._id}
              image={post.image}
              title={post.title}
              subtitle={getCategoryLabel(post.category)}
            />
          ))}
        </RecentPanel>

        <RecentPanel title="Recent Services" seeAllTab="services" isEmpty={!services?.length}>
          {services?.map((service) => (
            <RecentRow key={service._id} image={service.image} title={service.serviceTitle} />
          ))}
        </RecentPanel>

        <RecentPanel title="Recent Skills" seeAllTab="skills" isEmpty={!skills?.length}>
          {skills?.map((skill) => (
            <RecentRow
              key={skill._id}
              image={skill.image}
              title={skill.technology}
              subtitle={skill.category}
            />
          ))}
        </RecentPanel>
      </div>
    </div>
  );
};

export default DashComp;
