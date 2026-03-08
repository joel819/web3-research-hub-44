import { useState } from "react";
import { Twitter, Linkedin, Github, Edit3, Eye, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditableField from "@/components/EditableField";
import StatsBar from "@/components/StatsBar";
import ToolCard from "@/components/ToolCard";
import ResearchCard from "@/components/ResearchCard";
import heroBg from "@/assets/hero-bg.jpg";

const FaReddit = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

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
  ],
  tools: [
    { name: "TokenScope", description: "Real-time token contract analyzer that flags common rug-pull patterns and suspicious permissions.", link: "#" },
    { name: "ChainMap", description: "Visual mapping tool for tracing fund flows across multiple EVM-compatible chains.", link: "#" },
    { name: "GovWatch", description: "Dashboard tracking governance proposals across major DAOs with voting trend analysis.", link: "#" },
  ],
  research: [
    { title: "Deep Dive: Restaking Protocol Risk Analysis", date: "2026-03-01", platform: "Mirror", link: "#" },
    { title: "The State of L2 Sequencer Decentralization", date: "2026-02-18", platform: "Substack", link: "#" },
    { title: "MEV on Solana: A Comparative Study", date: "2026-02-05", platform: "Twitter", link: "#" },
    { title: "Analyzing Bridge Security Post-2025 Exploits", date: "2026-01-22", platform: "Mirror", link: "#" },
    { title: "DePIN Tokenomics: What Actually Works", date: "2026-01-10", platform: "Substack", link: "#" },
  ],
  about: "My research process starts with smart contract audits and on-chain data analysis. I trace fund flows, examine governance structures, and stress-test tokenomics models. Every project gets evaluated through a framework covering security, decentralization, sustainability, and team credibility. I publish my findings transparently so others can verify and build on them.",
};

const Index = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(defaultData);

  const updateField = (field: string, value: string) => setData((d) => ({ ...d, [field]: value }));
  const updateStat = (index: number, value: string) => {
    const stats = [...data.stats];
    stats[index] = { ...stats[index], value };
    setData((d) => ({ ...d, stats }));
  };
  const updateTool = (index: number, field: string, value: string) => {
    const tools = [...data.tools];
    tools[index] = { ...tools[index], [field]: value };
    setData((d) => ({ ...d, tools }));
  };
  const updateResearch = (index: number, field: string, value: string) => {
    const research = [...data.research];
    research[index] = { ...research[index], [field]: value };
    setData((d) => ({ ...d, research }));
  };
  const addTool = () => setData((d) => ({ ...d, tools: [...d.tools, { name: "New Tool", description: "Description", link: "#" }] }));
  const removeTool = (i: number) => setData((d) => ({ ...d, tools: d.tools.filter((_, idx) => idx !== i) }));
  const addResearch = () => setData((d) => ({ ...d, research: [...d.research, { title: "New Post", date: "2026-01-01", platform: "Mirror", link: "#" }] }));
  const removeResearch = (i: number) => setData((d) => ({ ...d, research: d.research.filter((_, idx) => idx !== i) }));

  return (
    <div className="min-h-screen bg-background relative">
      {/* Hero BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img src={heroBg} alt="" className="w-full h-[600px] object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
      </div>

      {/* Edit Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          className="border-primary/30 bg-card/80 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 text-foreground gap-2"
        >
          {isEditing ? <Eye size={16} /> : <Edit3 size={16} />}
          {isEditing ? "Preview" : "Edit"}
        </Button>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="text-center mb-16">
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

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {isEditing ? (
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                {(["twitter", "linkedin", "reddit", "github"] as const).map((s) => (
                  <EditableField key={s} value={data[s]} onChange={(v) => updateField(s, v)} isEditing placeholder={`${s} URL`} />
                ))}
              </div>
            ) : (
              <>
                <SocialLink href={data.twitter} icon={<Twitter size={20} />} />
                <SocialLink href={data.linkedin} icon={<Linkedin size={20} />} />
                <SocialLink href={data.reddit} icon={<FaReddit />} />
                <SocialLink href={data.github} icon={<Github size={20} />} />
              </>
            )}
          </div>
        </header>

        {/* Stats */}
        <section className="mb-20">
          <StatsBar stats={data.stats} onStatChange={updateStat} isEditing={isEditing} />
        </section>

        {/* Tools */}
        <section className="mb-20">
          <SectionHeader title="Featured Tools" />
          <div className="grid md:grid-cols-3 gap-4">
            {data.tools.map((tool, i) => (
              <div key={i} className="relative">
                <ToolCard tool={tool} onChange={(f, v) => updateTool(i, f, v)} isEditing={isEditing} />
                {isEditing && (
                  <button onClick={() => removeTool(i)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:scale-110 transition-transform">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <Button onClick={addTool} variant="outline" className="mt-4 border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 gap-2">
              <Plus size={14} /> Add Tool
            </Button>
          )}
        </section>

        {/* Research */}
        <section className="mb-20">
          <SectionHeader title="Recent Research" />
          <div className="space-y-3">
            {data.research.map((r, i) => (
              <div key={i} className="relative">
                <ResearchCard research={r} onChange={(f, v) => updateResearch(i, f, v)} isEditing={isEditing} />
                {isEditing && (
                  <button onClick={() => removeResearch(i)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:scale-110 transition-transform">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <Button onClick={addResearch} variant="outline" className="mt-4 border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 gap-2">
              <Plus size={14} /> Add Research
            </Button>
          )}
        </section>

        {/* About */}
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

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground font-mono">built with conviction · verify everything</p>
        </footer>
      </div>
    </div>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
  </div>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2">
    {icon}
  </a>
);

export default Index;
