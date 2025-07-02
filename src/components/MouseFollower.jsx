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
    }, 8) // ~120fps - much more responsive
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
      {/* Rocket Emoji Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 text-2xl select-none"
        style={{
          filter: `drop-shadow(0 0 8px ${isHovering ? '#ff0080' : '#00f5ff'}) drop-shadow(0 0 16px ${isHovering ? '#8b5cf6' : '#0088ff'})`,
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.4 : 1,
          rotate: isHovering ? 15 : 0,
          filter: [
            `drop-shadow(0 0 8px ${isHovering ? '#ff0080' : '#00f5ff'}) drop-shadow(0 0 16px ${isHovering ? '#8b5cf6' : '#0088ff'})`,
            `drop-shadow(0 0 12px ${isHovering ? '#ff0080' : '#00f5ff'}) drop-shadow(0 0 24px ${isHovering ? '#8b5cf6' : '#0088ff'})`,
            `drop-shadow(0 0 8px ${isHovering ? '#ff0080' : '#00f5ff'}) drop-shadow(0 0 16px ${isHovering ? '#8b5cf6' : '#0088ff'})`
          ]
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.1,
          filter: { duration: 2, repeat: Infinity }
        }}
      >
        🚀
      </motion.div>

      {/* Enhanced Engine Trail */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-40"
          style={{
            width: `${8 - i}px`,
            height: `${8 - i}px`,
            background: `radial-gradient(circle, ${
              ['#ff4500', '#ff6600', '#ffaa00', '#ffd700', '#00f5ff', '#0088ff', '#8b5cf6', '#ff0080'][i]
            } 60%, transparent 100%)`,
            borderRadius: '50%',
          }}
          animate={{
            x: mousePosition.x - 8 + (Math.random() - 0.5) * 6,
            y: mousePosition.y + 18 + i * 4,
            opacity: [0.9, 0.6, 0.1],
            scale: [1.2, 0.8, 0.2],
          }}
          transition={{
            delay: i * 0.02,
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Sparkling Stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="fixed top-0 left-0 pointer-events-none z-35 text-xs select-none"
          style={{
            filter: `drop-shadow(0 0 4px ${['#ffd700', '#00f5ff', '#ff0080'][i]})`,
          }}
          animate={{
            x: mousePosition.x - 16 + (Math.random() - 0.5) * 30,
            y: mousePosition.y - 16 + (Math.random() - 0.5) * 30,
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            delay: i * 0.3,
            duration: 1,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Orbital Ring */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full border pointer-events-none z-30"
        style={{
          borderColor: isHovering ? '#8b5cf6' : '#00f5ff',
          borderWidth: '1px',
          borderStyle: 'dotted',
          opacity: 0.6,
        }}
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: isHovering ? 1.3 : 1,
          rotate: [0, 360],
          borderColor: [
            isHovering ? '#8b5cf6' : '#00f5ff',
            isHovering ? '#ff0080' : '#ffd700',
            isHovering ? '#8b5cf6' : '#00f5ff'
          ],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          rotate: { duration: 6, repeat: Infinity, ease: "linear" },
          borderColor: { duration: 3, repeat: Infinity },
          opacity: { duration: 2, repeat: Infinity },
          scale: { type: "spring", stiffness: 200, damping: 20 }
        }}
      />
    </>
  )
}

export default MouseFollower