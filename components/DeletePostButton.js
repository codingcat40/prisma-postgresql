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

    if (compact) {
  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="absolute right-3 top-3 z-10 border cursor-pointer border-neutral-900 bg-white px-2 py-1 text-[11px] uppercase tracking-[0.1em] text-neutral-900 opacity-0 transition-opacity hover:bg-neutral-900 hover:text-white group-hover:opacity-100 disabled:opacity-50"
      aria-label="Delete post"
    >
      {isDeleting ? '…' : 'Delete'}
    </button>
  );
}

    return (
        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting..' : 'Delete'}
        </Button>
    )

        
}