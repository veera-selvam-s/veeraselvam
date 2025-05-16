"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const experiences = [
    {
      year: "Jul 2022-Present",
      title: "React Developer",
      company: "Mallow Technologies Pvt Ltd.",
      description: "<p>Collaborated with global cross-functional teams including " +
          "designers and PMs to deliver intuitive UI solutions that " +
          "reduced user friction by 30%.</p>" +
          "<p>Refactored legacy components into optimized pages, " +
          "improving page load performance by up to 40%.</p>" +
          "<p>Contributed to a Next.js application, implementing responsive " +
          "UIs using Tailwind CSS that enhanced mobile traffic " +
          "conversion by 15%.</p>" +
          "<p>Increased code maintainability and test reliability by adding " +
          "unit tests using Jest, boosting coverage to over 85%.</p>" +
          "<p>Configured pre-commit hooks and linting rules that reduced " +
          "post-deployment bugs by 40%</p>",
    },
  ]

  return (
      <div ref={containerRef} className="container mx-auto px-4">
        <motion.div style={{ opacity, y, scale }} className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center gradient-text">About Me</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden material-card">
                <Image
                    src="/about.png"
                    alt="Developer Portrait"
                    width={600}
                    height={600}
                    className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full opacity-10 blur-2xl" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4">Veeraselvam</h3>
              <p className="text-muted-foreground mb-6">
                I'm a passionate React developer with 3 years of experience building modern web applications. I specialize
                in creating responsive, accessible, and performant user interfaces that deliver exceptional user
                experiences.
              </p>
              <p className="text-muted-foreground mb-6">
                My journey in web development started with a curiosity about how websites work, which led me to explore
                HTML, CSS, and JavaScript. As I grew as a developer, I fell in love with React's component-based
                architecture and the ecosystem around it.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="material-badge bg-primary/10 text-primary border-primary/20">React</Badge>
                <Badge className="material-badge bg-accent/10 text-accent border-accent/20">Next.js</Badge>
                <Badge className="material-badge bg-primary/10 text-primary border-primary/20">Javascript</Badge>
                <Badge className="material-badge bg-accent/10 text-accent border-accent/20">Tailwind CSS</Badge>
              </div>
            </motion.div>
          </div>

          <div className="mt-24">
            <h3 className="text-2xl font-semibold mb-8 text-center">Experience</h3>
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative pl-8 border-l border-muted"
                  >
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent" />
                    <div className="text-sm text-muted-foreground mb-1">{exp.year}</div>
                    <h4 className="text-xl font-medium mb-1">{exp.title}</h4>
                    <div className="text-muted-foreground mb-2">{exp.company}</div>
                    <div className="text-muted-foreground/80" dangerouslySetInnerHTML={{ __html: exp.description }} />
                  </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
  )
}
