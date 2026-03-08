import { Search, BarChart3, Wrench, FileText } from "lucide-react";
import EditableField from "./EditableField";
import ScrollReveal from "./ScrollReveal";

const defaultSteps = [
  { icon: "search", title: "Discover", description: "Identify emerging protocols, trends, and opportunities across the Web3 landscape through on-chain signals and community intelligence." },
  { icon: "analyze", title: "Analyze", description: "Deep dive into smart contracts, tokenomics, governance structures, and team credibility using custom-built analytical frameworks." },
  { icon: "build", title: "Build", description: "Create tools and dashboards that automate research workflows and surface actionable insights from raw on-chain data." },
  { icon: "document", title: "Document", description: "Publish transparent, peer-reviewable research that helps the community make informed decisions." },
];

const iconMap: Record<string, React.ReactNode> = {
  search: <Search size={24} />,
  analyze: <BarChart3 size={24} />,
  build: <Wrench size={24} />,
  document: <FileText size={24} />,
};

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  steps: ProcessStep[];
  isEditing: boolean;
  onUpdate: (index: number, field: string, value: string) => void;
}

const ProcessSection = ({ steps, isEditing, onUpdate }: ProcessSectionProps) => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-mono uppercase tracking-widest mb-3">How I Work</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">My Research Process</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="glass-card-hover p-7 relative group">
                <div className="text-6xl font-bold font-mono text-border/60 absolute top-4 right-5 group-hover:text-primary/10 transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                  {iconMap[step.icon] || <Search size={24} />}
                </div>
                {isEditing ? (
                  <>
                    <EditableField value={step.title} onChange={(v) => onUpdate(i, "title", v)} isEditing placeholder="Step title" />
                    <div className="mt-2">
                      <EditableField value={step.description} onChange={(v) => onUpdate(i, "description", v)} isEditing multiline placeholder="Description" />
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

ProcessSection.defaultSteps = defaultSteps;
export default ProcessSection;
