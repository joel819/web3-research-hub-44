import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  renderView?: (value: string) => React.ReactNode;
}

const EditableField = ({ value, onChange, isEditing, multiline, className, placeholder, renderView }: EditableFieldProps) => {
  if (!isEditing) {
    return renderView ? <>{renderView(value)}</> : <span className={className}>{value}</span>;
  }

  if (multiline) {
    return (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-muted border-border/50 text-foreground resize-none"
        placeholder={placeholder}
        rows={4}
      />
    );
  }

  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-muted border-border/50 text-foreground"
      placeholder={placeholder}
    />
  );
};

export default EditableField;
