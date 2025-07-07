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
        // 滾動到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => setIsScrolling(false), 1000)
      }
    }
  }, [currentSection, isScrolling, sections.length])

  // Touch event handlers for mobile
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [touchStartTime, setTouchStartTime] = useState(null)

  const handleTouchStart = useCallback((e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
    setTouchStartTime(Date.now())
  }, [])

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || !touchStartTime) return
    if (isScrolling) return
    
    const distance = touchStart - touchEnd
    const touchDuration = Date.now() - touchStartTime
    const velocity = Math.abs(distance) / touchDuration
    
    // 提高靈敏度閾值：需要更大的距離或更快的速度
    const minDistance = 80  // 從 50 增加到 80
    const minVelocity = 0.3 // 最小速度閾值
    
    const isValidSwipe = Math.abs(distance) > minDistance && velocity > minVelocity
    const isDownSwipe = distance > 0
    const isUpSwipe = distance < 0
    
    if (isValidSwipe) {
      if (isDownSwipe && currentSection < sections.length - 1) {
        setIsScrolling(true)
        setCurrentSection(currentSection + 1)
        // 滾動到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => setIsScrolling(false), 1000)
      }
      if (isUpSwipe && currentSection > 0) {
        setIsScrolling(true)
        setCurrentSection(currentSection - 1)
        // 滾動到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => setIsScrolling(false), 1000)
      }
    }
  }, [touchStart, touchEnd, touchStartTime, isScrolling, currentSection, sections.length])

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
      // 滾動到頂部
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }, [currentSection, isScrolling, sections.length])

  const handlePlanetClick = useCallback((index) => {
    if (!isScrolling) {
      setIsScrolling(true)
      setCurrentSection(index)
      // 滾動到頂部
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }, [isScrolling])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    
    // 只在桌面版添加觸控事件
    const isMobile = window.innerWidth < 768
    if (!isMobile) {
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
    }
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      if (!isMobile) {
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <div className="h-screen overflow-hidden bg-black text-white relative lg:cursor-none w-full max-w-full">
      <div className="hidden lg:block">
        <PerformanceMonitor />
      </div>
      <div className="hidden lg:block">
        <MouseFollower />
      </div>
      <AnimatedBackground currentSection={currentSection} />
      
      {/* Section Indicator - Planet Navigation - 手機版隱藏 */}
      <div className="hidden lg:flex fixed right-4 sm:right-6 lg:right-8 top-4 sm:top-6 lg:top-8 z-50 flex-col">
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

      {/* 手機版宇宙導航控制台 */}
      <div className="lg:hidden fixed top-6 right-4 z-50">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* 太空站艙門外框 */}
          <motion.div
            className="relative p-2 rounded-2xl"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 100%)',
              border: '2px solid rgba(0, 245, 255, 0.4)',
              boxShadow: '0 0 25px rgba(0, 245, 255, 0.3), inset 0 0 25px rgba(0, 245, 255, 0.1)',
              backdropFilter: 'blur(15px)'
            }}
            animate={{
              boxShadow: [
                '0 0 25px rgba(0, 245, 255, 0.3), inset 0 0 25px rgba(0, 245, 255, 0.1)',
                '0 0 35px rgba(0, 245, 255, 0.5), inset 0 0 30px rgba(0, 245, 255, 0.15)',
                '0 0 25px rgba(0, 245, 255, 0.3), inset 0 0 25px rgba(0, 245, 255, 0.1)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >

            {/* 控制台內部結構 */}
            <div className="flex flex-col gap-2">
              {/* 上一個星系 - 離子推進器 */}
              {currentSection > 0 && (
                <motion.button
                  onClick={() => {
                    setIsScrolling(true)
                    setCurrentSection(currentSection - 1)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    setTimeout(() => setIsScrolling(false), 1000)
                  }}
                  className="relative w-10 h-5 rounded-lg flex items-center justify-center group overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(255, 0, 128, 0.2) 100%)',
                    border: '1px solid rgba(139, 92, 246, 0.6)',
                    boxShadow: '0 0 12px rgba(139, 92, 246, 0.4), inset 0 0 8px rgba(139, 92, 246, 0.2)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* 推進器噴口 */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%)'
                    }}
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* 箭頭 */}
                  <svg className="w-3 h-3 text-purple-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                  {/* 離子尾跡 */}
                  <motion.div
                    className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-0.5 opacity-60"
                    style={{
                      background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.8) 0%, transparent 100%)',
                      filter: 'blur(0.5px)'
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scaleX: [0.8, 1.2, 0.8]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.button>
              )}

              {/* 中央能量核心 */}
              <motion.div
                className="w-10 h-3 rounded-full relative overflow-hidden mx-auto"
                style={{
                  background: 'radial-gradient(ellipse, rgba(0, 245, 255, 0.4) 0%, rgba(0, 245, 255, 0.1) 100%)',
                  border: '1px solid rgba(0, 245, 255, 0.5)',
                  boxShadow: '0 0 15px rgba(0, 245, 255, 0.6), inset 0 0 10px rgba(0, 245, 255, 0.3)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(0, 245, 255, 0.6), inset 0 0 10px rgba(0, 245, 255, 0.3)',
                    '0 0 25px rgba(0, 245, 255, 0.8), inset 0 0 15px rgba(0, 245, 255, 0.5)',
                    '0 0 15px rgba(0, 245, 255, 0.6), inset 0 0 10px rgba(0, 245, 255, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* 能量流 */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
                  }}
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>

              {/* 下一個星系 - 量子驅動器 */}
              {currentSection < sections.length - 1 && (
                <motion.button
                  onClick={() => {
                    setIsScrolling(true)
                    setCurrentSection(currentSection + 1)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    setTimeout(() => setIsScrolling(false), 1000)
                  }}
                  className="relative w-10 h-5 rounded-lg flex items-center justify-center group overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 135, 0.3) 0%, rgba(0, 245, 255, 0.2) 100%)',
                    border: '1px solid rgba(0, 255, 135, 0.6)',
                    boxShadow: '0 0 12px rgba(0, 255, 135, 0.4), inset 0 0 8px rgba(0, 255, 135, 0.2)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  {/* 量子波動 */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 135, 0.3) 50%, transparent 100%)'
                    }}
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                  />
                  {/* 箭頭 */}
                  <svg className="w-3 h-3 text-green-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                  {/* 量子尾跡 */}
                  <motion.div
                    className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-0.5 opacity-60"
                    style={{
                      background: 'linear-gradient(270deg, rgba(0, 255, 135, 0.8) 0%, transparent 100%)',
                      filter: 'blur(0.5px)'
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scaleX: [0.8, 1.2, 0.8]
                    }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                  />
                </motion.button>
              )}
            </div>

            {/* 周圍星塵粒子 */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 100%)',
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 20}%`
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </motion.div>
        </motion.div>
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