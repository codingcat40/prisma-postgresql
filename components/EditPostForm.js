// components/EditPostForm.js

'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updatePost } from '@/lib/actions/post.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function EditPostForm({ post }) {
  const [state, formAction, isPending] = useActionState(updatePost, null);
  const router = useRouter();
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (state?.success) {
      router.push(`/post/${post.id}`);
      router.refresh();
    }
  }, [state, router, post.id]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="postId" value={post.id} />

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={post.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={post.description}
          required
        />
      </div>

      {post.imageUrl && !removeImage && (
        <div className="space-y-2">
          <Label>Current image</Label>
          <img src={post.imageUrl} alt={post.title} className="h-32 rounded object-cover" />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="removeImage"
              onChange={(e) => setRemoveImage(e.target.checked)}
            />
            Remove image
          </label>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="image">
          {post.imageUrl ? 'Replace image (optional)' : 'Add image (optional)'}
        </Label>
        <Input id="image" name="image" type="file" accept="image/*" />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save changes'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}