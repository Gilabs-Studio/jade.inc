"use client";

import { useEffect, useState } from "react";
import { AdminService } from "../../services/admin";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalContent: number;
  publishedBlogs: number;
}

const statCards = [
  {
    key: "totalUsers" as const,
    label: "Total Users",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    iconBg: "bg-blue-500",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    key: "totalBlogs" as const,
    label: "Total Blogs",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    iconBg: "bg-purple-500",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    key: "publishedBlogs" as const,
    label: "Published Blogs",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: "bg-green-500",
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    key: "totalContent" as const,
    label: "Total Content",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    iconBg: "bg-orange-500",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
];

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminService.getDashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse border">
            <div className="h-10 bg-muted rounded w-10 mb-4" />
            <div className="h-8 bg-muted rounded w-20 mb-2" />
            <div className="h-4 bg-muted rounded w-32" />
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <Card className="p-8 text-center border">
        <div className="text-destructive">Failed to load stats</div>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => (
        <Card
          key={card.key}
          className={cn(
            "p-6 border hover:shadow-md transition-all duration-200",
            card.bgColor,
            card.borderColor
          )}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={cn("p-2.5 rounded-lg", card.iconBg)}>
              <div className="text-white">{card.icon}</div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-foreground">
              {stats[card.key]}
            </div>
            <div className="text-sm font-medium text-muted-foreground">{card.label}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

