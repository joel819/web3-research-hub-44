import { useState, useMemo } from "react";
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
  const [isEditing] = useState(false);
  const { data, setData } = usePortfolio();
  const [researchFilter, setResearchFilter] = useState<FilterType>("all");

  const u = (field: string, value: string) => {
    if (field === "roles") {
      setData((d: any) => ({ ...d, roles: value.split(",").map((s) => s.trim()).filter(Boolean) }));
    } else {
      setData((d: any) => ({ ...d, [field]: value }));
    }
  };

  const updateStat = (i: number, v: string) => {
    setData((d: any) => {
      const stats = [...d.stats];
      stats[i] = { ...stats[i], value: v };
      return { ...d, stats };
    });
  };

  const updateProcess = (i: number, field: string, v: string) => {
    setData((d: any) => {
      const steps = [...d.processSteps];
      steps[i] = { ...steps[i], [field]: v };
      return { ...d, processSteps: steps };
    });
  };

  // Tool handlers
  const updateTool = (i: number, field: string, v: string) => {
    setData((d: any) => {
      const tools = [...d.tools];
      if (field === "tags") {
        tools[i] = { ...tools[i], tags: v.split(",").map((s) => s.trim()).filter(Boolean) };
      } else {
        tools[i] = { ...tools[i], [field]: v };
      }
      return { ...d, tools };
    });
  };

  const toggleFeatured = (i: number) => {
    setData((d: any) => {
      const tools = [...d.tools];
      tools[i] = { ...tools[i], featured: !tools[i].featured };
      return { ...d, tools };
    });
  };

  const addToolScreenshot = (toolIdx: number, dataUrl: string) => {
    setData((d: any) => {
      const tools = [...d.tools];
      tools[toolIdx] = { ...tools[toolIdx], screenshots: [...tools[toolIdx].screenshots, dataUrl] };
      return { ...d, tools };
    });
  };

  const removeToolScreenshot = (toolIdx: number, imgIdx: number) => {
    setData((d: any) => {
      const tools = [...d.tools];
      tools[toolIdx] = { ...tools[toolIdx], screenshots: tools[toolIdx].screenshots.filter((_: string, j: number) => j !== imgIdx) };
      return { ...d, tools };
    });
  };

  const addTool = () => setData((d: any) => ({
    ...d, tools: [...d.tools, { id: `tool-${Date.now()}`, name: "New Tool", description: "Description", longDescription: "", tags: ["Tag"], link: "#", featured: false, screenshots: [] }]
  }));
  const removeTool = (i: number) => setData((d: any) => ({
    ...d, tools: d.tools.filter((_: unknown, idx: number) => idx !== i)
  }));

  // Research handlers
  const updateResearch = (i: number, field: string, v: string) => {
    setData((d: any) => {
      const research = [...d.research];
      research[i] = { ...research[i], [field]: v };
      return { ...d, research };
    });
  };

  const updateResearchLink = (researchIdx: number, linkIdx: number, field: string, v: string) => {
    setData((d: any) => {
      const research = [...d.research];
      const links = [...research[researchIdx].links];
      links[linkIdx] = { ...links[linkIdx], [field]: v };
      research[researchIdx] = { ...research[researchIdx], links };
      return { ...d, research };
    });
  };

  const addResearchLink = (researchIdx: number) => {
    setData((d: any) => {
      const research = [...d.research];
      research[researchIdx] = {
        ...research[researchIdx],
        links: [...research[researchIdx].links, { platform: "Blog", url: "#" }],
      };
      return { ...d, research };
    });
  };

  const removeResearchLink = (researchIdx: number, linkIdx: number) => {
    setData((d: any) => {
      const research = [...d.research];
      research[researchIdx] = {
        ...research[researchIdx],
        links: research[researchIdx].links.filter((_: unknown, j: number) => j !== linkIdx),
      };
      return { ...d, research };
    });
  };

  const addResearch = () => setData((d: any) => ({
    ...d, research: [...d.research, { title: "New Post", date: "2026-01-01", excerpt: "Short excerpt", links: [{ platform: "Blog", url: "#" }], type: "article" as ResearchType, readTime: "5 min read" }]
  }));
  const removeResearch = (i: number) => setData((d: any) => ({
    ...d, research: d.research.filter((_: unknown, idx: number) => idx !== i)
  }));

  const updateCollab = (i: number, field: string, v: string) => {
    setData((d: any) => {
      const collabs = [...d.collabs];
      collabs[i] = { ...collabs[i], [field]: v };
      return { ...d, collabs };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />


      {/* Hero */}
      <HeroSection
        data={{
          name: data.name, bio: data.bio, roles: data.roles,
          twitter: data.twitter, linkedin: data.linkedin, reddit: data.reddit, github: data.github,
        }}
        isEditing={isEditing}
        onUpdate={u}
      />

      <StatsBar stats={data.stats} onStatChange={updateStat} isEditing={isEditing} />
      <ProcessSection steps={data.processSteps} isEditing={isEditing} onUpdate={updateProcess} />

      {/* Tools */}
      <section id="tools" className="section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm text-primary font-mono uppercase tracking-widest mb-3">Portfolio</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Tools I Built</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {data.tools.slice(0, 4).map((tool, i) => (
              <ScrollReveal key={tool.id || i} delay={i * 100}>
                <div className="relative">
                  <ToolCard
                    tool={tool}
                    index={i}
                    onChange={(f, v) => updateTool(i, f, v)}
                    onToggleFeatured={() => toggleFeatured(i)}
                    onAddScreenshot={(url) => addToolScreenshot(i, url)}
                    onRemoveScreenshot={(imgIdx) => removeToolScreenshot(i, imgIdx)}
                    isEditing={isEditing}
                  />
                  {isEditing && (
                    <button onClick={() => removeTool(i)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:scale-110 transition-transform shadow-lg z-10">
                      <Trash2 size={12} />
                    </button>
                  )}
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
          {isEditing && (
            <div className="text-center mt-6">
              <Button onClick={addTool} variant="outline" className="border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 gap-2">
                <Plus size={14} /> Add Tool
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Research / Writing */}
      <section id="research" className="section-padding bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-sm text-primary font-mono uppercase tracking-widest mb-3">Publications</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Research & Writing</h2>
              <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">Long-form articles, research reports, and curated threads.</p>
            </div>
          </ScrollReveal>

          {/* Filter tabs */}
          {!isEditing && (
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
          )}

          <div className="space-y-4">
            {data.research
              .map((r: any, i: number) => ({ r, i }))
              .filter(({ r }: { r: any }) => isEditing || researchFilter === "all" || (r.type ?? "article") === researchFilter)
              .map(({ r, i }: { r: any; i: number }) => (
                <ScrollReveal key={i} delay={(i % 5) * 80}>
                  <div className="relative">
                    <ResearchCard
                      research={r}
                      index={i}
                      onChange={(f, v) => updateResearch(i, f, v)}
                      onUpdateLink={(linkIdx, field, v) => updateResearchLink(i, linkIdx, field, v)}
                      onAddLink={() => addResearchLink(i)}
                      onRemoveLink={(linkIdx) => removeResearchLink(i, linkIdx)}
                      isEditing={isEditing}
                    />
                    {isEditing && (
                      <button onClick={() => removeResearch(i)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:scale-110 transition-transform shadow-lg z-10">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </ScrollReveal>
              ))}
          </div>
          {isEditing && (
            <div className="text-center mt-6">
              <Button onClick={addResearch} variant="outline" className="border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 gap-2">
                <Plus size={14} /> Add Entry
              </Button>
            </div>
          )}
        </div>
      </section>

      <EcosystemsSection ecosystems={data.ecosystems} />
      <OpenToSection collabs={data.collabs} isEditing={isEditing} onUpdate={updateCollab} />
      <ContactSection
        contactText={data.contactText} contactEmail={data.contactEmail}
        contactTwitter={data.contactTwitter} contactLinkedin={data.contactLinkedin}
        isEditing={isEditing} onUpdate={u}
      />
      <Footer name={data.name} since={data.since} twitter={data.twitter} linkedin={data.linkedin} github={data.github} />
    </div>
  );
};

export default Index;
