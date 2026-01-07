// components/PostsList.tsx
import Link from "next/link";
import { listLatestPosts } from "@/lib/notion";

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
  const posts = await listLatestPosts(limit);

  if (!posts.length) return null;

  return (
    <section className={`${className} text-white`}>
      {!!title && <h2 className="font-semibold text-slate-50 text-sm uppercase tracking-wide mt-10">{title}</h2>}
      <ul className="space-y-3 mt-3 mr-24">
        {posts.map((p) => (
          <li key={p.id} className="leading-tight">
            <Link
              href={`/blog/${p.slug}`}
              className="text-slate-50 hover:text-slate-400 transition-colors text-sm font-thin"
            >
              {p.title}
            </Link>
            {showDate && p.date && (
              <span className="ml-2 text-xs text-slate-400">
                - {new Date(p.date).toLocaleDateString("pt-BR")}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
