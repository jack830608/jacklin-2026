import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiFolder, FiStar, FiEye } from 'react-icons/fi'
import { useState } from 'react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and payment processing.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      category: "fullstack",
      githubUrl: "#",
      liveUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/api/placeholder/400/250",
      technologies: ["Vue.js", "Firebase", "Vuetify", "Socket.io"],
      category: "frontend",
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "A comprehensive analytics dashboard with interactive charts, real-time data visualization, and exportable reports.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "D3.js", "Python", "PostgreSQL", "FastAPI"],
      category: "fullstack",
      githubUrl: "#",
      liveUrl: "#",
      featured: true
    },
    {
      id: 4,
      title: "Weather App",
      description: "A responsive weather application with location-based forecasts, interactive maps, and beautiful weather animations.",
      image: "/api/placeholder/400/250",
      technologies: ["React Native", "OpenWeather API", "Redux", "Expo"],
      category: "mobile",
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Blog CMS",
      description: "A content management system for bloggers with markdown support, SEO optimization, and multi-author capabilities.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "Sanity", "Vercel", "TypeScript"],
      category: "fullstack",
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "A stunning portfolio website with smooth animations, responsive design, and optimized performance.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
      category: "frontend",
      githubUrl: "#",
      liveUrl: "#",
      featured: true
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'mobile', label: 'Mobile' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

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
    <section id="projects" className="py-20 bg-dark-50">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-dark-900 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Featured <span className="gradient-text animate-rainbow">Projects</span>
          </motion.h2>
          <p className="text-lg text-dark-700 max-w-2xl mx-auto font-medium">
            A collection of my recent work, showcasing different technologies and approaches to solving real-world problems.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-dark-100 text-dark-600 hover:bg-primary-600/10 hover:text-primary-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.03,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0, 245, 255, 0.2)"
              }}
              className="bg-dark-100/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-dark-300/20"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-neon-purple via-accent-500 to-neon-pink overflow-hidden animate-gradient-xy">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <FiFolder className="w-16 h-16 text-white/80 animate-pulse-slow" />
                </motion.div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <FiStar className="w-3 h-3 mr-1" />
                    Featured
                  </div>
                )}

                {/* Project Links */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.githubUrl}
                    className="p-2 bg-dark-900/80 rounded-lg text-white hover:bg-dark-900 transition-colors"
                    aria-label="View on GitHub"
                  >
                    <FiGithub className="w-4 h-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    className="p-2 bg-dark-900/80 rounded-lg text-white hover:bg-dark-900 transition-colors"
                    aria-label="View Live Demo"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-dark-700 mb-4 text-sm leading-relaxed font-medium">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary-400/10 text-primary-700 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      className="flex items-center text-dark-500 hover:text-primary-600 transition-colors text-sm"
                    >
                      <FiGithub className="w-4 h-4 mr-1" />
                      Code
                    </a>
                    <a
                      href={project.liveUrl}
                      className="flex items-center text-dark-500 hover:text-primary-600 transition-colors text-sm"
                    >
                      <FiEye className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="btn-outline">
            <FiGithub className="mr-2" />
            View All Projects on GitHub
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects