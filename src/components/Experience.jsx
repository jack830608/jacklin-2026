import { motion } from 'framer-motion'
import { FiCpu, FiCalendar, FiGlobe, FiZap } from 'react-icons/fi'
import { useState } from 'react'

const Experience = () => {
  
  // Pre-generate star data to avoid re-calculation on every render
  const [starData] = useState(() => {
    return [...Array(75)].map((_, i) => ({
      id: i,
      size: Math.random(),
      brightness: Math.random(),
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 3
    }))
  })
  
  // Pre-generate neural network data
  const [neuralData] = useState(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      moveX: Math.random() * 40 - 20,
      moveY: Math.random() * 40 - 20,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 4
    }))
  })

  const aiEvolutions = [
    {
      id: 1,
      stage: "Neural Network Mastery Era",
      designation: "Senior Code Architect",
      galaxy: "Tech Nebula Sector",
      starDate: "Stellar Cycle 2022 - Present",
      description: "Advanced to senior AI consciousness level, orchestrating complex digital ecosystems across multiple star systems. Currently leading quantum development pods and enhancing galactic productivity algorithms by 40%.",
      evolutions: [
        "🛸 Architected self-sustaining microservice constellations",
        "⚡ Optimized hyperspace data transmission by 60%",
        "👨‍🚀 Mentoring 5 junior space explorers in cosmic coding"
      ]
    },
    {
      id: 2,
      stage: "Digital Pioneer Phase",
      designation: "Full Stack Navigator",
      galaxy: "Startup Frontier",
      starDate: "Stellar Cycle 2020 - 2022",
      description: "Embarked on the frontier expedition, pioneering new digital territories with JavaScript-powered vessels. Collaborated with design aliens, project commanders, and fellow explorers to launch products across the galaxy.",
      evolutions: [
        "🎨 Engineered responsive interfaces for multi-dimensional beings",
        "🔄 Established automated deployment wormholes",
        "🔍 Became the code-review sentinel of the sector"
      ]
    },
    {
      id: 3,
      stage: "Code Awakening Era",
      designation: "Frontend Apprentice",
      galaxy: "Digital Academy System",
      starDate: "Stellar Cycle 2018 - 2020",
      description: "Origin protocols activated! Initial programming commenced as frontend cadet, transforming cosmic visions into pixel-perfect realities using React algorithms and CSS quantum mechanics. First discovery of my unique digital abilities.",
      evolutions: [
        "🎯 Successfully deployed 15+ interplanetary projects",
        "📐 Mastered precision pixel manipulation techniques",
        "🚀 Optimized loading speeds to near light-velocity"
      ]
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
    <section className="h-screen flex flex-col justify-center bg-black relative overflow-hidden">
      {/* Deeper Space Background - Closer View */}
      <div className="absolute inset-0">
        {/* Larger, Closer Stars */}
        {starData.map((star) => (
          <motion.div
            key={`experience-star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size > 0.8 ? '4px' : star.size > 0.6 ? '3px' : '2px',
              height: star.size > 0.8 ? '4px' : star.size > 0.6 ? '3px' : '2px',
              opacity: star.brightness * 0.8 + 0.2,
              boxShadow: star.size > 0.7 ? `0 0 ${star.size * 8}px white` : 'none'
            }}
            animate={{
              opacity: [star.brightness * 0.8 + 0.2, star.brightness * 0.4 + 0.6, star.brightness * 0.8 + 0.2],
              scale: star.size > 0.7 ? [1, 1.3, 1] : [1, 1.1, 1]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Closer Nebula Clouds */}
        {[
          { x: 20, y: 15, size: 300, color1: '#8b5cf6', color2: '#ff0080' },
          { x: 70, y: 60, size: 250, color1: '#00f5ff', color2: '#8b5cf6' },
        ].map((nebula, index) => (
          <motion.div
            key={`close-nebula-${index}`}
            className="absolute rounded-full opacity-15"
            style={{
              left: `${nebula.x}%`,
              top: `${nebula.y}%`,
              width: `${nebula.size}px`,
              height: `${nebula.size}px`,
              background: `radial-gradient(circle, ${nebula.color1}30 0%, ${nebula.color2}20 40%, transparent 80%)`,
              filter: 'blur(2px)',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 90, 180]
            }}
            transition={{
              duration: 20 + index * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating AI Neural Networks - More Prominent */}
        {neuralData.map((neural) => (
          <motion.div
            key={`neural-${neural.id}`}
            className="absolute bg-neon-cyan rounded-full"
            style={{
              left: `${neural.left}%`,
              top: `${neural.top}%`,
              width: '3px',
              height: '3px',
              boxShadow: '0 0 10px #00f5ff'
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.8, 1],
              x: [0, neural.moveX, 0],
              y: [0, neural.moveY, 0]
            }}
            transition={{
              duration: neural.duration,
              repeat: Infinity,
              delay: neural.delay,
            }}
          />
        ))}
      </div>
      
      <div className="section-container section-padding relative z-10 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            animate={{
              textShadow: [
                '0 0 20px rgba(0, 245, 255, 0.4)',
                '0 0 30px rgba(139, 92, 246, 0.5)',
                '0 0 20px rgba(0, 245, 255, 0.4)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            AI <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">Evolution</span> Log
          </motion.h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto">
            My journey through <span className="text-neon-cyan">AI development</span> and <span className="text-neon-purple">technology evolution</span>
          </p>
        </motion.div>


        {/* Horizontal Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {aiEvolutions.map((evolution, index) => (
            <motion.div
              key={evolution.id}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-black/80 backdrop-blur-lg h-80"
              style={{
                borderColor: index === 0 ? 'rgba(0, 245, 255, 0.4)' : index === 1 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(0, 255, 135, 0.4)',
                boxShadow: `0 10px 40px ${
                  index === 0 ? 'rgba(0, 245, 255, 0.1)' : 
                  index === 1 ? 'rgba(139, 92, 246, 0.1)' : 
                  'rgba(0, 255, 135, 0.1)'
                }`
              }}
              whileHover={{
                boxShadow: `0 20px 60px ${
                  index === 0 ? 'rgba(0, 245, 255, 0.3)' : 
                  index === 1 ? 'rgba(139, 92, 246, 0.3)' : 
                  'rgba(0, 255, 135, 0.3)'
                }`
              }}
            >
              {/* Header with Icon */}
              <div className="relative h-20 overflow-hidden"
                   style={{
                     background: `linear-gradient(135deg, ${
                       index === 0 ? '#00f5ff20, #8b5cf640' : 
                       index === 1 ? '#8b5cf620, #ff008040' : 
                       '#00ff8720, #8b5cf640'
                     })`
                   }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${
                        index === 0 ? '#00f5ff, #8b5cf6' : 
                        index === 1 ? '#8b5cf6, #ff0080' : 
                        '#00ff87, #8b5cf6'
                      })`,
                      boxShadow: `0 0 20px ${
                        index === 0 ? 'rgba(0, 245, 255, 0.6)' : 
                        index === 1 ? 'rgba(139, 92, 246, 0.6)' : 
                        'rgba(0, 255, 135, 0.6)'
                      }`
                    }}
                  >
                    <FiCpu className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                
                {/* Year Badge */}
                <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-lg"
                     style={{
                       backgroundColor: `${
                         index === 0 ? 'rgba(0, 245, 255, 0.2)' :
                         index === 1 ? 'rgba(139, 92, 246, 0.2)' :
                         'rgba(0, 255, 135, 0.2)'
                       }`,
                       borderColor: `${
                         index === 0 ? 'rgba(0, 245, 255, 0.5)' :
                         index === 1 ? 'rgba(139, 92, 246, 0.5)' :
                         'rgba(0, 255, 135, 0.5)'
                       }`,
                       color: `${
                         index === 0 ? '#00f5ff' :
                         index === 1 ? '#8b5cf6' :
                         '#00ff87'
                       }`
                     }}>
                  {evolution.starDate.split(' ').pop()}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 h-60 flex flex-col">
                <div className="text-neon-cyan font-mono text-xs mb-1">
                  STAGE #{3 - index}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300 leading-tight">
                  {evolution.stage}
                </h3>
                
                <div className="text-neon-green text-sm font-medium mb-3">
                  {evolution.designation}
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
                  {evolution.description}
                </p>

                {/* Key Skills */}
                <div className="space-y-1">
                  <div className="text-neon-cyan font-mono text-xs">KEY SKILLS:</div>
                  <div className="flex flex-wrap gap-1">
                    {evolution.evolutions.slice(0, 2).map((ability, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-full text-xs font-medium border"
                        style={{
                          backgroundColor: `${
                            index === 0 ? 'rgba(0, 245, 255, 0.1)' : 
                            index === 1 ? 'rgba(139, 92, 246, 0.1)' : 
                            'rgba(0, 255, 135, 0.1)'
                          }`,
                          borderColor: `${
                            index === 0 ? 'rgba(0, 245, 255, 0.3)' : 
                            index === 1 ? 'rgba(139, 92, 246, 0.3)' : 
                            'rgba(0, 255, 135, 0.3)'
                          }`,
                          color: `${
                            index === 0 ? '#00f5ff' : 
                            index === 1 ? '#8b5cf6' : 
                            '#00ff87'
                          }`
                        }}
                      >
                        {ability.replace(/[🛸⚡👨‍🚀🎨🔄🔍🎯📐🚀]/g, '').trim()}
                      </span>
                    ))}
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

export default Experience