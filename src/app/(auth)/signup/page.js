"use client"

import { useActionState } from "react"
import { signUp } from "@/src/lib/actions/auth.actions"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card"

import Link from "next/link"


export default function SignUpPage(){
    const [state, formAction, isPending] = useActionState(signUp, null)

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        sign up to start posting on the blog
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}