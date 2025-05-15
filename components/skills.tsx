"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Progress } from "@/components/ui/progress"

interface Skill {
  name: string
  level: number
  color: string
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95, color: "#991b1b" },
      { name: "Next.js", level: 90, color: "#991b1b" },
      { name: "JavaScript", level: 95, color: "#b45309" },
      { name: "HTML/CSS", level: 90, color: "#0369a1" },
    ],
  },
  {
    title: "UI Frameworks",
    skills: [
      { name: "Tailwind CSS", level: 90, color: "#0369a1" },
      { name: "Ant Design", level: 60, color: "#991b1b" },
      { name: "Material UI", level: 60, color: "#991b1b" },
      { name: "Styled Components", level: 80, color: "#b45309" },
    ],
  },
  {
    title: "State Management",
    skills: [
      { name: "Redux", level: 85, color: "#991b1b" },
      { name: "Context API", level: 90, color: "#b45309" },
      { name: "Redux saga", level: 75, color: "#0369a1" },
    ],
  },
]

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
        <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center gradient-text">Skills & Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden material-card">
              <div className="h-full w-full p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-6 text-center">Technical Proficiency</h3>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-medium mb-3">Frontend Development</h4>
                    <div className="flex flex-wrap gap-3">
                      {["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"].map((tech, i) => (
                          <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              viewport={{ once: true }}
                              className="material-badge px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm"
                          >
                            {tech}
                          </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-3">UI/UX & Design</h4>
                    <div className="flex flex-wrap gap-3">
                      {["Tailwind CSS", "Styled Components", "Framer Motion", "Figma", "Adobe XD"].map((tech, i) => (
                          <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              viewport={{ once: true }}
                              className="material-badge px-3 py-1.5 rounded-md bg-accent/10 text-accent text-sm"
                          >
                            {tech}
                          </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-3">Backend & Tools</h4>
                    <div className="flex flex-wrap gap-3">
                      {["Node.js", "Express", "MongoDB", "Git", "Docker", "AWS"].map((tech, i) => (
                          <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              viewport={{ once: true }}
                              className="material-badge px-3 py-1.5 rounded-md bg-secondary/10 text-secondary text-sm"
                          >
                            {tech}
                          </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {skillCategories.map((category, categoryIndex) => (
                  <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                      viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between">
                              <span>{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress
                                value={skill.level}
                                className="h-2"
                                style={
                                  {
                                    "--progress-background": `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                                  } as React.CSSProperties
                                }
                            />
                          </div>
                      ))}
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
  )
}
