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

export const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="group">
      <article className="space-y-3">
        <div className="overflow-hidden rounded-lg aspect-video bg-muted">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                console.error('Image failed to load:', post.image_url);
                e.currentTarget.src = "/lovable-uploads/1115482f-c458-4a3b-9b3e-ba9a0e0d056f.png";
              }}
            />
          ) : (
            <img
              src="/lovable-uploads/1115482f-c458-4a3b-9b3e-ba9a0e0d056f.png"
              alt="Familie feiert Neujahr mit Musik"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground line-clamp-2">{post.description}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </article>
    </Link>
  );
};