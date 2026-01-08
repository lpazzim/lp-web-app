"use client";
import React from "react";

type RichText = {
  plain_text: string;
  href?: string | null;
  annotations?: {
    bold?: boolean; italic?: boolean; underline?: boolean; strikethrough?: boolean;
    code?: boolean; color?: string;
  };
}[];

/* ---------------- helpers de texto ---------------- */

function spanFor(rt: RichText[number]) {
  const style: React.CSSProperties = {};
  const color = rt.annotations?.color;
  if (color && color !== "default") {
    if (color.endsWith("_background")) {
      style.background = color.replace("_background","").replaceAll("_","-");
      style.padding = "0 .25em";
      style.borderRadius = "4px";
    } else {
      style.color = color.replaceAll("_","-");
    }
  }
  let el: React.ReactNode = rt.plain_text;
  if (rt.annotations?.code) el = <code>{el}</code>;
  if (rt.annotations?.bold) el = <strong>{el}</strong>;
  if (rt.annotations?.italic) el = <em>{el}</em>;
  if (rt.annotations?.underline) el = <u>{el}</u>;
  if (rt.annotations?.strikethrough) el = <s>{el}</s>;
  if (rt.href) el = <a href={rt.href} target="_blank" rel="noreferrer" className="break-all underline underline-offset-2">{el}</a>;
  return <span style={style}>{el}</span>;
}

function Rich({ rich_text }: { rich_text: RichText }) {
  return <>{rich_text?.map((t, i) => <React.Fragment key={i}>{spanFor(t)}</React.Fragment>)}</>;
}

/* --------------- renderer com agrupamento de listas --------------- */

