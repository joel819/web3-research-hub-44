import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";

const STORAGE_KEY = "web3-portfolio-v2";

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const toolIndex = parseInt(id || "0");

  const [selectedImg, setSelectedImg] = useState(0);

  let data: any;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    data = saved ? JSON.parse(saved) : null;
  } catch {
    data = null;
  }

  if (!data || !data.tools || !data.tools[toolIndex]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Tool not found</h1>
          <Link to="/" className="text-primary hover:text-primary/80">← Back to portfolio</Link>
        </div>
      </div>
    );
  }

  const tool = data.tools[toolIndex];
  const screenshots = tool.screenshots || (tool.screenshot ? [tool.screenshot] : []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <ScrollReveal>
          <Link
            to="/#tools"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to all tools
          </Link>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground">{tool.name}</h1>
            {tool.featured && (
              <Badge className="bg-accent/15 text-accent border-accent/30 text-sm gap-1">
                <Star size={12} fill="currentColor" /> Featured
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {tool.tags?.map((tag: string, i: number) => (
              <Badge key={i} variant="outline" className="text-xs border-border/40 text-muted-foreground/80 bg-muted/20">
                {tag}
              </Badge>
            ))}
          </div>
        </ScrollReveal>

        {/* Image Gallery */}
        {screenshots.length > 0 && (
          <ScrollReveal>
            <div className="mb-12">
              {/* Main image */}
              <div className="rounded-xl overflow-hidden border border-border/30 bg-muted/20 mb-4 aspect-video">
                <img
                  src={screenshots[selectedImg] || screenshots[0]}
                  alt={`${tool.name} screenshot ${selectedImg + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnails */}
              {screenshots.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {screenshots.map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImg(i)}
                      className={`w-24 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImg === i
                          ? "border-primary shadow-lg shadow-primary/20"
                          : "border-border/30 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Description */}
        <ScrollReveal>
          <div className="glass-card p-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">About this tool</h2>
            <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
              {tool.longDescription || tool.description}
            </p>
          </div>
        </ScrollReveal>

        {/* CTA */}
        {tool.link && tool.link !== "#" && (
          <ScrollReveal>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 px-8 py-5">
              <a href={tool.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} /> Try {tool.name} Live
              </a>
            </Button>
          </ScrollReveal>
        )}
      </div>

      <Footer
        name={data.name}
        since={data.since || "2024"}
        twitter={data.twitter || ""}
        linkedin={data.linkedin || ""}
        github={data.github || ""}
      />
    </div>
  );
};

export default ToolDetail;
