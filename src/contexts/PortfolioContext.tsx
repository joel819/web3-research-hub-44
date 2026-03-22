import React, { createContext, useContext, useState, useEffect } from "react";
import type { ResearchType } from "@/components/ResearchCard";
import ProcessSection from "@/components/ProcessSection";
import EcosystemsSection from "@/components/EcosystemsSection";
import OpenToSection from "@/components/OpenToSection";

export const STORAGE_KEY = "web3-portfolio-v2";

export const defaultData = {
  name: "Joel Oyewole",
  bio: "Web3 researcher and DePIN tool builder. NVIDIA 6G Developer Program member. I research early Web3 projects, score DePIN infrastructure on 6G readiness, and build automation tools. Building everything publicly.",
  roles: ["Web3 Researcher", "DePIN Tool Builder", "Automation Engineer"],
  twitter: "https://x.com/joel_automate",
  linkedin: "https://linkedin.com/in/joel-oyewole-51b614125",
  reddit: "https://reddit.com/user/web30psJoel",
  github: "https://github.com/joel819",
  stats: [
    { label: "Projects Researched", value: "15+" },
    { label: "Tools Built", value: "8" },
    { label: "Weeks Building in Public", value: "7" },
    { label: "Posts Published", value: "330+" },
  ],
  processSteps: ProcessSection.defaultSteps,
  tools: [
    {
      id: "depin-6g-scorer",
      name: "DePIN 6G Performance Scorer",
      description: "Scores DePIN projects on 6G network readiness using NVIDIA 6G Developer Program research framework. Covers bandwidth, latency, device density and real world deployment.",
      longDescription: "Scores DePIN projects on 6G network readiness using NVIDIA 6G Developer Program research framework. Covers bandwidth, latency, device density and real world deployment.",
      tags: ["DePIN", "6G", "NVIDIA", "Research"],
      link: "https://the-look-alike-bot.lovable.app",
      featured: true,
      screenshots: []
    },
    {
      id: "decalc-depin-cloud",
      name: "DeCalc — DePIN vs Cloud Calculator",
      description: "Compares GPU compute costs across AWS, Google Cloud, Azure, Render, io.net and Akash. Shows how much cheaper DePIN compute is vs traditional cloud providers.",
      longDescription: "Compares GPU compute costs across AWS, Google Cloud, Azure, Render, io.net and Akash. Shows how much cheaper DePIN compute is vs traditional cloud providers.",
      tags: ["DePIN", "Cloud", "Cost Analysis"],
      link: "https://deal-depin-cloud.lovable.app",
      featured: false,
      screenshots: []
    },
    {
      id: "web3-funding-tracker",
      name: "Web3 Funding Tracker",
      description: "Auto-scrapes CoinDesk, The Block and Decrypt daily for new Web3 funding rounds with sector breakdown and VC activity charts.",
      longDescription: "Auto-scrapes CoinDesk, The Block and Decrypt daily for new Web3 funding rounds with sector breakdown and VC activity charts.",
      tags: ["Web3", "Funding", "Scraping", "Analytics"],
      link: "https://github.com/joel819/funding-.git",
      featured: false,
      screenshots: []
    },
    {
      id: "job-alert-bot",
      name: "Job Alert Automation Bot",
      description: "Scrapes UK job boards every 10 minutes and sends Telegram and email alerts for matching roles. Built and delivered to a real user.",
      longDescription: "Scrapes UK job boards every 10 minutes and sends Telegram and email alerts for matching roles. Built and delivered to a real user.",
      tags: ["Automation", "Telegram", "Scraping"],
      link: "https://github.com/joel819",
      featured: false,
      screenshots: []
    },
    {
      id: "whale-cluster-assistant",
      name: "Whale Cluster Research Assistant",
      description: "Flags whale wallet clusters in real time using Dune SQL queries and OpenAI analysis. Built with Make.com automation.",
      longDescription: "Flags whale wallet clusters in real time using Dune SQL queries and OpenAI analysis. Built with Make.com automation.",
      tags: ["On-chain", "Dune", "OpenAI", "Make.com"],
      link: "https://github.com/joel819",
      featured: false,
      screenshots: []
    },
    {
      id: "web3-project-discovery",
      name: "Web3 Project Discovery Tool",
      description: "Scans the internet for early Web3 projects before they trend using automated scraping and filtering.",
      longDescription: "Scans the internet for early Web3 projects before they trend using automated scraping and filtering.",
      tags: ["Web3", "Discovery", "Scraping"],
      link: "https://github.com/joel819",
      featured: false,
      screenshots: []
    },
    {
      id: "web3-opportunity-radar",
      name: "Web3 Opportunity Radar",
      description: "Dashboard consolidating trending tokens, airdrops and presales into one unified research feed.",
      longDescription: "Dashboard consolidating trending tokens, airdrops and presales into one unified research feed.",
      tags: ["Web3", "Dashboard", "Research"],
      link: "https://github.com/joel819",
      featured: false,
      screenshots: []
    },
    {
      id: "gpu-6g-simulation",
      name: "GPU-Accelerated 6G Simulation Framework",
      description: "Research framework for simulating 6G network performance using NVIDIA Aerial Omniverse Digital Twin platform.",
      longDescription: "Research framework for simulating 6G network performance using NVIDIA Aerial Omniverse Digital Twin platform.",
      tags: ["6G", "NVIDIA", "GPU", "Simulation"],
      link: "https://github.com/joel819/gpu-6g-simulation",
      featured: false,
      screenshots: []
    }
  ],
  research: [
    { title: "I Got Access to NVIDIA's 6G Simulation Platform — Here Is What It Means for DePIN", date: "2026-03-01", excerpt: "Most Web3 researchers read about 6G from the outside. I just got access to the software that actually simulates it — here is what it means for the DePIN ecosystem.", links: [{ platform: "LinkedIn", url: "https://linkedin.com/in/joel-oyewole-51b614125" }], type: "article" as ResearchType, readTime: "" },
    { title: "Most People in Web3 Have NO Idea What DePIN Is — Or That Regular People Earn Passive Income From It Right Now", date: "2026-03-01", excerpt: "Breaking down what DePIN actually is, why it matters, and how regular people are already earning passive income from decentralized physical infrastructure.", links: [{ platform: "LinkedIn", url: "https://www.linkedin.com/posts/joel-oyewole-51b614125_activity-7437769350348070913-vm8j" }], type: "article" as ResearchType, readTime: "" },
    { title: "Beginners — This Is What Seed Round, Series A and Series B Actually Mean in Web3", date: "2026-03-01", excerpt: "A beginner-friendly breakdown of fundraising stages in Web3 — what each round means, who invests, and why it matters for early project research.", links: [{ platform: "X Article", url: "https://x.com/joel_automate" }], type: "article" as ResearchType, readTime: "" },
  ],
  ecosystems: EcosystemsSection.defaultEcosystems,
  collabs: OpenToSection.defaultCollabs,
  contactText: "I'm always interested in connecting with teams building meaningful infrastructure in Web3. Whether you need DePIN research, custom tooling, or an automation partner — let's talk.",
  contactEmail: "joeloyewole13@gmail.com",
  contactTwitter: "https://x.com/joel_automate",
  contactLinkedin: "https://linkedin.com/in/joel-oyewole-51b614125",
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
