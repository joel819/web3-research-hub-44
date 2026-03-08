import { ExternalLink } from "lucide-react";
import EditableField from "./EditableField";

interface Tool {
  name: string;
  description: string;
  link: string;
}

interface ToolCardProps {
  tool: Tool;
  onChange: (field: keyof Tool, value: string) => void;
  isEditing: boolean;
}

const ToolCard = ({ tool, onChange, isEditing }: ToolCardProps) => {
  return (
    <div className="glass-card glow-border p-6 group hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <EditableField
          value={tool.name}
          onChange={(v) => onChange("name", v)}
          isEditing={isEditing}
          placeholder="Tool name"
          renderView={(v) => <h3 className="text-lg font-semibold text-foreground">{v}</h3>}
        />
        {!isEditing && tool.link && (
          <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <ExternalLink size={16} />
          </a>
        )}
      </div>
      <EditableField
        value={tool.description}
        onChange={(v) => onChange("description", v)}
        isEditing={isEditing}
        placeholder="Short description"
        renderView={(v) => <p className="text-sm text-muted-foreground leading-relaxed">{v}</p>}
      />
      {isEditing && (
        <div className="mt-3">
          <EditableField value={tool.link} onChange={(v) => onChange("link", v)} isEditing={isEditing} placeholder="https://..." />
        </div>
      )}
    </div>
  );
};

export default ToolCard;
