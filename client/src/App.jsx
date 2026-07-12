import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import About from './pages/About';
import SignUp from './pages/SignUp';
import SingIn from './pages/SingIn';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import CreateSkill from './pages/CreateSkill';
import CreateService from './pages/CreateService';
import CraeteReview from './pages/CraeteReview';
import ReviewPage from './pages/ReviewPage';
import Footer from './components/Footer';


const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SingIn />} />
      <Route element={<PrivateRoute />} >
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route element={<OnlyAdminPrivateRoute />} >
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:postId' element={<UpdatePost />} />
        <Route path='/create-skill' element={<CreateSkill />} />
        <Route path='/create-service' element={<CreateService />} />
      </Route>
      <Route path='/create-rating' element={<CraeteReview />} />
      <Route path='/reviews' element={<ReviewPage />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App