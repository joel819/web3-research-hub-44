import { useState, useEffect, useMemo } from "react";

import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
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

const STORAGE_KEY = "web3-portfolio-v2";

const defaultData = {
  name: "0xResearcher",
  bio: "Web3 researcher and tool builder documenting the future of decentralized infrastructure. Building at the intersection of Web3 and 6G as an NVIDIA 6G Developer Program member.",
  roles: ["Web3 Researcher", "Tool Builder", "Automation Engineer"],
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  reddit: "https://reddit.com",
  github: "https://github.com",
  stats: [
    { label: "Projects Researched", value: "8" },
    { label: "Tools Built", value: "8" },
    { label: "Weeks Building in Public", value: "1" },
    { label: "Posts Published", value: "6" },
  ],
  processSteps: ProcessSection.defaultSteps,
  tools: [
    {
      id: "whitepaper-summarizer",
      name: "Whitepaper Summarizer",
      description: "Analyzes any Web3 whitepaper or project page and returns a structured research summary with a substance score, red flags, and verdict.",
      longDescription: "A deep analysis tool for Web3 protocol documentation. It uses advanced NLP to extract key information, identify architectural risks, and provide a clear investment/security verdict based on substance rather than marketing narratives.",
      tags: ["React", "FastAPI", "Claude AI"],
      link: "https://lovable.dev/projects/whitepaper-summarizer",
      featured: false,
      screenshots: []
    },
    {
      id: "web3-content-generator",
      name: "Web3 Content Generator",
      description: "Takes raw research notes and generates ready to post content for LinkedIn, Twitter/X, and Reddit in seconds.",
      longDescription: "An automation tool for Web3 researchers and content creators. It streamlines the publishing process by translating technical findings into engaging threads and posts for major social platforms with appropriate tone and formatting.",
      tags: ["React", "FastAPI", "Claude AI"],
      link: "https://lovable.dev/projects/content-gen",
      featured: false,
      screenshots: []
    },
    {
      id: "project-tracker-dashboard",
      name: "Project Tracker Dashboard",
      description: "A research database to log, score, and track new Web3 projects as I discover them.",
      longDescription: "A centralized command center for monitoring the Web3 ecosystem. It allows for custom scoring weights, performance tracking, and comparative analysis of different project sectors.",
      tags: ["React"],
      link: "https://lovable.dev/projects/project-tracker",
      featured: false,
      screenshots: []
    },
    {
      id: "research-report-builder",
      name: "Research Report Builder",
      description: "Turns weekly research findings into a polished newsletter style report ready to publish.",
      longDescription: "This tool automates the compilation of disparate research findings into a professional, cohesive weekly report. Designed for DAO contributors and independent researchers who want to provide consistent value to their audience.",
      tags: ["React", "FastAPI", "Claude AI"],
      link: "https://lovable.dev/projects/report-builder",
      featured: false,
      screenshots: []
    },
    {
      id: "grant-tracker",
      name: "Grant Tracker",
      description: "Tracks Web3 ecosystem grant opportunities with deadlines, amounts, and application status.",
      longDescription: "A productivity tool focused on the decentralized funding landscape. It monitors active grants across protocols (Ethereum, Solana, Optimism, etc.), sends deadline alerts, and tracks the lifecycle of grant applications.",
      tags: ["React"],
      link: "https://lovable.dev/projects/grant-tracker",
      featured: false,
      screenshots: []
    },
    {
      id: "web3-discovery-feed",
      name: "Web3 Discovery Feed",
      description: "Aggregates new Web3 projects from DeFiLlama and GitHub into one unified research feed.",
      longDescription: "A real-time monitoring system that surfaces high-potential projects by analyzing TVL inflows, GitHub commit velocity, and social signals. Eliminates the noise to highlight genuine innovation.",
      tags: ["React", "FastAPI"],
      link: "https://lovable.dev/projects/discovery-feed",
      featured: false,
      screenshots: []
    },
    {
      id: "project-watch-monitor",
      name: "Project Watch Monitor",
      description: "Tracks projects over time with regular check-ins and score history to spot improving or declining signals.",
      longDescription: "A long-term surveillance tool for project health. It archives historical scores and project milestones to visualize momentum and warn against declining development or community signals.",
      tags: ["React"],
      link: "https://lovable.dev/projects/watch-monitor",
      featured: false,
      screenshots: []
    },
    {
      id: "web3-research-os",
      name: "Web3 Research OS",
      description: "Unified platform connecting all research tools in one place. Discovery, analysis, tracking, content creation and reporting in one workflow.",
      longDescription: "The flagship unified workspace for professional Web3 researchers. This 'Operating System' integrates discovery feeds, summarization engines, tracking databases, and publishing modules into a single, high-performance workflow.",
      tags: ["React", "FastAPI", "Claude AI"],
      link: "https://lovable.dev/projects/research-os",
      featured: true,
      screenshots: []
    }
  ],
  research: [
    { title: "Building an AI-Powered Web3 Research OS: My 0-to-1 Journey", date: "2024-03-13", excerpt: "I recently documented the technical architecture and challenges of building a unified workspace for Web3 researchers. From overcoming dependency hell to integrating real-time Claude AI analysis, here's how it all came together.", links: [{ platform: "LinkedIn", url: "https://www.linkedin.com/posts/web3-research-os-building" }], type: "article" as ResearchType, readTime: "5 min read" },
    { title: "Deep Dive: Restaking Protocol Risk Analysis", date: "2026-03-01", excerpt: "A comprehensive risk framework for evaluating restaking protocols, examining slashing conditions, operator incentives, and systemic risk vectors.", links: [{ platform: "Blog", url: "#" }, { platform: "Twitter", url: "#" }, { platform: "LinkedIn", url: "#" }], type: "report" as ResearchType, readTime: "18 min read" },
    { title: "The State of L2 Sequencer Decentralization", date: "2026-02-18", excerpt: "Analysis of sequencer architectures across major L2s — how close are we to credible decentralization?", links: [{ platform: "Mirror", url: "#" }, { platform: "Twitter", url: "#" }], type: "article" as ResearchType, readTime: "12 min read" },
    { title: "MEV on Solana: A Comparative Study", date: "2026-02-05", excerpt: "How MEV extraction on Solana differs from Ethereum, and what it means for the average user.", links: [{ platform: "Twitter", url: "#" }], type: "thread" as ResearchType, readTime: "6 min read" },
    { title: "Analyzing Bridge Security Post-2025 Exploits", date: "2026-01-22", excerpt: "Lessons learned from the latest bridge exploits and the evolution of cross-chain security models.", links: [{ platform: "LinkedIn", url: "#" }, { platform: "Blog", url: "#" }], type: "report" as ResearchType, readTime: "15 min read" },
    { title: "DePIN Tokenomics: What Actually Works", date: "2026-01-10", excerpt: "Separating signal from noise in DePIN token design — which incentive models are sustainable?", links: [{ platform: "Blog", url: "#" }, { platform: "Reddit", url: "#" }, { platform: "Twitter", url: "#" }], type: "article" as ResearchType, readTime: "10 min read" },
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
    if (!saved) return defaultData;
    const parsed = JSON.parse(saved);
    // Migrate old research format
    if (parsed.research) {
      parsed.research = parsed.research.map((r: any) => {
        const withLinks = r.links
          ? r
          : { title: r.title, date: r.date, excerpt: r.excerpt || "", links: [{ platform: r.platform || "Blog", url: r.link || "#" }] };
        return { type: "article", readTime: "", ...withLinks };
      });
    }
    // Migrate old tool format (screenshot → screenshots)
    if (parsed.tools) {
      parsed.tools = parsed.tools.map((t: any, i: number) => ({
        ...t,
        id: t.id || `tool-${i}`,
        screenshots: t.screenshots || (t.screenshot ? [t.screenshot] : []),
        longDescription: t.longDescription || "",
      }));
    }
    return { ...defaultData, ...parsed };
  } catch {
    return defaultData;
  }
};

