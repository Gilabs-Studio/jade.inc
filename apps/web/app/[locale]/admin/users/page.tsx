import { UserList } from "@/src/features/admin/components/ui/user-list";
import { Link } from "@/src/lib/i18n";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | Admin | Jade Inc",
  description: "Manage users",
};

export default function AdminUsersPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">
            Manage your users
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/users/create">Create User</Link>
        </Button>
      </div>

      <UserList />
    </div>
  );
}

