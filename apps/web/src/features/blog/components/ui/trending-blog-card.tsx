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
      <Link href={{ pathname: "/blog/" + post.slug }} className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="96px"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Category Badge on Image */}
        {post.category && (
          <div className="absolute top-1 left-1 px-2 py-0.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded">
            {post.category}
          </div>
        )}
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
