"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Only enable on desktop
    if (window.innerWidth < 768) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
      <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 border border-primary/30 hidden md:block"
          animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            opacity: isVisible ? 0.5 : 0,
            scale: isClicked ? 0.8 : 1,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            mass: 0.5,
          }}
      />
  )
}
