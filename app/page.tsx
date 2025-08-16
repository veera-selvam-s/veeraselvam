import { Suspense } from "react"
import nextDynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ClientCircuitAnimation } from "@/components/client-circuit-animation"

// SSG Route Segment Configuration
export const dynamic = 'force-static'
export const revalidate = false
// Removed runtime = 'edge' - incompatible with static generation

// Dynamic imports for progressive enhancement - all with SSR enabled for Server Components
const Hero = nextDynamic(() => import("@/components/hero"), {
  loading: () => <LoadingSpinner />,
  ssr: true
})

const About = nextDynamic(() => import("@/components/about"), {
  loading: () => <LoadingSpinner />,
  ssr: true
})

const Projects = nextDynamic(() => import("@/components/projects"), {
  loading: () => <LoadingSpinner />,
  ssr: true
})

const Skills = nextDynamic(() => import("@/components/skills"), {
  loading: () => <LoadingSpinner />,
  ssr: true
})

const Contact = nextDynamic(() => import("@/components/contact"), {
  loading: () => <LoadingSpinner />,
  ssr: true
})

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <section id="hero" className="h-screen w-full">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
      </section>

      <section id="about" className="min-h-screen w-full py-20 relative">
        <ClientCircuitAnimation />
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
      </section>

      <section id="projects" className="min-h-screen w-full py-20 relative">
        <ClientCircuitAnimation />
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
      </section>

      <section id="skills" className="min-h-screen w-full py-20 relative">
        <ClientCircuitAnimation />
        <Suspense fallback={<LoadingSpinner />}>
          <Skills />
        </Suspense>
      </section>

      <section id="contact" className="min-h-screen w-full py-20 relative">
        <ClientCircuitAnimation />
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </section>
    </div>
  )
}
