// app/(blog)/blog/page.tsx
export const runtime = "nodejs";
// export const dynamic = "force-dynamic"; // SSR sempre
export const revalidate = 300;

import Link from "next/link";
import { listAllPublishedPosts } from "@/lib/notion";

import "@/styles/prose.css";
import PostsList from "@/components/PostsList";

export default async function BlogIndexPage() {
  const posts = await listAllPublishedPosts(); // todos publicados (paginado internamente)

  return (
    <main className="mx-auto py-10">
      <div className="grid gap-10 md:grid-cols-1">
        {/* Coluna principal */}
        <section>
          <h1 className="text-3xl font-bold mb-6 text-slate-50">Blog</h1>

          {!posts.length ? (
            <p className="text-slate-50">Ainda não há posts publicados.</p>
          ) : (
            <ul className="space-y-6">
              {posts.map((p) => (
                <li key={p.id}>
                  <h2 className="text-xl font-semibold text-slate-50">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="underline underline-offset-2 hover:no-underline"
                    >
                      {p.title}
                    </Link>
                  </h2>
                  {p.date && (
                    <p className="text-sm text-slate-50">
                      {new Date(p.date).toLocaleDateString("pt-BR")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Sidebar com componente reutilizável */}
        <aside className="md:pt-14">
          <PostsList title="Mais lidos" limit={8} />
        </aside>
      </div>
    </main>
  );
}