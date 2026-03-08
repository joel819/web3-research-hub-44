import { useRef } from "react";
import { Star, Upload, X, Plus, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EditableField from "./EditableField";

export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link: string;
  featured: boolean;
  screenshots: string[];
}

interface ToolCardProps {
  tool: Tool;
  index: number;
  onChange: (field: string, value: string) => void;
  onToggleFeatured: () => void;
  onAddScreenshot: (dataUrl: string) => void;
  onRemoveScreenshot: (imgIndex: number) => void;
  isEditing: boolean;
}

const ToolCard = ({ tool, index, onChange, onToggleFeatured, onAddScreenshot, onRemoveScreenshot, isEditing }: ToolCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB for localStorage storage");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onAddScreenshot(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const primaryScreenshot = tool.screenshots?.[0];

  return (
    <div className="glass-card-hover p-6 relative group">
      {tool.featured && !isEditing && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-accent/15 text-accent border-accent/30 text-xs gap-1">
            <Star size={10} fill="currentColor" /> Featured
          </Badge>
        </div>
      )}
      {isEditing && (
        <button
          onClick={onToggleFeatured}
          className={`absolute top-4 right-4 z-10 p-1.5 rounded-md border transition-colors ${
            tool.featured ? "border-accent/50 text-accent bg-accent/10" : "border-border/50 text-muted-foreground"
          }`}
        >
          <Star size={14} fill={tool.featured ? "currentColor" : "none"} />
        </button>
      )}

      {/* Screenshot area */}
      <div className="h-36 rounded-lg bg-muted/30 border border-border/20 mb-5 flex items-center justify-center overflow-hidden group-hover:border-primary/20 transition-colors relative">
        {primaryScreenshot ? (
          <>
            <img src={primaryScreenshot} alt={tool.name} className="w-full h-full object-cover" />
            {tool.screenshots.length > 1 && !isEditing && (
              <div className="absolute bottom-2 right-2">
                <Badge className="bg-background/80 backdrop-blur-sm text-foreground text-[10px] border-border/40">
                  +{tool.screenshots.length - 1} more
                </Badge>
              </div>
            )}
          </>
        ) : isEditing ? (
          <>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-primary/60 transition-colors cursor-pointer"
            >
              <Upload size={20} />
              <span className="text-xs font-mono">Upload screenshot</span>
            </button>
          </>
        ) : (
          <span className="text-xs text-muted-foreground/30 font-mono">screenshot</span>
        )}
      </div>

      {/* Image thumbnails in edit mode */}
      {isEditing && tool.screenshots.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {tool.screenshots.map((img, imgIdx) => (
            <div key={imgIdx} className="relative w-16 h-12 rounded-md overflow-hidden border border-border/30">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => onRemoveScreenshot(imgIdx)}
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 hover:scale-110 transition-transform"
              >
                <X size={8} />
              </button>
            </div>
          ))}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-16 h-12 rounded-md border border-dashed border-border/40 flex items-center justify-center text-muted-foreground/40 hover:text-primary/60 hover:border-primary/30 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      )}

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
        placeholder="Short description"
        renderView={(v) => <p className="text-sm text-muted-foreground leading-relaxed mb-4">{v}</p>}
      />

      {isEditing && (
        <div className="space-y-2 mb-3">
          <EditableField
            value={tool.longDescription || ""}
            onChange={(v) => onChange("longDescription", v)}
            isEditing
            multiline
            placeholder="Detailed description (shown on tool page)"
          />
          <EditableField
            value={tool.tags.join(", ")}
            onChange={(v) => onChange("tags", v)}
            isEditing
            placeholder="Tags (comma-separated)"
          />
          <EditableField value={tool.link} onChange={(v) => onChange("link", v)} isEditing placeholder="Live link URL" />
        </div>
      )}

      {!isEditing && (
        <>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tool.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-[10px] border-border/40 text-muted-foreground/80 bg-muted/20">
                {tag}
              </Badge>
            ))}
          </div>
          <Link
            to={`/tool/${index}`}
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors group/link"
          >
            View Details <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </>
      )}
    </div>
  );
};

export default ToolCard;
