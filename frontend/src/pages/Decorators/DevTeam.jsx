"use client"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { Mail } from "lucide-react"

export function DevTeamPage() {
  const { t } = useTranslation()

  const teamMembers = [
    { id: 1, name: "Nguyễn Chí Thiện", role: "Admin", email: "thiennguyen@gmail.com", image: "/man-professional-green.jpg" },
    { id: 2, name: "Phạm Duy Quý", role: "Admin", email: "pdqui@gmail.com", image: "/man-with-glasses-dark.jpg" },
    { id: 3, name: "Huỳnh Kim Quý", role: "Admin", email: "kimquyhuynh@gmail.com", image: "/man-with-glasses-dark.jpg" },
    { id: 4, name: "Nguyễn Thị Cẩm Vân", role: "Admin", email: "vannguyen@gmail.com", image: "/woman-red.jpg" },
  ]

  const playHoverSound = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.type = "sine"
    const frequency = 400 + Math.random() * 400
    oscillator.frequency.setValueAtTime(frequency, context.currentTime)

    gainNode.gain.setValueAtTime(0, context.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.05)

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.2)
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 
                    dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 
                    transition-colors duration-500 p-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent 
                       bg-gradient-to-r from-indigo-500 via-blue-600 to-blue-800
                       dark:from-indigo-400 dark:via-blue-500 dark:to-blue-700">
          {t("teamMembers")}
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
          {t("meetOurAwesomeTeam") || "Meet the minds behind our innovation ✨"}
        </p>
      </motion.div>

      {/* Team Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                   gap-8 max-w-6xl mx-auto"
      >
        {teamMembers.map((member) => (
          <motion.div key={member.id} variants={cardVariants}>
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareColor="#ffffff"
              glarePosition="all"
              scale={1.03}
              transitionSpeed={2500}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              onEnter={playHoverSound}
              className="group relative rounded-2xl overflow-hidden 
                         border border-blue-200 dark:border-blue-900 
                         bg-white/70 dark:bg-gray-900/70 shadow-md backdrop-blur-sm
                         hover:shadow-2xl 
                         hover:border-blue-400/40 dark:hover:border-blue-500/50
                         transition-all duration-300"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 
                              bg-gradient-to-r from-indigo-400/20 via-blue-400/20 to-blue-600/20 
                              blur-xl"></div>

              <div className="relative p-6 text-center flex flex-col items-center">
                <div className="mb-4 relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover 
                               border-4 border-blue-100 dark:border-blue-700
                               transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {member.role}
                </p>

                {/* Email reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 
                               text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </a>
                </motion.div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
