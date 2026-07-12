import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

const AuthThemeControls = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
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

  return (
    <div className="flex items-center gap-2">
      <Button
        className="w-12 h-10"
        color="gray"
        pill
        onClick={() => dispatch(toggleTheme())}
      >
        {theme === 'light' ? <FaSun /> : <FaMoon />}
      </Button>

      {currentUser ? (
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar alt="User" img={currentUser.profilePicture} rounded={true} />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">@{currentUser.username}</span>
            <span className="block text-sm font-medium truncate">
              {currentUser.email}
            </span>
          </DropdownHeader>
          <Link to="/dashboard?tab=profile">
            <DropdownItem>Profile</DropdownItem>
          </Link>
          <DropdownDivider />
          <DropdownItem onClick={handleSignout}>Sign Out</DropdownItem>
        </Dropdown>
      ) : (
        <Link to="/sign-in">
          <Button outline color="purple">
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};

export default AuthThemeControls;
