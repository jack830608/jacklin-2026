import { motion, useInView } from 'framer-motion'
import { FiCpu, FiCalendar, FiGlobe, FiZap, FiMusic, FiTarget, FiMapPin, FiMessageCircle, FiBook } from 'react-icons/fi'
import { useState, useRef, useMemo } from 'react'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" })
  
  // Pre-generate star data to avoid re-calculation on every render
  const starData = useMemo(() => {
    return [...Array(45)].map((_, i) => ({
      id: i,
      size: Math.random(),
      brightness: Math.random(),
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 2,
      delay: Math.random() * 2
    }))
  }, [])
  
  // Pre-generate neural network data
  const neuralData = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      moveX: Math.random() * 10 - 5,
      moveY: Math.random() * 10 - 5,
      duration: 10 + Math.random() * 3,
      delay: Math.random() * 3
    }))
  }, [])

  const spaceStations = [
    {
      id: 1,
      company: "Positive Grid",
      position: "Senior Front-end Developer",
      period: "2020-08 ~ Present",
      location: "Music Tech Galaxy",
      stationType: "E-commerce Innovation Hub",
      description: "Currently stationed at a cutting-edge music technology company, optimizing digital experiences and leading front-end development initiatives.",
      achievements: [
        "Enhanced site speed and stability through performance optimization techniques",
        "Implemented new features aligned with market demands",
        "Led redesign efforts for a more intuitive user experience",
        "Mentored junior developers, ensuring project success",
        "Built front-end toolbox for marketing team's ease of use",
        "Implemented Lighthouse CI in CI/CD Pipeline for automated performance audits"
      ],
      technologies: ["HTML5", "CSS3", "TypeScript", "Tailwind", "Shopify", "Node.js", "React", "Next.js", "Jest", "Playwright", "MongoDB", "AWS"],
      color: "#00f5ff",
      icon: FiMusic
    },
    {
      id: 2,
      company: "Vpon - 威朋大數據集團",
      position: "Software Engineer",
      period: "2019-11 ~ 2020-08",
      location: "Data Intelligence Sector",
      stationType: "AdTech Innovation Center",
      description: "Specialized mission at a leading big data analytics company, developing sophisticated advertising platforms and implementing advanced tracking solutions.",
      achievements: [
        "Built comprehensive AD demo platform with image upload and template selection capabilities",
        "Developed dynamic AD templates to showcase real-time advertising experiences",
        "Architected cross-domain tracking infrastructure for seamless data collection",
        "Implemented advanced JavaScript injection techniques for client website integration",
        "Engineered scalable tracking pixel deployment system across multiple domains",
        "Optimized data pipeline performance for high-volume advertising analytics"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "React", "MySQL", "Docker", "GTM", "GA", "ShellScript"],
      color: "#8b5cf6",
      icon: FiTarget
    },
    {
      id: 3,
      company: "Tripmoment - 時刻旅行",
      position: "Front-end Developer",
      period: "2019-08 ~ 2020-06",
      location: "Travel Tech Constellation",
      stationType: "Digital Travel Platform",
      description: "Deployed to an innovative travel platform company, enhancing user experience through modern web technologies and optimizing performance for global travelers.",
      achievements: [
        "Developed new posts UI with enhanced user interaction capabilities",
        "Refactored legacy codebase to improve site performance and stability",
        "Engineered dynamic AD template system for travel content monetization",
        "Integrated third-party advertising networks with seamless user experience",
        "Implemented secure third-party payment gateway integration",
        "Optimized frontend architecture for improved loading speed and reliability"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "React", "PostgreSQL", "GCP"],
      color: "#00ff87",
      icon: FiMapPin
    },
    {
      id: 4,
      company: "MemePR - 潮語傳媒股份有限公司",
      position: "Front-end Developer",
      period: "2018-06 ~ 2019-08",
      location: "AI Innovation Lab",
      stationType: "Media Tech Startup",
      description: "Pioneered AI-driven media solutions in a dynamic startup environment where innovation and meritocracy flourished, contributing to groundbreaking chatbot development.",
      achievements: [
        "Co-created the company's first chatbot 'Sbot' from concept to deployment",
        "Developed AI-powered conversational interfaces using modern web technologies",
        "Built responsive front-end components for chatbot interaction platforms",
        "Collaborated in cross-functional teams to integrate AI capabilities with web interfaces",
        "Implemented real-time messaging systems for seamless user-bot communication",
        "Contributed to establishing AI-first development culture and practices"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "React", "Next.js", "AWS", "PostgreSQL"],
      color: "#ff6b35",
      icon: FiMessageCircle
    },
    {
      id: 5,
      company: "結音股份有限公司",
      position: "Back-end Developer",
      period: "2017-09 ~ 2018-06",
      location: "Education Tech Station",
      stationType: "Educational Systems Hub",
      description: "Engineered comprehensive educational management systems for supplementary education institutions, integrating modern web technologies with intelligent automation.",
      achievements: [
        "Developed comprehensive internal management system for educational institutions",
        "Built dynamic course selection system with real-time availability tracking",
        "Engineered classroom management system optimizing resource allocation",
        "Created intelligent LINE Bot for automated student course enrollment",
        "Implemented data analytics dashboard for administrative decision-making",
        "Integrated multi-platform communication channels for seamless student experience"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB", "Angular.js (1.x)", "LineBot"],
      color: "#ff0080",
      icon: FiBook
    }
  ]


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="min-h-screen max-h-screen bg-black relative overflow-hidden">
      {/* Optimized Background with More Visual Elements */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 0.75, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.75, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Static Background Stars - CSS animated for better performance */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <div
              key={`static-star-${i}`}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() > 0.7 ? '3px' : Math.random() > 0.4 ? '2px' : '1px',
                height: Math.random() > 0.7 ? '3px' : Math.random() > 0.4 ? '2px' : '1px',
                opacity: Math.random() * 0.5 + 0.2,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Simplified Stars - CSS animated */}
        <div className="absolute inset-0">
          {starData.map((star) => (
            <div
              key={`experience-star-${star.id}`}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size > 0.8 ? '4px' : star.size > 0.6 ? '3px' : '2px',
                height: star.size > 0.8 ? '4px' : star.size > 0.6 ? '3px' : '2px',
                opacity: star.brightness * 0.8 + 0.3,
                boxShadow: star.size > 0.8 ? `0 0 ${star.size * 6}px white` : star.size > 0.6 ? `0 0 ${star.size * 4}px white` : `0 0 ${star.size * 2}px white`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`
              }}
            />
          ))}
        </div>
        
        {/* Multiple Simplified Nebula Clouds */}
        {[
          { x: 45, y: 40, size: 200, color1: '#8b5cf6', color2: '#00f5ff' },
          { x: 20, y: 70, size: 150, color1: '#ff0080', color2: '#8b5cf6' },
          { x: 80, y: 20, size: 180, color1: '#00f5ff', color2: '#00ff87' },
        ].map((nebula, index) => (
          <motion.div
            key={`nebula-${index}`}
            className="absolute rounded-full opacity-8"
            style={{
              left: `${nebula.x}%`,
              top: `${nebula.y}%`,
              width: `${nebula.size}px`,
              height: `${nebula.size}px`,
              background: `radial-gradient(circle, ${nebula.color1}20 0%, ${nebula.color2}10 40%, transparent 80%)`,
              filter: 'blur(1px)',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.03, 1],
              opacity: [0.06, 0.1, 0.06],
            }}
            transition={{
              duration: 30 + index * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Simplified Neural Networks - CSS animated */}
        <div className="absolute inset-0">
          {neuralData.map((neural) => (
            <div
              key={`neural-${neural.id}`}
              className="absolute bg-neon-cyan rounded-full animate-pulse"
              style={{
                left: `${neural.left}%`,
                top: `${neural.top}%`,
                width: '2px',
                height: '2px',
                boxShadow: '0 0 6px #00f5ff',
                animationDelay: `${neural.delay}s`,
                animationDuration: `${neural.duration}s`
              }}
            />
          ))}
        </div>

        {/* Static Connection Lines - CSS animated */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={`connection-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 30}px`,
                height: '1px',
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.3,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Header and Timeline Container */}
      <div className="relative z-10 h-screen flex flex-col space-y-4 lg:space-y-[4vh] justify-center overflow-hidden px-4 lg:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
            animate={{
              textShadow: [
                '0 0 10px rgba(139, 92, 246, 0.3)',
                '0 0 15px rgba(139, 92, 246, 0.6)',
                '0 0 10px rgba(139, 92, 246, 0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Space Career <span className="bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-green bg-clip-text text-transparent">Timeline</span>
          </motion.h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto">
            Journey through the cosmos of <span className="text-neon-purple">technology</span> and <span className="text-neon-cyan">innovation</span>
          </p>
        </motion.div>

        {/* Horizontal Timeline Container */}
        <div className="overflow-hidden flex-shrink-0">
          <div className="overflow-x-auto overflow-y-hidden timeline-container" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} onWheel={(e) => {
            // Only prevent propagation for horizontal scrolling
            const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            
            if (isHorizontalScroll) {
              e.stopPropagation();
            }
            // For vertical scrolling, let it bubble up for section switching
          }} onTouchStart={(e) => {
            // Prevent section switching when touching timeline on mobile
            e.stopPropagation();
          }}>
            <div className="flex items-center" style={{ width: `${spaceStations.length * (typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 400) + 200}px`, minHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? '300px' : '400px' }}>
            
            {/* Timeline Path */}
            <div className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2">
              {/* Main Energy Stream */}
              <motion.div 
                className="h-1 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-green opacity-60"
                style={{ 
                  width: `${spaceStations.length * (typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 400) + (typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 300)}px`,
                  zIndex: 1,
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Flowing Energy Particles - Hidden on mobile to prevent overflow */}
              {typeof window !== 'undefined' && window.innerWidth >= 768 && (
                <motion.div
                  className="absolute top-0 w-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{ maxWidth: '100%' }}
                  animate={{
                    x: [0, Math.min(spaceStations.length * 400, typeof window !== 'undefined' ? window.innerWidth - 100 : 1200)]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
            </div>

            {/* Space Stations */}
            {spaceStations.map((station, index) => (
              <motion.div
                key={station.id}
                className="relative flex-shrink-0 mx-4 sm:mx-6 lg:mx-8"
                style={{ width: typeof window !== 'undefined' && window.innerWidth < 768 ? '300px' : '350px', maxWidth: '90vw' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Station Core */}
                <div className="relative">
                  {/* Orbital Rings Container */}
                  <div className="relative w-28 h-28 mx-auto">
                    {/* Orbital Rings */}
                    <motion.div
                      className="absolute w-20 h-20 border border-dashed rounded-full"
                      style={{ 
                        borderColor: `${station.color}60`,
                        left: '16px', // (112-80)/2 = 16px
                        top: '16px',   // (112-80)/2 = 16px
                        boxShadow: `0 0 6px ${station.color}40`
                      }}
                      animate={{ 
                        rotate: 360,
                        borderColor: [
                          `${station.color}60`,
                          `${station.color}aa`,
                          `${station.color}60`
                        ]
                      }}
                      transition={{ 
                        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                        borderColor: { duration: 2, repeat: Infinity }
                      }}
                    />
                    <motion.div
                      className="absolute w-24 h-24 border border-dashed rounded-full"
                      style={{ 
                        borderColor: `${station.color}40`,
                        left: '8px',  // (112-96)/2 = 8px
                        top: '8px',    // (112-96)/2 = 8px
                        boxShadow: `0 0 8px ${station.color}30`
                      }}
                      animate={{ 
                        rotate: -360,
                        borderColor: [
                          `${station.color}40`,
                          `${station.color}80`,
                          `${station.color}40`
                        ]
                      }}
                      transition={{ 
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        borderColor: { duration: 3, repeat: Infinity }
                      }}
                    />
                    
                    {/* Central Hub */}
                    <motion.div
                      className="absolute w-16 h-16 rounded-full z-20 flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle, ${station.color}40, ${station.color}20, transparent)`,
                        border: `2px solid ${station.color}`,
                        boxShadow: `0 0 30px ${station.color}40`,
                        left: '24px', // (112-64)/2 = 24px
                        top: '24px'   // (112-64)/2 = 24px
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${station.color}40`,
                          `0 0 40px ${station.color}60`,
                          `0 0 20px ${station.color}40`
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <station.icon className="w-6 h-6" style={{ color: station.color }} />
                    </motion.div>
                  </div>
                </div>

                {/* Station Info Card */}
                <motion.div
                  className="bg-black/90 border rounded-2xl p-6 font-mono"
                  style={{
                    borderColor: `${station.color}40`,
                    fontFamily: '"Courier New", "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Source Code Pro", Consolas, "Ubuntu Mono", monospace'
                  }}
                  whileHover={{
                    borderColor: `${station.color}`,
                    backgroundColor: `${station.color}05`,
                    y: -4
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Station Header */}
                  <div className="text-center mb-4">
                    <div className="text-xs font-mono mb-1" style={{ color: station.color }}>
                      {station.stationType.toUpperCase()}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                      {station.company}
                    </h3>
                    <div className="text-xs sm:text-sm font-medium mb-2" style={{ color: station.color }}>
                      {station.position}
                    </div>
                    <div className="text-xs text-white/60">
                      {station.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {station.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <div className="text-xs font-mono mb-2" style={{ color: station.color }}>
                      MISSION ACHIEVEMENTS:
                    </div>
                    <div 
                      className="space-y-1 max-h-24 sm:max-h-32 overflow-y-auto achievement-scroll" 
                      style={{ '--station-color': station.color }}
                      onWheel={(e) => e.stopPropagation()}
                    >
                      {station.achievements.map((achievement, idx) => (
                        <div key={idx} className="text-xs text-white/80 flex items-start">
                          <span className="text-neon-green mr-2 flex-shrink-0">▸</span>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <div className="text-xs font-mono mb-2" style={{ color: station.color }}>
                      TECH STACK:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {station.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-full text-xs font-medium border"
                          style={{
                            backgroundColor: `${station.color}10`,
                            borderColor: `${station.color}30`,
                            color: station.color
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Experience