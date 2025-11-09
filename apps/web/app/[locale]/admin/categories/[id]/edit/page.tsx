import { CategoryForm } from "@/src/features/admin/components/ui/category-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Category | Admin | Jade Inc",
  description: "Edit category",
};

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Edit Category</h1>
        <p className="text-muted-foreground mt-2">
          Edit category
        </p>
      </div>

      <CategoryForm categoryId={id} />
    </div>
  );
}

