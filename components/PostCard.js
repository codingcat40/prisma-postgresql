// components/PostCard.js

import Image from 'next/image';
import Link from 'next/link';
import DeletePostButton from '@/components/DeletePostButton';

export default function PostCard({ post, currentUserId }) {
  const isOwner = currentUserId === post.authorId;

  return (
    <div className="group relative border border-neutral-200">
      {isOwner && <DeletePostButton postId={post.id} compact />}

      <Link href={`/post/${post.id}`} className="block">
        {post.imageUrl ? (
          <div className="relative h-44 w-full grayscale-0 transition-all">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-44 w-full items-center justify-center border-b border-neutral-200 text-[11px] uppercase tracking-[0.1em] text-neutral-400">
            No image
          </div>
        )}

        <div className="p-5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-400">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <h3 className="mt-2 font-serif text-xl leading-snug text-neutral-900 line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-neutral-500 line-clamp-2">
            {post.description}
          </p>
        </div>
      </Link>
    </div>
  );
}