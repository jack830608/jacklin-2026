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
    <div className="h-screen overflow-hidden bg-black text-white relative cursor-none w-full max-w-full">
      <div className="hidden lg:block">
        <PerformanceMonitor />
      </div>
      <MouseFollower />
      <AnimatedBackground currentSection={currentSection} />
      
      {/* Section Indicator - Planet Navigation */}
      <div className="fixed right-4 sm:right-6 lg:right-8 top-4 sm:top-6 lg:top-8 z-50 flex flex-col">
        {sections.map((section, index) => {
          const planetData = [
            { color: '#00f5ff', size: 18, name: 'Introduction', ring: false, type: 'earth' },
            { color: '#8b5cf6', size: 16, name: 'Experience', ring: false, type: 'gas' },
            { color: '#ffd700', size: 14, name: 'Projects', ring: true, type: 'saturn' }
          ][index];
          
          const isActive = index === currentSection;
          
          return (
            <motion.button
              key={index}
              onClick={() => handlePlanetClick(index)}
              className="relative group"
              style={{
                marginBottom: index < sections.length - 1 ? '1.5rem' : '0'
              }}
              whileHover={{ scale: 1.05 }} // Further reduced hover scale
              whileTap={{ scale: 0.95 }}
              animate={{ 
                scale: isActive ? 1.1 : 1, // Further reduced active scale
                y: isActive ? -0.5 : 0 // Further reduced movement
              }}
              transition={{ duration: 0.2, type: "spring", stiffness: 150 }}
            >
              {/* Realistic Planet */}
              <div
                className={`rounded-full relative overflow-hidden ${isActive ? 'animate-pulse' : ''}`}
                style={{
                  width: `${planetData.size}px`,
                  height: `${planetData.size}px`,
                  background: planetData.type === 'earth' 
                    ? `radial-gradient(ellipse at 30% 30%, #4a90e2, #2171b5 50%, #1e3a5f 80%, #0f1419)`
                    : planetData.type === 'gas'
                    ? `radial-gradient(ellipse at 30% 30%, #a855f7, #9333ea 30%, #7c3aed 60%, #6d28d9 80%, #4c1d95)`
                    : `radial-gradient(ellipse at 30% 30%, #ffd700, #ffb347 30%, #ff8c00 60%, #b8860b 80%, #8b4513)`,
                  boxShadow: isActive 
                    ? (planetData.type === 'saturn' 
                      ? `0 0 15px #ffd700cc, 0 0 25px #ffd70077, inset -2px -2px 6px rgba(0,0,0,0.4)`
                      : `0 0 15px ${planetData.color}cc, 0 0 25px ${planetData.color}77, inset -2px -2px 6px rgba(0,0,0,0.4)`)
                    : (planetData.type === 'saturn'
                      ? `0 0 6px #ffd70099, inset -1px -1px 3px rgba(0,0,0,0.3)`
                      : `0 0 6px ${planetData.color}99, inset -1px -1px 3px rgba(0,0,0,0.3)`),
                  transform: 'translateZ(0)',
                  animationDuration: '4s'
                }}
              >
                {/* Planet Type Specific Details */}
                {planetData.type === 'earth' && (
                  <>
                    {/* Continents */}
                    <div className="absolute inset-0">
                      <div className="absolute w-2 h-1 bg-green-600 rounded-full top-2 left-1 opacity-60" />
                      <div className="absolute w-1 h-2 bg-green-700 rounded-full top-1 right-1 opacity-50" />
                      <div className="absolute w-1.5 h-1 bg-yellow-600 rounded-full bottom-2 left-2 opacity-40" />
                    </div>
                    {/* Clouds */}
                    <motion.div 
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="absolute w-1.5 h-0.5 bg-white rounded-full top-1.5 left-2 opacity-30" />
                      <div className="absolute w-1 h-0.5 bg-white rounded-full bottom-2.5 right-1.5 opacity-25" />
                    </motion.div>
                  </>
                )}
                
                {planetData.type === 'gas' && (
                  <>
                    {/* Neptune-style gas bands */}
                    <div className="absolute inset-0">
                      <div className="absolute w-full h-0.5 bg-blue-300 opacity-40 top-1/6" />
                      <div className="absolute w-full h-0.5 bg-purple-400 opacity-45 top-1/3" />
                      <div className="absolute w-full h-0.5 bg-indigo-400 opacity-50 top-1/2" />
                      <div className="absolute w-full h-0.5 bg-violet-400 opacity-35 top-2/3" />
                      <div className="absolute w-full h-0.5 bg-blue-400 opacity-30 top-5/6" />
                    </div>
                    {/* Great Dark Spot - Neptune's storm */}
                    <motion.div 
                      className="absolute w-1.5 h-1 rounded-full opacity-50"
                      style={{ 
                        top: '40%', 
                        left: '30%',
                        background: 'radial-gradient(ellipse, #1e1b4b, #312e81 60%, #1e3a8a)',
                        transform: 'rotate(-10deg)'
                      }}
                      animate={{ 
                        scale: [1, 1.08, 1],
                        rotate: [-10, -15, -10]
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                    {/* Smaller atmospheric features */}
                    <motion.div 
                      className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-40"
                      style={{ top: '20%', left: '70%' }}
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute w-0.5 h-0.5 bg-purple-300 rounded-full opacity-35"
                      style={{ top: '75%', left: '50%' }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </>
                )}
                
                {planetData.type === 'saturn' && (
                  <>
                    {/* Saturn bands */}
                    <div className="absolute inset-0">
                      <div className="absolute w-full h-0.5 bg-yellow-200 opacity-40 top-1/5" />
                      <div className="absolute w-full h-0.5 bg-orange-300 opacity-50 top-2/5" />
                      <div className="absolute w-full h-0.5 bg-yellow-400 opacity-35 top-3/5" />
                      <div className="absolute w-full h-0.5 bg-orange-200 opacity-30 top-4/5" />
                    </div>
                    {/* Saturn's hexagonal storm */}
                    <motion.div 
                      className="absolute w-1 h-1 bg-yellow-100 opacity-50"
                      style={{ 
                        top: '20%', 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'
                      }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </>
                )}
                
                {/* Atmospheric rim light */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: planetData.type === 'saturn'
                      ? `radial-gradient(ellipse at 25% 25%, transparent 70%, #ffd70044 85%, transparent)`
                      : `radial-gradient(ellipse at 25% 25%, transparent 70%, ${planetData.color}44 85%, transparent)`,
                  }}
                />
                
                {/* Enhanced Ring System for Saturn */}
                {planetData.ring && (
                  <div className="absolute inset-0" style={{ transform: 'perspective(50px)' }}>
                    {/* Inner ring - A ring */}
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        width: `${planetData.size * 1.8}px`,
                        height: `${planetData.size * 1.8}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%) rotateX(75deg)',
                        border: '1.5px solid #daa520',
                        boxShadow: `0 0 4px #daa52077, inset 0 0 4px #daa52044`
                      }}
                      animate={{
                        rotateZ: [0, 360]
                      }}
                      transition={{
                        duration: 25, repeat: Infinity, ease: "linear"
                      }}
                    />
                    {/* Main ring - B ring */}
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        width: `${planetData.size * 2.1}px`,
                        height: `${planetData.size * 2.1}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%) rotateX(75deg)',
                        border: '2px solid #ffd700',
                        boxShadow: `0 0 6px #ffd70099, inset 0 0 6px #ffd70066`
                      }}
                      animate={{
                        rotateZ: [0, 360]
                      }}
                      transition={{
                        duration: 30, repeat: Infinity, ease: "linear"
                      }}
                    />
                    {/* Outer ring - C ring */}
                    <motion.div
                      className="absolute border-dashed rounded-full"
                      style={{
                        width: `${planetData.size * 2.5}px`,
                        height: `${planetData.size * 2.5}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%) rotateX(75deg)',
                        borderColor: '#cd853f',
                        borderWidth: '1px',
                        opacity: 0.6
                      }}
                      animate={{
                        rotateZ: [360, 0]
                      }}
                      transition={{
                        duration: 40, repeat: Infinity, ease: "linear"
                      }}
                    />
                  </div>
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