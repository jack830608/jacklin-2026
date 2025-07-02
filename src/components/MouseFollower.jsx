import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e) => {
      if (e.target.matches('button, a, .interactive-hover, .card-hover')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e) => {
      if (e.target.matches('button, a, .interactive-hover, .card-hover')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          background: `radial-gradient(circle, ${isHovering ? '#ff0080' : '#00f5ff'} 0%, transparent 70%)`,
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-40"
        style={{
          borderColor: isHovering ? '#8b5cf6' : '#00f5ff',
          borderOpacity: 0.5,
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
      />

      {/* Trail particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-30"
          style={{
            background: `radial-gradient(circle, ${['#00f5ff', '#ff0080', '#8b5cf6'][i]} 0%, transparent 70%)`,
          }}
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: [0.8, 0.4, 0.1],
            scale: [1, 0.8, 0.4],
          }}
          transition={{
            delay: i * 0.05,
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  )
}

export default MouseFollower