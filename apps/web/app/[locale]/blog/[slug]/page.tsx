import type { Metadata } from "next";
import { BlogService } from "@/src/features/blog/services/blog";
import { BlogDetail } from "@/src/features/blog/components/ui";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await BlogService.getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Jade Inc" };
  return { title: `${post.title} | Jade Inc`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await BlogService.getPostBySlug(slug);
  if (!post) notFound();
  return (
    <main className="py-24 min-h-screen">
      <BlogDetail post={post} />
    </main>
  );
}
