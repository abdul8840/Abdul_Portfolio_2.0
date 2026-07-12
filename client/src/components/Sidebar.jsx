import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import AuthThemeControls from './AuthThemeControls';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', type: 'scroll' },
  { id: 'about', label: 'About', type: 'scroll' },
  { id: 'skills', label: 'Skills', type: 'scroll' },
  { id: 'services', label: 'Services', type: 'scroll' },
  { id: 'portfolio', label: 'Portfolio', type: 'scroll' },
  { path: '/projects', label: 'Projects', type: 'route' },
  { id: 'github', label: 'GitHub', type: 'scroll' },
  { id: 'testimonials', label: 'Testimonials', type: 'scroll' },
  { id: 'contact', label: 'Contact', type: 'scroll' },
];

const SCROLL_ITEMS = NAV_ITEMS.filter((item) => item.type === 'scroll');

const NAV_ITEM_STEP = 44;

const Sidebar = () => {
  const [activeId, setActiveId] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = SCROLL_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeId)
  );

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const navList = (
    <ul className="relative flex flex-col gap-2">
      <motion.span
        className="absolute left-0 w-1 h-9 rounded-full bg-linear-to-b from-pink-500 to-purple-600"
        animate={{ y: activeIndex * NAV_ITEM_STEP }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      />
      {NAV_ITEMS.map((item) =>
        item.type === 'route' ? (
          <li key={item.path} className="h-9">
            <Link
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="h-9 pl-6 w-full flex items-center text-left uppercase text-sm font-semibold tracking-wide transition-all duration-300 text-gray-400 hover:text-white hover:translate-x-1"
            >
              {item.label}
            </Link>
          </li>
        ) : (
          <li key={item.id} className="h-9">
            <button
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`h-9 pl-6 w-full flex items-center text-left uppercase text-sm font-semibold tracking-wide transition-all duration-300 hover:translate-x-1 ${
                activeId === item.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          </li>
        )
      )}
    </ul>
  );

  const socialLinks = (
    <div className="flex gap-4">
      <motion.a
        href="https://github.com/abdul8840"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.2, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-400 hover:text-pink-500 transition-colors"
      >
        <FaGithub className="w-5 h-5" />
      </motion.a>
      <motion.a
        href="#"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.2, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-400 hover:text-pink-500 transition-colors"
      >
        <FaLinkedin className="w-5 h-5" />
      </motion.a>
      <motion.a
        href="#"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.2, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-400 hover:text-pink-500 transition-colors"
      >
        <FaInstagram className="w-5 h-5" />
      </motion.a>
      <motion.a
        href="#"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.2, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-400 hover:text-pink-500 transition-colors"
      >
        <FaTwitter className="w-5 h-5" />
      </motion.a>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-[#0d0d1a] text-white px-4 py-3 shadow-lg">
        <motion.span whileHover={{ scale: 1.05 }} className="text-xl font-bold">
          Abdul<span className="text-pink-500">.</span>
        </motion.span>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <HiMenu className="w-7 h-7" />
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
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0d1a] text-white overflow-y-auto"
      >
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-xl font-bold">
            Abdul<span className="text-pink-500">.</span>
          </span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <HiX className="w-7 h-7" />
          </motion.button>
        </div>
        <div className="px-6 mt-6">{navList}</div>
        <div className="px-6 mt-10">
          <AuthThemeControls />
        </div>
        <div className="px-6 mt-10 pb-10">{socialLinks}</div>
      </motion.div>

      {/* Desktop fixed sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 md:px-8 md:py-10 bg-[#0d0d1a] text-white z-30">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold w-fit"
        >
          Abdul<span className="text-pink-500">.</span>
        </motion.span>
        <div className="mt-16">{navList}</div>
        <div className="mt-auto pt-10">{socialLinks}</div>
      </aside>
    </>
  );
};

export default Sidebar;
