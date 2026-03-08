import { ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditableField from "./EditableField";

interface Tool {
  name: string;
  description: string;
  tags: string[];
  link: string;
  featured: boolean;
}

interface ToolCardProps {
  tool: Tool;
  onChange: (field: string, value: string) => void;
  onToggleFeatured: () => void;
  isEditing: boolean;
}

const ToolCard = ({ tool, onChange, onToggleFeatured, isEditing }: ToolCardProps) => {
  return (
    <div className="glass-card-hover p-6 relative group">
      {tool.featured && !isEditing && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-accent/15 text-accent border-accent/30 text-xs gap-1">
            <Star size={10} fill="currentColor" /> Featured
          </Badge>
        </div>
      )}
      {isEditing && (
        <button
          onClick={onToggleFeatured}
          className={`absolute top-4 right-4 p-1.5 rounded-md border transition-colors ${
            tool.featured ? "border-accent/50 text-accent bg-accent/10" : "border-border/50 text-muted-foreground"
          }`}
        >
          <Star size={14} fill={tool.featured ? "currentColor" : "none"} />
        </button>
      )}

      {/* Screenshot placeholder */}
      <div className="h-32 rounded-lg bg-muted/30 border border-border/20 mb-5 flex items-center justify-center overflow-hidden group-hover:border-primary/20 transition-colors">
        <span className="text-xs text-muted-foreground/40 font-mono">screenshot</span>
      </div>

      <EditableField
        value={tool.name}
        onChange={(v) => onChange("name", v)}
        isEditing={isEditing}
        placeholder="Tool name"
        renderView={(v) => <h3 className="text-lg font-semibold text-foreground mb-2">{v}</h3>}
      />

      <EditableField
        value={tool.description}
        onChange={(v) => onChange("description", v)}
        isEditing={isEditing}
        multiline={isEditing}
        placeholder="Description"
        renderView={(v) => <p className="text-sm text-muted-foreground leading-relaxed mb-4">{v}</p>}
      />

      {isEditing ? (
        <div className="space-y-2">
          <EditableField
            value={tool.tags.join(", ")}
            onChange={(v) => onChange("tags", v)}
            isEditing
            placeholder="Tags (comma-separated)"
          />
          <EditableField value={tool.link} onChange={(v) => onChange("link", v)} isEditing placeholder="Live link URL" />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tool.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-[10px] border-border/40 text-muted-foreground/80 bg-muted/20">
                {tag}
              </Badge>
            ))}
          </div>
          {tool.link && tool.link !== "#" && (
            <Button asChild variant="outline" size="sm" className="border-border/40 hover:border-primary/30 hover:bg-primary/5 gap-2 text-xs w-full">
              <a href={tool.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={12} /> View Live
              </a>
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default ToolCard;
