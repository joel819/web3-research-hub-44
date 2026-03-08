import { ExternalLink } from "lucide-react";
import EditableField from "./EditableField";
import { Badge } from "@/components/ui/badge";

interface Research {
  title: string;
  date: string;
  platform: string;
  link: string;
}

interface ResearchCardProps {
  research: Research;
  onChange: (field: keyof Research, value: string) => void;
  isEditing: boolean;
}

const platformStyles: Record<string, string> = {
  reddit: "border-green-500/40 text-green-400 bg-green-500/10",
  linkedin: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  twitter: "border-foreground/30 text-foreground bg-foreground/10",
  x: "border-foreground/30 text-foreground bg-foreground/10",
  mirror: "border-primary/30 text-primary bg-primary/10",
  substack: "border-orange-500/40 text-orange-400 bg-orange-500/10",
};

const getPlatformStyle = (platform: string) =>
  platformStyles[platform.toLowerCase()] || "border-primary/30 text-primary bg-primary/10";

const ResearchCard = ({ research, onChange, isEditing }: ResearchCardProps) => {
  return (
    <div className="glass-card p-5 group hover:border-primary/20 transition-all duration-300 flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <EditableField
            value={research.title}
            onChange={(v) => onChange("title", v)}
            isEditing={isEditing}
            placeholder="Research title"
            renderView={(v) => <h3 className="text-foreground font-medium truncate">{v}</h3>}
          />
          {isEditing ? (
            <EditableField value={research.platform} onChange={(v) => onChange("platform", v)} isEditing={isEditing} placeholder="Platform" />
          ) : (
            <Badge variant="outline" className={`text-xs shrink-0 ${getPlatformStyle(research.platform)}`}>
              {research.platform}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <EditableField
            value={research.date}
            onChange={(v) => onChange("date", v)}
            isEditing={isEditing}
            placeholder="Date"
            renderView={(v) => <span className="text-xs text-muted-foreground font-mono">{v}</span>}
          />
          {isEditing && (
            <EditableField value={research.link} onChange={(v) => onChange("link", v)} isEditing={isEditing} placeholder="Link URL" />
          )}
        </div>
      </div>
      {!isEditing && research.link && (
        <a href={research.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors shrink-0">
          <ExternalLink size={16} />
        </a>
      )}
    </div>
  );
};

export default ResearchCard;
