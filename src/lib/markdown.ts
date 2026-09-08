import { marked } from "marked";

/** Markdown from the editor to HTML. Only the site owner writes it. */
export function render(md: string): string {
  return marked.parse(md ?? "", { async: false, gfm: true, breaks: false });
}
