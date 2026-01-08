export const runtime = "nodejs";
export const revalidate = 300;

import { NotionRenderer } from "@/components/NotionRenderer";
import { getBlocks, getPostBySlug } from "@/lib/notion";
import "@/styles/prose.css";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default async function BlogPostPage({ params }: Props): Promise<any> {
  const { slug } = await params
  const data = await getPostBySlug(slug);

  console.log("Blog post data:", data);

  if (!data) notFound();

  const blocks = await getBlocks(data.pageId);  

  return (
    <main className="py-10">
      <div className="grid gap-10 md:grid-cols-1 px-6 md:px-0">        
        <article className="mx-auto max-w-3xl text-white">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              {data.meta.title}
            </h1>
             {data.meta.date && (
              <div className="text-sm text-slate-400 mb-4">
                <span>{data.meta.author} - </span>
                <span className="text-sm text-slate-400">
                  {new Date(data.meta.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
            )}

            {data.meta.image && (
              <div className="mb-6">
                <img
                  src={data.meta.image}
                  alt={data.meta.title}
                  className="
                    w-full h-auto rounded-xl border border-slate-700
                    max-h-105 object-cover object-center
                    sm:rounded-2xl shadow-lg
                  "
                  loading="lazy"
                />
              </div>
            )}
          </header>

          <NotionRenderer blocks={blocks} />
        </article>
      </div>
    </main>
  );
}
