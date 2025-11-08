"use client";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../../types";

export const BlogDetail = ({ post }: { post: BlogPost }) => {
  const dateFull = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateShort = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="container max-w-[1000px] px-3 sm:px-4">
      {/* Back and Category - Always at top */}
      <div className="max-w-[1270px] mx-auto mb-8">
        <div className="flex items-center justify-between">
          <Link
            href={{ pathname: "/blog" }}
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            <span className="text-lg">←</span> Back to Blog
          </Link>
          <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-md font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[1270px] mx-auto">
        {/* Cover Image */}
        <div className="relative aspect-[16/9] mb-10 rounded-xl overflow-hidden border bg-muted">
          <Image
            src={post.coverImage}
            alt={post.title}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 720px) 100vw, 720px"
          />
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-roman tracking-tight mb-6 leading-[1.1]">
            {post.title}
          </h1>

          {/* Author and Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="object-cover"
                  fill
                  sizes="40px"
                />
              </div>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{dateShort}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.readTime} min read</span>
              <div className="flex items-center gap-2">
                {['Twitter', 'LinkedIn', 'Copy Link'].map(label => (
                  <button
                    key={label}
                    className="p-2 hover:text-primary transition-colors"
                    aria-label={`Share on ${label}`}
                  >
                    {label === 'Twitter' ? 'X' : label === 'LinkedIn' ? 'in' : '🔗'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {/* Main Content */}
          <div className="space-y-8">
            {post.content.split('##').map((section, i) => {
              if (i === 0) {
                // First section (intro)
                const [title, ...content] = section.split('\n').filter(Boolean);
                return (
                  <div key="intro">
                    <h2 className="text-2xl font-bold font-roman mb-4">
                      {title.replace('#', '').trim()}
                    </h2>
                    {content.map((paragraph, j) => (
                      <p key={j} className="text-muted-foreground mb-6 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                );
              } else {
                // Other sections
                const [title, ...content] = section.split('\n').filter(Boolean);
                return (
                  <div key={i}>
                    <h3 className="text-xl font-semibold font-roman mb-4">
                      {title.trim()}
                    </h3>
                    <div className="space-y-4">
                      {content.map((paragraph, j) => {
                        if (paragraph.startsWith('-')) {
                          return (
                            <div key={j} className="flex gap-2 items-baseline">
                              <span className="text-primary">•</span>
                              <span className="flex-1 text-muted-foreground">
                                {paragraph.replace('-', '').trim()}
                              </span>
                            </div>
                          );
                        } else if (paragraph.match(/^\d\./)) {
                          const [num, ...text] = paragraph.split('.');
                          return (
                            <div key={j} className="flex gap-3 items-baseline">
                              <span className="text-primary font-medium">{num}.</span>
                              <span className="flex-1 text-muted-foreground">
                                {text.join('.').trim()}
                              </span>
                            </div>
                          );
                        } else if (paragraph.startsWith('>')) {
                          return (
                            <blockquote key={j} className="border-l-4 border-primary/30 pl-4 py-1 my-6 italic text-muted-foreground">
                              {paragraph.replace('>', '').trim()}
                            </blockquote>
                          );
                        } else {
                          return (
                            <p key={j} className="text-muted-foreground">
                              {paragraph.trim()}
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-muted-foreground">Published on</p>
              <time className="text-sm" dateTime={post.publishedAt}>{dateFull}</time>
            </div>
            <div className="flex gap-2">
              {post.category && (
                <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-md">
                  {post.category}
                </span>
              )}
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};
