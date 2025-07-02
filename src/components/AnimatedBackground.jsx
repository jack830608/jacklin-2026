import { motion } from 'framer-motion'
import { useMemo } from 'react'

const AnimatedBackground = ({ currentSection = 0 }) => {
  // Define zoom levels for each section (1 = normal, <1 = zoom out, >1 = zoom in)
  const sectionZoomLevels = [1, 0.7, 0.4] // Introduction, Experience, Projects
  const currentZoom = sectionZoomLevels[currentSection] || 1

  // Memoize particles to prevent regeneration on every render
  const particles = useMemo(() => {
    const newParticles = []
    for (let i = 0; i < 12; i++) { // Reduced from 25 to 12
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1, // Reduced max size
        color: ['#00f5ff', '#ff0080', '#8b5cf6', '#00ff88'][Math.floor(Math.random() * 4)], // Reduced color options
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 3, // Slightly longer duration for smoother movement
        moveX: Math.random() * 15 - 7.5, // Reduced movement range
      })
    }
    return newParticles
  }, []) // Empty dependency array - particles generated once

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Zoom Container for Universe Effect */}
      <motion.div
        className="absolute inset-0 origin-center"
        animate={{
          scale: currentZoom,
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* Simplified Animated Gradient Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(0, 245, 255, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 0, 128, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
              #000000
            `
          }}
          animate={{
            background: [
              `radial-gradient(circle at 20% 80%, rgba(0, 245, 255, 0.03) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(255, 0, 128, 0.03) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
               #000000`,
              `radial-gradient(circle at 80% 20%, rgba(0, 245, 255, 0.05) 0%, transparent 50%),
               radial-gradient(circle at 20% 80%, rgba(255, 0, 128, 0.05) 0%, transparent 50%),
               radial-gradient(circle at 60% 60%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
               #000000`,
              `radial-gradient(circle at 20% 80%, rgba(0, 245, 255, 0.03) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(255, 0, 128, 0.03) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
               #000000`
            ]
          }}
          transition={{
            duration: 20, // Increased duration for smoother animation
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Optimized Floating Particles - CSS animated */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-float"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 6px ${particle.color}`,
                willChange: 'transform',
                transform: 'translateZ(0)',
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>

        {/* Simplified Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5" // Reduced opacity
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px' // Increased grid size
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 40, // Increased duration
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Reduced Geometric Shapes - only 2 instead of 3 */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 border border-neon-cyan/20 rounded-full" // Reduced size and opacity
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1], // Reduced scale range
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" }, // Slower rotation
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 border border-neon-pink/20" // Reduced size and opacity
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          animate={{
            rotate: -360,
            y: [0, -10, 0], // Reduced movement
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" }, // Slower rotation
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>
    </div>
  )
}

export default AnimatedBackground