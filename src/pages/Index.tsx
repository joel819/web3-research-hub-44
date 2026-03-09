import { useState, useEffect, useMemo } from "react";
import toolTokenscope from "@/assets/tool-tokenscope.jpg";
import toolChainmap from "@/assets/tool-chainmap.jpg";
import toolGovwatch from "@/assets/tool-govwatch.jpg";
import toolMevscanner from "@/assets/tool-mevscanner.jpg";
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
    { id: "tokenscope", name: "TokenScope", description: "Real-time token contract analyzer that flags common rug-pull patterns, suspicious permissions, and honeypot indicators.", longDescription: "TokenScope is a comprehensive smart contract analysis tool built for researchers and investors. It automatically scans token contracts on EVM chains for common rug-pull patterns including: hidden mint functions, suspicious proxy patterns, honeypot indicators, and unusual permission structures.\n\nThe tool provides a risk score from 0-100, detailed breakdown of each finding, and historical comparison with known exploit patterns. Built with React frontend and Ethers.js for direct RPC interaction.", tags: ["Solidity", "React", "Ethers.js"], link: "#", featured: true, screenshots: [toolTokenscope] },
    { id: "chainmap", name: "ChainMap", description: "Visual mapping tool for tracing fund flows across multiple EVM-compatible chains with interactive graph visualization.", longDescription: "ChainMap lets you trace the flow of funds across Ethereum, Arbitrum, Optimism, Base, and Polygon in a single interactive graph. Paste any address and watch as the tool maps out incoming and outgoing transactions, highlights bridge transfers, and identifies known entity addresses.\n\nPerfect for due diligence, exploit tracing, and understanding how funds move through DeFi protocols.", tags: ["D3.js", "Node.js", "GraphQL"], link: "#", featured: false, screenshots: [toolChainmap] },
    { id: "govwatch", name: "GovWatch", description: "Dashboard tracking governance proposals across major DAOs with voting trend analysis and whale alert notifications.", longDescription: "GovWatch monitors governance activity across 50+ DAOs in real-time. Get alerts when whales vote, track proposal success rates, and analyze voting trends over time.\n\nFeatures include: multi-DAO dashboard, whale wallet tracking, historical voting analysis, proposal outcome predictions, and weekly governance digest emails.", tags: ["Python", "Next.js", "PostgreSQL"], link: "#", featured: true, screenshots: [toolGovwatch] },
    { id: "mevscanner", name: "MEV Scanner", description: "Automated scanner that detects and categorizes MEV extraction patterns across Ethereum and L2 networks.", longDescription: "MEV Scanner continuously monitors the mempool and block production to detect and categorize MEV extraction events. It identifies sandwich attacks, arbitrage opportunities, liquidations, and JIT liquidity provision across Ethereum mainnet and major L2s.\n\nThe scanner provides real-time alerts, historical data exports, and integration APIs for building MEV-aware applications.", tags: ["Rust", "WebSocket", "Redis"], link: "#", featured: false, screenshots: [toolMevscanner] },
  ],
  research: [
    { title: "Deep Dive: Restaking Protocol Risk Analysis", date: "2026-03-01", excerpt: "A comprehensive risk framework for evaluating restaking protocols, examining slashing conditions, operator incentives, and systemic risk vectors.", links: [{ platform: "Blog", url: "#" }, { platform: "Twitter", url: "#" }, { platform: "LinkedIn", url: "#" }] },
    { title: "The State of L2 Sequencer Decentralization", date: "2026-02-18", excerpt: "Analysis of sequencer architectures across major L2s — how close are we to credible decentralization?", links: [{ platform: "Reddit", url: "#" }, { platform: "Twitter", url: "#" }] },
    { title: "MEV on Solana: A Comparative Study", date: "2026-02-05", excerpt: "How MEV extraction on Solana differs from Ethereum, and what it means for the average user.", links: [{ platform: "Twitter", url: "#" }] },
    { title: "Analyzing Bridge Security Post-2025 Exploits", date: "2026-01-22", excerpt: "Lessons learned from the latest bridge exploits and the evolution of cross-chain security models.", links: [{ platform: "LinkedIn", url: "#" }, { platform: "Blog", url: "#" }] },
    { title: "DePIN Tokenomics: What Actually Works", date: "2026-01-10", excerpt: "Separating signal from noise in DePIN token design — which incentive models are sustainable?", links: [{ platform: "Blog", url: "#" }, { platform: "Reddit", url: "#" }, { platform: "Twitter", url: "#" }] },
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
    // Migrate old research format (single link/platform → links array)
    if (parsed.research) {
      parsed.research = parsed.research.map((r: any) => {
        if (r.links) return r;
        return {
          title: r.title,
          date: r.date,
          excerpt: r.excerpt || "",
          links: [{ platform: r.platform || "Blog", url: r.link || "#" }],
        };
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
    ...d, research: [...d.research, { title: "New Post", date: "2026-01-01", excerpt: "Short excerpt", links: [{ platform: "Blog", url: "#" }] }]
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
                  <ResearchCard
                    research={r}
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
                <Plus size={14} /> Add Research
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
