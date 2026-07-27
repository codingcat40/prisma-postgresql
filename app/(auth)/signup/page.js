'use client'


import { useActionState, useEffect } from "react"
import { signUp } from "@/lib/actions/auth.actions"
import { useRouter } from "next/navigation"

export default function SignupPage(){
    const [state, formAction, isPending] = useActionState(signUp, null)
    const router = useRouter()

    useEffect(() => {
        if(state?.success){
            router.push('/')
            router.refresh()
        }
    }, [state, router])

    return (
        <div>
            
        </div>
    )
}