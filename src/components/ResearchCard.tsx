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

const ResearchCard = ({ research, onChange, isEditing }: ResearchCardProps) => {
  return (
    <div className="glass-card p-5 group hover:border-primary/30 transition-all duration-300 flex items-center justify-between gap-4">
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
            <Badge variant="outline" className="border-primary/30 text-primary text-xs shrink-0">{research.platform}</Badge>
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
