import "server-only";
import MarkdownIt from "markdown-it";

/**
 * Markdown-It "cru": sem plugins que modifiquem estrutura.
 * Habilite 'linkify' se quiser autolink de URLs, mas por padrão deixamos off.
 */
const md = new MarkdownIt({
  html: true,     // permite HTML contido no Markdown do Notion
  linkify: false, // mantém exato; troque p/ true se quiser autolinks
  breaks: false,  // respeita apenas linhas em branco para <p>
});

export function markdownToHtml(markdown: string): string {
  return md.render(markdown);
}
