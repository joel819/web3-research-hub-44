import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import type { ResearchType } from "@/components/ResearchCard";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ProcessSection from "@/components/ProcessSection";
import ToolCard from "@/components/ToolCard";
import ResearchCard from "@/components/ResearchCard";
import EcosystemsSection from "@/components/EcosystemsSection";
import OpenToSection from "@/components/OpenToSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

type FilterType = "all" | ResearchType;

const Index = () => {
  const { data } = usePortfolio();
  const [researchFilter, setResearchFilter] = useState<FilterType>("all");

  useEffect(() => {
    document.title = "Web3 Research Hub";
  }, []);

  const noop = () => {};

  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />




      {/* Tools */}
      <section id="tools" className="section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm text-primary font-mono uppercase tracking-widest mb-3">DePIN Hub</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Research Tools</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {data.tools.slice(0, 8).map((tool, i) => (
              <ScrollReveal key={tool.id || i} delay={i * 100}>
                <div className="relative">
                  <ToolCard
                    tool={tool}
                    index={i}
                    onChange={noop}
                    onToggleFeatured={noop}
                    onAddScreenshot={noop}
                    onRemoveScreenshot={noop}
                    isEditing={false}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="gap-2 group">
              <Link to="/tools">
                See More Tools <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Research / Writing */}
      <section id="research" className="section-padding bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-sm text-primary font-mono uppercase tracking-widest mb-3">DePIN Agent</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Research Reports</h2>
              <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">Automated 6G and DePIN infrastructure reports.</p>
            </div>
          </ScrollReveal>

          {/* Filter tabs */}
          <ScrollReveal>
            <div className="flex justify-center gap-2 mb-10">
              {(["all", "article", "thread", "report"] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setResearchFilter(f)}
                  className={`text-xs font-mono px-4 py-1.5 rounded-full border transition-all ${
                    researchFilter === f
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                  }`}
                >
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {data.research
              .map((r: any, i: number) => ({ r, i }))
              .filter(({ r }: { r: any }) => researchFilter === "all" || (r.type ?? "article") === researchFilter)
              .map(({ r, i }: { r: any; i: number }) => (
                <ScrollReveal key={i} delay={(i % 5) * 80}>
                  <div className="relative">
                    <ResearchCard
                      research={r}
                      index={i}
                      onChange={noop}
                      onUpdateLink={noop}
                      onAddLink={noop}
                      onRemoveLink={noop}
                      isEditing={false}
                    />
                  </div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </section>


      <Footer name={data.name} since={data.since} twitter={data.twitter} linkedin={data.linkedin} github={data.github} />
    </div>
  );
};

export default Index;
