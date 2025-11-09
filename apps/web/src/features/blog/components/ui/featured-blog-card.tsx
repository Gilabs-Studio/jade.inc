"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../../types";

export const FeaturedBlogCard = ({ post }: { post: BlogPost }) => {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-xl">
      {/* Large Featured Image */}
      <Link href={{ pathname: "/blog/" + post.slug }} className="relative block aspect-[16/9] overflow-hidden bg-muted">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-8 space-y-4">
        {/* Category badge */}
        <span className="inline-block px-3 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
          {post.category}
        </span>
        
        <Link href={{ pathname: "/blog/" + post.slug }}>
          <h2 className="text-3xl font-bold font-roman leading-tight hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-muted-foreground text-lg line-clamp-3">{post.excerpt}</p>

        {/* Meta info */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full flex-shrink-0 bg-muted">
              {post.author.avatar ? (
                <Image src={post.author.avatar} alt={post.author.name} className="object-cover" fill sizes="40px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-sm font-medium">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{post.readTime} min read</p>
          </div>
        </div>
      </div>
    </article>
  );
};
