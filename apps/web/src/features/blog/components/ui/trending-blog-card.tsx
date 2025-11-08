"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../../types";

export const TrendingBlogCard = ({ post }: { post: BlogPost }) => {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group flex gap-3 p-3 rounded-lg border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-sm">
      {/* Thumbnail Image */}
      <Link href={{ pathname: "/blog/" + post.slug }} className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={post.coverImage}
          alt={post.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="96px"
          priority={false}
        />
        {/* Category Badge on Image */}
        <div className="absolute top-1 left-1 px-2 py-0.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded">
          {post.category}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between min-w-0 py-1">
        <Link href={{ pathname: "/blog/" + post.slug }}>
          <h3 className="line-clamp-2 text-sm font-bold hover:text-primary transition-colors leading-tight mb-1">
            {post.title}
          </h3>
        </Link>
        
        {/* Meta info - compact */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{date}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>
    </article>
  );
};
