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
      {post.image_url && (
        <div className="mb-8 overflow-hidden rounded-lg aspect-video">
          <img
            src={post.image_url}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <h1 className="text-center font-bold text-[#E535AB] text-4xl md:text-5xl lg:text-6xl mb-16">
        {post.title}
      </h1>
      {post.content.split("\n\n").map((paragraph, index) => {
        // Handle horizontal rules
        if (paragraph.trim() === "---") {
          return <hr key={index} className="my-12 border-t-2 border-gray-200" />;
        }

        // Handle H2 headings with emojis and numbers
        if (paragraph.startsWith("## ")) {
          const content = paragraph.replace("## ", "").trim();
          return (
            <h2 key={index} className="text-[#333333] font-bold text-2xl md:text-3xl lg:text-4xl my-12">
              {content}
            </h2>
          );
        }

        // Handle H3 headings
        if (paragraph.startsWith("### ")) {
          return (
            <h3 key={index} className="text-2xl md:text-3xl font-semibold my-8">
              {paragraph.replace("### ", "").trim()}
            </h3>
          );
        }

        // Handle bullet points
        if (paragraph.includes("\n- ")) {
          const items = paragraph.split("\n");
          return (
            <ul key={index} className="my-8 space-y-4">
              {items.map((item, i) => {
                if (item.startsWith("- ")) {
                  return (
                    <li key={i} className="flex items-start gap-3">
                      {item.replace("- ", "")}
                    </li>
                  );
                }
                return <p key={i} className="mb-4">{item}</p>;
              })}
            </ul>
          );
        }

        // Handle bold text
        if (paragraph.includes("**")) {
          return (
            <p 
              key={index} 
              className="my-6 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} 
            />
          );
        }

        // Handle italic text
        if (paragraph.includes("_")) {
          return (
            <p 
              key={index} 
              className="my-6 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(/_(.*?)_/g, '<em>$1</em>')
              }} 
            />
          );
        }

        // Handle links
        if (paragraph.includes("[")) {
          return (
            <p 
              key={index} 
              className="my-6 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(
                  /\[([^\]]+)\]\(([^)]+)\)/g,
                  '<a href="$2" class="text-[#E535AB] underline font-medium">$1</a>'
                )
              }} 
            />
          );
        }

        // Regular paragraphs
        return (
          <p key={index} className="my-6 leading-relaxed">
            {paragraph}
          </p>
        );
      })}
      <div className="mt-16 flex flex-col items-center gap-6 bg-secondary/50 p-6 md:p-12 rounded-lg">
        <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold text-center">
          🌟 Bereit, einem Kind ein Lächeln ins Gesicht zu zaubern?
        </h3>
        <Button 
          asChild 
          size="lg" 
          className="w-full md:w-auto text-base md:text-lg py-4 md:py-6 px-6 md:px-8 hover:scale-105 transition-transform font-semibold text-center"
        >
          <Link to="/create">
            Bestelle jetzt dein<br className="md:hidden" /> personalisiertes Lied 🎵
          </Link>
        </Button>
      </div>
    </article>
  );
};