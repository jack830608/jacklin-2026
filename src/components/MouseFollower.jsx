import { motion } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const throttleTimeoutRef = useRef(null)

  const throttledUpdateMousePosition = useCallback((e) => {
    if (throttleTimeoutRef.current) return
    
    throttleTimeoutRef.current = setTimeout(() => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      throttleTimeoutRef.current = null
    }, 32) // Increased throttle to ~30fps for better performance
  }, [])

  useEffect(() => {
    const updateMousePosition = (e) => {
      throttledUpdateMousePosition(e)
    }

    const handleMouseEnter = (e) => {
      if (e.target.matches('button, a[href], .interactive-hover')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e) => {
      if (e.target.matches('button, a[href], .interactive-hover')) {
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
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Optimized Rocket Emoji Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 text-2xl select-none"
        style={{
          filter: `drop-shadow(0 0 4px ${isHovering ? '#ff0080' : '#00f5ff'})`, // Reduced shadow complexity
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.2 : 1, // Reduced scale
          rotate: isHovering ? 5 : 0, // Reduced rotation
        }}
        transition={{
          type: "spring",
          stiffness: 300, // Reduced stiffness
          damping: 20,
          mass: 0.1,
        }}
      >
        🚀
      </motion.div>

      {/* Simplified Engine Trail - only show when hovering */}
      {isHovering && [...Array(2)].map((_, i) => ( // Reduced from 4 to 2, only show on hover
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-40"
          style={{
            width: `${4 - i}px`,
            height: `${4 - i}px`,
            background: `radial-gradient(circle, ${
              ['#ff4500', '#00f5ff'][i]
            } 60%, transparent 100%)`,
            borderRadius: '50%',
            transform: 'translateZ(0)'
          }}
          animate={{
            x: mousePosition.x - 4 + (Math.random() - 0.5) * 2,
            y: mousePosition.y + 18 + i * 2,
            opacity: [0.5, 0.2, 0.1],
            scale: [1, 0.6, 0.2],
          }}
          transition={{
            delay: i * 0.05,
            duration: 0.3,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Simplified Orbital Ring - only show when hovering */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-30" // Reduced size
          style={{
            borderColor: '#8b5cf6',
            borderWidth: '1px',
            borderStyle: 'dotted',
            opacity: 0.3, // Reduced opacity
            transform: 'translateZ(0)'
          }}
          animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: 1.1, // Reduced scale
            rotate: [0, 360],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" }, // Slower rotation
            scale: { type: "spring", stiffness: 200, damping: 20 }
          }}
        />
      )}
    </>
  )
}

export default MouseFollower