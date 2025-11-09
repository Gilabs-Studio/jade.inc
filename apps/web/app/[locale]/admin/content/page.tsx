import { ContentList } from "@/src/features/admin/components/ui/content-list";
import { Link } from "@/src/lib/i18n";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content | Admin | Jade Inc",
  description: "Manage content",
};

export default function AdminContentPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Content</h1>
          <p className="text-muted-foreground">
            Manage your content
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/content/create">Create Content</Link>
        </Button>
      </div>

      <ContentList />
    </div>
  );
}

