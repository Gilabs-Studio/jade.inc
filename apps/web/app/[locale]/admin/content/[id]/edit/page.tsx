import { ContentForm } from "@/src/features/admin/components/ui/content-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Content | Admin | Jade Inc",
  description: "Edit content",
};

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Edit Content</h1>
        <p className="text-muted-foreground mt-2">
          Edit content
        </p>
      </div>

      <ContentForm contentId={id} />
    </div>
  );
}

