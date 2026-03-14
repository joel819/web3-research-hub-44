import { usePortfolio } from "@/contexts/PortfolioContext";
import ToolCard from "@/components/ToolCard";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ToolsPage = () => {
  const { data } = usePortfolio();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar name={data.name} />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="mb-8">
              <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-foreground" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Back to Portfolio
                </Link>
              </Button>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">All Tools</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                A complete showcase of all the web3 research, analysis, and automation tools I've built.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {data.tools.map((tool, i) => (
              <ScrollReveal key={tool.id || i} delay={(i % 4) * 100}>
                <ToolCard
                  tool={tool}
                  index={i}
                  onChange={() => {}}
                  onToggleFeatured={() => {}}
                  onAddScreenshot={() => {}}
                  onRemoveScreenshot={() => {}}
                  isEditing={false}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>

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

export default ToolsPage;
