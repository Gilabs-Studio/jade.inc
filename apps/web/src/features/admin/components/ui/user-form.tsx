"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminService } from "../../services/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/src/features/auth/types";
import type { UserCreateInput, UserUpdateInput } from "../../types";

interface UserFormProps {
  userId?: string;
}

export function UserForm({ userId }: UserFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(!!userId);
  const [formData, setFormData] = useState<UserCreateInput>({
    email: "",
    password: "",
    fullName: "",
    role: "viewer",
  });

  useEffect(() => {
    if (userId) {
      loadUser();
    }
  }, [userId]);

  const loadUser = async () => {
    if (!userId) return;

    try {
      setLoadingUser(true);
      const user = await AdminService.getUserById(userId);
      setFormData({
        email: user.email,
        password: "", // Don't load password
        fullName: user.fullName,
        role: user.role,
      });
    } catch (error) {
      console.error("Failed to load user:", error);
      alert("Failed to load user");
    } finally {
      setLoadingUser(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (userId) {
        const updateData: UserUpdateInput = {
          id: userId,
          email: formData.email,
          fullName: formData.fullName,
          role: formData.role,
        };
        await AdminService.updateUser(updateData);
      } else {
        await AdminService.createUser(formData);
      }
      router.push("/admin/users");
    } catch (error) {
      console.error("Failed to save user:", error);
      alert("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return <div className="text-center py-8">Loading user...</div>;
  }

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{userId ? "Edit User" : "Create User"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {!userId && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as "admin" | "editor" | "author" | "viewer",
                })
              }
            >
              <option value="viewer">Viewer</option>
              <option value="author">Author</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : userId ? "Update User" : "Create User"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/users")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

