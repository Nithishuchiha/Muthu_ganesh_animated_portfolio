import Hero from '../components/Hero.jsx'
import Projects from '../components/Projects.jsx'
import About from '../components/About.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <About />
      <Footer />
    </main>
  )
}
