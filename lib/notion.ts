// lib/notion.ts
import "server-only";
import { Client } from "@notionhq/client";
import { unstable_cache } from "next/cache";

/** Instância única do SDK do Notion (Node runtime) */
export const notion = new Client({ auth: process.env.NEXT_NOTION_TOKEN });

/** Data Source ID (v5). Falha cedo se não estiver configurado. */
const DATA_SOURCE_ID =
  process.env.NEXT_NOTION_DATABASE_ID ??
  (() => {
    throw new Error("NEXT_NOTION_DATABASE_ID ausente nas variáveis de ambiente");
  })();

/** Tipos utilitários bem soltos para evitar fricção de tipagem */
type AnyProp = any;

/** Extrai texto de propriedades comuns do Notion */
function textFrom(prop: AnyProp): string | undefined {
  if (!prop) return undefined;

  switch (prop.type) {
    case "title":
      return (prop.title ?? []).map((t: any) => t.plain_text).join("") || undefined;

    case "rich_text":
      return (prop.rich_text ?? []).map((t: any) => t.plain_text).join("") || undefined;

    case "date":
      return prop.date?.start;

    case "url":
      return prop.url || undefined;

    case "people": {
      const names = (prop.people ?? [])
        .map((u: any) => u?.name)
        .filter(Boolean);
      return names.length ? names.join(", ") : undefined;
    }

    case "created_by":
      return prop.created_by?.name || undefined;

    case "last_edited_by":
      return prop.last_edited_by?.name || undefined;

    default:
      return undefined;
  }
}

/** Modelo estável usado pelo resto da app */
export type NotionPostMeta = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  date?: string;
  canonical?: string;
  image?: string;
  author?: string;
};

/** Mapeia uma página do Notion para NotionPostMeta */
function mapPageToMeta(page: any): NotionPostMeta {
  const p = page.properties ?? {};
  return {
    id: page.id,
    title: textFrom(p.Title) ?? "Sem título",
    slug: textFrom(p.Slug) ?? page.id.replace(/-/g, ""),
    description: textFrom(p.Description),
    date: textFrom(p.Date),
    canonical: textFrom(p.Canonical),
    image: textFrom(p.Image),
    author: textFrom(p.Author),
  };
}

/* ====================================================================== */
/* ========================== FUNÇÕES COM CACHE ========================= */
/* ====================================================================== */

/** Implementação crua (sem cache) */
const _listLatestPosts = async (limit = 10) => {
  const res: any = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Date", direction: "descending" }],
    page_size: limit,
  } as any);

  return (res.results as any[]).map(mapPageToMeta);
};

/** Lista N posts publicados (cacheado por 5 min / key por limit) */
export function listLatestPosts(limit = 10) {
  return unstable_cache(
    async () => _listLatestPosts(limit),
    [`blog:listLatest:${limit}`],
    { revalidate: 300, tags: ["blog:list"] }
  )();
}

/** Implementação crua (sem cache) */
const _listAllPublishedPosts = async () => {
  const all: NotionPostMeta[] = [];
  let start_cursor: string | undefined = undefined;

  do {
    const res: any = await notion.dataSources.query({
      data_source_id: DATA_SOURCE_ID,
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ property: "Date", direction: "descending" }],
      start_cursor,
      page_size: 100,
    } as any);

    all.push(...(res.results as any[]).map(mapPageToMeta));
    start_cursor = res.next_cursor ?? undefined;
  } while (start_cursor);

  return all;
};

/** Lista TODOS os posts publicados (cacheado 5 min) */
export function listAllPublishedPosts() {
  return unstable_cache(
    async () => _listAllPublishedPosts(),
    ["blog:listAll"],
    { revalidate: 300, tags: ["blog:list"] }
  )();
}

/** Implementação crua (sem cache) */
const _getPostBySlug = async (slug: string) => {
  const res: any = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      and: [
        { property: "Published", checkbox: { equals: true } },
        { property: "Slug", rich_text: { equals: slug } },
      ],
    },
    page_size: 1,
  } as any);

  const page = (res.results as any[])[0];
  if (!page) return null;

  return { meta: mapPageToMeta(page), pageId: page.id };
};

/** Busca 1 post por slug (cacheado 5 min / key por slug) */
export function getPostBySlug(slug: string) {
  return unstable_cache(
    async () => _getPostBySlug(slug),
    [`blog:slug:${slug}`],
    { revalidate: 300, tags: ["blog:list"] }
  )();
}

/** Implementação crua (sem cache) */
const _getBlocks = async (blockId: string): Promise<any[]> => {
  const blocks: any[] = [];
  let cursor: string | undefined = undefined;

  do {
    const res: any = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    } as any);

    blocks.push(...(res.results as any[]));
    cursor = res.next_cursor ?? undefined;
  } while (cursor);

  // Carregar filhos apenas para tipos que costumam conter children
  const typesWithChildren = new Set([
    "toggle",
    "paragraph",
    "bulleted_list_item",
    "numbered_list_item",
    "to_do",
    "callout",
    "quote",
    "synced_block",
  ]);

  // Busca children apenas quando necessário, em paralelo
  const out = await Promise.all(
    blocks.map(async (b) => {
      if (b.has_children && typesWithChildren.has(b.type)) {
        const children = await _getBlocks(b.id);
        return { ...b, children };
      }
      return b;
    })
  );

  return out;
};

/** Retorna blocks de uma página (cacheado 5 min / key por pageId) */
export function getBlocks(pageId: string) {
  return unstable_cache(
    async () => _getBlocks(pageId),
    [`blog:blocks:${pageId}`],
    { revalidate: 300 }
  )();
}
