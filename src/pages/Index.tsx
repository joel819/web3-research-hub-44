import { useState, useEffect } from "react";
import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
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
import SectionHeader from "@/components/SectionHeader";

const STORAGE_KEY = "web3-portfolio-v2";

const defaultData = {
  name: "0xResearcher",
  bio: "I help teams, DAOs, and funds navigate Web3 complexity. My work combines deep smart contract analysis with on-chain data forensics to surface real insights — not narratives. Everything I publish is transparent, verifiable, and built to help you make better decisions.",
  roles: ["Web3 Researcher", "Tool Builder", "Automation Engineer"],
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  reddit: "https://reddit.com",
  github: "https://github.com",
  stats: [
    { label: "Projects Researched", value: "47" },
    { label: "Tools Built", value: "12" },
    { label: "Weeks Building", value: "86" },
    { label: "Posts Published", value: "31" },
  ],
  processSteps: ProcessSection.defaultSteps,
  tools: [
    { name: "TokenScope", description: "Real-time token contract analyzer that flags common rug-pull patterns, suspicious permissions, and honeypot indicators.", tags: ["Solidity", "React", "Ethers.js"], link: "#", featured: true },
    { name: "ChainMap", description: "Visual mapping tool for tracing fund flows across multiple EVM-compatible chains with interactive graph visualization.", tags: ["D3.js", "Node.js", "GraphQL"], link: "#", featured: false },
    { name: "GovWatch", description: "Dashboard tracking governance proposals across major DAOs with voting trend analysis and whale alert notifications.", tags: ["Python", "Next.js", "PostgreSQL"], link: "#", featured: true },
    { name: "MEV Scanner", description: "Automated scanner that detects and categorizes MEV extraction patterns across Ethereum and L2 networks.", tags: ["Rust", "WebSocket", "Redis"], link: "#", featured: false },
  ],
  research: [
    { title: "Deep Dive: Restaking Protocol Risk Analysis", date: "2026-03-01", platform: "Blog", excerpt: "A comprehensive risk framework for evaluating restaking protocols, examining slashing conditions, operator incentives, and systemic risk vectors.", link: "#" },
    { title: "The State of L2 Sequencer Decentralization", date: "2026-02-18", platform: "Reddit", excerpt: "Analysis of sequencer architectures across major L2s — how close are we to credible decentralization?", link: "#" },
    { title: "MEV on Solana: A Comparative Study", date: "2026-02-05", platform: "Twitter", excerpt: "How MEV extraction on Solana differs from Ethereum, and what it means for the average user.", link: "#" },
    { title: "Analyzing Bridge Security Post-2025 Exploits", date: "2026-01-22", platform: "LinkedIn", excerpt: "Lessons learned from the latest bridge exploits and the evolution of cross-chain security models.", link: "#" },
    { title: "DePIN Tokenomics: What Actually Works", date: "2026-01-10", platform: "Blog", excerpt: "Separating signal from noise in DePIN token design — which incentive models are sustainable?", link: "#" },
  ],
  ecosystems: EcosystemsSection.defaultEcosystems,
  collabs: OpenToSection.defaultCollabs,
  contactText: "I'm always interested in connecting with teams building meaningful infrastructure in Web3. Whether you need independent research, custom tooling, or a strategic analysis partner — let's talk.",
  contactEmail: "researcher@example.com",
  contactTwitter: "https://twitter.com/messages",
  contactLinkedin: "https://linkedin.com",
  since: "2024",
};

const loadData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
  } catch {
    return defaultData;
  }
};

