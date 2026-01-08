export const runtime = "nodejs";
export const revalidate = 300;


import PostsList from "@/components/PostsList";
import "@/styles/prose.css";

export default async function BlogIndexPage() {
  
  return (
    <main className="mx-auto py-10">
      <div className="grid gap-10 md:grid-cols-1">
        <section>
          <div className="px-16 w-full flex flex-col-reverse md:flex-row justify-between gap-6">           
            <div className="container flex flex-col w-full h-full mx-auto">
              <h1 id="about-heading" className="text-white text-6xl md:text-8xl font-bold pb-8 md:pb-0 mb-8">Blog</h1>
                <PostsList title="" limit={8} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}