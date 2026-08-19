// app/(main)/post/[id]/edit/page.js

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { notFound, redirect } from 'next/navigation';
import EditPostForm from '@/components/EditPostForm';

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const user = await getCurrentUser();

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) notFound();
  if (!user || user.id !== post.authorId) redirect('/');

  return (
    <div className="mx-auto max-w-lg px-6 py-10">
      <h1 className="mb-6 text-xl font-bold">Edit post</h1>
      <EditPostForm post={post} />
    </div>
  );
}