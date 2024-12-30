import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  description: string;
  slug: string;
  image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export const BlogPost = ({ post }: { post: BlogPost }) => {
  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="mb-8">{post.title}</h1>
      {post.content.split("\n\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <div className="mt-8 flex justify-center">
        <Button asChild size="lg">
          <Link to="/create">Bestelle jetzt dein personalisiertes Lied</Link>
        </Button>
      </div>
    </article>
  );
};