type FilterType = "all" | ResearchType;

const Index = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(loadData);
  const [researchFilter, setResearchFilter] = useState<FilterType>("all");

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

  // Tool handlers
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

  const addToolScreenshot = (toolIdx: number, dataUrl: string) => {
    setData((d: typeof defaultData) => {
      const tools = [...d.tools];
      tools[toolIdx] = { ...tools[toolIdx], screenshots: [...tools[toolIdx].screenshots, dataUrl] };
      return { ...d, tools };
    });
  };

  const removeToolScreenshot = (toolIdx: number, imgIdx: number) => {
    setData((d: typeof defaultData) => {
      const tools = [...d.tools];
      tools[toolIdx] = { ...tools[toolIdx], screenshots: tools[toolIdx].screenshots.filter((_: string, j: number) => j !== imgIdx) };
      return { ...d, tools };
    });
  };

  const addTool = () => setData((d: typeof defaultData) => ({
    ...d, tools: [...d.tools, { id: `tool-${Date.now()}`, name: "New Tool", description: "Description", longDescription: "", tags: ["Tag"], link: "#", featured: false, screenshots: [] }]
  }));
  const removeTool = (i: number) => setData((d: typeof defaultData) => ({
    ...d, tools: d.tools.filter((_: unknown, idx: number) => idx !== i)
  }));

  // Research handlers
  const updateResearch = (i: number, field: string, v: string) => {
    setData((d: typeof defaultData) => {
      const research = [...d.research];
      research[i] = { ...research[i], [field]: v };
      return { ...d, research };
    });
  };

  const updateResearchLink = (researchIdx: number, linkIdx: number, field: string, v: string) => {
    setData((d: typeof defaultData) => {
      const research = [...d.research];
      const links = [...research[researchIdx].links];
      links[linkIdx] = { ...links[linkIdx], [field]: v };
      research[researchIdx] = { ...research[researchIdx], links };
      return { ...d, research };
    });
  };

  const addResearchLink = (researchIdx: number) => {
    setData((d: typeof defaultData) => {
      const research = [...d.research];
      research[researchIdx] = {
        ...research[researchIdx],
        links: [...research[researchIdx].links, { platform: "Blog", url: "#" }],
      };
      return { ...d, research };
    });
  };

  const removeResearchLink = (researchIdx: number, linkIdx: number) => {
    setData((d: typeof defaultData) => {
      const research = [...d.research];
      research[researchIdx] = {
        ...research[researchIdx],
        links: research[researchIdx].links.filter((_: unknown, j: number) => j !== linkIdx),
      };
      return { ...d, research };
    });
  };

  const addResearch = () => setData((d: typeof defaultData) => ({
    ...d, research: [...d.research, { title: "New Post", date: "2026-01-01", excerpt: "Short excerpt", links: [{ platform: "Blog", url: "#" }], type: "article" as ResearchType, readTime: "5 min read" }]
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
            {data.tools.map((tool, i) => (
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
