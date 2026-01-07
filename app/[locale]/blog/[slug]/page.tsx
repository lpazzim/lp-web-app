export const runtime = "nodejs";
export const revalidate = 300;

import { NotionRenderer } from "@/components/NotionRenderer";
import { getBlocks, getPostBySlug } from "@/lib/notion";
import "@/styles/prose.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default async function BlogPostPage({ params }: Props): Promise<any> {
  
    
  const data = await getPostBySlug(params.slug);
  if (!data) notFound();

  const blocks = await getBlocks(data.pageId);

  return (
    <main className="py-10 bg-[#171c24]">
      <div className="grid gap-10 md:grid-cols-1 px-6 md:px-0">
        {/* Conteúdo do post */}
        <article className="mx-auto max-w-3xl text-white">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              {data.meta.title}
            </h1>
             {data.meta.date && (
              <p className="text-sm text-slate-400">
                {new Date(data.meta.date).toLocaleDateString("pt-BR")}
              </p>
            )}

            {/* ✅ imagem destacada logo abaixo do título */}
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
