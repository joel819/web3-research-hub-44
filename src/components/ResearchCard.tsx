import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EditableField from "./EditableField";

interface Research {
  title: string;
  date: string;
  platform: string;
  excerpt: string;
  link: string;
}

interface ResearchCardProps {
  research: Research;
  onChange: (field: string, value: string) => void;
  isEditing: boolean;
}

const platformStyles: Record<string, string> = {
  reddit: "border-orange-500/40 text-orange-400 bg-orange-500/10",
  linkedin: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  twitter: "border-foreground/30 text-foreground bg-foreground/5",
  x: "border-foreground/30 text-foreground bg-foreground/5",
  blog: "border-purple-500/40 text-purple-400 bg-purple-500/10",
  mirror: "border-primary/30 text-primary bg-primary/10",
  substack: "border-orange-400/40 text-orange-300 bg-orange-400/10",
};

const getPlatformStyle = (platform: string) =>
  platformStyles[platform.toLowerCase()] || "border-primary/30 text-primary bg-primary/10";

const ResearchCard = ({ research, onChange, isEditing }: ResearchCardProps) => {
  return (
    <div className="glass-card-hover p-6 group">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <EditableField
              value={research.title}
              onChange={(v) => onChange("title", v)}
              isEditing={isEditing}
              placeholder="Research title"
              renderView={(v) => <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors">{v}</h3>}
            />
            {isEditing ? (
              <EditableField value={research.platform} onChange={(v) => onChange("platform", v)} isEditing placeholder="Platform" />
            ) : (
              <Badge variant="outline" className={`text-[10px] shrink-0 font-medium ${getPlatformStyle(research.platform)}`}>
                {research.platform}
              </Badge>
            )}
          </div>
          <EditableField
            value={research.date}
            onChange={(v) => onChange("date", v)}
            isEditing={isEditing}
            placeholder="Date"
            renderView={(v) => <span className="text-xs text-muted-foreground font-mono">{v}</span>}
          />
        </div>
        {!isEditing && research.link && (
          <a href={research.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors shrink-0 mt-1">
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      <EditableField
        value={research.excerpt}
        onChange={(v) => onChange("excerpt", v)}
        isEditing={isEditing}
        multiline={isEditing}
        placeholder="Short excerpt"
        renderView={(v) => <p className="text-sm text-muted-foreground/80 leading-relaxed">{v}</p>}
      />

      {isEditing && (
        <div className="mt-2">
          <EditableField value={research.link} onChange={(v) => onChange("link", v)} isEditing placeholder="Link URL" />
        </div>
      )}
    </div>
  );
};

export default ResearchCard;
