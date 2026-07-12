import { Avatar, Button, Dropdown, DropdownDivider, Navbar } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {toggleTheme} from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

const Header = () => {
  const path = useLocation().pathname; 
  const {currentUser} = useSelector((state) => state.user);
  const {theme} = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json()
      if(!res.ok) {
        console.log(data.message)
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="border-b-2">
      <Navbar className='max-w-5xl mx-auto flex justify-between items-center'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          Abdul
        </Link>
        
        <div className="flex gap-2 md:order-2">
          <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </Button>

          {currentUser ? (
            <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
              alt="User"
              img={currentUser.profilePitcture}
              rounded={true}
              />
            }
            >
              <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
              </Dropdown.Header>
              <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <DropdownDivider />
              <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
          )}
          
          

          <Navbar.Toggle />
        </div>

        <Navbar.Collapse className="md:max-w-20 md:flex md:items-center dark:text-white">
          <Navbar.Link active={path === '/'} as='div'>
            <Link to='/' className={path === '/' ? 'text-blue-500 block py-2 pr-4 pl-3 md:p-0' : 'block py-2 pr-4 pl-3 md:p-0'}>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as='div'>
            <Link to='/reviews' className={path === '/reviews' ? 'text-blue-500 block py-2 pr-4 pl-3 md:p-0' : 'block py-2 pr-4 pl-3 md:p-0'}>Testimonials</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
