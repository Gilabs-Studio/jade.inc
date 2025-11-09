import { UserForm } from "@/src/features/admin/components/ui/user-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create User | Admin | Jade Inc",
  description: "Create a new user",
};

export default function CreateUserPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create User</h1>
        <p className="text-muted-foreground mt-2">
          Create a new user
        </p>
      </div>

      <UserForm />
    </div>
  );
}

