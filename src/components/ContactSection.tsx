import { Linkedin, Mail } from "lucide-react";
import { XIcon } from "@/components/XIcon";
import { Button } from "@/components/ui/button";
import EditableField from "./EditableField";
import ScrollReveal from "./ScrollReveal";
import NewsletterForm from "./NewsletterForm";

interface ContactSectionProps {
  contactText: string;
  contactEmail: string;
  contactTwitter: string;
  contactLinkedin: string;
  isEditing: boolean;
  onUpdate: (field: string, value: string) => void;
}

const ContactSection = ({ contactText, contactEmail, contactTwitter, contactLinkedin, isEditing, onUpdate }: ContactSectionProps) => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-mono uppercase tracking-widest mb-3">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6">Let's Build Together</h2>
            <EditableField
              value={contactText}
              onChange={(v) => onUpdate("contactText", v)}
              isEditing={isEditing}
              multiline={isEditing}
              placeholder="Your contact message"
              renderView={(v) => <p className="text-lg text-muted-foreground leading-relaxed">{v}</p>}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-lg mx-auto">
              <EditableField value={contactTwitter} onChange={(v) => onUpdate("contactTwitter", v)} isEditing placeholder="Twitter DM URL" />
              <EditableField value={contactLinkedin} onChange={(v) => onUpdate("contactLinkedin", v)} isEditing placeholder="LinkedIn URL" />
              <EditableField value={contactEmail} onChange={(v) => onUpdate("contactEmail", v)} isEditing placeholder="Email" />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {contactTwitter && (
                <Button asChild variant="outline" className="border-border/50 hover:border-primary/40 hover:bg-primary/5 gap-2 px-6 py-5">
                  <a href={contactTwitter} target="_blank" rel="noopener noreferrer"><XIcon size={18} /> DM on X</a>
                </Button>
              )}
              {contactLinkedin && (
                <Button asChild variant="outline" className="border-border/50 hover:border-blue-500/40 hover:bg-blue-500/5 gap-2 px-6 py-5">
                  <a href={contactLinkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn</a>
                </Button>
              )}
              {contactEmail && (
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold gap-2 px-6 py-5">
                  <a href={`mailto:${contactEmail}`}><Mail size={18} /> Email Me</a>
                </Button>
              )}
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
