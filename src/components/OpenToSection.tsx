import { Briefcase, Wrench, Users, Handshake } from "lucide-react";
import EditableField from "./EditableField";
import ScrollReveal from "./ScrollReveal";

interface CollabCard {
  icon: string;
  title: string;
  description: string;
}

const defaultCollabs: CollabCard[] = [
  { icon: "freelance", title: "Freelance Research", description: "Deep-dive analysis and due diligence on protocols, tokens, and DeFi strategies for your fund or DAO." },
  { icon: "tools", title: "Tool Building", description: "Custom dashboards, analytics tools, and automation scripts tailored to your on-chain research needs." },
  { icon: "content", title: "Content Collab", description: "Co-authored research reports, podcast appearances, and educational content for Web3 audiences." },
  { icon: "protocol", title: "Protocol Partnerships", description: "Long-term research partnerships with emerging protocols seeking transparent, third-party analysis." },
];

const iconMap: Record<string, React.ReactNode> = {
  freelance: <Briefcase size={22} />,
  tools: <Wrench size={22} />,
  content: <Users size={22} />,
  protocol: <Handshake size={22} />,
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
