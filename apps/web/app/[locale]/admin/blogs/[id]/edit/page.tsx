import { BlogForm } from "@/src/features/admin/components/ui/blog-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Blog | Admin | Jade Inc",
  description: "Edit blog post",
};

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Edit Blog</h1>
        <p className="text-muted-foreground mt-2">
          Edit blog post
        </p>
      </div>

      <BlogForm blogId={id} />
    </div>
  );
}

