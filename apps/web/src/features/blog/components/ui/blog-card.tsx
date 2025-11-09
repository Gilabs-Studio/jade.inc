"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../../types";

export const BlogCard = ({ post }: { post: BlogPost }) => {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group flex gap-6 p-6 rounded-xl border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-md">
      {/* Image - smaller and on the side */}
      <Link href={{ pathname: "/blog/" + post.slug }} className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="192px"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="space-y-2">
          {/* Category badge */}
          <span className="inline-block px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {post.category}
          </span>
          
          <Link href={{ pathname: "/blog/" + post.slug }}>
            <h3 className="line-clamp-2 text-lg font-bold font-roman hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>
          
          <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full flex-shrink-0 bg-muted">
              {post.author.avatar ? (
                <Image src={post.author.avatar} alt={post.author.name} className="object-cover" fill sizes="32px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-xs font-medium">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{post.readTime} min read</span>
        </div>
      </div>
    </article>
  );
};
