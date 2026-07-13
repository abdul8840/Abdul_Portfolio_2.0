import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  HiChartPie,
  HiUser,
  HiDocumentText,
  HiOutlineUserGroup,
  HiTag,
  HiMenu,
  HiX,
  HiLogout,
} from "react-icons/hi";
import { MdContactPage, MdFeedback } from "react-icons/md";
import { FaServicestack } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ tab: "dash", label: "Dashboard", icon: HiChartPie, adminOnly: true }],
  },
  {
    label: "Content",
    items: [
      { tab: "posts", label: "Projects", icon: HiDocumentText, adminOnly: true },
      { tab: "skills", label: "Skills", icon: GiSkills, adminOnly: true },
      { tab: "categories", label: "Categories", icon: HiTag, adminOnly: true },
      { tab: "services", label: "Services", icon: FaServicestack, adminOnly: true },
    ],
  },
  {
    label: "Community",
    items: [
      { tab: "ratings", label: "Ratings", icon: MdFeedback, adminOnly: true },
      { tab: "users", label: "Users", icon: HiOutlineUserGroup, adminOnly: true },
      { tab: "contact", label: "Contact", icon: MdContactPage, adminOnly: true },
    ],
  },
  {
    label: "Account",
    items: [{ tab: "profile", label: "Profile", icon: HiUser, adminOnly: false }],
  },
];

const FLAT_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const navContent = (
    <>
      <div className="flex items-center gap-3 px-2 pb-8">
        {currentUser.profilePicture ? (
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="w-11 h-11 rounded-full object-cover border-2 border-white/10"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-white/10" />
        )}
        <div className="min-w-0">
          <p className="text-sm font-bold truncate">{currentUser.username}</p>
          <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wide text-pink-400">
            {currentUser.isAdmin ? "Admin" : "User"}
          </span>
        </div>
      </div>

      <nav className="relative flex-1">
        {NAV_GROUPS.map((group) => {
          const groupItems = group.items.filter(
            (item) => !item.adminOnly || currentUser.isAdmin
          );
          if (groupItems.length === 0) return null;
          return (
            <div key={group.label} className="mb-6">
              <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {group.label}
              </p>
              <ul className="relative flex flex-col gap-1">
                {groupItems.map((item) => {
                  const isActive = tab === item.tab;
                  const Icon = item.icon;
                  return (
                    <li key={item.tab} className="relative h-10">
                      {isActive && (
                        <motion.span
                          layoutId="dashTabPill"
                          className="absolute inset-0 rounded-lg bg-white/10"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <Link
                        to={`/dashboard?tab=${item.tab}`}
                        onClick={() => setMobileOpen(false)}
                        className={`relative z-10 h-10 px-3 w-full flex items-center gap-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <Icon className="text-lg shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleSignout}
        className="flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-semibold text-gray-400 hover:text-pink-400 hover:bg-white/5 transition-colors duration-200"
      >
        <HiLogout className="text-lg" />
        Sign Out
      </button>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-20 left-0 right-0 z-30 flex items-center justify-between bg-[#0d0d1a] text-white px-4 py-3 shadow-lg">
        <span className="text-sm font-bold uppercase tracking-wide text-gray-300">
          {FLAT_ITEMS.find((i) => i.tab === tab)?.label || "Dashboard"}
        </span>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open dashboard menu"
        >
          <HiMenu className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Mobile backdrop + drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-black/50"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={false}
        animate={{ x: mobileOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0d1a] text-white overflow-y-auto flex flex-col px-4 py-6"
      >
        <div className="flex justify-end mb-4">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(false)}
            aria-label="Close dashboard menu"
          >
            <HiX className="w-6 h-6" />
          </motion.button>
        </div>
        {navContent}
      </motion.div>

      {/* Desktop fixed sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:top-20 md:bottom-0 md:left-0 md:w-64 md:px-4 md:py-6 bg-[#0d0d1a] text-white z-20 overflow-y-auto">
        {navContent}
      </aside>
    </>
  );
};

export default DashSidebar;
