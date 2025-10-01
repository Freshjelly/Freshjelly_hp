import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { Pricing } from '../components/Pricing'
import { Testimonials } from '../components/Testimonials'
import { Cta } from '../components/Cta'

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Cta />
    </>
  )
}

