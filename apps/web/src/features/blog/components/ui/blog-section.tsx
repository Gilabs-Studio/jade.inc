"use client";

import { useEffect, useState } from "react";
import { BlogService } from "../../services/blog";
import type { BlogPost } from "../../types";
import { BlogCard } from "./blog-card";
import Link from "next/link";

export const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const featured = await BlogService.featured();
        if (mounted) {
          setPosts(featured);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load featured posts:', error);
        if (mounted) {
          setPosts([]);
          setLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-32" id="blog">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-roman mb-4">Latest Insights</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Research, technology, and coordination knowledge from the Jade Inc team.
          </p>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map(i => (
              <div key={i} className="flex flex-col rounded-xl border bg-card animate-pulse h-96" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts?.map(p => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <Link
            href={{ pathname: "/blog" }}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};
