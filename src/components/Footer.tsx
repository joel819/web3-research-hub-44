import { Linkedin, Github } from "lucide-react";
import { XIcon } from "@/components/XIcon";

interface FooterProps {
  name: string;
  since: string;
  twitter: string;
  linkedin: string;
  github: string;
}

const Footer = ({ name, since, twitter, linkedin, github }: FooterProps) => {
  return (
    <footer className="border-t border-border/20 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground font-mono">
          Building in public since {since} · {name}
        </p>
        <div className="flex items-center gap-4">
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/50 hover:text-foreground transition-colors">
              <XIcon size={16} />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/50 hover:text-foreground transition-colors">
              <Linkedin size={16} />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/50 hover:text-foreground transition-colors">
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
