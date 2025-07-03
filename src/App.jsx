import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Introduction from './components/Introduction'
import Experience from './components/Experience'
import Projects from './components/Projects'
import AnimatedBackground from './components/AnimatedBackground'
import MouseFollower from './components/MouseFollower'
import PerformanceMonitor from './components/PerformanceMonitor'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  
  // Ensure currentSection is always within bounds
  useEffect(() => {
    if (currentSection < 0) setCurrentSection(0)
    if (currentSection >= sections.length) setCurrentSection(sections.length - 1)
  }, [currentSection])
  
  const sections = [
    { component: Introduction, name: 'introduction' },
    { component: Experience, name: 'experience' },
    { component: Projects, name: 'projects' }
  ]

  // Memoize event handlers to prevent recreation
  const handleWheel = useCallback((e) => {
    if (isScrolling) return
    
    // Check if horizontal scroll is dominant - if so, don't trigger section changes
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY)
    
    // Only prevent default and trigger section changes for vertical scroll
    if (!isHorizontalScroll && Math.abs(e.deltaY) > 10) {
      e.preventDefault()
      
      const newSection = e.deltaY > 0 
        ? Math.min(currentSection + 1, sections.length - 1)
        : Math.max(currentSection - 1, 0)
      
      if (newSection !== currentSection) {
        setIsScrolling(true)
        setCurrentSection(newSection)
        setTimeout(() => setIsScrolling(false), 1000)
      }
    }
  }, [currentSection, isScrolling, sections.length])

  const handleKeyDown = useCallback((e) => {
    if (isScrolling) return
    
    let newSection = currentSection
    
    if (e.key === 'ArrowDown') {
      newSection = Math.min(currentSection + 1, sections.length - 1)
    } else if (e.key === 'ArrowUp') {
      newSection = Math.max(currentSection - 1, 0)
    }
    
    if (newSection !== currentSection) {
      setIsScrolling(true)
      setCurrentSection(newSection)
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }, [currentSection, isScrolling, sections.length])

  const handlePlanetClick = useCallback((index) => {
    if (!isScrolling) {
      setIsScrolling(true)
      setCurrentSection(index)
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }, [isScrolling])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleWheel, handleKeyDown])

  return (
    <div className="h-screen overflow-hidden bg-black text-white relative cursor-none">
      <PerformanceMonitor />
      <MouseFollower />
      <AnimatedBackground currentSection={currentSection} />
      
      {/* Section Indicator - Planet Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col">
        {sections.map((section, index) => {
          const planetData = [
            { color: '#00f5ff', size: 16, name: 'Introduction', ring: false }, // Reduced size
            { color: '#8b5cf6', size: 14, name: 'Experience', ring: false }, // Reduced size
            { color: '#00ff87', size: 12, name: 'Projects', ring: true } // Reduced size
          ][index];
          
          const isActive = index === currentSection;
          
          return (
            <motion.button
              key={index}
              onClick={() => handlePlanetClick(index)}
              className="relative group"
              style={{
                marginBottom: index < sections.length - 1 ? '2rem' : '0' // Reduced margin
              }}
              whileHover={{ scale: 1.05 }} // Further reduced hover scale
              whileTap={{ scale: 0.95 }}
              animate={{ 
                scale: isActive ? 1.1 : 1, // Further reduced active scale
                y: isActive ? -0.5 : 0 // Further reduced movement
              }}
              transition={{ duration: 0.2, type: "spring", stiffness: 150 }}
            >
              {/* Simplified Planet */}
              <div
                className={`rounded-full relative ${isActive ? 'animate-pulse' : ''}`}
                style={{
                  width: `${planetData.size}px`,
                  height: `${planetData.size}px`,
                  background: `radial-gradient(circle at 30% 30%, ${planetData.color}, ${planetData.color}cc, ${planetData.color}77)`,
                  boxShadow: isActive 
                    ? `0 0 15px ${planetData.color}dd, 0 0 30px ${planetData.color}88`
                    : `0 0 6px ${planetData.color}66`,
                  transform: 'translateZ(0)',
                  animationDuration: '4s'
                }}
              >
                {/* Simplified Planet Surface Details */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute w-1 h-1 rounded-full opacity-50" // Reduced opacity
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      top: '25%',
                      left: '30%',
                      filter: 'blur(0.5px)'
                    }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity }} // Even slower animation
                  />
                </div>
                
                {/* Simplified Ring for Projects planet */}
                {planetData.ring && (
                  <motion.div
                    className="absolute border rounded-full opacity-40" // Reduced opacity
                    style={{
                      width: `${planetData.size * 1.6}px`, // Reduced size
                      height: `${planetData.size * 1.6}px`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%) rotateX(60deg)',
                      borderColor: `${planetData.color}88`,
                      borderWidth: '1px'
                    }}
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      rotateZ: [0, 360]
                    }}
                    transition={{
                      opacity: { duration: 6, repeat: Infinity }, // Even slower animation
                      rotateZ: { duration: 18, repeat: Infinity, ease: "linear" } // Even slower rotation
                    }}
                  />
                )}
              </div>
              
              {/* Simplified Planet Name Tooltip */}
              <motion.div
                className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-black/80 text-xs rounded border opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm whitespace-nowrap"
                style={{
                  borderColor: `${planetData.color}66`
                }}
                initial={{ x: 10, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: index === currentSection ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="bg-gradient-to-r bg-clip-text text-transparent font-medium"
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${planetData.color}, #ffffff, ${planetData.color}cc)`,
                    backgroundSize: '200% 100%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {planetData.name}
                </motion.span>
              </motion.div>
            </motion.button>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait">
          {sections[currentSection] && (
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full"
            >
              {React.createElement(sections[currentSection].component)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App