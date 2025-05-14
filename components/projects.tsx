"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Movapp – Movie Review Application",
    description:
      "Movapp is a sleek and responsive movie review web application powered by TMDB (The Movie Database) API. It allows users to explore trending movies, search for titles, view detailed movie information, and write or read reviews.",
    image: "/movapp.png",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "redux"],
    demoUrl: "https://movapp-liard.vercel.app/",
    githubUrl: "https://github.com/veera-selvam-s/Movapp",
  },
]

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div ref={containerRef} className="container mx-auto px-4">
      <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center gradient-text">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Card className="overflow-hidden border border-tech-gold/20 h-full transition-all duration-300 hover:border-tech-gold/50 hover:shadow-lg hover:shadow-tech-red/5 tech-panel">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover transition-transform duration-500 ease-in-out"
                    style={{
                      transform: hoveredId === project.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70" />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className={`
                          ${
                            i % 3 === 0
                              ? "bg-tech-red/10 text-tech-red border-tech-red/20"
                              : i % 3 === 1
                                ? "bg-tech-gold/10 text-tech-gold border-tech-gold/20"
                                : "bg-tech-blue/10 text-tech-blue border-tech-blue/20"
                          }
                        `}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-tech-gold/30 hover:bg-tech-gold/10 hover:text-tech-gold"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild className="bg-tech-red hover:bg-tech-red/90 text-white">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
