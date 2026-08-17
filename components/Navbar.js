'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { logOut } from "@/lib/actions/auth.actions"

import { Button } from "@/components/ui/button"
import Link from "next/link"



export default function Navbar({user}){
    const router = useRouter()
    const [loggingOut, setLoggingOut] = useState(false)

    async function handleLogout(){
        setLoggingOut(true)
        await logOut()
        router.push('/login')
        router.refresh()
    }

    return (

        <nav className="flex items-center justify-between border-b px-6 py-4">
            <h1 className="text-xl font-semibold">My Blog</h1>
            <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                    {user?.name || user?.email}
                </span>

                <Button asChild>
                    <Link href="/post/create"> + Create Post</Link>
                </Button>

                <Button variant="outline" onClick={handleLogout} disabled={loggingOut}>
                    {loggingOut ? 'Logging Out': 'Log out'}
                </Button>
            </div>
        </nav>  
    )
}