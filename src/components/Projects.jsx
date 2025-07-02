import { motion } from 'framer-motion'
import { FiCpu, FiLayers, FiZap, FiGlobe } from 'react-icons/fi'
import { useState } from 'react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Pre-generate star data to avoid re-calculation on every render
  const [starData] = useState(() => {
    return [...Array(100)].map((_, i) => ({
      id: i,
      size: Math.random(),
      brightness: Math.random(),
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 8,
      delay: Math.random() * 5
    }))
  })
  
  // Pre-generate cosmic dust data
  const [cosmicDustData] = useState(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      red: Math.random() * 80 + 175,
      green: Math.random() * 80 + 175,
      moveX: Math.random() * 20 - 10,
      moveY: Math.random() * 20 - 10,
      duration: 20 + Math.random() * 30,
      delay: Math.random() * 10
    }))
  })

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

  const laboratoryFilters = [
    { id: 'all', label: '🌌 All Experiments' },
    { id: 'ai', label: '🤖 AI Consciousness' },
    { id: 'fullstack', label: '🚀 Quantum Systems' },
    { id: 'mobile', label: '📱 Portable Devices' }
  ]

  const filteredExperiments = activeFilter === 'all' 
    ? cosmicExperiments 
    : cosmicExperiments.filter(experiment => experiment.category === activeFilter)

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
    <section className="h-screen flex flex-col justify-center bg-black relative overflow-hidden">
      {/* Far Deep Space Background - Distant View */}
      <div className="absolute inset-0">
        {/* Distant Galaxy Clusters */}
        {[
          { x: 10, y: 20, size: 400, rotation: 30, color: '#ff0080' },
          { x: 80, y: 70, size: 350, rotation: -45, color: '#00f5ff' },
          { x: 30, y: 80, size: 280, rotation: 60, color: '#8b5cf6' },
        ].map((galaxy, index) => (
          <motion.div
            key={`distant-galaxy-${index}`}
            className="absolute rounded-full opacity-10"
            style={{
              left: `${galaxy.x}%`,
              top: `${galaxy.y}%`,
              width: `${galaxy.size}px`,
              height: `${galaxy.size / 1.5}px`,
              background: `radial-gradient(ellipse, ${galaxy.color}40 0%, ${galaxy.color}20 30%, transparent 80%)`,
              transform: `translate(-50%, -50%) rotate(${galaxy.rotation}deg)`,
              filter: 'blur(3px)'
            }}
            animate={{
              rotate: [galaxy.rotation, galaxy.rotation + 180, galaxy.rotation + 360],
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 40 + index * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Smaller, More Distant Stars */}
        {starData.map((star) => (
          <motion.div
            key={`distant-star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size > 0.9 ? '2px' : '1px',
              height: star.size > 0.9 ? '2px' : '1px',
              opacity: star.brightness * 0.6 + 0.1,
              boxShadow: star.size > 0.8 ? `0 0 ${star.size * 4}px white` : 'none'
            }}
            animate={{
              opacity: [star.brightness * 0.6 + 0.1, star.brightness * 0.3 + 0.4, star.brightness * 0.6 + 0.1],
              scale: star.size > 0.8 ? [1, 1.2, 1] : [1, 1.05, 1]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating Cosmic Dust - Distant */}
        {cosmicDustData.map((dust) => (
          <motion.div
            key={`cosmic-dust-${dust.id}`}
            className="absolute rounded-full"
            style={{
              left: `${dust.left}%`,
              top: `${dust.top}%`,
              width: `${dust.width}px`,
              height: `${dust.height}px`,
              background: `rgba(${dust.red}, ${dust.green}, 255, 0.1)`,
              filter: 'blur(0.5px)'
            }}
            animate={{
              x: [0, dust.moveX, 0],
              y: [0, dust.moveY, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: dust.duration,
              repeat: Infinity,
              delay: dust.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Distant Pulsars */}
        {[
          { x: 25, y: 35, color: '#00ff87' },
          { x: 75, y: 25, color: '#ff0080' },
          { x: 60, y: 85, color: '#00f5ff' },
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
                boxShadow: `0 0 8px ${pulsar.color}`
              }}
              animate={{
                boxShadow: [
                  `0 0 8px ${pulsar.color}`,
                  `0 0 20px ${pulsar.color}`,
                  `0 0 8px ${pulsar.color}`
                ],
                scale: [1, 2, 1]
              }}
              transition={{
                duration: 2 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </div>
      
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
                '0 0 20px rgba(0, 255, 135, 0.4)',
                '0 0 30px rgba(255, 0, 128, 0.5)',
                '0 0 20px rgba(0, 255, 135, 0.4)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
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
              className="group relative rounded-xl overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-black/80 backdrop-blur-lg h-64"
              style={{
                borderColor: index % 3 === 0 ? 'rgba(0, 245, 255, 0.4)' : index % 3 === 1 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(0, 255, 135, 0.4)',
                boxShadow: `0 8px 32px ${
                  index % 3 === 0 ? 'rgba(0, 245, 255, 0.1)' : 
                  index % 3 === 1 ? 'rgba(139, 92, 246, 0.1)' : 
                  'rgba(0, 255, 135, 0.1)'
                }`
              }}
              whileHover={{
                boxShadow: `0 16px 48px ${
                  index % 3 === 0 ? 'rgba(0, 245, 255, 0.25)' : 
                  index % 3 === 1 ? 'rgba(139, 92, 246, 0.25)' : 
                  'rgba(0, 255, 135, 0.25)'
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
                  <div className="px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-lg"
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
                
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300 leading-tight">
                  {experiment.codename}
                </h3>
                
                <p className="text-white/70 text-xs leading-relaxed mb-3 flex-1 line-clamp-3">
                  {experiment.mission.length > 120 ? experiment.mission.substring(0, 120) + '...' : experiment.mission}
                </p>

                {/* Tech Stack */}
                <div className="space-y-1">
                  <div className="text-neon-green font-mono text-xs">TECH:</div>
                  <div className="flex flex-wrap gap-1">
                    {experiment.technologies.slice(0, 3).map((tech, techIndex) => (
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