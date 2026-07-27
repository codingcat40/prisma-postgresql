'use client'


import { useActionState, useEffect } from "react"
import { signUp } from "@/lib/actions/auth.actions"
import { useRouter } from "next/navigation"
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import Link from "next/link"

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
        <div className="flex min-h-screen items-center justify-center px-4">
            
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>

                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name (optional)</Label>
                            <Input id="name" name="name" type="text" placeholder="Your name" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email"
                                name = "email"
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>


                        {
                            state?.error && (
                                <p className="text-sm text-red-600">{state.error}</p>
                            )

                        }

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? 'Creating account ... ' : 'Sign Up'}
                        </Button>
                    </form>


                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Already have an account?
                        <Link href="/login" className="underline">
                            Log In
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}