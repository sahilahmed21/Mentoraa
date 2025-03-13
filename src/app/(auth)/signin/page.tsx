'use client'

import { SignInForm } from "@/components/auth/SignInForm"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

export default function SignInPage() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/home')
    }
  }, [session, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 sm:py-12 bg-background px-4 sm:px-6 lg:px-8 text-foreground">
      <div className="w-full max-w-md">
        <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-bold">
          Welcome to mentora
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-muted-foreground">
          Let's get started with your study journey
        </p>
      </div>

      <div className="mt-6 sm:mt-8 w-full max-w-md">
        <div className="bg-card px-4 sm:px-10 py-6 sm:py-8 shadow rounded-lg sm:rounded-lg border-2 border-border">
          <SignInForm />
          <p className="mt-4 text-center text-xs sm:text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:text-primary/80 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}