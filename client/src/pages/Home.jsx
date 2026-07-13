import Hero from '../components/Hero'
import About from '../components/About'
import MySkills from '../components/MySkills'
import Portfolio from '../components/Portfolio'
import Services from '../components/Services'
import GithubStats from '../components/GithubStats'
import Review from '../components/Review'
import Contact from '../components/Contact'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="md:flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="max-w-7xl mx-auto p-3 pt-20">
          <section id="home" className="scroll-mt-32"><Hero /></section>
          <section id="about" className="scroll-mt-32"><About /></section>
          <section id="skills" className="scroll-mt-32"><MySkills /></section>
          <section id="services" className="scroll-mt-32"><Services /></section>
          <section id="portfolio" className="scroll-mt-32"><Portfolio /></section>
          <section id="github" className="scroll-mt-32"><GithubStats /></section>
          <section id="testimonials" className="scroll-mt-32"><Review /></section>
          <section id="contact" className="scroll-mt-32"><Contact /></section>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
