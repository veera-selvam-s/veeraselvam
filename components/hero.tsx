"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
      <div ref={containerRef} className="relative h-full w-full overflow-hidden flex items-center">
        {/* Background grid */}
        <div className="absolute inset-0 grid-background"></div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
            >
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-2"
              >
                <span className="text-primary font-medium">React Developer</span>
              </motion.div>

              <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-4xl md:text-6xl font-bold mb-6 gradient-text"
              >
                Hey! I'm Veeraselvam,
              </motion.h1>

              <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
              >
                A passionate React Developer crafting smooth, scalable, and stunning web experiences.
              </motion.p>

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button onClick={scrollToAbout} className="material-button rounded-md px-8 py-6">
                  Explore My Work
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${
                      -mousePosition.y * 5
                  }deg) translateZ(0)`,
                }}
                className="hidden lg:block relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Code editor mockup */}
                <div className="absolute inset-0 material-card p-4 overflow-hidden">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <div className="ml-4 text-xs text-muted-foreground">App.tsx</div>
                  </div>

                  <pre className="text-xs md:text-sm overflow-hidden">
                  <code>
                    <span className="text-blue-600">import</span>
                    <span className="text-gray-600"> React </span>
                    <span className="text-blue-600">from</span>
                    <span className="text-gray-600"> </span>
                    <span className="text-green-600">'react'</span>
                    <span className="text-gray-600">;</span>
                    <br />
                    <br />
                    <span className="text-blue-600">const</span>
                    <span className="text-gray-600"> </span>
                    <span className="text-blue-800">App</span>
                    <span className="text-gray-600"> = () </span>
                    <span className="text-blue-600">=&gt;</span>
                    <span className="text-gray-600"> {`{`}</span>
                    <br />
                    <span className="text-gray-600"> </span>
                    <span className="text-blue-600">return</span>
                    <span className="text-gray-600"> (</span>
                    <br />
                    <span className="text-gray-600"> </span>
                    <span className="text-blue-800">{`<div`}</span>
                    <span className="text-purple-600">{` className`}</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-green-600">{`"container"`}</span>
                    <span className="text-blue-800">{`>`}</span>
                    <br />
                    <span className="text-gray-600"> </span>
                    <span className="text-blue-800">{`<h1`}</span>
                    <span className="text-purple-600">{` className`}</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-green-600">{`"title"`}</span>
                    <span className="text-blue-800">{`>`}</span>
                    <span className="text-gray-600">Hello, World!</span>
                    <span className="text-blue-800">{`</h1>`}</span>
                    <br />
                    <span className="text-gray-600"> </span>
                    <span className="text-blue-800">{`<p`}</span>
                    <span className="text-purple-600">{` className`}</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-green-600">{`"description"`}</span>
                    <span className="text-blue-800">{`>`}</span>
                    <span className="text-gray-600">Welcome to my portfolio</span>
                    <span className="text-blue-800">{`</p>`}</span>
                    <br />
                    <span className="text-gray-600"> </span>
                    <span className="text-blue-800">{`</div>`}</span>
                    <br />
                    <span className="text-gray-600"> );</span>
                    <br />
                    <span className="text-gray-600">{`};`}</span>
                    <br />
                    <br />
                    <span className="text-blue-600">export</span>
                    <span className="text-gray-600"> </span>
                    <span className="text-blue-600">default</span>
                    <span className="text-gray-600"> App;</span>
                  </code>
                </pre>
                </div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/5"
                    style={{ x: mousePosition.x * -20, y: mousePosition.y * -20 }}
                />
                <motion.div
                    className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-accent/5"
                    style={{ x: mousePosition.x * -30, y: mousePosition.y * -30 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center p-1"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
  )
}
