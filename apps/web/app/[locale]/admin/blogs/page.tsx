import { BlogList } from "@/src/features/admin/components/ui/blog-list";
import { Link } from "@/src/lib/i18n";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Admin | Jade Inc",
  description: "Manage blog posts",
};

export default function AdminBlogsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Blogs</h1>
          <p className="text-muted-foreground">
            Manage your blog posts
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blogs/create">Create Blog</Link>
        </Button>
      </div>

      <BlogList />
    </div>
  );
}

