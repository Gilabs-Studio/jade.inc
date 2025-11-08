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
      <Link href={{ pathname: "/blog/" + post.slug }} className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={post.coverImage}
          alt={post.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="192px"
          priority={false}
        />
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
            <div className="relative h-8 w-8 overflow-hidden rounded-full flex-shrink-0">
              <Image src={post.author.avatar} alt={post.author.name} className="object-cover" fill sizes="32px" />
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
