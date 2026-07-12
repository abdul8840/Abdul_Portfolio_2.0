import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashSkills from '../components/DashSkills';
import DashService from '../components/DashService';
import DashRating from '../components/DashRating';
import DashContact from '../components/DashContact';
import DashUsers from '../components/DashUsers';
import DashComp from '../components/DashComp';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab');
    if(tabFormUrl){
      setTab(tabFormUrl)
    }
  }, [location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row '>
      {/* side bar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* Dashboard */}
        {tab === 'dash' && <DashComp />}
      {/* profile */}
        {tab === 'profile' && <DashProfile />}
      {/* posts */}
        {tab === 'posts' && <DashPosts />}
      {/* skills */}
        {tab === 'skills' && <DashSkills />}
      {/* services */}
        {tab === 'services' && <DashService />}
      {/* services */}
        {tab === 'ratings' && <DashRating />}
      {/* users */}
        {tab === 'users' && <DashUsers />}
      {/* contact */}
        {tab === 'contact' && <DashContact />}
    </div>
  )
}

export default Dashboard