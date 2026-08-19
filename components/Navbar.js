'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { logOut } from "@/lib/actions/auth.actions"
import Link from "next/link"

export default function Navbar({ user }) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await logOut()
    router.push('/login')
    router.refresh()
  }

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <header className="border-b border-neutral-900">
      <div className="mx-auto max-w-6xl px-6">
        {/* Thin meta row */}
        <div className="flex items-center justify-between border-b border-neutral-200 py-1.5 text-[11px] uppercase tracking-[0.15em] text-neutral-500">
          <span>{today}</span>
          <span>{user?.name || user?.email}</span>
        </div>

        {/* Main row */}
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="font-serif text-2xl italic text-neutral-900">
            My Blog
          </Link>

          <div className="flex items-center gap-5">
            <Link
              href="/post/create"
              className="border border-neutral-900 px-4 py-2 text-[12px] uppercase tracking-[0.12em] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              New post
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="text-[12px] uppercase tracking-[0.12em] text-neutral-500 transition-colors hover:text-neutral-900 disabled:opacity-50"
            >
              {loggingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}