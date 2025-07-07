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
      codename: "Apple Censorship",
      mission: "A comprehensive digital observatory exposing Apple's widespread censorship practices and their global consequences. Built to illuminate the hidden patterns of digital suppression and empower users with transparency through intuitive data visualization.",
      technologies: ["React", "Tailwind CSS", "Next.js", "Node.js", "AWS", "MongoDB"],
      category: "fullstack",
      status: "Active Mission",
      icon: "🔍",
      link: "https://applecensorship.com/"
    },
    {
      id: 2,
      codename: "GoGuitar AI",
      mission: "Revolutionary AI-powered guitar learning platform that transforms YouTube videos into interactive guitar lessons. Users can search any YouTube video, and our AI analyzes the audio to generate synchronized guitar tabs that display alongside the video. Features real-time chat functionality where users can discuss music theory, techniques, and get AI-powered insights about the songs they're learning.",
      technologies: ["React", "Tailwind CSS", "Next.js", "AI"],
      category: "ai",
      status: "Active Mission",
      icon: "🎸",
      link: "http://goguitar.ai/"
    },
    {
      id: 3,
      codename: "Encore",
      mission: "A comprehensive social community platform that empowers users to create, share, and monetize their content and personal experiences. Features include real-time content sharing, personal branding tools, intelligent recommendations, and content monetization capabilities. Built the entire web interface embedded within the mobile app plus a complete dashboard system for content management and analytics.",
      technologies: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
      category: "fullstack",
      status: "Active Mission",
      icon: "🌟",
      link: "https://apps.apple.com/tw/app/encore-%E8%AE%93%E7%94%9F%E6%B4%BB%E6%85%8B%E5%BA%A6-%E5%83%B9%E5%80%BC%E7%84%A1%E9%99%90%E6%94%BE%E5%A4%A7%E7%9A%84%E7%A4%BE%E7%BE%A4/id1517658643"
    },
    {
      id: 4,
      codename: "Vpon Demo Platform",
      mission: "An internal advertising demo platform that streamlines the client presentation process. Enables sales teams to quickly generate professional ad demos by simply uploading client images and selecting display formats. Creates shareable demo links that showcase how ads will appear across different placements and formats, significantly reducing the time from concept to client approval.",
      technologies: ["React", "Node.js"],
      category: "fullstack",
      status: "Active Mission",
      icon: "📱",
      link: "https://demo.vpon.com/",
      isInternal: true
    },
    {
      id: 5,
      codename: "Voco FM",
      mission: "An innovative audio sharing and broadcasting platform that connects users through voice content. Features include social audio sharing, audience building and tracking, community engagement, and a coin rewards system. Users can share everything from life stories to knowledge, participate in activities, and earn rewards for both publishing and listening. Built the complete web interface embedded within the mobile app plus a comprehensive dashboard system for content management and analytics.",
      technologies: ["React", "Tailwind CSS", "Next.js", "Node.js", "MongoDB"],
      category: "fullstack",
      status: "Active Mission",
      icon: "🎙️",
      link: "https://apps.apple.com/tw/app/voco/id1563869306?platform=iphone"
    },
    {
      id: 6,
      codename: "Repurpose Wear",
      mission: "A sophisticated e-commerce platform specializing in women's premium outerwear and fashion. Features a curated collection of jackets, coats, and accessories with diverse color palettes and sizing options. Responsible for crafting custom UI components and interactive elements that enhance the shopping experience, from product galleries to checkout flows, creating a seamless and visually appealing online retail environment.",
      technologies: ["Shopify"],
      category: "frontend",
      status: "Active Mission",
      icon: "👗",
      link: "https://repurpose-wear.com"
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
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(70)].map((_, i) => (
            <div
              key={`static-star-${i}`}
              className="absolute bg-white rounded-full animate-twinkle pointer-events-none"
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
        <div className="absolute inset-0 pointer-events-none">
          {starData.map((star) => (
            <div
              key={`distant-star-${star.id}`}
              className="absolute rounded-full bg-white animate-twinkle pointer-events-none"
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
        <div className="absolute inset-0 pointer-events-none">
          {cosmicDustData.map((dust) => (
            <div
              key={`cosmic-dust-${dust.id}`}
              className="absolute rounded-full animate-float pointer-events-none"
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
      
      <div className="section-container section-padding relative z-10 h-full flex flex-col justify-center px-4 lg:px-0 w-full max-w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
            animate={{
              textShadow: [
                '0 0 10px rgba(0, 255, 135, 0.3)',
                '0 0 15px rgba(255, 0, 128, 0.4)',
                '0 0 10px rgba(0, 255, 135, 0.3)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            My <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple bg-clip-text text-transparent">Projects</span>
          </motion.h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto">
            Featured <span className="text-neon-cyan">projects</span> that showcase my expertise in <span className="text-neon-green">full-stack development</span>
          </p>
        </motion.div>

        {/* Projects Container - Horizontal scroll on mobile, grid on desktop */}
        <div className="w-full mx-auto px-2">
          {/* Mobile: Horizontal Scroll */}
          <div className="block lg:hidden">
            <div className="overflow-x-auto overflow-y-hidden projects-container" 
                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                 onWheel={(e) => {
                   const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
                   if (isHorizontalScroll) {
                     e.stopPropagation();
                   }
                 }}
                 onTouchStart={(e) => {
                   e.stopPropagation();
                 }}>
              <motion.div 
                className="flex gap-4 pb-4 px-2"
                style={{ width: `${cosmicExperiments.length * 320 + 100}px` }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {cosmicExperiments.slice(0, 6).map((experiment, index) => (
                  <motion.div
                    key={experiment.id}
                    variants={itemVariants}
                    className="group relative rounded-xl overflow-hidden border-2 bg-black/80 backdrop-blur-sm cursor-pointer flex-shrink-0"
                    style={{
                      width: '300px',
                      height: '420px',
                    }}
                    initial={{
                      borderColor: index % 3 === 0 ? 'rgba(0, 245, 255, 0.4)' : index % 3 === 1 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(0, 255, 135, 0.4)',
                      boxShadow: `0 6px 20px ${
                        index % 3 === 0 ? 'rgba(0, 245, 255, 0.1)' : 
                        index % 3 === 1 ? 'rgba(139, 92, 246, 0.1)' : 
                        'rgba(0, 255, 135, 0.1)'
                      }`
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      borderColor: index % 3 === 0 ? 'rgba(0, 245, 255, 0.8)' : index % 3 === 1 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(0, 255, 135, 0.8)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      borderColor: [
                        index % 3 === 0 ? 'rgba(0, 245, 255, 0.4)' : index % 3 === 1 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(0, 255, 135, 0.4)',
                        index % 3 === 0 ? 'rgba(0, 245, 255, 0.6)' : index % 3 === 1 ? 'rgba(139, 92, 246, 0.6)' : 'rgba(0, 255, 135, 0.6)',
                        index % 3 === 0 ? 'rgba(0, 245, 255, 0.4)' : index % 3 === 1 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(0, 255, 135, 0.4)'
                      ]
                    }}
                    transition={{ 
                      duration: 3 + index * 0.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
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
                        <div className="flex gap-2">
                          <div 
                            className="px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
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
                          {experiment.isInternal && (
                            <div className="px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
                                 style={{
                                   backgroundColor: 'rgba(255, 165, 0, 0.2)',
                                   borderColor: 'rgba(255, 165, 0, 0.5)',
                                   color: '#ffa500'
                                 }}>
                              Internal
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 h-80 flex flex-col" onClick={() => experiment.link && window.open(experiment.link, '_blank')}>
                      <div className="text-neon-cyan font-mono text-xs mb-1">
                        PROJECT #{experiment.id.toString().padStart(3, '0')}
                      </div>
                      
                      <h3 className="text-base font-bold text-white mb-2 leading-tight relative group-hover:text-neon-cyan transition-colors duration-300">
                        {experiment.codename}
                      </h3>
                      
                      <div className="flex-1 mb-3 overflow-hidden">
                        <p className="text-white/70 text-xs leading-relaxed h-full overflow-y-auto pr-2 project-description-scroll" 
                           style={{ '--project-color': index % 3 === 0 ? '#00f5ff' : index % 3 === 1 ? '#8b5cf6' : '#00ff87' }}
                           onWheel={(e) => e.stopPropagation()}>
                          {experiment.mission}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="space-y-1">
                        <div className="text-neon-green font-mono text-xs">TECH:</div>
                        <div className="flex flex-wrap gap-1">
                          {experiment.technologies.slice(0, 4).map((tech, techIndex) => (
                            <span
                              key={tech}
                              className="px-2 py-1 rounded-full text-xs font-medium border transition-transform duration-200 hover:scale-110"
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
                          {experiment.technologies.length > 4 && (
                            <span className="px-2 py-1 text-xs text-white/50">
                              +{experiment.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden lg:grid grid-cols-3 gap-6 p-4"
          >
            {cosmicExperiments.slice(0, 6).map((experiment, index) => (
              <motion.div
                key={experiment.id}
                variants={itemVariants}
                className="group relative rounded-xl overflow-hidden border-2 bg-black/80 backdrop-blur-sm h-64 sm:h-72 cursor-pointer"
                initial={{
                  borderColor: index % 3 === 0 ? 'rgba(0, 245, 255, 0.4)' : index % 3 === 1 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(0, 255, 135, 0.4)',
                  boxShadow: `0 6px 20px ${
                    index % 3 === 0 ? 'rgba(0, 245, 255, 0.1)' : 
                    index % 3 === 1 ? 'rgba(139, 92, 246, 0.1)' : 
                    'rgba(0, 255, 135, 0.1)'
                  }`
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  borderColor: index % 3 === 0 ? 'rgba(0, 245, 255, 0.8)' : index % 3 === 1 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(0, 255, 135, 0.8)'
                }}
                whileTap={{ scale: 0.98 }}
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
                    <div className="flex gap-2">
                      <div 
                        className="px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
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
                      {experiment.isInternal && (
                        <div className="px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
                             style={{
                               backgroundColor: 'rgba(255, 165, 0, 0.2)',
                               borderColor: 'rgba(255, 165, 0, 0.5)',
                               color: '#ffa500'
                             }}>
                          Internal
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 h-48 sm:h-56 flex flex-col" onClick={() => experiment.link && window.open(experiment.link, '_blank')}>
                  <div className="text-neon-cyan font-mono text-xs mb-1">
                    PROJECT #{experiment.id.toString().padStart(3, '0')}
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-2 leading-tight relative group-hover:text-neon-cyan transition-colors duration-300">
                    {experiment.codename}
                  </h3>
                  
                  <div className="flex-1 mb-3 overflow-hidden">
                    <p className="text-white/70 text-xs leading-relaxed h-full overflow-y-auto pr-2 project-description-scroll" 
                       style={{ '--project-color': index % 3 === 0 ? '#00f5ff' : index % 3 === 1 ? '#8b5cf6' : '#00ff87' }}
                       onWheel={(e) => e.stopPropagation()}>
                      {experiment.mission}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-1">
                    <div className="text-neon-green font-mono text-xs">TECH:</div>
                    <div className="flex flex-wrap gap-1">
                      {experiment.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-full text-xs font-medium border transition-transform duration-200 hover:scale-110"
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
                      {experiment.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs text-white/50">
                          +{experiment.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Projects