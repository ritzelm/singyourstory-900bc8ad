import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { BlogPost } from "@/components/BlogPost";
import { useParams } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type BlogPostType = Database['public']['Tables']['blog_posts']['Row'];

const Blog = () => {
  const { slug } = useParams();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts", slug],
    queryFn: async () => {
      if (slug) {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        return data as BlogPostType;
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data as BlogPostType[];
      }
    },
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-grow container py-8 md:py-12">
        {!slug ? (
          <>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
              <p className="text-muted-foreground">
                Lesen Sie die neuesten Artikel über personalisierte Kinderlieder und mehr.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="space-y-3 animate-pulse"
                  >
                    <div className="w-full aspect-video bg-muted rounded-lg" />
                    <div className="space-y-2">
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {Array.isArray(posts) && posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-12 bg-muted rounded w-3/4" />
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded w-full" />
                ))}
              </div>
            ) : (
              posts && <BlogPost post={posts as BlogPostType} />
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;