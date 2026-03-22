import { Briefcase, Wrench, Users, Handshake, BookOpen } from "lucide-react";
import EditableField from "./EditableField";
import ScrollReveal from "./ScrollReveal";

interface CollabCard {
  icon: string;
  title: string;
  description: string;
}

const defaultCollabs: CollabCard[] = [
  { icon: "freelance", title: "DePIN Ecosystem Research", description: "Deep-dive analysis and scoring of DePIN projects on 6G readiness, network economics, and real-world deployment potential." },
  { icon: "tools", title: "Web3 Tool Building", description: "Custom dashboards, automation bots, and analytics tools for Web3 teams and protocols." },
  { icon: "protocol", title: "Protocol Research Collaborations", description: "Long-term research partnerships with emerging protocols seeking transparent, third-party analysis and reports." },
  { icon: "content", title: "Freelance Automation Projects", description: "Building automation workflows, scrapers, and alert systems for individuals and businesses." },
  { icon: "grant", title: "Grant Funded Research", description: "Open to funded research projects exploring DePIN infrastructure, 6G network readiness, and Web3 ecosystem analysis." },
];

const iconMap: Record<string, React.ReactNode> = {
  freelance: <Briefcase size={22} />,
  tools: <Wrench size={22} />,
  content: <Users size={22} />,
  protocol: <Handshake size={22} />,
  grant: <BookOpen size={22} />,
};

interface OpenToSectionProps {
  collabs: CollabCard[];
  isEditing: boolean;
  onUpdate: (index: number, field: string, value: string) => void;
}

const OpenToSection = ({ collabs, isEditing, onUpdate }: OpenToSectionProps) => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-accent font-mono uppercase tracking-widest mb-3">Opportunities</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Open To</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {collabs.map((collab, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="glass-card-hover p-7 flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  {iconMap[collab.icon] || <Briefcase size={22} />}
                </div>
                <div>
                  {isEditing ? (
                    <>
                      <EditableField value={collab.title} onChange={(v) => onUpdate(i, "title", v)} isEditing placeholder="Title" />
                      <div className="mt-2">
                        <EditableField value={collab.description} onChange={(v) => onUpdate(i, "description", v)} isEditing multiline placeholder="Description" />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-foreground font-semibold mb-2">{collab.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{collab.description}</p>
                    </>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

OpenToSection.defaultCollabs = defaultCollabs;
export default OpenToSection;
