import { Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditableField from "./EditableField";

interface ContactSectionProps {
  contactText: string;
  contactEmail: string;
  contactTwitter: string;
  isEditing: boolean;
  onUpdate: (field: string, value: string) => void;
}

const ContactSection = ({ contactText, contactEmail, contactTwitter, isEditing, onUpdate }: ContactSectionProps) => {
  return (
    <div className="glass-card p-8 text-center">
      <EditableField
        value={contactText}
        onChange={(v) => onUpdate("contactText", v)}
        isEditing={isEditing}
        multiline
        placeholder="Describe what collabs you're open to..."
        renderView={(v) => <p className="text-muted-foreground leading-relaxed text-lg mb-6">{v}</p>}
      />
      {isEditing ? (
        <div className="flex gap-3 max-w-md mx-auto">
          <EditableField value={contactEmail} onChange={(v) => onUpdate("contactEmail", v)} isEditing placeholder="Email address" />
          <EditableField value={contactTwitter} onChange={(v) => onUpdate("contactTwitter", v)} isEditing placeholder="Twitter DM link" />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4">
          {contactEmail && (
            <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 gap-2">
              <a href={`mailto:${contactEmail}`}><Mail size={16} /> Email Me</a>
            </Button>
          )}
          {contactTwitter && (
            <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 gap-2">
              <a href={contactTwitter} target="_blank" rel="noopener noreferrer"><Twitter size={16} /> DM on X</a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactSection;
