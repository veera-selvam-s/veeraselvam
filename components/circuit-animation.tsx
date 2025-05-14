"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface CircuitProps {
  className?: string
}

export function CircuitAnimation({ className = "" }: CircuitProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const controls = useAnimation()

  const [circuitData, setCircuitData] = useState<{ paths: any[]; nodes: any[] } | null>(null)

  useEffect(() => {
    if (!circuitData) {
      setCircuitData(generateCircuitPaths())
    }
  }, [circuitData])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  if (!circuitData) return null // ⛔ Prevent mismatch by not rendering until data exists

  const { paths, nodes } = circuitData

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 0.8,
      transition: {
        pathLength: { delay, duration: 2, ease: "easeInOut" },
        opacity: { delay, duration: 0.5 },
      },
    }),
  }

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

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
                    node.type === 0 ? "circuit-node"
                        : node.type === 1 ? "circuit-node-alt"
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

function generateCircuitPaths() {
  const paths = []
  const nodeCount = 20

  // Horizontal paths
  for (let i = 0; i < 5; i++) {
    const y = 10 + i * 20
    paths.push({
      d: `M0,${y} H100`,
      delay: i * 0.2,
      stroke: i % 3 === 0 ? "#991b1b" : i % 3 === 1 ? "#b45309" : "#0369a1",
    })
  }

  // Vertical paths
  for (let i = 0; i < 5; i++) {
    const x = 10 + i * 20
    paths.push({
      d: `M${x},0 V100`,
      delay: i * 0.2 + 0.5,
      stroke: i % 3 === 0 ? "#0369a1" : i % 3 === 1 ? "#991b1b" : "#b45309",
    })
  }

  // Diagonal and curved paths
  paths.push({ d: "M0,0 L100,100", delay: 1.5, stroke: "#991b1b" })
  paths.push({ d: "M100,0 L0,100", delay: 1.7, stroke: "#b45309" })
  paths.push({ d: "M0,50 C25,30 75,70 100,50", delay: 2.0, stroke: "#0369a1" })
  paths.push({ d: "M50,0 C30,25 70,75 50,100", delay: 2.2, stroke: "#991b1b" })

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