export function NotionRenderer({ blocks }: { blocks: any[] }) {
  // Função recursiva que renderiza uma lista de blocos,
  // agrupando sequências de itens de lista no mesmo <ol>/<ul>.
  const renderBlocks = (nodes: any[]): React.ReactNode[] => {
    const out: React.ReactNode[] = [];
    let i = 0;

    while (i < nodes.length) {
      const block = nodes[i];
      const t = block.type;
      const b = block[t];

      // ------- Agrupamento: ordered list -------
      if (t === "numbered_list_item") {
        const items: any[] = [];
        while (i < nodes.length && nodes[i].type === "numbered_list_item") {
          items.push(nodes[i]);
          i++;
        }
        out.push(
          <ol key={`ol-${items[0].id}`} className="list-decimal pl-5 sm:pl-6 my-3">
            {items.map((item) => {
              const bi = item.numbered_list_item || item[item.type];
              return (
                <li key={item.id} className="leading-relaxed">
                  <Rich rich_text={bi.rich_text} />
                  {item.children?.length ? (
                    <div className="mt-2 ml-3 sm:ml-4">{renderBlocks(item.children)}</div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        );
        continue; // já avançamos i dentro do while
      }

      // ------- Agrupamento: unordered list -------
      if (t === "bulleted_list_item") {
        const items: any[] = [];
        while (i < nodes.length && nodes[i].type === "bulleted_list_item") {
          items.push(nodes[i]);
          i++;
        }
        out.push(
          <ul key={`ul-${items[0].id}`} className="list-disc pl-5 sm:pl-6 my-3">
            {items.map((item) => {
              const bi = item.bulleted_list_item || item[item.type];
              return (
                <li key={item.id} className="leading-relaxed">
                  <Rich rich_text={bi.rich_text} />
                  {item.children?.length ? (
                    <div className="mt-2 ml-3 sm:ml-4">{renderBlocks(item.children)}</div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        );
        continue;
      }

      // ------- Demais blocos (1 a 1) -------
      i++; // avançar índice para os casos unitários

      switch (t) {
        case "heading_1":
          out.push(
            <h1 key={block.id} className="text-2xl sm:text-3xl leading-tight mt-6 mb-3">
              <Rich rich_text={b.rich_text} />
            </h1>
          );
          break;

        case "heading_2":
          out.push(
            <h2 key={block.id} className="text-xl sm:text-2xl leading-snug mt-5 mb-2">
              <Rich rich_text={b.rich_text} />
            </h2>
          );
          break;

        case "heading_3":
          out.push(
            <h3 key={block.id} className="text-lg sm:text-xl leading-snug mt-4 mb-2">
              <Rich rich_text={b.rich_text} />
            </h3>
          );
          break;

        case "paragraph":
          out.push(
            <p key={block.id} className="leading-relaxed my-3">
              <Rich rich_text={b.rich_text} />
              {block.children?.length ? (
                <div className="mt-2 ml-2 sm:ml-4">{renderBlocks(block.children)}</div>
              ) : null}
            </p>
          );
          break;

        case "quote":
          out.push(
            <blockquote key={block.id} className="border-l-4 border-slate-600 pl-3 sm:pl-4 italic my-4">
              <Rich rich_text={b.rich_text} />
            </blockquote>
          );
          break;

        case "divider":
          out.push(<hr key={block.id} className="my-5 border-slate-700" />);
          break;

        case "to_do":
          out.push(
            <div key={block.id} className="flex items-start gap-2 my-2 text-sm sm:text-base">
              <input type="checkbox" disabled defaultChecked={b.checked} className="mt-1 h-4 w-4 accent-sky-500" />
              <div><Rich rich_text={b.rich_text} /></div>
            </div>
          );
          break;

        case "toggle":
          out.push(
            <details key={block.id} className="my-3 sm:my-4">
              <summary className="cursor-pointer font-medium">
                <Rich rich_text={b.rich_text} />
              </summary>
              {block.children?.length ? (
                <div className="ml-3 sm:ml-4 mt-2">{renderBlocks(block.children)}</div>
              ) : null}
            </details>
          );
          break;

        case "callout":
          out.push(
            <div key={block.id} className="my-4 sm:my-5 p-3 sm:p-4 rounded-xl border border-slate-700 bg-slate-800/30 flex flex-col sm:flex-row items-start gap-3 max-w-full">
              {b.icon?.emoji && <span className="text-lg sm:text-xl shrink-0">{b.icon.emoji}</span>}
              <div className="flex-1 min-w-0"><Rich rich_text={b.rich_text} /></div>
            </div>
          );
          break;

        case "code":
          out.push(
            <pre key={block.id} className="overflow-x-auto rounded-lg p-3 sm:p-4 text-xs sm:text-sm bg-slate-900 border border-slate-700 my-3 max-w-full">
              <code className="block min-w-0">{b.rich_text?.map((r: any) => r.plain_text).join("")}</code>
            </pre>
          );
          break;

        case "image": {
          const src = b.type === "external" ? b.external.url : b.file.url;
          const caption = b.caption?.[0]?.plain_text ?? "";
          out.push(
            <figure key={block.id} className="my-4 sm:my-6">
              <img src={src} alt={caption} className="w-full h-auto rounded-lg max-w-full" />
              {caption && <figcaption className="mt-2 text-xs sm:text-sm text-center opacity-70">{caption}</figcaption>}
            </figure>
          );
          break;
        }

        case "bookmark": {
          const url: string = b.url;
          const caption = b.caption?.[0]?.plain_text ?? "";
          try {
            const u = new URL(url);
            const hostname = u.hostname.replace(/^www\./, "");
            const favicon = `${u.origin}/favicon.ico`;
            out.push(
              <figure key={block.id} className="my-4 sm:my-5">
                <a
                  href={u.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 border border-slate-700 rounded-xl p-3 sm:p-4 hover:bg-slate-900/40 transition max-w-full"
                >
                  <img
                    src={favicon}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-sm shrink-0"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base text-slate-300 truncate">{hostname}</div>
                    <div className="text-xs sm:text-sm opacity-70 break-all">{u.href}</div>
                  </div>
                </a>
                {caption && <figcaption className="mt-1 text-xs opacity-70">{caption}</figcaption>}
              </figure>
            );
          } catch {
            out.push(
              <a key={block.id} href={url} target="_blank" rel="noreferrer" className="block break-all border border-slate-700 rounded-xl p-3 sm:p-4 my-4 hover:bg-slate-900/40">
                {url}
              </a>
            );
          }
          break;
        }

        default:
          out.push(
            <div key={block.id} data-notion-type={t} className="opacity-70 text-xs sm:text-sm">
              [Bloco {t} não implementado]
            </div>
          );
      }
    }

    return out;
  };

  return (
    <div
      className="
        notion prose prose-invert max-w-full w-full wrap-break-word overflow-x-hidden
        prose-sm sm:prose-base
        prose-pre:whitespace-pre-wrap prose-pre:break-words
        prose-img:rounded-lg prose-img:max-w-full
      "
    >
      {renderBlocks(blocks)}
    </div>
  );
}
