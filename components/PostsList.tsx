import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { listAllPublishedPosts, NotionPostMeta } from "@/lib/notion";
import { FileTextIcon } from "lucide-react";

type Props = {
  title?: string;
  limit?: number;
  showDate?: boolean;
  className?: string;
};

export default async function PostsList({
  title = "Posts recentes",
  limit = 10,
  showDate = true,
  className,
}: Props) {
  const posts: NotionPostMeta[] = await listAllPublishedPosts(); 
  console.log("Posts fetched:", posts);
  const features = posts.map((post) => ({
    Icon: FileTextIcon,
    name: post.title,
    description: "",
    href: `/blog/${post.slug}`,     
    cta: "Read more",
    className: "col-span-3 lg:col-span-1 bg-[#0a0a0a] transform-gpu  border border-[rgba(255,255,255,0.1)]  shadow-[0_-20px_80px_-20px_rgba(255,255,255,0.12)_inset]",
    background: (
      <>
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className="absolute -top-10 opacity-80 blur-xs"
      />
      </>
    ),
  }));
    

  if (!posts.length) return null;

  return (
    <section className={`${className} text-white`}>
      {!!title && <h2 className="font-semibold text-slate-50 text-sm uppercase tracking-wide mt-10">{title}</h2>}
      <BentoGrid className="text-white">
         {features.map((feature, idx) => (              
          <BentoCard key={idx} {...feature} />))
         }
      </BentoGrid>
    </section>
  );
}
