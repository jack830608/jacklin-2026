import { motion, useInView } from 'framer-motion'
import { useState, useRef, useMemo } from 'react'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" })
  
  // Pre-generate star data to avoid re-calculation on every render
  const starData = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      size: Math.random(),
      brightness: Math.random(),
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 2,
      delay: Math.random() * 3
    }))
  }, [])
  
  // Pre-generate cosmic dust data
  const cosmicDustData = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 1.2 + 0.8,
      height: Math.random() * 1.2 + 0.8,
      red: Math.random() * 80 + 175,
      green: Math.random() * 80 + 175,
      moveX: Math.random() * 6 - 3,
      moveY: Math.random() * 6 - 3,
      duration: 35 + Math.random() * 8,
      delay: Math.random() * 5
    }))
  }, [])

  const cosmicExperiments = [
    {
      id: 1,
      codename: "Quantum Commerce Engine",
      mission: "Engineered a trans-galactic marketplace where beings across the universe can trade digital goods. Features quantum payment processing and interdimensional shipping calculations. Successfully facilitating 40,000+ stellar transactions daily.",
      technologies: ["React", "Node.js", "MongoDB", "Quantum-Stripe", "CSS-Warp"],
      category: "fullstack",
      status: "Active Mission",
      icon: "🛸"
    },
    {
      id: 2,
      codename: "Neural Task Orchestrator",
      mission: "Developed AI-powered task coordination for space crews. Drag-and-drop mission planning with real-time synchronization across multiple star systems. Zero communication delays regardless of distance.",
      technologies: ["Vue.js", "Firebase", "Vuetify", "Quantum-Socket"],
      category: "ai",
      status: "Deployed",
      icon: "🤖"
    },
    {
      id: 3,
      codename: "Cosmic Data Visualizer",
      mission: "Transformed raw space telemetry into beautiful, interactive star maps and reports. Processes data from 50+ solar systems simultaneously, creating visualizations that would make nebulae jealous.",
      technologies: ["React", "D3.js", "Python", "PostgreSQL", "FastAPI"],
      category: "fullstack",
      status: "Active Mission",
      icon: "🌌"
    },
    {
      id: 4,
      codename: "Atmospheric Prediction Matrix",
      mission: "Mobile weather intelligence for planetary exploration. Predicts atmospheric conditions on any planet with 99.7% accuracy. Features immersive weather simulations that feel more real than reality.",
      technologies: ["React Native", "Cosmic-Weather API", "Redux", "Expo"],
      category: "mobile",
      status: "Field Testing",
      icon: "🌐"
    },
    {
      id: 5,
      codename: "Universal Knowledge Archive",
      mission: "Multi-dimensional blogging platform for sharing discoveries across galaxies. Features quantum markdown processing and AI-enhanced SEO that works across all known search algorithms in the universe.",
      technologies: ["Next.js", "Sanity", "Vercel", "TypeScript"],
      category: "fullstack",
      status: "Research Phase",
      icon: "📜"
    },
    {
      id: 6,
      codename: "Holographic Identity Matrix",
      mission: "The very interface you're experiencing! A self-aware portfolio that adapts to each visitor's neural patterns. Features animations smoother than space-time and performance faster than light-speed travel.",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "Quantum-Vite"],
      category: "ai",
      status: "Active Mission",
      icon: "✨"
    }
  ]



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section ref={ref} className="h-screen flex flex-col justify-center bg-black relative overflow-hidden">
      {/* Optimized Background with More Visual Elements */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Static Background Stars - CSS animated for better performance */}
        <div className="absolute inset-0">
          {[...Array(70)].map((_, i) => (
            <div
              key={`static-star-${i}`}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() > 0.6 ? '4px' : Math.random() > 0.3 ? '3px' : '2px',
                height: Math.random() > 0.6 ? '4px' : Math.random() > 0.3 ? '3px' : '2px',
                opacity: Math.random() * 0.6 + 0.3,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Simplified Galaxy Clusters - only 2 instead of 3 */}
        {[
          { x: 20, y: 30, size: 300, rotation: 30, color: '#ff0080' },
          { x: 70, y: 60, size: 250, rotation: -45, color: '#00f5ff' },
        ].map((galaxy, index) => (
          <motion.div
            key={`distant-galaxy-${index}`}
            className="absolute rounded-full opacity-8"
            style={{
              left: `${galaxy.x}%`,
              top: `${galaxy.y}%`,
              width: `${galaxy.size}px`,
              height: `${galaxy.size / 1.5}px`,
              background: `radial-gradient(ellipse, ${galaxy.color}30 0%, ${galaxy.color}15 30%, transparent 80%)`,
              transform: `translate(-50%, -50%) rotate(${galaxy.rotation}deg)`,
              filter: 'blur(2px)'
            }}
            animate={{
              rotate: [galaxy.rotation, galaxy.rotation + 90, galaxy.rotation + 180],
              opacity: [0.04, 0.08, 0.04],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 50 + index * 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Simplified Stars - CSS animated */}
        <div className="absolute inset-0">
          {starData.map((star) => (
            <div
              key={`distant-star-${star.id}`}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size > 0.9 ? '5px' : star.size > 0.7 ? '4px' : '3px',
                height: star.size > 0.9 ? '5px' : star.size > 0.7 ? '4px' : '3px',
                opacity: star.brightness * 0.9 + 0.4,
                boxShadow: star.size > 0.9 ? `0 0 ${star.size * 8}px white` : star.size > 0.7 ? `0 0 ${star.size * 6}px white` : `0 0 ${star.size * 4}px white`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`
              }}
            />
          ))}
        </div>
        
        {/* Simplified Cosmic Dust - CSS animated */}
        <div className="absolute inset-0">
          {cosmicDustData.map((dust) => (
            <div
              key={`cosmic-dust-${dust.id}`}
              className="absolute rounded-full animate-float"
              style={{
                left: `${dust.left}%`,
                top: `${dust.top}%`,
                width: `${dust.width}px`,
                height: `${dust.height}px`,
                background: `rgba(${dust.red}, ${dust.green}, 255, 0.05)`,
                filter: 'blur(0.3px)',
                animationDelay: `${dust.delay}s`,
                animationDuration: `${dust.duration}s`
              }}
            />
          ))}
        </div>
        
        {/* Simplified Pulsars - only 2 instead of 3 */}
        {[
          { x: 25, y: 35, color: '#00ff87' },
          { x: 75, y: 25, color: '#ff0080' },
        ].map((pulsar, index) => (
          <motion.div
            key={`pulsar-${index}`}
            className="absolute"
            style={{
              left: `${pulsar.x}%`,
              top: `${pulsar.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <motion.div
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: pulsar.color,
                boxShadow: `0 0 4px ${pulsar.color}`
              }}
              animate={{
                boxShadow: [
                  `0 0 4px ${pulsar.color}`,
                  `0 0 10px ${pulsar.color}`,
                  `0 0 4px ${pulsar.color}`
                ],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + index * 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}

        {/* Static Cosmic Rays - CSS animated */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={`cosmic-ray-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-neon-green/10 to-transparent animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${15 + Math.random() * 25}px`,
                height: '1px',
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.2,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${5 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Static Nebula Patches - CSS animated */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={`nebula-patch-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${30 + Math.random() * 50}px`,
                height: `${30 + Math.random() * 50}px`,
                background: `radial-gradient(circle, rgba(0, 245, 255, 0.03) 0%, transparent 70%)`,
                filter: 'blur(1px)',
                opacity: 0.3,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </motion.div>
      
      <div className="section-container section-padding relative z-10 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            animate={{
              textShadow: [
                '0 0 10px rgba(0, 255, 135, 0.3)',
                '0 0 15px rgba(255, 0, 128, 0.4)',
                '0 0 10px rgba(0, 255, 135, 0.3)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            Cosmic <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple bg-clip-text text-transparent">Laboratory</span>
          </motion.h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto">
            Featured <span className="text-neon-cyan">experimental projects</span> that push the boundaries of <span className="text-neon-green">digital innovation</span>
          </p>
        </motion.div>

        {/* Compact Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {cosmicExperiments.slice(0, 6).map((experiment, index) => (
            <motion.div
              key={experiment.id}
              variants={itemVariants}
              className="group relative rounded-xl overflow-hidden border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-black/80 backdrop-blur-sm h-64"
              style={{
                borderColor: index % 3 === 0 ? 'rgba(0, 245, 255, 0.4)' : index % 3 === 1 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(0, 255, 135, 0.4)',
                boxShadow: `0 6px 20px ${
                  index % 3 === 0 ? 'rgba(0, 245, 255, 0.1)' : 
                  index % 3 === 1 ? 'rgba(139, 92, 246, 0.1)' : 
                  'rgba(0, 255, 135, 0.1)'
                }`
              }}
            >
              {/* Header */}
              <div className="relative h-16 overflow-hidden"
                   style={{
                     background: `linear-gradient(135deg, ${
                       index % 3 === 0 ? '#00f5ff15, #8b5cf630' : 
                       index % 3 === 1 ? '#8b5cf615, #ff008030' : 
                       '#00ff8715, #00f5ff30'
                     })`
                   }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="flex items-center justify-between p-3">
                  <div className="text-2xl">
                    {experiment.icon}
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
                       style={{
                         backgroundColor: `${
                           experiment.status === 'Active Mission' ? 'rgba(0, 255, 135, 0.2)' :
                           experiment.status === 'Deployed' ? 'rgba(0, 245, 255, 0.2)' :
                           experiment.status === 'Field Testing' ? 'rgba(255, 0, 128, 0.2)' :
                           'rgba(139, 92, 246, 0.2)'
                         }`,
                         borderColor: `${
                           experiment.status === 'Active Mission' ? 'rgba(0, 255, 135, 0.5)' :
                           experiment.status === 'Deployed' ? 'rgba(0, 245, 255, 0.5)' :
                           experiment.status === 'Field Testing' ? 'rgba(255, 0, 128, 0.5)' :
                           'rgba(139, 92, 246, 0.5)'
                         }`,
                         color: `${
                           experiment.status === 'Active Mission' ? '#00ff87' :
                           experiment.status === 'Deployed' ? '#00f5ff' :
                           experiment.status === 'Field Testing' ? '#ff0080' :
                           '#8b5cf6'
                         }`
                       }}>
                    {experiment.status}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 h-48 flex flex-col">
                <div className="text-neon-cyan font-mono text-xs mb-1">
                  PROJECT #{experiment.id.toString().padStart(3, '0')}
                </div>
                
                <h3 className="text-base font-bold text-white mb-2 leading-tight relative">
                  <span className="block">{experiment.codename}</span>
                  <span className="absolute inset-0 hover-text-gradient-alt">{experiment.codename}</span>
                </h3>
                
                <p className="text-white/70 text-xs leading-relaxed mb-3 flex-1 line-clamp-3">
                  {experiment.mission.length > 120 ? experiment.mission.substring(0, 120) + '...' : experiment.mission}
                </p>

                {/* Tech Stack */}
                <div className="space-y-1">
                  <div className="text-neon-green font-mono text-xs">TECH:</div>
                  <div className="flex flex-wrap gap-1">
                    {experiment.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-full text-xs font-medium border"
                        style={{
                          backgroundColor: `${
                            index % 3 === 0 ? 'rgba(0, 245, 255, 0.1)' : 
                            index % 3 === 1 ? 'rgba(139, 92, 246, 0.1)' : 
                            'rgba(0, 255, 135, 0.1)'
                          }`,
                          borderColor: `${
                            index % 3 === 0 ? 'rgba(0, 245, 255, 0.3)' : 
                            index % 3 === 1 ? 'rgba(139, 92, 246, 0.3)' : 
                            'rgba(0, 255, 135, 0.3)'
                          }`,
                          color: `${
                            index % 3 === 0 ? '#00f5ff' : 
                            index % 3 === 1 ? '#8b5cf6' : 
                            '#00ff87'
                          }`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {experiment.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs text-white/50">
                        +{experiment.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects