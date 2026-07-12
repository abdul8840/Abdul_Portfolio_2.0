import { useEffect, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import AuthThemeControls from './AuthThemeControls';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'github', label: 'GitHub' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

const NAV_ITEM_STEP = 44;

const Sidebar = () => {
  const [activeId, setActiveId] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    );

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
      <span
        className="absolute left-0 w-1 h-9 rounded-full bg-gradient-to-b from-pink-500 to-purple-600 transition-transform duration-500 ease-out"
        style={{ transform: `translateY(${activeIndex * NAV_ITEM_STEP}px)` }}
      />
      {NAV_ITEMS.map((item) => (
        <li key={item.id} className="h-9">
          <button
            type="button"
            onClick={() => handleNavClick(item.id)}
            className={`h-9 pl-6 w-full flex items-center text-left uppercase text-sm font-semibold tracking-wide transition-colors duration-300 ${
              activeId === item.id
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );

  const socialLinks = (
    <div className="flex gap-4">
      <a
        href="https://github.com/abdul8840"
        target="_blank"
        rel="noreferrer"
        className="text-gray-400 hover:text-pink-500 transition-colors"
      >
        <FaGithub className="w-5 h-5" />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noreferrer"
        className="text-gray-400 hover:text-pink-500 transition-colors"
      >
        <FaLinkedin className="w-5 h-5" />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noreferrer"
        className="text-gray-400 hover:text-pink-500 transition-colors"
      >
        <FaInstagram className="w-5 h-5" />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noreferrer"
        className="text-gray-400 hover:text-pink-500 transition-colors"
      >
        <FaTwitter className="w-5 h-5" />
      </a>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-[#0d0d1a] text-white px-4 py-3 shadow-lg">
        <span className="text-xl font-bold">
          Abdul<span className="text-pink-500">.</span>
        </span>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <HiMenu className="w-7 h-7" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-[#0d0d1a] text-white overflow-y-auto transform transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-xl font-bold">
            Abdul<span className="text-pink-500">.</span>
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <HiX className="w-7 h-7" />
          </button>
        </div>
        <div className="px-6 mt-6">{navList}</div>
        <div className="px-6 mt-10">
          <AuthThemeControls />
        </div>
        <div className="px-6 mt-10 pb-10">{socialLinks}</div>
      </div>

      {/* Desktop fixed sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 md:px-8 md:py-10 bg-[#0d0d1a] text-white z-30">
        <span className="text-2xl font-bold">
          Abdul<span className="text-pink-500">.</span>
        </span>
        <div className="mt-16">{navList}</div>
        <div className="mt-auto pt-10">{socialLinks}</div>
      </aside>
    </>
  );
};

export default Sidebar;