const Index = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const u = (field: string, value: string) => {
    if (field === "roles") {
      setData((d: typeof defaultData) => ({ ...d, roles: value.split(",").map((s) => s.trim()).filter(Boolean) }));
    } else {
      setData((d: typeof defaultData) => ({ ...d, [field]: value }));
    }
  };

  const updateStat = (i: number, v: string) => {
    setData((d: typeof defaultData) => {
      const stats = [...d.stats];
      stats[i] = { ...stats[i], value: v };
      return { ...d, stats };
    });
  };

  const updateProcess = (i: number, field: string, v: string) => {
    setData((d: typeof defaultData) => {
      const steps = [...d.processSteps];
      steps[i] = { ...steps[i], [field]: v };
      return { ...d, processSteps: steps };
    });
  };

  const updateTool = (i: number, field: string, v: string) => {
    setData((d: typeof defaultData) => {
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
    setData((d: typeof defaultData) => {
      const tools = [...d.tools];
      tools[i] = { ...tools[i], featured: !tools[i].featured };
      return { ...d, tools };
    });
  };

  const addTool = () => setData((d: typeof defaultData) => ({
    ...d, tools: [...d.tools, { name: "New Tool", description: "Description", tags: ["Tag"], link: "#", featured: false }]
  }));
  const removeTool = (i: number) => setData((d: typeof defaultData) => ({
    ...d, tools: d.tools.filter((_: unknown, idx: number) => idx !== i)
  }));

  const updateResearch = (i: number, field: string, v: string) => {
    setData((d: typeof defaultData) => {
      const research = [...d.research];
      research[i] = { ...research[i], [field]: v };
      return { ...d, research };
    });
  };

  const addResearch = () => setData((d: typeof defaultData) => ({
    ...d, research: [...d.research, { title: "New Post", date: "2026-01-01", platform: "Blog", excerpt: "Short excerpt", link: "#" }]
  }));
  const removeResearch = (i: number) => setData((d: typeof defaultData) => ({
    ...d, research: d.research.filter((_: unknown, idx: number) => idx !== i)
  }));

  const updateCollab = (i: number, field: string, v: string) => {
    setData((d: typeof defaultData) => {
      const collabs = [...d.collabs];
      collabs[i] = { ...collabs[i], [field]: v };
      return { ...d, collabs };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />

      {/* Edit Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          size="lg"
          className={isEditing
            ? "bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-lg shadow-primary/20"
            : "bg-card/90 backdrop-blur-sm border border-border/50 hover:bg-card text-foreground gap-2 shadow-lg"
          }
        >
          {isEditing ? <Eye size={18} /> : <Edit3 size={18} />}
          {isEditing ? "Preview" : "Edit"}
        </Button>
      </div>

      {/* Hero */}
      <HeroSection
        data={{
          name: data.name,
          bio: data.bio,
          roles: data.roles,
          twitter: data.twitter,
          linkedin: data.linkedin,
          reddit: data.reddit,
          github: data.github,
        }}
        isEditing={isEditing}
        onUpdate={u}
      />

      {/* Stats */}
      <StatsBar stats={data.stats} onStatChange={updateStat} isEditing={isEditing} />

      {/* Process */}
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
            {data.tools.map((tool, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative">
                  <ToolCard
                    tool={tool}
                    onChange={(f, v) => updateTool(i, f, v)}
                    onToggleFeatured={() => toggleFeatured(i)}
                    isEditing={isEditing}
                  />
                  {isEditing && (
                    <button
                      onClick={() => removeTool(i)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:scale-110 transition-transform shadow-lg"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </ScrollReveal>
            ))}
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

      {/* Research */}
      <section id="research" className="section-padding bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm text-primary font-mono uppercase tracking-widest mb-3">Publications</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Recent Research</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {data.research.map((r, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="relative">
                  <ResearchCard research={r} onChange={(f, v) => updateResearch(i, f, v)} isEditing={isEditing} />
                  {isEditing && (
                    <button
                      onClick={() => removeResearch(i)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:scale-110 transition-transform shadow-lg"
                    >
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
                <Plus size={14} /> Add Research
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Ecosystems */}
      <EcosystemsSection ecosystems={data.ecosystems} />

      {/* Open To */}
      <OpenToSection collabs={data.collabs} isEditing={isEditing} onUpdate={updateCollab} />

      {/* Contact */}
      <ContactSection
        contactText={data.contactText}
        contactEmail={data.contactEmail}
        contactTwitter={data.contactTwitter}
        contactLinkedin={data.contactLinkedin}
        isEditing={isEditing}
        onUpdate={u}
      />

      {/* Footer */}
      <Footer
        name={data.name}
        since={data.since}
        twitter={data.twitter}
        linkedin={data.linkedin}
        github={data.github}
      />
    </div>
  );
};

export default Index;
