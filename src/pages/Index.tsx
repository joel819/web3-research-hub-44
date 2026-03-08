import { useState, useEffect, useRef, useCallback } from "react";
import { Edit3, Eye, Plus, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EditableField from "@/components/EditableField";
import StatsBar from "@/components/StatsBar";
import ToolCard from "@/components/ToolCard";
import ResearchCard from "@/components/ResearchCard";
import Avatar from "@/components/Avatar";
import SocialLinks from "@/components/SocialLinks";
import SectionHeader from "@/components/SectionHeader";
import ContactSection from "@/components/ContactSection";
import ScrollReveal from "@/components/ScrollReveal";
import heroBg from "@/assets/hero-bg.jpg";

const STORAGE_KEY = "web3-portfolio-data";

const defaultData = {
  name: "0xResearcher",
  bio: "Independent Web3 researcher & tool builder. Dissecting protocols so you don't have to.",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  reddit: "https://reddit.com",
  github: "https://github.com",
  stats: [
    { label: "Projects Researched", value: "47" },
    { label: "Tools Built", value: "12" },
    { label: "Weeks Active", value: "86" },
    { label: "Posts Published", value: "31" },
  ],
  tools: [
    { name: "TokenScope", description: "Real-time token contract analyzer that flags common rug-pull patterns and suspicious permissions.", link: "#" },
    { name: "ChainMap", description: "Visual mapping tool for tracing fund flows across multiple EVM-compatible chains.", link: "#" },
    { name: "GovWatch", description: "Dashboard tracking governance proposals across major DAOs with voting trend analysis.", link: "#" },
  ],
  research: [
    { title: "Deep Dive: Restaking Protocol Risk Analysis", date: "2026-03-01", platform: "Mirror", link: "#" },
    { title: "The State of L2 Sequencer Decentralization", date: "2026-02-18", platform: "Reddit", link: "#" },
    { title: "MEV on Solana: A Comparative Study", date: "2026-02-05", platform: "Twitter", link: "#" },
    { title: "Analyzing Bridge Security Post-2025 Exploits", date: "2026-01-22", platform: "LinkedIn", link: "#" },
    { title: "DePIN Tokenomics: What Actually Works", date: "2026-01-10", platform: "Substack", link: "#" },
  ],
  about: "My research process starts with smart contract audits and on-chain data analysis. I trace fund flows, examine governance structures, and stress-test tokenomics models. Every project gets evaluated through a framework covering security, decentralization, sustainability, and team credibility. I publish my findings transparently so others can verify and build on them.",
  contactText: "Open to collaborations on protocol research, security audits, and tool development. If you're building something interesting in Web3, let's talk.",
  contactEmail: "researcher@example.com",
  contactTwitter: "https://twitter.com/messages",
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

  const updateField = (field: string, value: string) => setData((d: typeof defaultData) => ({ ...d, [field]: value }));
  const updateStat = (index: number, value: string) => {
    const stats = [...data.stats];
    stats[index] = { ...stats[index], value };
    setData((d: typeof defaultData) => ({ ...d, stats }));
  };
  const updateTool = (index: number, field: string, value: string) => {
    const tools = [...data.tools];
    tools[index] = { ...tools[index], [field]: value };
    setData((d: typeof defaultData) => ({ ...d, tools }));
  };
  const updateResearch = (index: number, field: string, value: string) => {
    const research = [...data.research];
    research[index] = { ...research[index], [field]: value };
    setData((d: typeof defaultData) => ({ ...d, research }));
  };
  const addTool = () => setData((d: typeof defaultData) => ({ ...d, tools: [...d.tools, { name: "New Tool", description: "Description", link: "#" }] }));
  const removeTool = (i: number) => setData((d: typeof defaultData) => ({ ...d, tools: d.tools.filter((_: unknown, idx: number) => idx !== i) }));
  const addResearch = () => setData((d: typeof defaultData) => ({ ...d, research: [...d.research, { title: "New Post", date: "2026-01-01", platform: "Mirror", link: "#" }] }));
  const removeResearch = (i: number) => setData((d: typeof defaultData) => ({ ...d, research: d.research.filter((_: unknown, idx: number) => idx !== i) }));
  const contentRef = useRef<HTMLDivElement>(null);

  const exportPDF = useCallback(async () => {
    const el = contentRef.current;
    if (!el) return;
    toast.info("Generating PDF…");
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(el, {
        backgroundColor: "#0a0c10",
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width / 2, canvas.height / 2] });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${data.name.replace(/\s+/g, "_")}_portfolio.pdf`);
      toast.success("PDF downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    }
  }, [data.name]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Hero BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img src={heroBg} alt="" className="w-full h-[600px] object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        {!isEditing && (
          <Button
            onClick={exportPDF}
            variant="outline"
            className="border-primary/30 bg-card/80 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 text-foreground gap-2"
          >
            <Download size={16} /> PDF
          </Button>
        )}
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          className="border-primary/30 bg-card/80 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 text-foreground gap-2"
        >
          {isEditing ? <Eye size={16} /> : <Edit3 size={16} />}
          {isEditing ? "Preview" : "Edit"}
        </Button>
      </div>


      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <ScrollReveal>
          <header className="text-center mb-16">
            <Avatar name={data.name} />
            <EditableField
              value={data.name}
              onChange={(v) => updateField("name", v)}
              isEditing={isEditing}
              placeholder="Your name"
              renderView={(v) => <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">{v}</h1>}
            />
            <EditableField
              value={data.bio}
              onChange={(v) => updateField("bio", v)}
              isEditing={isEditing}
              placeholder="One-line bio"
              renderView={(v) => <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{v}</p>}
            />
            <SocialLinks
              data={{ twitter: data.twitter, linkedin: data.linkedin, reddit: data.reddit, github: data.github }}
              isEditing={isEditing}
              onUpdate={updateField}
            />
          </header>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal>
          <section className="mb-20">
            <StatsBar stats={data.stats} onStatChange={updateStat} isEditing={isEditing} />
          </section>
        </ScrollReveal>

        {/* About */}
        <ScrollReveal>
          <section className="mb-20">
            <SectionHeader title="About My Process" />
            <div className="glass-card p-8">
              <EditableField
                value={data.about}
                onChange={(v) => updateField("about", v)}
                isEditing={isEditing}
                multiline
                placeholder="Describe your research process..."
                renderView={(v) => <p className="text-muted-foreground leading-relaxed text-lg">{v}</p>}
              />
            </div>
          </section>
        </ScrollReveal>

        {/* Tools */}
        <ScrollReveal>
          <section className="mb-20">
            <SectionHeader title="Tools I Built" />
            <div className="grid md:grid-cols-3 gap-4">
              {data.tools.map((tool, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="relative">
                    <ToolCard tool={tool} onChange={(f, v) => updateTool(i, f, v)} isEditing={isEditing} />
                    {isEditing && (
                      <button onClick={() => removeTool(i)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:scale-110 transition-transform">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
            {isEditing && (
              <Button onClick={addTool} variant="outline" className="mt-4 border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 gap-2">
                <Plus size={14} /> Add Tool
              </Button>
            )}
          </section>
        </ScrollReveal>

        {/* Research */}
        <ScrollReveal>
          <section className="mb-20">
            <SectionHeader title="Recent Research" />
            <div className="space-y-3">
              {data.research.map((r, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="relative">
                    <ResearchCard research={r} onChange={(f, v) => updateResearch(i, f, v)} isEditing={isEditing} />
                    {isEditing && (
                      <button onClick={() => removeResearch(i)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:scale-110 transition-transform">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
            {isEditing && (
              <Button onClick={addResearch} variant="outline" className="mt-4 border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 gap-2">
                <Plus size={14} /> Add Research
              </Button>
            )}
          </section>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal>
          <section className="mb-20">
            <SectionHeader title="Contact & Collab" />
            <ContactSection
              contactText={data.contactText}
              contactEmail={data.contactEmail}
              contactTwitter={data.contactTwitter}
              isEditing={isEditing}
              onUpdate={updateField}
            />
          </section>
        </ScrollReveal>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground font-mono">built in public by {data.name}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
