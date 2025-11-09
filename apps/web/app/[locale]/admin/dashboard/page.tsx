import { DashboardStats, RecentBlogs, RecentUsers, QuickActions } from "@/src/features/admin/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Admin | Jade Inc",
  description: "Admin dashboard",
};

export default function AdminDashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your content.
        </p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <RecentBlogs />
          <RecentUsers />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

