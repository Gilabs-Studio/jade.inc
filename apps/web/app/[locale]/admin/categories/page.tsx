import { CategoryList } from "@/src/features/admin/components/ui/category-list";
import { Link } from "@/src/lib/i18n";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | Admin | Jade Inc",
  description: "Manage categories",
};

export default function AdminCategoriesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground">
            Manage your categories
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/create">Create Category</Link>
        </Button>
      </div>

      <CategoryList />
    </div>
  );
}

