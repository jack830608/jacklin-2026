import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Introduction from './components/Introduction'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import MouseFollower from './components/MouseFollower'

function App() {
  const [activeSection, setActiveSection] = useState('introduction')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', 'experience', 'projects']
      const scrollY = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-dark-50 text-dark-900 relative cursor-none">
      <MouseFollower />
      <AnimatedBackground />
      <Navigation activeSection={activeSection} />
      
      <main className="relative z-10">
        <Introduction />
        <Experience />  
        <Projects />
      </main>
      
      <Footer />
    </div>
  )
}

export default App