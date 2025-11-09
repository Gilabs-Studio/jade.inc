"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/src/lib/i18n";
import { AdminService } from "../../services/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "./image-upload";
import type { Blog } from "@/src/features/blog/types";
import type { BlogCreateInput } from "../../types";
import type { BlogCategory } from "@/src/features/blog/types";

interface BlogFormProps {
  blogId?: string;
}

export function BlogForm({ blogId }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(!!blogId);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [formData, setFormData] = useState<BlogCreateInput>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    status: "draft",
    tags: [],
    categoryIds: [],
  });

  useEffect(() => {
    loadCategories();
    if (blogId) {
      loadBlog();
    }
  }, [blogId]);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const cats = await AdminService.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadBlog = async () => {
    if (!blogId) return;

    try {
      setLoadingBlog(true);
      const blog = await AdminService.getBlogById(blogId);
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        featuredImage: blog.featuredImage || "",
        status: blog.status,
        tags: blog.tags || [],
        categoryIds: blog.categories?.map((c) => c.id) || [],
      });
    } catch (error) {
      console.error("Failed to load blog:", error);
      alert("Failed to load blog");
    } finally {
      setLoadingBlog(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (blogId) {
        await AdminService.updateBlog({ id: blogId, ...formData });
      } else {
        await AdminService.createBlog(formData);
      }
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Failed to save blog:", error);
      alert("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  if (loadingBlog) {
    return <div className="text-center py-8">Loading blog...</div>;
  }

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{blogId ? "Edit Blog" : "Create Blog"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <textarea
              id="excerpt"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown)</Label>
            <textarea
              id="content"
              className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <ImageUpload
              value={formData.featuredImage}
              onChange={(url) => setFormData({ ...formData, featuredImage: url })}
              label="Featured Image"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            {loadingCategories ? (
              <div className="text-sm text-muted-foreground">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No categories available.{" "}
                <Link href="/admin/categories/create" className="text-primary hover:underline">
                  Create one
                </Link>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto border border-input rounded-md p-3">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.categoryIds?.includes(category.id) || false}
                      onChange={(e) => {
                        const currentIds = formData.categoryIds || [];
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            categoryIds: [...currentIds, category.id],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            categoryIds: currentIds.filter((id) => id !== category.id),
                          });
                        }
                      }}
                      className="rounded border-input"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            )}
            {formData.categoryIds && formData.categoryIds.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {formData.categoryIds.length} categor{formData.categoryIds.length === 1 ? "y" : "ies"} selected
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "draft" | "published" | "archived",
                })
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : blogId ? "Update Blog" : "Create Blog"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/blogs")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

