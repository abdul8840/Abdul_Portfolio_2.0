import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiChartPie } from "react-icons/hi";
import { MdContactPage } from "react-icons/md";
import { FaServicestack } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
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
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">

        {currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
            <SidebarItem
              active={tab === "dash"}
              icon={HiChartPie}
              as="div"
            >
              Dashboard
            </SidebarItem>
          </Link>
          )}

          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor="dark"
              as="div"
            >
              Profile
            </SidebarItem>
          </Link>

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
            <SidebarItem
              active={tab === "posts"}
              icon={HiDocumentText}
              as="div"
            >
              Posts
            </SidebarItem>
          </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=skills">
            <SidebarItem
              active={tab === "skills"}
              icon={GiSkills}
              as="div"
            >
              Skills
            </SidebarItem>
          </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=services">
            <SidebarItem
              active={tab === "services"}
              icon={FaServicestack}
              as="div"
            >
              Services
            </SidebarItem>
          </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=ratings">
            <SidebarItem
              active={tab === "ratings"}
              icon={MdFeedback}
              as="div"
            >
              Ratings
            </SidebarItem>
          </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
            <SidebarItem
              active={tab === "users"}
              icon={HiOutlineUserGroup}
              as="div"
            >
              Users
            </SidebarItem>
          </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=contact">
            <SidebarItem
              active={tab === "contact"}
              icon={MdContactPage}
              as="div"
            >
              Contact
            </SidebarItem>
          </Link>
          )}

          <SidebarItem
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSidebar;
