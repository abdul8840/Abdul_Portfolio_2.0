import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashSkills from '../components/DashSkills';
import DashCategories from '../components/DashCategories';
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
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950'>
      <DashSidebar />
      <div className='md:ml-64 pt-20 md:pt-20'>
        <div className='pt-14 md:pt-0'>
          {tab === 'dash' && <DashComp />}
          {tab === 'profile' && <DashProfile />}
          {tab === 'posts' && <DashPosts />}
          {tab === 'skills' && <DashSkills />}
          {tab === 'categories' && <DashCategories />}
          {tab === 'services' && <DashService />}
          {tab === 'ratings' && <DashRating />}
          {tab === 'users' && <DashUsers />}
          {tab === 'contact' && <DashContact />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
