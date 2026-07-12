import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
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
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">

        {currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
            <Sidebar.Item
              active={tab === "dash"}
              icon={HiChartPie}
              as="div"
            >
              Dashboard
            </Sidebar.Item>
          </Link>
          )}

          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiDocumentText}
              as="div"
            >
              Posts
            </Sidebar.Item>
          </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=skills">
            <Sidebar.Item
              active={tab === "skills"}
              icon={GiSkills}
              as="div"
            >
              Skills
            </Sidebar.Item>
          </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=services">
            <Sidebar.Item
              active={tab === "services"}
              icon={FaServicestack}
              as="div"
            >
              Services
            </Sidebar.Item>
          </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=ratings">
            <Sidebar.Item
              active={tab === "ratings"}
              icon={MdFeedback}
              as="div"
            >
              Ratings
            </Sidebar.Item>
          </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
            <Sidebar.Item
              active={tab === "users"}
              icon={HiOutlineUserGroup}
              as="div"
            >
              Users
            </Sidebar.Item>
          </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=contact">
            <Sidebar.Item
              active={tab === "contact"}
              icon={MdContactPage}
              as="div"
            >
              Contact
            </Sidebar.Item>
          </Link>
          )}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
