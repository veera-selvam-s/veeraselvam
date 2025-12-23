"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, useAnimation, useInView, Variants } from "framer-motion"
import { useTheme } from "next-themes"

interface CircuitProps {
  className?: string
}

export function CircuitAnimation({ className = "" }: CircuitProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const controls = useAnimation()
  const { theme } = useTheme()

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  const generateCircuitPaths = () => {
    const paths = []
    const nodeCount = 20

    for (let i = 0; i < 5; i++) {
      const y = 10 + i * 20
      const color =
          theme === "light"
              ? i % 3 === 0
                  ? "#1976d2"
                  : i % 3 === 1
                      ? "#42a5f5"
                      : "#0d47a1"
              : i % 3 === 0
                  ? "#991b1b"
                  : i % 3 === 1
                      ? "#b45309"
                      : "#0369a1"

      paths.push({
        d: `M0,${y} H100`,
        delay: i * 0.2,
        stroke: color,
      })
    }

    for (let i = 0; i < 5; i++) {
      const x = 10 + i * 20
      const color =
          theme === "light"
              ? i % 3 === 0
                  ? "#0d47a1"
                  : i % 3 === 1
                      ? "#1976d2"
                      : "#42a5f5"
              : i % 3 === 0
                  ? "#0369a1"
                  : i % 3 === 1
                      ? "#991b1b"
                      : "#b45309"

      paths.push({
        d: `M${x},0 V100`,
        delay: i * 0.2 + 0.5,
        stroke: color,
      })
    }

    paths.push({
      d: "M0,0 L100,100",
      delay: 1.5,
      stroke: theme === "light" ? "#1976d2" : "#991b1b",
    })
    paths.push({
      d: "M100,0 L0,100",
      delay: 1.7,
      stroke: theme === "light" ? "#42a5f5" : "#b45309",
    })
    paths.push({
      d: "M0,50 C25,30 75,70 100,50",
      delay: 2.0,
      stroke: theme === "light" ? "#0d47a1" : "#0369a1",
    })
    paths.push({
      d: "M50,0 C30,25 70,75 50,100",
      delay: 2.2,
      stroke: theme === "light" ? "#1976d2" : "#991b1b",
    })

    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const type = Math.floor(Math.random() * 3)
      const delay = 2.5 + Math.random() * 1.5

      nodes.push({ x, y, type, delay })
    }

    return { paths, nodes }
  }

  const { paths, nodes } = useMemo(() => {
    if (!isClient) return { paths: [], nodes: [] }
    return generateCircuitPaths()
  }, [theme, isClient])

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: theme === "light" ? 0.5 : 0.8,
      transition: {
        pathLength: { delay, duration: 2, ease: [0.4, 0, 0.2, 1] },
        opacity: { delay, duration: 0.5 },
      },
    }),
  }

  const nodeVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (delay: number) => ({
      opacity: theme === "light" ? 0.7 : 1,
      scale: 1,
      transition: {
        delay,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  if (!isClient) return null // ✅ Avoid SSR mismatch

  return (
      <div ref={ref} className={`circuit-container ${className}`}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {paths.map((path, index) => (
              <motion.path
                  key={index}
                  d={path.d}
                  stroke={path.stroke}
                  className="circuit-path"
                  variants={pathVariants}
                  initial="hidden"
                  animate={controls}
                  custom={path.delay}
              />
          ))}

          {nodes.map((node, index) => (
              <motion.circle
                  key={index}
                  cx={node.x}
                  cy={node.y}
                  className={
                    node.type === 0
                        ? "circuit-node"
                        : node.type === 1
                            ? "circuit-node-alt"
                            : "circuit-node-accent"
                  }
                  variants={nodeVariants}
                  initial="hidden"
                  animate={controls}
                  custom={node.delay}
              />
          ))}
        </svg>
      </div>
  )
}
