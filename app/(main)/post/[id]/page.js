// app/(main)/post/[id]/page.js

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default async function PostPage({ params }) {
  const { id } = await params;
  const user = await getCurrentUser();

  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { name: true, email: true } } },
  });

  if (!post) notFound();

  const isOwner = user?.id === post.authorId;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/" className="text-sm text-muted-foreground underline">
        &larr; Back to posts
      </Link>

      <div className="mt-4">
        {post.imageUrl && (
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <h1 className="mt-4 text-2xl font-bold">{post.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          By {post.author?.name || post.author?.email} ·{' '}
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="mt-4 whitespace-pre-wrap">{post.description}</p>

        {isOwner && (
          <div className="mt-6 flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/post/${post.id}/edit`}>Edit</Link>
            </Button>
            
          </div>
        )}
      </div>
    </div>
  );
}