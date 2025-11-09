"use client";
import { useEffect, useState } from "react";
import { BlogService } from "../../services/blog";
import type { BlogPost, BlogCategory } from "../../types";
import { FeaturedBlogCard } from "./featured-blog-card";
import { TrendingBlogCard } from ".";
import { BlogCard } from "./blog-card";

export const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [categories, setCategories] = useState<BlogCategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const [p, c] = await Promise.all([
          BlogService.listPosts(),
          BlogService.listCategories(),
        ]);
        if (mounted) {
          setPosts(p);
          setCategories(c);
          console.log('Posts loaded:', p?.length || 0);
          console.log('Categories loaded:', c?.length || 0, c); // Debug log
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading blog data:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Filter posts by selected category
  const filteredPosts = selectedCategory
    ? posts?.filter((post) => {
        // Check if post has categories array and matches selected category slug
        if (post.categories && post.categories.length > 0) {
          return post.categories.some(cat => cat.slug === selectedCategory);
        }
        // Fallback to category string (backward compatibility)
        return post.category === selectedCategory;
      }) ?? []
    : posts ?? [];

  const totalPostsCount = posts?.length ?? 0;
  const featuredPost = filteredPosts[0];
  const rightSidePosts = filteredPosts.slice(1, 3); // 2 posts for right sidebar (reduced from 4)
  const leftBottomPosts = filteredPosts.slice(1); // All posts except featured (for left side)
  const totalLeft = leftBottomPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalLeft / pageSize));
  const start = (currentPage - 1) * pageSize;
  const leftBottomPaginated = leftBottomPosts.slice(start, start + pageSize);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      {/* Main Content - Left Side */}
      <div className="space-y-8">
        {/* Featured Post */}
        {loading ? (
          <div className="rounded-xl border bg-card animate-pulse h-[600px]" />
        ) : filteredPosts.length > 0 && featuredPost ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold font-roman">Featured Article</h2>
            </div>
            <FeaturedBlogCard post={featuredPost} />
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">No articles found in this category.</p>
        )}

        {/* More Articles - Left Bottom */}
        {!loading && leftBottomPosts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold font-roman">More Articles</h2>
            </div>
            <div className="space-y-4">
              {leftBottomPaginated.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm rounded-lg border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    const active = page === currentPage;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-9 w-9 rounded-md text-sm font-medium border ${
                          active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm rounded-lg border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar - Right Side */}
      <aside className="space-y-6">
        <div className="sticky top-24 space-y-6">
          {/* Categories - moved to top */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4 font-roman">Categories</h2>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {/* All Categories Option */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    selectedCategory === null
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted"
                  }`}
                >
                  <span>All Categories</span>
                  <span className={`text-xs ${selectedCategory === null ? "opacity-90" : "text-muted-foreground"}`}>
                    {totalPostsCount}
                  </span>
                </button>

                {/* Individual Categories */}
                {categories && categories.length > 0 ? (
                  categories.map((category) => {
                    // Calculate actual count of posts in this category
                    const categoryCount = posts?.filter((post) => {
                      if (post.categories && post.categories.length > 0) {
                        return post.categories.some(cat => cat.slug === category.slug);
                      }
                      return post.category === category.name;
                    }).length || 0;

                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`w-full flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                          selectedCategory === category.slug
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "hover:bg-muted"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className={`text-xs ${selectedCategory === category.slug ? "opacity-90" : "text-muted-foreground"}`}>
                          {categoryCount}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No categories available
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Trending Section - Right Side (unchanged by pagination) */}
          {!loading && rightSidePosts.length > 0 && (
            <div>
              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-4 mb-4">
                <h2 className="text-xl font-bold font-roman">Trending on Riverside</h2>
              </div>
              <div className="space-y-3">
                {rightSidePosts.map((post) => (
                  <TrendingBlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Popular Tags */}
          {!loading && (
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4 font-roman">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {["Drone Tech", "AI", "Indonesia", "Remote Work", "Travel", "Innovation", "Business", "Technology"].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium bg-accent hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          {!loading && (
            <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-purple-500/5 p-6">
              <h3 className="text-lg font-bold font-roman mb-2">Subscribe to Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest articles and insights delivered to your inbox.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="w-full px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
