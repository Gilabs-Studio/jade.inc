import { BlogForm } from "@/src/features/admin/components/ui/blog-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog | Admin | Jade Inc",
  description: "Create a new blog post",
};

export default function CreateBlogPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Blog</h1>
        <p className="text-muted-foreground mt-2">
          Create a new blog post
        </p>
      </div>

      <BlogForm />
    </div>
  );
}

