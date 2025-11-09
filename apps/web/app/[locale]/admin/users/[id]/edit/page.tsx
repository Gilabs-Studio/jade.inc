import { UserForm } from "@/src/features/admin/components/ui/user-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit User | Admin | Jade Inc",
  description: "Edit user",
};

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Edit User</h1>
        <p className="text-muted-foreground mt-2">
          Edit user
        </p>
      </div>

      <UserForm userId={id} />
    </div>
  );
}

