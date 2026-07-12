import { Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthThemeControls from './AuthThemeControls';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/reviews', label: 'Testimonials' },
];

const navLinkClass = (active) =>
  `relative inline-block py-2 pr-4 pl-3 md:p-0 transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-3 after:right-4 md:after:left-0 md:after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-600 after:transition-all after:duration-300 ${
    active
      ? 'font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 after:scale-x-100'
      : 'hover:text-pink-500 after:scale-x-0 hover:after:scale-x-100'
  }`;

const Header = () => {
  const path = useLocation().pathname;
  const isHome = path === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-40 h-20 flex items-center transition-all duration-300 border-b ${
        isHome ? 'hidden md:flex md:left-64' : ''
      } ${
        scrolled
          ? 'bg-white/85 dark:bg-[rgb(16,23,42)]/85 backdrop-blur-md shadow-md border-gray-200/60 dark:border-gray-800/60'
          : 'bg-white/60 dark:bg-[rgb(16,23,42)]/60 backdrop-blur-sm border-transparent'
      }`}
    >
      <Navbar className="max-w-5xl w-full mx-auto flex justify-between items-center bg-transparent px-4">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white"
        >
          Abdul<span className="text-pink-500">.</span>
        </Link>

        <div className="flex gap-2 md:order-2">
          <AuthThemeControls />
          <NavbarToggle />
        </div>

        <NavbarCollapse className="md:max-w-40 md:flex md:items-center dark:text-white">
          {NAV_LINKS.map((link) => (
            <NavbarLink key={link.to} active={path === link.to} as="div">
              <Link to={link.to} className={navLinkClass(path === link.to)}>
                {link.label}
              </Link>
            </NavbarLink>
          ))}
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Header;
