import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: FiGithub, href: "#", label: "GitHub" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiMail, href: "mailto:your.email@example.com", label: "Email" },
  ]

  const quickLinks = [
    { label: "Home", href: "#introduction" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-dark-100 border-t border-dark-200 relative z-10">
      <div className="section-container section-padding">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold gradient-text">Your Name</h3>
              <p className="text-dark-600 leading-relaxed">
                Passionate full-stack developer creating digital experiences that make a difference. 
                Always learning, always building.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-dark-50 rounded-lg text-dark-600 hover:text-primary-400 hover:bg-primary-400/10 transition-all duration-150"
                    aria-label={social.label}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-dark-900">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-dark-600 hover:text-primary-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-dark-900">Get In Touch</h4>
              <div className="space-y-2">
                <p className="text-dark-600">
                  Ready to work together? Let's create something amazing.
                </p>
                <a
                  href="mailto:your.email@example.com"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  <FiMail className="w-4 h-4 mr-2" />
                  your.email@example.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-6 border-t border-dark-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center text-dark-600 text-sm">
            <span>© 2024 Your Name. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-1"
            >
              <FiHeart className="w-4 h-4 text-red-500" />
            </motion.div>
            <span>and lots of coffee.</span>
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FiArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer