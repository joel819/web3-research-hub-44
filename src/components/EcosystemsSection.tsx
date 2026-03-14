import ScrollReveal from "./ScrollReveal";

interface Ecosystem {
  name: string;
  color: string;
}

const defaultEcosystems: Ecosystem[] = [
  { name: "Ethereum", color: "hsl(225, 50%, 60%)" },
  { name: "Solana", color: "hsl(275, 70%, 60%)" },
  { name: "Base", color: "hsl(220, 80%, 55%)" },
  { name: "Arbitrum", color: "hsl(210, 80%, 55%)" },
  { name: "Sui", color: "hsl(200, 85%, 55%)" },
  { name: "Helium", color: "hsl(160, 70%, 50%)" },
  { name: "IoTeX", color: "hsl(175, 75%, 45%)" },
  { name: "Render Network", color: "hsl(30, 80%, 55%)" },
];

interface EcosystemsSectionProps {
  ecosystems: Ecosystem[];
}

const EcosystemsSection = ({ ecosystems }: EcosystemsSectionProps) => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-mono uppercase tracking-widest mb-3">Coverage</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Ecosystems I Research</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {ecosystems.map((eco, i) => (
              <div
                key={i}
                className="glass-card px-6 py-3 flex items-center gap-3 hover:border-primary/20 transition-all duration-300 group cursor-default"
              >
                <div
                  className="w-3 h-3 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: eco.color }}
                />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {eco.name}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

EcosystemsSection.defaultEcosystems = defaultEcosystems;
export default EcosystemsSection;
