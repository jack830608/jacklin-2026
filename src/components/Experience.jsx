import { motion, useInView } from 'framer-motion'
import { FiCpu, FiCalendar, FiGlobe, FiZap } from 'react-icons/fi'
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
    <section ref={ref} className="h-screen flex flex-col justify-center bg-black relative overflow-hidden">
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
                '0 0 10px rgba(0, 245, 255, 0.3)',
                '0 0 15px rgba(139, 92, 246, 0.4)',
                '0 0 10px rgba(0, 245, 255, 0.3)'
              ]
            }}
            transition={{ duration: 6, repeat: Infinity }}
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
              className="group relative rounded-2xl overflow-hidden border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-black/80 backdrop-blur-sm h-80"
              style={{
                borderColor: index === 0 ? 'rgba(0, 245, 255, 0.4)' : index === 1 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(0, 255, 135, 0.4)',
                boxShadow: `0 8px 25px ${
                  index === 0 ? 'rgba(0, 245, 255, 0.1)' : 
                  index === 1 ? 'rgba(139, 92, 246, 0.1)' : 
                  'rgba(0, 255, 135, 0.1)'
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
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center animate-spin"
                    style={{
                      background: `linear-gradient(135deg, ${
                        index === 0 ? '#00f5ff, #8b5cf6' : 
                        index === 1 ? '#8b5cf6, #ff0080' : 
                        '#00ff87, #8b5cf6'
                      })`,
                      boxShadow: `0 0 12px ${
                        index === 0 ? 'rgba(0, 245, 255, 0.4)' : 
                        index === 1 ? 'rgba(139, 92, 246, 0.4)' : 
                        'rgba(0, 255, 135, 0.4)'
                      }`,
                      animationDuration: '15s'
                    }}
                  >
                    <FiCpu className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                {/* Year Badge */}
                <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
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
                
                <h3 className="text-lg font-bold text-white mb-2 leading-tight relative">
                  <span className="block">{evolution.stage}</span>
                  <span className="absolute inset-0 hover-text-gradient">{evolution.stage}</span>
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
                        {ability.replace(/[\u{1F6F8}\u{26A1}\u{1F468}\u{200D}\u{1F680}\u{1F3A8}\u{1F504}\u{1F50D}\u{1F3AF}\u{1F4CF}\u{1F680}]/gu, '').trim()}
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