import { motion } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiMapPin, FiCode, FiDatabase, FiLayout, FiServer } from 'react-icons/fi'
import { useState } from 'react'

const Experience = () => {
  const [activeTab, setActiveTab] = useState('experience')

  const experiences = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "Tech Company Inc.",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Led development of scalable web applications using React, Node.js, and AWS. Mentored junior developers and improved team productivity by 40%.",
      achievements: [
        "Architected and implemented microservices architecture",
        "Reduced application load time by 60%",
        "Led a team of 5 developers"
      ]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Startup Ventures",
      location: "Remote",
      period: "2020 - 2022",
      description: "Developed and maintained full-stack applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality products.",
      achievements: [
        "Built responsive web applications from scratch",
        "Implemented CI/CD pipelines",
        "Improved code quality through code reviews"
      ]
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Digital Agency",
      location: "New York, NY",
      period: "2018 - 2020",
      description: "Specialized in creating beautiful, interactive user interfaces using React and modern CSS frameworks. Worked closely with designers to bring concepts to life.",
      achievements: [
        "Delivered 15+ client projects on time",
        "Implemented pixel-perfect designs",
        "Optimized website performance"
      ]
    }
  ]

  const skills = [
    {
      category: "Frontend",
      icon: FiLayout,
      technologies: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"]
    },
    {
      category: "Backend",
      icon: FiServer,
      technologies: ["Node.js", "Python", "Express", "Django", "GraphQL", "REST APIs"]
    },
    {
      category: "Database",
      icon: FiDatabase,
      technologies: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "Sequelize"]
    },
    {
      category: "Tools & Others",
      icon: FiCode,
      technologies: ["Git", "Docker", "AWS", "Figma", "Jest", "Webpack"]
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
    <section id="experience" className="py-20 bg-dark-100">
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
            My <span className="gradient-text-alt animate-float">Journey</span>
          </motion.h2>
          <p className="text-lg text-dark-700 max-w-2xl mx-auto font-medium">
            A timeline of my professional growth and the skills I've developed along the way.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-dark-50 p-2 rounded-lg">
            {['experience', 'skills'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-dark-600 hover:text-primary-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        {activeTab === 'experience' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-400/30 transform md:-translate-x-1/2"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative mb-12 md:mb-8 ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
                } md:w-1/2`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-auto md:right-0 md:transform md:translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center md:top-4">
                  <FiBriefcase className="w-4 h-4 text-white" />
                </div>

                {/* Experience Card */}
                <motion.div 
                  className="ml-12 md:ml-0 bg-dark-50/80 backdrop-blur-sm p-6 rounded-lg shadow-lg card-hover card-glow"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(0, 245, 255, 0.2)",
                    borderColor: "rgba(0, 245, 255, 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-bold text-dark-900 mb-2 md:mb-0">
                      {exp.title}
                    </h3>
                    <div className="flex items-center text-primary-600 text-sm">
                      <FiCalendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-dark-600 mb-4">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    <span className="font-medium">{exp.company}</span>
                    <span className="mx-2">•</span>
                    <span>{exp.location}</span>
                  </div>

                  <p className="text-dark-700 mb-4 leading-relaxed font-medium">
                    {exp.description}
                  </p>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-dark-600 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Skills Grid */}
        {activeTab === 'skills' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                variants={itemVariants}
                className="bg-dark-50/80 backdrop-blur-sm p-6 rounded-lg shadow-lg card-hover card-glow border border-dark-300/20"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.2)"
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-600/10 rounded-lg mr-4">
                    <skillGroup.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-900">{skillGroup.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skillGroup.technologies.map((tech, idx) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="px-3 py-1 bg-primary-400/10 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Experience