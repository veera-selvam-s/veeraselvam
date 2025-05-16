"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const SKILLS = [
  {
    title: "Frontend Development",
    badgeColor: "primary",
    techs: ["React", "Next.js", "JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "UI/UX & Design",
    badgeColor: "accent",
    techs: ["Tailwind CSS", "Styled Components", "Ant Design", "Material UI", "Figma"],
  },
  {
    title: "State Management",
    badgeColor: "accent",
    techs: ["Redux", "Context API", "Redux saga"],
  },
];


export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  return (
      <div ref={containerRef} className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center gradient-text">Skills & Expertise</h2>

          <div className="rounded-lg overflow-hidden material-card max-w-[600px]">
            <div className="h-full w-full p-6 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-6 text-center">Technical Proficiency</h3>

              <div className="space-y-8">
                {SKILLS.map(({ title, badgeColor, techs }) => (
                    <div key={title}>
                      <h4 className="text-lg font-medium mb-3">{title}</h4>
                      <div className="flex flex-wrap gap-3">
                        {techs.map((tech, i) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`material-badge px-3 py-1.5 rounded-md bg-${badgeColor}/10 text-${badgeColor} text-sm`}
                            >
                              {tech}
                            </motion.div>
                        ))}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  )
}
