import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { BlogHeroSection } from "@/src/features/blog/components/ui";
// Lazy load list for faster first paint
const BlogList = dynamic(
  () => import("@/src/features/blog/components/ui").then(m => ({ default: m.BlogList })),
  {
    loading: () => (
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col rounded-xl border bg-card animate-pulse h-96" />
        ))}
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Blog | Jade Inc",
  description: "Insights on research coordination, technology, and field execution.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <BlogHeroSection />
      <section className="pb-32">
        <div className="container">
          <BlogList />
        </div>
      </section>
    </main>
  );
}
