import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Introduction from './components/Introduction'
import Experience from './components/Experience'
import Projects from './components/Projects'
import AnimatedBackground from './components/AnimatedBackground'
import MouseFollower from './components/MouseFollower'

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

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) return
      
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

    const handleKeyDown = (e) => {
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
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentSection, isScrolling, sections.length])

  return (
    <div className="h-screen overflow-hidden bg-black text-white relative cursor-none">
      <MouseFollower />
      <AnimatedBackground currentSection={currentSection} />
      
      {/* Section Indicator - Planet Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col">
        {sections.map((section, index) => {
          const planetData = [
            { color: '#00f5ff', size: 18, name: 'Introduction', ring: false },
            { color: '#8b5cf6', size: 16, name: 'Experience', ring: false },
            { color: '#00ff87', size: 14, name: 'Projects', ring: true }
          ][index];
          
          const isActive = index === currentSection;
          
          return (
            <motion.button
              key={index}
              onClick={() => {
                if (!isScrolling) {
                  setIsScrolling(true)
                  setCurrentSection(index)
                  setTimeout(() => setIsScrolling(false), 1000)
                }
              }}
              className="relative group"
              style={{
                marginBottom: index < sections.length - 1 ? '2.5rem' : '0'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                scale: isActive ? 1.3 : 1,
                y: isActive ? -2 : 0 
              }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              {/* Planet */}
              <motion.div
                className="rounded-full relative"
                style={{
                  width: `${planetData.size}px`,
                  height: `${planetData.size}px`,
                  background: `radial-gradient(circle at 30% 30%, ${planetData.color}, ${planetData.color}cc, ${planetData.color}77)`,
                  boxShadow: isActive 
                    ? `0 0 25px ${planetData.color}dd, 0 0 50px ${planetData.color}88, 0 0 75px ${planetData.color}44` 
                    : `0 0 8px ${planetData.color}66`,
                }}
                animate={{
                  boxShadow: isActive 
                    ? [
                        `0 0 25px ${planetData.color}dd, 0 0 50px ${planetData.color}88, 0 0 75px ${planetData.color}44`,
                        `0 0 35px ${planetData.color}ff, 0 0 70px ${planetData.color}aa, 0 0 105px ${planetData.color}66`,
                        `0 0 25px ${planetData.color}dd, 0 0 50px ${planetData.color}88, 0 0 75px ${planetData.color}44`
                      ]
                    : `0 0 8px ${planetData.color}66`,
                  rotate: [0, 360]
                }}
                transition={{
                  boxShadow: { duration: 3, repeat: Infinity },
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                }}
              >
                {/* Planet Surface Details */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute w-1 h-1 rounded-full opacity-60"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      top: '25%',
                      left: '30%',
                      filter: 'blur(0.5px)'
                    }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute w-0.5 h-0.5 rounded-full opacity-40"
                    style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      bottom: '30%',
                      right: '25%'
                    }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>
                
                {/* Ring for Projects planet */}
                {planetData.ring && (
                  <motion.div
                    className="absolute border rounded-full opacity-60"
                    style={{
                      width: `${planetData.size * 1.8}px`,
                      height: `${planetData.size * 1.8}px`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%) rotateX(60deg)',
                      borderColor: `${planetData.color}aa`,
                      borderWidth: '1px'
                    }}
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                      rotateZ: [0, 360]
                    }}
                    transition={{
                      opacity: { duration: 3, repeat: Infinity },
                      rotateZ: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                  />
                )}
              </motion.div>
              
              {/* Planet Name Tooltip */}
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
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-2 border-b-2 border-l-black/80 border-t-transparent border-b-transparent"></div>
              </motion.div>
              
              {/* Orbital Ring */}
              {isActive && (
                <motion.div
                  className="absolute rounded-full border opacity-40"
                  style={{
                    width: `${planetData.size * 3}px`,
                    height: `${planetData.size * 3}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: planetData.color,
                    borderWidth: '2px',
                    borderStyle: 'dashed'
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity },
                    opacity: { duration: 2, repeat: Infinity }
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
      
      {/* Main Content */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ 
              opacity: 0,
              y: 100,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0,
              y: -100,
              scale: 1.05
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="absolute inset-0 w-full h-full"
          >
            {React.createElement(sections[currentSection]?.component || sections[0].component)}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Cosmic Navigation Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-center"
      >
        <motion.div 
          className="relative bg-black/70 backdrop-blur-lg border border-neon-cyan/40 rounded-lg px-4 py-2 font-mono text-xs"
          animate={{
            boxShadow: [
              '0 0 10px rgba(0, 245, 255, 0.3)',
              '0 0 20px rgba(0, 245, 255, 0.5)',
              '0 0 10px rgba(0, 245, 255, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-neon-cyan text-xs mb-1 tracking-wider">
            {currentSection < sections.length - 1 ? '✦ NAVIGATE DEEPER INTO SPACE ✦' : '✦ RETURN TO ORIGIN ✦'}
          </div>
          <div className="text-white/70 text-xs">
            {currentSection < sections.length - 1 ? 'SCROLL DOWN • PRESS ↓ • WARP SPEED' : 'SCROLL UP • PRESS ↑ • RETREAT'}
          </div>
        </motion.div>
        
        {/* Animated Warp Core */}
        <motion.div
          className="mt-3 relative flex justify-center items-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Warp Core Ring */}
          <motion.div
            className="absolute w-12 h-12 rounded-full border-2 border-neon-cyan/40"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              borderColor: [
                'rgba(0, 245, 255, 0.4)',
                'rgba(0, 245, 255, 0.8)',
                'rgba(0, 245, 255, 0.4)'
              ]
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity },
              borderColor: { duration: 2, repeat: Infinity }
            }}
          />
          
          {/* Center Core */}
          <motion.div
            className="w-3 h-3 rounded-full bg-neon-cyan relative z-10"
            animate={{
              boxShadow: [
                '0 0 10px #00f5ff',
                '0 0 20px #00f5ff, 0 0 30px #00f5ff',
                '0 0 10px #00f5ff'
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Direction Indicator */}
          <motion.div
            className="absolute text-neon-cyan text-lg font-bold"
            style={{
              transform: currentSection < sections.length - 1 ? 'translateY(15px)' : 'translateY(-15px) rotate(180deg)'
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ▼
          </motion.div>
          
          {/* Energy Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`energy-${i}`}
              className="absolute w-1 h-1 bg-neon-cyan rounded-full"
              style={{
                left: `${Math.cos(i * 60 * Math.PI / 180) * 20 + 50}%`,
                top: `${Math.sin(i * 60 * Math.PI / 180) * 20 + 50}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App