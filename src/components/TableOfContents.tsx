import { useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function parseHeadings(markdown: string): Heading[] {
  const lines = markdown.split("\n");
  const headings: Heading[] = [];
  for (const line of lines) {
    const m = line.match(/^(#{1,3})\s+(.+)/);
    if (m) {
      const text = m[2].trim();
      headings.push({ id: slugify(text), text, level: m[1].length });
    }
  }
  return headings;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const callback: IntersectionObserverCallback = (entries) => {
      // Find the topmost visible heading
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) setActiveId(visible[0].target.id);
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => {
          const isActive = activeId === id;
          return (
            <li key={id} style={{ paddingLeft: `${(level - 1) * 12}px` }}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveId(id);
                }}
                className={`block text-[0.78rem] leading-snug py-0.5 transition-colors duration-150 truncate
                  ${isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {isActive && (
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mr-1.5 mb-0.5" />
                )}
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
