"use client"

import { RegisterForm } from "@/components/auth/register-form"
import { GavelIcon } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function RegisterPage() {
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
          <h1 className="mt-4 text-2xl font-bold">Create an account</h1>
          <p className="mt-2 text-sm text-gray-600">Get access to legal document analysis, chat assistance, and more</p>
        </div>
        <RegisterForm />
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href={`/login${redirectUrl ? `?redirect=${redirectUrl}` : ""}`}
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
