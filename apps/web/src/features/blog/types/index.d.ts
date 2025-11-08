export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  publishedAt: string; // ISO
  readTime: number; // minutes
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}
