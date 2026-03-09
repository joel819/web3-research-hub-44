import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, ExternalLink, FileText, MessageSquare, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import type { ResearchType } from "@/components/ResearchCard";
import TableOfContents, { parseHeadings } from "@/components/TableOfContents";
import { slugify } from "@/lib/slugify";
import CopyCodeBlock from "@/components/CopyCodeBlock";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BackToTopButton from "@/components/BackToTopButton";
import { calculateReadingTime } from "@/lib/readingTime";

const STORAGE_KEY = "web3-portfolio-v2";

const typeConfig: Record<ResearchType, { label: string; icon: React.ElementType; style: string }> = {
  article: { label: "Article", icon: FileText, style: "border-purple-500/30 text-purple-400 bg-purple-500/10" },
  thread: { label: "Thread", icon: MessageSquare, style: "border-blue-500/30 text-blue-400 bg-blue-500/10" },
  report: { label: "Report", icon: BarChart3, style: "border-primary/30 text-primary bg-primary/10" },
};

const platformStyles: Record<string, string> = {
  reddit: "border-orange-500/40 text-orange-400 bg-orange-500/10 hover:bg-orange-500/20",
  linkedin: "border-blue-500/40 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20",
  twitter: "border-foreground/30 text-foreground bg-foreground/5 hover:bg-foreground/10",
  x: "border-foreground/30 text-foreground bg-foreground/5 hover:bg-foreground/10",
  blog: "border-purple-500/40 text-purple-400 bg-purple-500/10 hover:bg-purple-500/20",
  mirror: "border-primary/30 text-primary bg-primary/10 hover:bg-primary/20",
  substack: "border-orange-400/40 text-orange-300 bg-orange-400/10 hover:bg-orange-400/20",
};
const getPlatformStyle = (p: string) =>
  platformStyles[p.toLowerCase()] ?? "border-primary/30 text-primary bg-primary/10 hover:bg-primary/20";

const DEFAULT_BODY = `## Overview

This research piece explores key concepts and findings in the Web3 space.

## Key Findings

- **Finding 1**: Detailed analysis of the primary subject matter.
- **Finding 2**: Secondary observations and data points.
- **Finding 3**: Supporting evidence and cross-chain comparisons.

## Methodology

The analysis was conducted using on-chain data, public disclosures, and primary source research across multiple protocols.

## Conclusion

Further investigation is recommended as the ecosystem continues to evolve rapidly.

---

*This article is for informational purposes only and does not constitute financial advice.*`;

const ResearchDetail = () => {
  const { index } = useParams<{ index: string }>();
  const idx = parseInt(index ?? "0", 10);

  let data: any = null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    data = saved ? JSON.parse(saved) : null;
  } catch { /* empty */ }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Link to="/#research" className="text-primary hover:text-primary/80">← Back to research</Link>
        </div>
      </div>
    );
  }

  const research = data?.research?.[idx];
  if (!research) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Link to="/#research" className="text-primary hover:text-primary/80">← Back to research</Link>
        </div>
      </div>
    );
  }

  const type: ResearchType = research.type ?? "article";
  const cfg = typeConfig[type];
  const TypeIcon = cfg.icon;
  const body: string = research.body || DEFAULT_BODY;
  const readTime = research.readTime || calculateReadingTime(body);
  const headings = parseHeadings(body);

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <BackToTopButton />
      <Navbar name={data.name} />

      {/* Wide layout: article + TOC sidebar */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        <div className="flex gap-16 items-start">

          {/* ── Main column ── */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Back link */}
            <ScrollReveal>
              <Link
                to="/#research"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
              >
                <ArrowLeft size={16} /> Back to research
              </Link>
            </ScrollReveal>

            {/* Header */}
            <ScrollReveal>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className={`text-[10px] font-mono gap-1 ${cfg.style}`}>
                    <TypeIcon size={9} />
                    {cfg.label}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground leading-tight mb-4">
                  {research.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-mono">{research.date}</span>
                  {readTime && (
                    <>
                      <span className="text-muted-foreground/30">·</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} />
                        {readTime}
                      </span>
                    </>
                  )}
                </div>

                {research.excerpt && (
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-4">
                    {research.excerpt}
                  </p>
                )}
              </div>
            </ScrollReveal>

            {/* Divider */}
            <ScrollReveal>
              <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent mb-10" />
            </ScrollReveal>

            {/* Markdown body */}
            <ScrollReveal>
              <article className="prose-research">
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ children }) => {
                      const id = slugify(String(children));
                      return <h1 id={id} className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4 leading-tight scroll-mt-28">{children}</h1>;
                    },
                    h2: ({ children }) => {
                      const id = slugify(String(children));
                      return <h2 id={id} className="text-xl md:text-2xl font-bold font-display text-foreground mt-8 mb-3 leading-tight scroll-mt-28">{children}</h2>;
                    },
                    h3: ({ children }) => {
                      const id = slugify(String(children));
                      return <h3 id={id} className="text-lg font-semibold font-display text-foreground mt-6 mb-2 scroll-mt-28">{children}</h3>;
                    },
                    p: ({ children }) => (
                      <p className="text-muted-foreground leading-relaxed mb-4 text-[0.95rem]">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-2 mb-4 pl-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="space-y-2 mb-4 pl-4 list-decimal list-inside">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-muted-foreground text-[0.95rem] leading-relaxed flex gap-2 items-start">
                        <span className="text-primary mt-1.5 shrink-0 text-xs">▸</span>
                        <span>{children}</span>
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-muted-foreground/80">{children}</em>
                    ),
                    pre: ({ children }) => (
                      <CopyCodeBlock>{children}</CopyCodeBlock>
                    ),
                    code: ({ children, className }) => {
                      const isBlock = !!className;
                      return isBlock ? (
                        <code className={className}>{children}</code>
                      ) : (
                        <code className="bg-muted/50 border border-border/20 rounded px-1.5 py-0.5 text-xs font-mono text-primary/90">
                          {children}
                        </code>
                      );
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-primary/40 pl-4 py-1 my-4 text-muted-foreground/80 italic">{children}</blockquote>
                    ),
                    hr: () => (
                      <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent my-8" />
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/30 transition-colors"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {body}
                </ReactMarkdown>
              </article>
            </ScrollReveal>

            {/* Platform links */}
            {research.links?.length > 0 && (
              <ScrollReveal>
                <div className="mt-10 pt-8 border-t border-border/20">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Read on</p>
                  <div className="flex flex-wrap gap-2">
                    {research.links.map((pl: { platform: string; url: string }, i: number) => (
                      pl.url && pl.url !== "#" ? (
                        <a key={i} href={pl.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80">
                          <Badge variant="outline" className={`text-[11px] font-medium gap-1 cursor-pointer ${getPlatformStyle(pl.platform)}`}>
                            {pl.platform} <ExternalLink size={10} />
                          </Badge>
                        </a>
                      ) : (
                        <Badge key={i} variant="outline" className={`text-[11px] font-medium gap-1 ${getPlatformStyle(pl.platform)}`}>
                          {pl.platform}
                        </Badge>
                      )
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* ── TOC sidebar ── hidden on small screens */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-56 shrink-0">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </div>

      <Footer
        name={data.name}
        since={data.since ?? "2024"}
        twitter={data.twitter ?? ""}
        linkedin={data.linkedin ?? ""}
        github={data.github ?? ""}
      />
    </div>
  );
};

export default ResearchDetail;
