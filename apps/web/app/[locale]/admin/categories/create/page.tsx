import { CategoryForm } from "@/src/features/admin/components/ui/category-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Category | Admin | Jade Inc",
  description: "Create a new category",
};

export default function CreateCategoryPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Category</h1>
        <p className="text-muted-foreground mt-2">
          Create a new category
        </p>
      </div>

      <CategoryForm />
    </div>
  );
}

