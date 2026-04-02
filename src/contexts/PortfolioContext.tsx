import React, { createContext, useContext, useState, useEffect } from "react";
import type { ResearchType } from "@/components/ResearchCard";
import ProcessSection from "@/components/ProcessSection";
import EcosystemsSection from "@/components/EcosystemsSection";
import OpenToSection from "@/components/OpenToSection";

export const STORAGE_KEY = "web3-research-hub-v1";

export const defaultData = {
  name: "Web3 Research Hub",
  bio: "A public, automated hub tracking the future of decentralized infrastructure, DePIN, and Web3 ecosystem changes. Automated tools analyzing whitepapers, projects, and 6G readiness.",
  roles: ["DePIN Research", "Decentralized Infrastructure", "Web3 Automation"],
  twitter: "",
  linkedin: "",
  reddit: "",
  github: "",
  stats: [
    { label: "Projects Researched", value: "15+" },
    { label: "Tools Tracked", value: "8" },
    { label: "Automated Updates", value: "24/7" },
    { label: "Reports Generated", value: "330+" },
  ],
  processSteps: ProcessSection.defaultSteps,
  tools: [
    {
      id: "depin-6g-scorer",
      name: "DePIN 6G Performance Scorer",
      description: "Scores DePIN projects on 6G network readiness using NVIDIA 6G Developer Program research framework.",
      longDescription: "Scores DePIN projects on 6G network readiness using NVIDIA 6G Developer Program research framework. Covers latency, throughput, and connectivity requirements for decentralized infrastructure.",
      tags: ["DePIN", "6G", "NVIDIA", "Research"],
      link: "https://the-look-alike-bot.lovable.app",
      featured: true,
      screenshots: []
    },
    {
      id: "decalc-depin-cloud",
      name: "DeCalc — DePIN vs Cloud Calculator",
      description: "Compares GPU compute costs across AWS, Google Cloud, Azure, Render, io.net and Akash.",
      longDescription: "A comprehensive cost comparison tool for GPU compute. Analyze price differences between traditional cloud giants and decentralized physical infrastructure networks.",
      tags: ["DePIN", "Cloud", "GPU", "Cost Analysis"],
      link: "https://deal-depin-cloud.lovable.app",
      featured: false,
      screenshots: []
    },
    {
      id: "web3-funding-tracker",
      name: "Web3 Funding Tracker",
      description: "Auto-scrapes CoinDesk, The Block and Decrypt daily for new Web3 funding rounds with sector breakdown and VC activity charts.",
      longDescription: "Real-time tracker for Web3 venture capital activity. Automated data extraction from major industry news sources with intuitive visualizations.",
      tags: ["Web3", "Funding", "Scraping", "Data Vis"],
      link: "https://github.com/joel819/funding-.git",
      featured: false,
      screenshots: []
    },
    {
      id: "job-alert-bot",
      name: "Job Alert Automation Bot",
      description: "Scrapes UK job boards every 10 minutes and sends Telegram and email alerts for matching roles. Built and delivered to a real user.",
      longDescription: "Custom automation bot for job seekers. High-frequency polling of job boards with filtered alerts delivered via Telegram and Email.",
      tags: ["Automation", "Telegram", "Scraping"],
      link: "https://github.com/joel819",
      featured: false,
      screenshots: []
    },
    {
      id: "whale-cluster-assistant",
      name: "Whale Cluster Research Assistant",
      description: "Flags whale wallet clusters in real time using Dune SQL and OpenAI analysis.",
      longDescription: "On-chain analytics tool combining Dune SQL queries with AI-powered behavioral analysis to identify and track crypto whale clusters.",
      tags: ["On-chain", "Dune", "AI", "Research"],
      link: "https://github.com/joel819",
      featured: false,
      screenshots: []
    },
    {
      id: "web3-project-discovery",
      name: "Web3 Project Discovery Tool",
      description: "Scans internet for early Web3 projects before they trend using automated scraping and filtering.",
      longDescription: "Alpha discovery tool that monitors social signals and developer activity to find promising Web3 projects in their earliest stages.",
      tags: ["Web3", "Discovery", "Automation"],
      link: "https://github.com/joel819",
      featured: false,
      screenshots: []
    },
    {
      id: "web3-opportunity-radar",
      name: "Web3 Opportunity Radar",
      description: "Dashboard consolidating trending tokens, airdrops and presales into one feed.",
      longDescription: "Centralized dashboard for tracking high-potential opportunities in the Web3 space, including token launches, airdrop campaigns, and presales.",
      tags: ["Web3", "Dashboard", "Airdrops"],
      link: "https://github.com/joel819",
      featured: false,
      screenshots: []
    },
    {
      id: "gpu-6g-simulation",
      name: "GPU-Accelerated 6G Simulation Framework",
      description: "Research framework for simulating 6G network performance using NVIDIA Aerial Omniverse Digital Twin platform.",
      longDescription: "Advanced simulation environment for 6G networks, leveraging NVIDIA Aerial and Omniverse to model high-performance decentralized connectivity.",
      tags: ["6G", "NVIDIA", "Simulation", "GPU"],
      link: "https://github.com/joel819/gpu-6g-simulation",
      featured: false,
      screenshots: []
    }
  ],
  research: [
    { 
      title: "DePIN Analysis: Civic Connect", 
      date: "2026-03-31", 
      excerpt: "Deep dive research into Civic Connect for 6G network readiness. Core score: 4.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: Althea", 
      date: "2026-03-30", 
      excerpt: "Deep dive research into Althea for 6G network readiness. Core score: 6.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: Mesh Networks Inc.", 
      date: "2026-03-30", 
      excerpt: "Deep dive research into Mesh Networks Inc. for 6G network readiness. Core score: 6.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: Hivemind", 
      date: "2026-03-30", 
      excerpt: "Deep dive research into Hivemind for 6G network readiness. Core score: 5.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: TerraCycle", 
      date: "2026-03-30", 
      excerpt: "Deep dive research into TerraCycle for 6G network readiness. Core score: 5.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: RightMesh", 
      date: "2026-03-29", 
      excerpt: "Deep dive research into RightMesh for 6G network readiness. Core score: 3.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: Freenet", 
      date: "2026-03-29", 
      excerpt: "Deep dive research into Freenet for 6G network readiness. Core score: 6.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: Gridless", 
      date: "2026-03-29", 
      excerpt: "Deep dive research into Gridless for 6G network readiness. Core score: 6.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: World Mobile", 
      date: "2026-03-29", 
      excerpt: "Deep dive research into World Mobile for 6G network readiness. Core score: 5.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: Nodle", 
      date: "2026-03-29", 
      excerpt: "Deep dive research into Nodle for 6G network readiness. Core score: 6.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: Render", 
      date: "2026-03-29", 
      excerpt: "Deep dive research into Render for 6G network readiness. Core score: 9.0/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "DePIN Analysis: Helium", 
      date: "2026-03-29", 
      excerpt: "Deep dive research into Helium for 6G network readiness. Core score: 8.5/6.0", 
      links: [{"platform": "X Article", "url": "https://x.com/joel_automate"}], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "I Got Access to NVIDIA's 6G Simulation Platform — Here Is What It Means for DePIN", 
      date: "2026-03-01", 
      excerpt: "Exploring the intersection of NVIDIA's 6G research and the future of decentralized physical infrastructure networks.", 
      links: [{ platform: "LinkedIn", url: "https://linkedin.com/in/joel-oyewole-51b614125" }], 
      type: "article" as ResearchType, 
      readTime: "8 min read" 
    },
    { 
      title: "Most People in Web3 Have NO Idea What DePIN Is — Or That Regular People Earn Passive Income From It Right Now", 
      date: "2026-03-10", 
      excerpt: "DePIN is the sleeper hit of the 2024-2026 cycle. Here is how it works and why real-world utility is back in fashion.", 
      links: [{ platform: "LinkedIn", url: "https://www.linkedin.com/posts/joel-oyewole-51b614125_activity-7437769350348070913-vm8j" }], 
      type: "article" as ResearchType, 
      readTime: "6 min read" 
    },
    { 
      title: "Beginners — This Is What Seed Round, Series A and Series B Actually Mean in Web3", 
      date: "2026-03-15", 
      excerpt: "Demystifying the funding stages of crypto startups for researchers and early-stage investors.", 
      links: [{ platform: "X Article", url: "https://x.com/joel_automate" }], 
      type: "article" as ResearchType, 
      readTime: "5 min read" 
    },
  ],
  ecosystems: EcosystemsSection.defaultEcosystems,
  collabs: [
    { icon: "freelance", title: "DePIN Ecosystem Research Roles", description: "Open to full-time or contract roles for analyzing and scoring DePIN infrastructure readiness." },
    { icon: "tools", title: "Web3 Tool Building Contracts", description: "Available for building custom automation bots, dashboards, and data scraping tools for Web3 teams." },
    { icon: "protocol", title: "Protocol Research Collaborations", description: "Partnering with protocols to provide deep-dive research into network performance and 6G readiness." },
    { icon: "content", title: "Freelance Automation Projects", description: "Helping individuals and small teams automate their Web3 workflows and research pipelines." },
    { icon: "grant", title: "Grant Funded Research", description: "Seeking grants to continue research into DePIN infrastructure and 6G network performance simulation." },
  ],
  contactText: "I'm always interested in connecting with teams building meaningful infrastructure in Web3. Whether you need DePIN research, custom tooling, or an automation partner — let's talk.",
  contactEmail: "",
  contactTwitter: "",
  contactLinkedin: "",
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
