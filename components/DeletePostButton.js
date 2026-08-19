'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deletePost } from "@/lib/actions/post.actions"

import { Button } from "@/components/ui/button"

export default function DeletePostButton({postId, compact = false}){
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    async function handleDelete(e){
        e.preventDefault()
        e.stopPropagation()

        const confirmed = window.confirm('Delete post? this action can not be undone')
        if(!confirmed) return;

        setIsDeleting(true)
        const result = await deletePost(postId)

        if(result?.error){
            alert(result.error)
            setIsDeleting(false)
            return;
        }

        router.refresh()

        if(!compact) router.push('/')
    }

    if(compact){
        return (
            <button onClick={handleDelete} disabled={isDeleting} 
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
            aria-label="Delete Post"
            >
                {isDeleting ? '...' : 'X'}
            </button>
        )
    }

    return (
        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting..' : 'Delete'}
        </Button>
    )

        
}