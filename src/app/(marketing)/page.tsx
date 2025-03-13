'use client'

import { BookOpen, Brain, Clock } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesGrid } from '@/components/sections/FeatureGrid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ReviewMarquee } from "@/components/ReviewMarquee"
import { Video } from "@/components/Video"
import { FaqSection } from "@/components/sections/FaqSection"

export default function Page() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/home')
    }
  }, [session, router])

  const features = [
    {
      icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
      title: "Personalized Study Plans",
      description: "Get tailored study plans based on your goals and learning style."
    },
    {
      icon: <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
      title: "AI-Curated Resources",
      description: "Access the best learning materials curated by our AI."
    },
    {
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
      title: "Time Management",
      description: "Manage your time effectively and stay on top of your studies."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 bg-background text-foreground">
      <HeroSection
        title="Welcome to"
        highlightedText="mentora"
        description="Your AI-powered study assistant for accelerated learning"
        ctaText={session ? "Go to Dashboard" : "Get Started"}
        ctaLink={session ? "/home" : "/register"}
      />

      <FeaturesGrid features={features} />

      {/* <section className="py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          See mentora in Action
        </h2>
        <Video />
      </section> */}

      {/* <section className="py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          What Our Users Say
        </h2>
        <ReviewMarquee />
      </section> */}

      <FaqSection />
    </div>
  )
}