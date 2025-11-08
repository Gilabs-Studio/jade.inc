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
      <Link href={{ pathname: "/blog/" + post.slug }} className="relative block aspect-[16/9] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
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
            <div className="relative h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
              <Image src={post.author.avatar} alt={post.author.name} className="object-cover" fill sizes="40px" />
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
