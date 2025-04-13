"use client"

import { LoginForm } from "@/components/auth/login-form"
import { GavelIcon } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/dashboard"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2">
            <GavelIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Legal IT</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Sign in to your account</h1>
          <p className="mt-2 text-sm text-gray-600">Access legal document analysis, chat assistance, and more</p>
        </div>
        <LoginForm />
        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href={`/register${redirectUrl ? `?redirect=${redirectUrl}` : ""}`}
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
