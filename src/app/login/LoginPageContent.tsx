"use client"
import { useState, useEffect } from "react"
import { getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import LoginForm from "@/components/admin/LoginForm"

export default function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const callbackUrl = searchParams.get("callbackUrl") || "/admin"

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      if (session && (session.user as any).role === "admin") {
        router.push(callbackUrl)
      } else {
        setLoading(false)
      }
    }
    checkSession()
  }, [router, callbackUrl])

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <LoginForm callbackUrl={callbackUrl} />
}
