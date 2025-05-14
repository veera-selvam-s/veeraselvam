"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function TechCircuit() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  }

  const dotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5 + i * 0.2,
        duration: 0.5,
      },
    }),
  }

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0,50 C20,40 30,60 50,50 C70,40 80,60 100,50"
          fill="none"
          stroke="#e63946"
          strokeWidth="0.2"
          variants={lineVariants}
          initial="hidden"
          animate={controls}
        />
        <motion.path
          d="M0,60 C25,70 40,50 60,60 C80,70 90,50 100,60"
          fill="none"
          stroke="#ffd700"
          strokeWidth="0.2"
          variants={lineVariants}
          initial="hidden"
          animate={controls}
        />
        <motion.path
          d="M0,40 C15,30 35,50 50,40 C65,30 85,50 100,40"
          fill="none"
          stroke="#64dfdf"
          strokeWidth="0.2"
          variants={lineVariants}
          initial="hidden"
          animate={controls}
        />

        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={20 * (i + 1)}
            cy={50 + (i % 2 === 0 ? -5 : 5)}
            r="0.5"
            fill={i % 3 === 0 ? "#e63946" : i % 3 === 1 ? "#ffd700" : "#64dfdf"}
            custom={i}
            variants={dotVariants}
            initial="hidden"
            animate={controls}
          />
        ))}
      </svg>
    </div>
  )
}

export function FloatingTechElements({ count = 5 }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 30 + 10
        const x = Math.random() * 100
        const y = Math.random() * 100
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 5

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              delay,
            }}
          >
            <div
              className={`w-full h-full rounded-full opacity-20 ${
                i % 3 === 0 ? "bg-ironman-red" : i % 3 === 1 ? "bg-ironman-gold" : "bg-ironman-blue"
              }`}
              style={{
                boxShadow: `0 0 10px ${i % 3 === 0 ? "#e63946" : i % 3 === 1 ? "#ffd700" : "#64dfdf"}`,
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export function InteractiveTechPanel({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="iron-panel relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}

      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ironman-red via-ironman-gold to-ironman-blue"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "left" }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-ironman-blue via-ironman-gold to-ironman-red"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "right" }}
      />

      <motion.div
        className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-ironman-blue via-ironman-gold to-ironman-red"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "top" }}
      />

      <motion.div
        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-ironman-red via-ironman-gold to-ironman-blue"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "bottom" }}
      />
    </motion.div>
  )
}
