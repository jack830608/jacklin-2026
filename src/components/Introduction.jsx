import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const Introduction = () => {
  const [typedText, setTypedText] = useState('')
  const fullText = "Full Stack Developer"
  
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
    <section id="introduction" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-32 h-32 border border-primary-400/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-24 h-24 border border-primary-600/20 rounded-full"
        />
        <motion.div
          animate={floatingAnimation}
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary-400 rounded-full"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-primary-600 rounded-full"
        />
      </div>

      <div className="section-container section-padding relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-neon-cyan font-semibold text-xl mb-4 animate-neon-pulse"
            style={{
              textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff',
            }}
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-dark-900 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              textShadow: '0 0 20px rgba(0, 245, 255, 0.3), 0 0 40px rgba(0, 245, 255, 0.2)',
            }}
          >
            <span className="gradient-text animate-neon-pulse">Your Name</span>
          </motion.h1>

          {/* Typed Text */}
          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl text-dark-600 mb-8 font-mono"
          >
            {typedText}
            <span className="animate-pulse">|</span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-dark-700 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            I craft digital experiences that combine{' '}
            <span className="text-neon-cyan font-semibold">beautiful design</span>{' '}
            with{' '}
            <span className="text-neon-pink font-semibold">robust functionality</span>. 
            Passionate about creating solutions that make a difference through{' '}
            <span className="text-neon-purple font-semibold">clean code</span>{' '}
            and innovative thinking.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button 
              className="btn-primary interactive-hover"
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload className="mr-2" />
              Download Resume
            </motion.button>
            <motion.button 
              className="btn-neon interactive-hover"
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail className="mr-2" />
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6 mb-16"
          >
            {[
              { icon: FiGithub, href: "#", label: "GitHub" },
              { icon: FiLinkedin, href: "#", label: "LinkedIn" },
              { icon: FiMail, href: "#", label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  rotate: [0, -10, 10, 0],
                  boxShadow: "0 0 20px rgba(0, 245, 255, 0.5)"
                }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-dark-100/50 backdrop-blur-sm rounded-lg text-dark-600 hover:text-neon-cyan hover:bg-dark-100/80 transition-all duration-300 neon-border"
                aria-label={social.label}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-dark-400"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <FiArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Introduction