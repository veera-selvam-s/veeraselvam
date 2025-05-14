import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CircuitAnimation } from "@/components/circuit-animation"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <section id="hero" className="h-screen w-full">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
      </section>

      <section id="about" className="min-h-screen w-full py-20 relative">
        <CircuitAnimation />
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
      </section>

      <section id="projects" className="min-h-screen w-full py-20 relative">
        <CircuitAnimation />
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
      </section>

      <section id="skills" className="min-h-screen w-full py-20 relative">
        <CircuitAnimation />
        <Suspense fallback={<LoadingSpinner />}>
          <Skills />
        </Suspense>
      </section>

      <section id="contact" className="min-h-screen w-full py-20 relative">
        <CircuitAnimation />
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </section>
    </div>
  )
}
