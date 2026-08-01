import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="block overflow-hidden rounded-lg border transition hover:shadow-md"
    >
      {post.imageUrl ? (
        <Image
          src={post.imageUrl}
          alt={post.title}
          className="h-40 w-full object-cover"
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center bg-muted text-muted-foreground">
          No Image
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold line-clamp-1">{post.title}</h3>

        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {post.description}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
