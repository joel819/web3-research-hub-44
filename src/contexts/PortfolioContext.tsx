import React, { createContext, useContext, useState, useEffect } from "react";
import type { ResearchType } from "@/components/ResearchCard";
import ProcessSection from "@/components/ProcessSection";
import EcosystemsSection from "@/components/EcosystemsSection";
import OpenToSection from "@/components/OpenToSection";

export const STORAGE_KEY = "web3-portfolio-v2";

export const defaultData = {
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

export type PortfolioData = typeof defaultData;

interface PortfolioContextType {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const loadData = () => {
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

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  return (
    <PortfolioContext.Provider value={{ data, setData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
