'use client'

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createPost } from "@/lib/actions/post.actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Card
,
CardHeader, CardTitle, CardContent

 } from "@/components/ui/card"
import Link from "next/link"


 export default function CreatePostPage(){
    const [state, formAction, isPending] = useActionState(createPost, null)
    const router = useRouter()

    useEffect(() => {
        if(state?.success){
            router.push('/')
            router.refresh()
        }
    }, [state, router])

     return (
    <div className="mx-auto max-w-lg px-6 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create a new post</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={5} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image (optional)</Label>
              <Input id="image" name="image" type="file" accept="image/*" />
            </div>

            {state?.error && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Posting...' : 'Post'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}