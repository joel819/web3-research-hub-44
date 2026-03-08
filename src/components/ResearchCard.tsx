import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditableField from "./EditableField";

export interface PlatformLink {
  platform: string;
  url: string;
}

export interface Research {
  title: string;
  date: string;
  excerpt: string;
  links: PlatformLink[];
}

interface ResearchCardProps {
  research: Research;
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

const ResearchCard = ({ research, onChange, onUpdateLink, onAddLink, onRemoveLink, isEditing }: ResearchCardProps) => {
  return (
    <div className="glass-card-hover p-6 group">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <EditableField
            value={research.title}
            onChange={(v) => onChange("title", v)}
            isEditing={isEditing}
            placeholder="Research title"
            renderView={(v) => <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors mb-2">{v}</h3>}
          />
          <EditableField
            value={research.date}
            onChange={(v) => onChange("date", v)}
            isEditing={isEditing}
            placeholder="Date"
            renderView={(v) => <span className="text-xs text-muted-foreground font-mono">{v}</span>}
          />
        </div>
      </div>

      <EditableField
        value={research.excerpt}
        onChange={(v) => onChange("excerpt", v)}
        isEditing={isEditing}
        multiline={isEditing}
        placeholder="Short excerpt"
        renderView={(v) => <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">{v}</p>}
      />

      {/* Platform links */}
      {!isEditing && research.links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {research.links.map((pl, i) => (
            <a
              key={i}
              href={pl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors"
            >
              <Badge variant="outline" className={`text-[11px] font-medium gap-1 cursor-pointer ${getPlatformStyle(pl.platform)}`}>
                {pl.platform} <ExternalLink size={10} />
              </Badge>
            </a>
          ))}
        </div>
      )}

      {/* Edit links */}
      {isEditing && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Platform Links</p>
          {research.links.map((pl, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="w-28">
                <EditableField
                  value={pl.platform}
                  onChange={(v) => onUpdateLink(i, "platform", v)}
                  isEditing
                  placeholder="Platform"
                />
              </div>
              <div className="flex-1">
                <EditableField
                  value={pl.url}
                  onChange={(v) => onUpdateLink(i, "url", v)}
                  isEditing
                  placeholder="URL"
                />
              </div>
              <button
                onClick={() => onRemoveLink(i)}
                className="text-destructive/60 hover:text-destructive transition-colors p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <Button
            onClick={onAddLink}
            variant="outline"
            size="sm"
            className="border-dashed border-border/40 text-muted-foreground text-xs hover:text-primary hover:border-primary/30 gap-1.5"
          >
            <Plus size={12} /> Add Link
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResearchCard;
