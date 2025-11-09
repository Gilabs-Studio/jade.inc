import { ContentForm } from "@/src/features/admin/components/ui/content-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Content | Admin | Jade Inc",
  description: "Create new content",
};

export default function CreateContentPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Content</h1>
        <p className="text-muted-foreground mt-2">
          Create new content
        </p>
      </div>

      <ContentForm />
    </div>
  );
}

