import { Link } from "react-router-dom";
import { ExternalLink, Plus, Trash2, FileText, MessageSquare, BarChart3, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditableField from "./EditableField";

export interface PlatformLink {
  platform: string;
  url: string;
}

export type ResearchType = "article" | "thread" | "report";

export interface Research {
  title: string;
  date: string;
  excerpt: string;
  links: PlatformLink[];
  type?: ResearchType;
  readTime?: string;
  body?: string;
}

interface ResearchCardProps {
  research: Research;
  index: number;
  onChange: (field: string, value: string) => void;
  onUpdateLink: (linkIndex: number, field: string, value: string) => void;
  onAddLink: () => void;
  onRemoveLink: (linkIndex: number) => void;
  isEditing: boolean;
}

const platformStyles: Record<string, string> = {
  reddit: "border-orange-500/40 text-orange-400 bg-orange-500/10 hover:bg-orange-500/20",
  linkedin: "border-blue-500/40 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20",
  twitter: "border-foreground/30 text-foreground bg-foreground/5 hover:bg-foreground/10",
  x: "border-foreground/30 text-foreground bg-foreground/5 hover:bg-foreground/10",
  blog: "border-purple-500/40 text-purple-400 bg-purple-500/10 hover:bg-purple-500/20",
  mirror: "border-primary/30 text-primary bg-primary/10 hover:bg-primary/20",
  substack: "border-orange-400/40 text-orange-300 bg-orange-400/10 hover:bg-orange-400/20",
};

const getPlatformStyle = (platform: string) =>
  platformStyles[platform.toLowerCase()] || "border-primary/30 text-primary bg-primary/10 hover:bg-primary/20";

import type { LucideIcon } from "lucide-react";

const typeConfig: Record<ResearchType, { label: string; icon: LucideIcon; style: string }> = {
  article: { label: "Article", icon: FileText,       style: "border-purple-500/30 text-purple-400 bg-purple-500/10" },
  thread:  { label: "Thread",  icon: MessageSquare,  style: "border-blue-500/30 text-blue-400 bg-blue-500/10" },
  report:  { label: "Report",  icon: BarChart3,       style: "border-primary/30 text-primary bg-primary/10" },
};

const TYPES: ResearchType[] = ["article", "thread", "report"];

const ResearchCard = ({ research, index, onChange, onUpdateLink, onAddLink, onRemoveLink, isEditing }: ResearchCardProps) => {
  const type = research.type ?? "article";
  const cfg = typeConfig[type];
  const TypeIcon = cfg.icon;

  const cardContent = (
    <div className="glass-card-hover p-6 group relative overflow-hidden">
      {/* Background index number */}
      <span className="absolute right-4 top-3 text-6xl font-black text-foreground/[0.03] select-none font-display leading-none pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Header row */}
      <div className="flex items-start gap-3 mb-3">
        {/* Type badge / switcher */}
        {isEditing ? (
          <div className="flex gap-1 flex-wrap">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => onChange("type", t)}
                className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                  type === t ? typeConfig[t].style + " opacity-100" : "border-border/30 text-muted-foreground bg-transparent opacity-50 hover:opacity-80"
                }`}
              >
                {typeConfig[t].label}
              </button>
            ))}
          </div>
        ) : (
          <Badge variant="outline" className={`text-[10px] font-mono shrink-0 gap-1 ${cfg.style}`}>
            <TypeIcon size={9} />
            {cfg.label}
          </Badge>
        )}

        <div className="flex-1 min-w-0 ml-1">
          <EditableField
            value={research.title}
            onChange={(v) => onChange("title", v)}
            isEditing={isEditing}
            placeholder="Research title"
            renderView={(v) => (
              <h3 className="text-foreground font-semibold leading-snug group-hover:text-primary transition-colors">{v}</h3>
            )}
          />
        </div>

        {/* Arrow hint in view mode */}
        {!isEditing && (
          <ArrowRight size={15} className="text-muted-foreground/30 group-hover:text-primary/60 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
        )}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 mb-3">
        <EditableField
          value={research.date}
          onChange={(v) => onChange("date", v)}
          isEditing={isEditing}
          placeholder="YYYY-MM-DD"
          renderView={(v) => <span className="text-xs text-muted-foreground font-mono">{v}</span>}
        />
        {(research.readTime || isEditing) && (
          <>
            <span className="text-muted-foreground/30 text-xs">·</span>
            <Clock size={11} className="text-muted-foreground/50 shrink-0" />
            <EditableField
              value={research.readTime ?? ""}
              onChange={(v) => onChange("readTime", v)}
              isEditing={isEditing}
              placeholder="e.g. 8 min read"
              renderView={(v) => v ? <span className="text-xs text-muted-foreground/70 font-mono">{v}</span> : null}
            />
          </>
        )}
      </div>

      {/* Excerpt */}
      <EditableField
        value={research.excerpt}
        onChange={(v) => onChange("excerpt", v)}
        isEditing={isEditing}
        multiline={isEditing}
        placeholder="Short excerpt or summary"
        renderView={(v) => <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">{v}</p>}
      />

      {/* Platform links — view mode */}
      {!isEditing && research.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {research.links.map((pl, i) => (
            <a
              key={i}
              href={pl.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Badge variant="outline" className={`text-[11px] font-medium gap-1 cursor-pointer ${getPlatformStyle(pl.platform)}`}>
                {pl.platform} <ExternalLink size={10} />
              </Badge>
            </a>
          ))}
        </div>
      )}

      {/* Platform links — edit mode */}
      {isEditing && (
        <div className="mt-4 space-y-2 border-t border-border/20 pt-4">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Platform Links</p>
          {research.links.map((pl, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="w-28">
                <EditableField value={pl.platform} onChange={(v) => onUpdateLink(i, "platform", v)} isEditing placeholder="Platform" />
              </div>
              <div className="flex-1">
                <EditableField value={pl.url} onChange={(v) => onUpdateLink(i, "url", v)} isEditing placeholder="https://..." />
              </div>
              <button onClick={() => onRemoveLink(i)} className="text-destructive/60 hover:text-destructive transition-colors p-1 shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <Button onClick={onAddLink} variant="outline" size="sm" className="border-dashed border-border/40 text-muted-foreground text-xs hover:text-primary hover:border-primary/30 gap-1.5">
            <Plus size={12} /> Add Link
          </Button>
        </div>
      )}

      {/* Body markdown editor — edit mode only */}
      {isEditing && (
        <div className="mt-4 border-t border-border/20 pt-4">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Article Body (Markdown)</p>
          <textarea
            value={research.body ?? ""}
            onChange={(e) => onChange("body", e.target.value)}
            placeholder="Write the full article body in Markdown..."
            rows={8}
            className="w-full bg-muted/20 border border-border/30 rounded-lg px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 resize-y"
          />
        </div>
      )}
    </div>
  );

  // In view mode wrap the whole card in a Link; in edit mode just render it plain
  if (isEditing) return cardContent;

  return (
    <Link to={`/research/${index}`} className="block">
      {cardContent}
    </Link>
  );
};

export default ResearchCard;
