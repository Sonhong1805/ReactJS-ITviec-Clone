import type { Config } from "@slate-serializers/html/src/lib/serializers/htmlToSlate/config/types";

export const convertHtmlToSlate: Config = {
  elementTags: {
    p: (el: any) => {
      const textAlign =
        el.attribs?.style?.match(/text-align:\s*(\w+)/)?.[1] || undefined;
      return { type: "paragraph", ...(textAlign ? { align: textAlign } : {}) };
    },
    ul: () => ({ type: "bulleted-list" }),
    ol: () => ({ type: "numbered-list" }),
    li: () => ({ type: "list-item" }),
    h1: (el: any) => {
      const textAlign =
        el.attribs?.style?.match(/text-align:\s*(\w+)/)?.[1] || undefined;
      return {
        type: "heading-one",
        ...(textAlign ? { align: textAlign } : {}),
      };
    },
    h2: (el: any) => {
      const textAlign =
        el.attribs?.style?.match(/text-align:\s*(\w+)/)?.[1] || undefined;
      return {
        type: "heading-two",
        ...(textAlign ? { align: textAlign } : {}),
      };
    },
    blockquote: (el: any) => {
      const textAlign =
        el.attribs?.style?.match(/text-align:\s*(\w+)/)?.[1] || undefined;
      return {
        type: "block-quote",
        ...(textAlign ? { align: textAlign } : {}),
      };
    },
  },
  textTags: {
    strong: () => ({ bold: true }),
    em: () => ({ italic: true }),
    u: () => ({ underline: true }),
    code: () => ({ code: true }),
  },
  filterWhitespaceNodes: true,
};

const serialize = (node: any) => {
  if (node.text) {
    let string = node.text;
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    if (node.code) {
      string = `<code>${string}</code>`;
    }
    return string;
  }

  const children = node.children
    ? node.children.map((n: any) => serialize(n)).join("")
    : "";

  const styleAlign = node.align ? `style="text-align:${node.align};"` : "";

  switch (node.type) {
    case "paragraph":
      return `<p ${styleAlign}>${children}</p>`;
    case "heading-one":
      return `<h1 ${styleAlign}>${children}</h1>`;
    case "heading-two":
      return `<h2 ${styleAlign}>${children}</h2>`;
    case "bulleted-list":
      return `<ul ${styleAlign}>${children}</ul>`;
    case "numbered-list":
      return `<ol ${styleAlign}>${children}</ol>`;
    case "list-item":
      return `<li ${styleAlign}>${children}</li>`;
    case "block-quote":
      return `<blockquote ${styleAlign}>${children}</blockquote>`;
    default:
      return children;
  }
};

export const convertSlateToHtml = (ast: any) => {
  return ast.content.map((node: any) => serialize(node)).join("");
};
