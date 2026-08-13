import React, { memo, useCallback, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";

const SAFE_PROTOCOL = /^(https?:|mailto:|tel:)/i;

const urlTransform = (url) => {
  const value = String(url ?? "").trim();
  if (!value) return "";
  if (value.startsWith("#") || value.startsWith("/")) return value;
  return SAFE_PROTOCOL.test(value) ? value : "";
};

function stabilizeStreaming(raw) {
  let text = String(raw ?? "");
  if (!text) return text;

  const fences = (text.match(/^[ \t]*```/gm) || []).length;
  if (fences % 2 === 1) {
    return `${text}${text.endsWith("\n") ? "" : "\n"}\`\`\``;
  }

  text = text.replace(/!?\[[^\]\n]*\]\([^)\n]*$/, "");

  const scrubbed = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "");

  if ((scrubbed.match(/`/g) || []).length % 2 === 1) text += "`";

  if ((scrubbed.match(/\*\*/g) || []).length % 2 === 1) text += "**";

  if ((scrubbed.match(/~~/g) || []).length % 2 === 1) text += "~~";

  return text;
}

function hastToText(node) {
  if (!node) return "";
  if (node.type === "text") return node.value || "";
  if (!Array.isArray(node.children)) return "";
  return node.children.map(hastToText).join("");
}

function langFromNode(preNode) {
  const codeEl = preNode?.children?.find((c) => c.tagName === "code");
  const classes = codeEl?.properties?.className;
  const list = Array.isArray(classes) ? classes : [];
  const hit = list.find(
    (c) => typeof c === "string" && c.startsWith("language-"),
  );
  return hit ? hit.slice("language-".length) : "";
}

const IconCopySm = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="9"
      y="9"
      width="11"
      height="11"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M5.5 15A2.5 2.5 0 013 12.5v-7A2.5 2.5 0 015.5 3h7A2.5 2.5 0 0115 5.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconCheckSm = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 12.5l5 5L20 6.5"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function CodeBlock({ node, children }) {
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => hastToText(node).replace(/\n$/, ""), [node]);
  const lang = useMemo(() => langFromNode(node), [node]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  }, [code]);

  return (
    <div className="ai-chat-codewrap" dir="ltr">
      <div className="ai-chat-codebar">
        <span className="ai-chat-codelang">{lang || "code"}</span>
        <button
          type="button"
          className="ai-chat-codecopy"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          title={copied ? "Copied" : "Copy code"}
        >
          {copied ? <IconCheckSm /> : <IconCopySm />}
        </button>
      </div>
      <pre className="ai-chat-codeblock">{children}</pre>
    </div>
  );
}

const components = {
  p: ({ children }) => <p className="ai-chat-paragraph">{children}</p>,

  h1: ({ children }) => <h3 className="ai-chat-h ai-chat-h1">{children}</h3>,
  h2: ({ children }) => <h4 className="ai-chat-h ai-chat-h2">{children}</h4>,
  h3: ({ children }) => <h5 className="ai-chat-h ai-chat-h3">{children}</h5>,
  h4: ({ children }) => <h6 className="ai-chat-h ai-chat-h4">{children}</h6>,
  h5: ({ children }) => <h6 className="ai-chat-h ai-chat-h4">{children}</h6>,
  h6: ({ children }) => <h6 className="ai-chat-h ai-chat-h4">{children}</h6>,

  hr: () => <hr className="ai-chat-hr" />,

  blockquote: ({ children }) => (
    <blockquote className="ai-chat-quote">{children}</blockquote>
  ),

  ul: ({ children, className }) => (
    <ul
      className={`ai-chat-list${
        className?.includes("contains-task-list") ? " ai-chat-tasklist" : ""
      }`}
    >
      {children}
    </ul>
  ),
  ol: ({ children, start }) => (
    <ol className="ai-chat-list" start={start ?? undefined}>
      {children}
    </ol>
  ),
  li: ({ children, className }) => (
    <li
      className={
        className?.includes("task-list-item") ? "ai-chat-taskitem" : undefined
      }
    >
      {children}
    </li>
  ),
  input: ({ type, checked }) =>
    type === "checkbox" ? (
      <span
        className={`ai-chat-checkbox${checked ? " is-checked" : ""}`}
        aria-hidden="true"
      >
        {checked ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12.5l5 5L20 6.5"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    ) : null,

  table: ({ children }) => (
    <div className="ai-chat-tablewrap">
      <table className="ai-chat-table">{children}</table>
    </div>
  ),

  pre: CodeBlock,
  code: ({ node, className, children, ...rest }) => {
    const isBlock = typeof className === "string" && className.length > 0;
    if (isBlock) {
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    }
    return <code className="ai-chat-code">{children}</code>;
  },

  a: ({ href, children }) => {
    if (!href) return <>{children}</>;

    if (href.startsWith("#")) {
      return (
        <a href={href} className="ai-chat-link">
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="ai-chat-link"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => (
    <img
      className="ai-chat-img"
      src={src}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
    />
  ),

  sup: ({ children }) => <sup className="ai-chat-sup">{children}</sup>,
  section: ({ node, children, className }) => (
    <section
      className={
        className?.includes("footnotes") ? "ai-chat-footnotes" : className
      }
    >
      {children}
    </section>
  ),
};

const remarkPlugins = [remarkGfm, remarkBreaks];
const rehypePlugins = [
  [rehypeHighlight, { detect: false, ignoreMissing: true }],
];

function RichText({ children, streaming = false }) {
  const source = useMemo(() => {
    const raw = String(children ?? "");
    return streaming ? stabilizeStreaming(raw) : raw;
  }, [children, streaming]);

  if (!source.trim()) return null;

  return (
    <div className="ai-chat-md">
      <ReactMarkdown
        skipHtml
        urlTransform={urlTransform}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

export default memo(RichText);
