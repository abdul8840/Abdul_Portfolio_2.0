import Hero from '../components/Hero'
import About from '../components/About'
import MySkills from '../components/MySkills'
import Portfolio from '../components/Portfolio'
import Services from '../components/Services'
import GithubStats from '../components/GithubStats'
import Review from '../components/Review'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div className='max-w-5xl mx-auto p-3'>
      <Hero />
      <About />
      <MySkills />
      <Services />
      <Portfolio />
      <GithubStats />
      <Review />
      <Contact />
    </div>
  )
}

export default Home
