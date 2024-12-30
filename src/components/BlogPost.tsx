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
      <h1 className="text-center font-bold text-[#E535AB] text-4xl md:text-5xl mb-12">
        {post.title.startsWith("🎵") ? post.title : `🎵 ${post.title}`}
      </h1>
      {post.content.split("\n\n").map((paragraph, index) => {
        if (paragraph.startsWith("---")) {
          return <hr key={index} className="my-12 border-t-2 border-gray-200" />;
        }
        if (paragraph.startsWith("##")) {
          const content = paragraph.replace("##", "").trim();
          // Check if content already starts with an emoji and number
          if (!content.match(/^[0-9️⃣]/)) {
            return (
              <h2 key={index} className="text-[#333333] font-bold text-3xl my-8">
                {`1️⃣ ${content}`}
              </h2>
            );
          }
          return (
            <h2 key={index} className="text-[#333333] font-bold text-3xl my-8">
              {content}
            </h2>
          );
        }
        if (paragraph.startsWith("#")) {
          return (
            <h1 key={index} className="text-[#E535AB] font-bold text-4xl my-8">
              {paragraph.replace("#", "").trim()}
            </h1>
          );
        }
        if (paragraph.startsWith("-")) {
          return (
            <ul key={index} className="my-6 space-y-3">
              {paragraph.split("\n").map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  {item.startsWith("- ➡️") ? item.replace("- ", "") : `➡️ ${item.replace("-", "").trim()}`}
                </li>
              ))}
            </ul>
          );
        }
        if (paragraph.includes("**")) {
          return (
            <p 
              key={index} 
              className="my-6"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} 
            />
          );
        }
        if (paragraph.includes("[")) {
          return (
            <p 
              key={index} 
              className="my-6"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(
                  /\[([^\]]+)\]\(([^)]+)\)/g,
                  '<a href="$2" class="text-[#E535AB] underline">$1</a>'
                )
              }} 
            />
          );
        }
        return <p key={index} className="my-6">{paragraph}</p>;
      })}
      <div className="mt-16 flex flex-col items-center gap-6 bg-secondary/50 p-8 md:p-12 rounded-lg">
        <h3 className="text-2xl md:text-3xl font-semibold text-center">
          🌟 Bereit, einem Kind ein Lächeln ins Gesicht zu zaubern?
        </h3>
        <Button asChild size="lg" className="font-semibold text-lg py-6 px-8">
          <Link to="/create">Bestelle jetzt dein personalisiertes Lied 🎵</Link>
        </Button>
      </div>
    </article>
  );
};