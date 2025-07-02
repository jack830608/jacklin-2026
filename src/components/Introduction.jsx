import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const Introduction = () => {
  const [typedText, setTypedText] = useState('')
  const fullText = "Full Stack Developer & AI Enthusiast"
  
  // Pre-generate star data to avoid re-calculation on every render
  const [starData] = useState(() => {
    return [...Array(150)].map((_, i) => ({
      id: i,
      size: Math.random(),
      brightness: Math.random(),
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 6,
      delay: Math.random() * 4
    }))
  })
  
  // Pre-generate cosmic dust data
  const [cosmicDustData] = useState(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      red: Math.random() * 100 + 155,
      green: Math.random() * 100 + 155,
      moveX: Math.random() * 30 - 15,
      moveY: Math.random() * 30 - 15,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 8
    }))
  })
  
  // Pre-generate star cluster data
  const [starClusterData] = useState(() => {
    return [
      { x: 80, y: 20, size: 30 },
      { x: 15, y: 75, size: 25 },
      { x: 45, y: 85, size: 20 },
    ].map((cluster, index) => ({
      ...cluster,
      stars: [...Array(8)].map((_, i) => ({
        id: i,
        left: Math.cos(i * 45 * Math.PI / 180) * (Math.random() * 15 + 8) + cluster.size/2,
        top: Math.sin(i * 45 * Math.PI / 180) * (Math.random() * 15 + 8) + cluster.size/2,
        duration: 2 + Math.random() * 3
      }))
    }))
  })
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Realistic Deep Space Background */}
      <div className="absolute inset-0">
        {/* Distant Galaxies */}
        {[
          { x: 15, y: 20, size: 60, rotation: 45, color: '#8b5cf6' },
          { x: 85, y: 70, size: 80, rotation: -30, color: '#06b6d4' },
          { x: 25, y: 85, size: 50, rotation: 90, color: '#f59e0b' },
          { x: 75, y: 15, size: 40, rotation: 120, color: '#ec4899' },
        ].map((galaxy, index) => (
          <motion.div
            key={`bg-galaxy-${index}`}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${galaxy.x}%`,
              top: `${galaxy.y}%`,
              width: `${galaxy.size}px`,
              height: `${galaxy.size / 2}px`,
              background: `radial-gradient(ellipse, ${galaxy.color}60 0%, ${galaxy.color}30 30%, transparent 70%)`,
              transform: `rotate(${galaxy.rotation}deg)`,
              filter: 'blur(1px)'
            }}
            animate={{
              rotate: [galaxy.rotation, galaxy.rotation + 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              rotate: { duration: 100 + index * 30, repeat: Infinity, ease: "linear" },
              opacity: { duration: 15 + index * 3, repeat: Infinity }
            }}
          />
        ))}
        
        {/* Nebulae */}
        {[
          { x: 60, y: 25, size: 200, color1: '#ff0080', color2: '#8b5cf6' },
          { x: 20, y: 60, size: 180, color1: '#00f5ff', color2: '#00ff87' },
          { x: 80, y: 80, size: 120, color1: '#fbbf24', color2: '#f59e0b' },
        ].map((nebula, index) => (
          <motion.div
            key={`bg-nebula-${index}`}
            className="absolute rounded-full opacity-10"
            style={{
              left: `${nebula.x}%`,
              top: `${nebula.y}%`,
              width: `${nebula.size}px`,
              height: `${nebula.size}px`,
              background: `radial-gradient(circle, ${nebula.color1}20 0%, ${nebula.color2}15 40%, transparent 80%)`,
              filter: 'blur(3px)',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 25 + index * 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Dense Star Field */}
        {starData.map((star) => (
          <motion.div
            key={`bg-star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size > 0.95 ? '3px' : star.size > 0.8 ? '2px' : '1px',
              height: star.size > 0.95 ? '3px' : star.size > 0.8 ? '2px' : '1px',
              opacity: star.brightness * 0.7 + 0.3,
              boxShadow: star.size > 0.9 ? `0 0 ${star.size * 6}px white` : 'none'
            }}
            animate={{
              opacity: [star.brightness * 0.7 + 0.3, star.brightness * 0.3 + 0.7, star.brightness * 0.7 + 0.3],
              scale: star.size > 0.9 ? [1, 1.2, 1] : [1, 1.05, 1]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Bright Stars with Cross Pattern */}
        {[
          { x: 10, y: 30, color: '#00f5ff' },
          { x: 90, y: 50, color: '#ffd700' },
          { x: 30, y: 10, color: '#ff69b4' },
          { x: 70, y: 90, color: '#98fb98' },
          { x: 50, y: 25, color: '#ff6b35' },
        ].map((star, index) => (
          <motion.div
            key={`bg-bright-star-${index}`}
            className="absolute opacity-60"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Star center */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: star.color,
                boxShadow: `0 0 15px ${star.color}`
              }}
              animate={{
                boxShadow: [
                  `0 0 15px ${star.color}`,
                  `0 0 25px ${star.color}`,
                  `0 0 15px ${star.color}`
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Cross rays */}
            <motion.div
              className="absolute w-6 h-0.5"
              style={{
                background: `linear-gradient(to right, transparent, ${star.color}, transparent)`,
                left: '-50%',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scaleX: [0.7, 1.1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-0.5 h-6"
              style={{
                background: `linear-gradient(to bottom, transparent, ${star.color}, transparent)`,
                left: '50%',
                top: '-50%',
                transform: 'translateX(-50%)'
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scaleY: [0.7, 1.1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        ))}
        
        {/* Cosmic Dust Clouds */}
        {cosmicDustData.map((dust) => (
          <motion.div
            key={`cosmic-dust-${dust.id}`}
            className="absolute rounded-full"
            style={{
              left: `${dust.left}%`,
              top: `${dust.top}%`,
              width: `${dust.width}px`,
              height: `${dust.height}px`,
              background: `rgba(${dust.red}, ${dust.green}, 255, 0.15)`,
              filter: 'blur(1px)'
            }}
            animate={{
              x: [0, dust.moveX, 0],
              y: [0, dust.moveY, 0],
              opacity: [0.05, 0.2, 0.05]
            }}
            transition={{
              duration: dust.duration,
              repeat: Infinity,
              delay: dust.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Distant Star Clusters */}
        {starClusterData.map((cluster, index) => (
          <motion.div
            key={`star-cluster-${index}`}
            className="absolute opacity-50"
            style={{
              left: `${cluster.x}%`,
              top: `${cluster.y}%`,
              width: `${cluster.size}px`,
              height: `${cluster.size}px`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: { duration: 120 + index * 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity }
            }}
          >
            {cluster.stars.map((star) => (
              <motion.div
                key={`cluster-star-${star.id}`}
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{
                  left: `${star.left}px`,
                  top: `${star.top}px`,
                  boxShadow: '0 0 2px white'
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.id * 0.2
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>

      <div className="section-container section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left lg:min-w-[530px]"
          >
          {/* Cosmic Greeting */}
          <motion.div
            variants={itemVariants}
            className="relative mb-6"
          >
            <motion.div 
              className="bg-black/70 backdrop-blur-lg border border-neon-cyan/30 rounded-lg px-3 py-2 font-mono text-xs inline-block"
              animate={{
                borderColor: [
                  'rgba(0, 245, 255, 0.3)',
                  'rgba(0, 245, 255, 0.6)',
                  'rgba(0, 245, 255, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-neon-green">INCOMING TRANSMISSION...</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-neon-cyan ml-1"
              >
                ▋
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Cosmic Identity Matrix */}
          <motion.div
            variants={itemVariants}
            className="relative mb-4"
          >
            {/* Main Identity Display */}
            <motion.div 
              className="relative bg-black/80 backdrop-blur-lg border-2 border-neon-cyan/40 rounded-xl p-8 font-mono overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 245, 255, 0.3)',
                  '0 0 40px rgba(0, 245, 255, 0.5)',
                  '0 0 20px rgba(0, 245, 255, 0.3)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-neon-green text-xs tracking-wider">IDENTITY_MATRIX.exe</span>
                <motion.div 
                  className="flex space-x-1"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                </motion.div>
              </div>

              {/* Name Display */}
              <motion.h1
                className="text-3xl md:text-5xl font-bold mb-2 relative"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(0, 245, 255, 0.8)',
                    '0 0 30px rgba(255, 0, 128, 0.8)',
                    '0 0 25px rgba(139, 92, 246, 0.8)',
                    '0 0 20px rgba(0, 245, 255, 0.8)'
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <motion.span
                  className="bg-gradient-to-r from-white via-neon-cyan via-neon-pink to-neon-purple bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% 100%' }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  JACK.LIN
                </motion.span>
              </motion.h1>

              {/* Status Lines */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center">
                  <span className="text-neon-cyan">STATUS:</span>
                  <motion.span 
                    className="text-neon-green ml-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    [ACTIVE] FULL-STACK DEVELOPER
                  </motion.span>
                </div>
                <div className="flex items-center">
                  <span className="text-neon-cyan">SPEC:</span>
                  <span className="text-white/80 ml-2">AI + CODE ARCHITECT</span>
                </div>
                <div className="flex items-center">
                  <span className="text-neon-cyan">EXP:</span>
                  <span className="text-neon-purple ml-2">8+ STELLAR CYCLES</span>
                </div>
              </div>

              {/* Scanning Bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple opacity-60"
                animate={{
                  width: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Unified Cosmic Terminal */}
          <motion.div
            variants={itemVariants}
            className="relative mb-6"
          >
            <motion.div 
              className="bg-black/80 backdrop-blur-lg border-2 border-neon-cyan/40 rounded-xl p-8 font-mono"
              animate={{
                borderColor: [
                  'rgba(0, 245, 255, 0.4)',
                  'rgba(139, 92, 246, 0.6)',
                  'rgba(0, 255, 135, 0.5)',
                  'rgba(0, 245, 255, 0.4)'
                ],
                boxShadow: [
                  '0 0 20px rgba(0, 245, 255, 0.3)',
                  '0 0 30px rgba(139, 92, 246, 0.4)',
                  '0 0 25px rgba(0, 255, 135, 0.3)',
                  '0 0 20px rgba(0, 245, 255, 0.3)'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-white text-xs">~/universe/jack_explorer</span>
                </div>
                <motion.div 
                  className="flex items-center space-x-3"
                  animate={{
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-neon-purple text-xs tracking-wider">[MISSION_BRIEFING.log]</span>
                  <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                </motion.div>
              </div>
              
              {/* Command Line */}
              <div className="text-sm mb-4 pb-3 border-b border-white/20 flex items-center space-x-1">
                <span className="text-neon-green">jack@cosmos:~$</span>{' '}
                <span className="text-white min-w-0 flex-1 text-ellipsis overflow-hidden">{typedText}</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-neon-cyan"
                >
                  ▋
                </motion.span>
              </div>

              {/* Mission Output */}
              <div className="mb-4 pb-4 border-b border-white/20">
                <div className="text-neon-green text-xs mb-2">OUTPUT:</div>
                <div className="text-xs leading-relaxed space-y-1.5 overflow-hidden">
                  <div className="flex items-start">
                    <span className="text-neon-cyan mr-2">●</span>
                    <span className="text-white/80">
                      Architecting digital universes through <span className="text-neon-cyan font-medium">innovative code</span>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-neon-green mr-2">●</span>
                    <span className="text-white/80">
                      <span className="text-neon-green font-medium">8+ stellar cycles</span> mastering full-stack development
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-neon-pink mr-2">●</span>
                    <span className="text-white/80">
                      Pioneering <span className="text-neon-pink font-medium">AI consciousness integration</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Communication Interface */}
              <div>
                <div className="text-neon-cyan text-xs mb-3">COMMUNICATION_INTERFACE:</div>
                
                {/* Contact Button */}
                <motion.a
                  href="mailto:jack830608@gmail.com"
                  className="relative block w-full p-2.5 rounded-lg text-white font-bold text-sm overflow-hidden group border-2 bg-black/40 backdrop-blur-lg mb-3"
                  whileHover={{ 
                    scale: 1.02,
                    y: -1
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    borderColor: [
                      'rgba(0, 245, 255, 0.6)',
                      'rgba(255, 0, 128, 0.6)',
                      'rgba(0, 245, 255, 0.6)'
                    ],
                    boxShadow: [
                      '0 0 15px rgba(0, 245, 255, 0.3)',
                      '0 0 25px rgba(255, 0, 128, 0.4)',
                      '0 0 15px rgba(0, 245, 255, 0.3)'
                    ]
                  }}
                  transition={{
                    borderColor: { duration: 3, repeat: Infinity },
                    boxShadow: { duration: 3, repeat: Infinity }
                  }}
                >
                  {/* Scanning Lines Effect */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden rounded-lg"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                  
                  {/* Button Content */}
                  <div className="relative z-10 flex items-center justify-center space-x-3 tracking-wider">
                    <motion.span
                      animate={{
                        textShadow: [
                          '0 0 8px rgba(0, 245, 255, 0.8)',
                          '0 0 15px rgba(0, 245, 255, 1)',
                          '0 0 8px rgba(0, 245, 255, 0.8)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⚡
                    </motion.span>
                    <span className="text-neon-cyan">
                      ESTABLISH CONTACT
                    </span>
                    <motion.span
                      animate={{
                        textShadow: [
                          '0 0 8px rgba(0, 245, 255, 0.8)',
                          '0 0 15px rgba(0, 245, 255, 1)',
                          '0 0 8px rgba(0, 245, 255, 0.8)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      📡
                    </motion.span>
                  </div>
                </motion.a>
                
                {/* Network Links */}
                <div className="h-12">
                  <div className="text-neon-purple text-xs mb-1">QUANTUM_LINKS:</div>
                  <div className="flex justify-center lg:justify-start space-x-3">
                    {[
                      { icon: FiGithub, href: "https://github.com/jack830608", label: "GITHUB_PORTAL", color: "neon-cyan" },
                      { icon: FiLinkedin, href: "https://www.linkedin.com/in/jack1in", label: "LINKEDIN_NODE", color: "neon-purple" },
                    ].map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group"
                        whileHover={{ 
                          scale: 1.1,
                          y: -2
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <motion.div
                          className={`relative p-2.5 bg-black/40 backdrop-blur-sm rounded-lg border-2 transition-all duration-300`}
                          style={{
                            borderColor: social.color === "neon-cyan" ? 'rgba(0, 245, 255, 0.5)' : 'rgba(139, 92, 246, 0.5)'
                          }}
                          animate={{
                            boxShadow: [
                              social.color === "neon-cyan" 
                                ? '0 0 8px rgba(0, 245, 255, 0.3)'
                                : '0 0 8px rgba(139, 92, 246, 0.3)',
                              social.color === "neon-cyan" 
                                ? '0 0 15px rgba(0, 245, 255, 0.6)'
                                : '0 0 15px rgba(139, 92, 246, 0.6)',
                              social.color === "neon-cyan" 
                                ? '0 0 8px rgba(0, 245, 255, 0.3)'
                                : '0 0 8px rgba(139, 92, 246, 0.3)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        >
                          <social.icon 
                            className={`w-4 h-4 ${social.color === "neon-cyan" ? "text-neon-cyan" : "text-neon-purple"}`}
                          />
                          
                          {/* Tooltip */}
                          <motion.div
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-mono"
                            initial={{ y: 5 }}
                            whileHover={{ y: 0 }}
                          >
                            {social.label}
                          </motion.div>
                        </motion.div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Status Indicator */}
              <motion.div
                className="absolute top-0 right-0 text-neon-cyan/40 text-xs p-2"
                animate={{
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                [ONLINE]
              </motion.div>
            </motion.div>
          </motion.div>
          </motion.div>

          {/* Right: Simple Clear Solar System */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative flex items-center justify-center h-full"
          >
            {/* Solar System Container */}
            <div className="relative w-80 h-80">
              
              {/* Central Sun */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #fff700, #ffd700, #ff8c00)',
                  boxShadow: '0 0 40px #ffd700, 0 0 80px #ff8c00',
                }}
                animate={{
                  boxShadow: [
                    '0 0 40px #ffd700, 0 0 80px #ff8c00',
                    '0 0 60px #ffd700, 0 0 120px #ff8c00',
                    '0 0 40px #ffd700, 0 0 80px #ff8c00'
                  ],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Planets with Clear Separation */}
              {[
                { distance: 50, size: 6, color: '#c0c0c0', speed: 8, name: 'Mercury', startAngle: 0 },
                { distance: 70, size: 8, color: '#ffc649', speed: 12, name: 'Venus', startAngle: 60 },
                { distance: 90, size: 9, color: '#4f9eff', speed: 16, name: 'Earth', startAngle: 120 },
                { distance: 110, size: 7, color: '#ff6b47', speed: 20, name: 'Mars', startAngle: 180 },
                { distance: 135, size: 14, color: '#d4a574', speed: 28, name: 'Jupiter', startAngle: 240 },
                { distance: 160, size: 11, color: '#fab569', speed: 35, name: 'Saturn', startAngle: 300 }
              ].map((planet, index) => {
                const orbitCenterX = 160; // half of container width
                const orbitCenterY = 160; // half of container height
                
                return (
                  <div key={`planet-${index}`} className="absolute">
                    {/* Orbit Ring */}
                    <motion.div
                      className="absolute border border-white/15 rounded-full"
                      style={{
                        width: `${planet.distance * 2}px`,
                        height: `${planet.distance * 2}px`,
                        left: `${orbitCenterX - planet.distance}px`,
                        top: `${orbitCenterY - planet.distance}px`,
                        borderStyle: 'dotted'
                      }}
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                        borderColor: [
                          'rgba(255, 255, 255, 0.1)',
                          `${planet.color}40`,
                          'rgba(255, 255, 255, 0.1)'
                        ]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    
                    {/* Planet */}
                    <motion.div
                      className="absolute rounded-full z-10"
                      style={{
                        width: `${planet.size}px`,
                        height: `${planet.size}px`,
                        background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}cc, ${planet.color}77)`,
                        boxShadow: `0 0 ${planet.size * 2}px ${planet.color}99, 0 0 ${planet.size * 3}px ${planet.color}44`,
                        left: `${orbitCenterX - planet.size/2}px`,
                        top: `${orbitCenterY - planet.size/2}px`,
                      }}
                      animate={{
                        x: [
                          Math.cos((planet.startAngle * Math.PI) / 180) * planet.distance,
                          Math.cos(((planet.startAngle + 90) * Math.PI) / 180) * planet.distance,
                          Math.cos(((planet.startAngle + 180) * Math.PI) / 180) * planet.distance,
                          Math.cos(((planet.startAngle + 270) * Math.PI) / 180) * planet.distance,
                          Math.cos((planet.startAngle * Math.PI) / 180) * planet.distance,
                        ],
                        y: [
                          Math.sin((planet.startAngle * Math.PI) / 180) * planet.distance,
                          Math.sin(((planet.startAngle + 90) * Math.PI) / 180) * planet.distance,
                          Math.sin(((planet.startAngle + 180) * Math.PI) / 180) * planet.distance,
                          Math.sin(((planet.startAngle + 270) * Math.PI) / 180) * planet.distance,
                          Math.sin((planet.startAngle * Math.PI) / 180) * planet.distance,
                        ],
                        rotate: [0, 360],
                        boxShadow: [
                          `0 0 ${planet.size * 2}px ${planet.color}99, 0 0 ${planet.size * 3}px ${planet.color}44`,
                          `0 0 ${planet.size * 3}px ${planet.color}bb, 0 0 ${planet.size * 4}px ${planet.color}66`,
                          `0 0 ${planet.size * 2}px ${planet.color}99, 0 0 ${planet.size * 3}px ${planet.color}44`
                        ]
                      }}
                      transition={{
                        x: { duration: planet.speed, repeat: Infinity, ease: "linear" },
                        y: { duration: planet.speed, repeat: Infinity, ease: "linear" },
                        rotate: { duration: planet.speed / 4, repeat: Infinity, ease: "linear" },
                        boxShadow: { duration: 4, repeat: Infinity }
                      }}
                    >
                      {/* Saturn Rings */}
                      {planet.name === 'Saturn' && (
                        <>
                          <div
                            className="absolute border rounded-full opacity-60"
                            style={{
                              width: `${planet.size * 1.8}px`,
                              height: `${planet.size * 1.8}px`,
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              borderColor: `${planet.color}aa`,
                              borderWidth: '1px'
                            }}
                          />
                          <div
                            className="absolute border rounded-full opacity-40"
                            style={{
                              width: `${planet.size * 2.2}px`,
                              height: `${planet.size * 2.2}px`,
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              borderColor: `${planet.color}77`,
                              borderWidth: '1px'
                            }}
                          />
                        </>
                      )}
                    </motion.div>
                  </div>
                );
              })}
              
              {/* Asteroid Belt */}
              {[...Array(15)].map((_, i) => {
                const asteroidDistance = 125;
                const angle = (i * 24); // spread around orbit
                return (
                  <motion.div
                    key={`asteroid-${i}`}
                    className="absolute w-1 h-1 bg-gray-400 rounded-full"
                    style={{
                      left: `${160 + Math.cos(angle * Math.PI / 180) * asteroidDistance - 0.5}px`,
                      top: `${160 + Math.sin(angle * Math.PI / 180) * asteroidDistance - 0.5}px`,
                    }}
                    animate={{
                      rotate: [0, 360],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 3, repeat: Infinity, delay: i * 0.2 }
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default Introduction