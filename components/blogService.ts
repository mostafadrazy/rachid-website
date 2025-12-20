
// This file is deprecated in favor of direct Supabase calls in Blog.tsx and Admin.tsx.
// It can be safely removed or kept as a reference for the data structure.

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  category: string;
  image_url: string;
  read_time: string;
}
