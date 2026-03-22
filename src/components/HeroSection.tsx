import { Linkedin, Github, ArrowDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/useAnimations";
import EditableField from "./EditableField";
import { XIcon } from "@/components/XIcon";

const FaReddit = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

interface HeroProps {
  data: {
    name: string;
    bio: string;
    roles: string[];
    twitter: string;
    linkedin: string;
    reddit: string;
    github: string;
  };
  isEditing: boolean;
  onUpdate: (field: string, value: string) => void;
}

const SocialIcon = ({ href, children, label }: { href: string; children: React.ReactNode; label?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
  >
    {children}
  </a>
);

const HeroSection = ({ data, isEditing, onUpdate }: HeroProps) => {
  const typedText = useTypingEffect(data.roles, 80, 40, 2000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated grid background */}
      <div className="absolute inset-0 animate-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Profile Image Placeholder */}
        {!isEditing && (
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-4 ring-emerald-500/20">
              <span className="text-3xl font-bold text-white font-display tracking-wide">JO</span>
            </div>
          </div>
        )}

        {/* Name */}
        {isEditing ? (
          <div className="mb-4 max-w-lg mx-auto">
            <EditableField value={data.name} onChange={(v) => onUpdate("name", v)} isEditing placeholder="Your name" />
          </div>
        ) : (
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display gradient-text mb-2 leading-tight">
            {data.name}
          </h1>
        )}

        {/* Handle */}
        {!isEditing && (
          <p className="text-base text-muted-foreground font-mono mb-4">
            <a
              href="https://x.com/joel_automate"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              @joel_automate
            </a>
          </p>
        )}

        {/* Typing effect */}
        {!isEditing && (
          <div className="h-10 flex items-center justify-center mb-6">
            <span className="text-xl md:text-2xl text-muted-foreground font-mono">
              <span className="typing-cursor pr-1">{typedText}</span>
            </span>
          </div>
        )}
        {isEditing && (
          <div className="mb-4 max-w-md mx-auto">
            <EditableField
              value={data.roles.join(", ")}
              onChange={(v) => onUpdate("roles", v)}
              isEditing
              placeholder="Roles (comma-separated)"
            />
          </div>
        )}

        {/* Bio */}
        <div className="max-w-2xl mx-auto mb-8">
          <EditableField
            value={data.bio}
            onChange={(v) => onUpdate("bio", v)}
            isEditing={isEditing}
            multiline={isEditing}
            placeholder="Your bio paragraph"
            renderView={(v) => <p className="text-lg text-muted-foreground leading-relaxed">{v}</p>}
          />
        </div>

        {/* CTA Buttons */}
        {!isEditing && (
          <div className="flex items-center justify-center gap-4 mb-10">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-5">
              <a href="#research">View My Research</a>
            </Button>
            <Button asChild variant="outline" className="border-border/50 hover:border-primary/40 hover:bg-primary/5 px-6 py-5">
              <a href="#tools">See My Tools</a>
            </Button>
          </div>
        )}

        {/* Socials & Credentials */}
        {isEditing ? (
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {(["twitter", "linkedin", "reddit", "github"] as const).map((s) => (
              <EditableField key={s} value={data[s]} onChange={(v) => onUpdate(s, v)} isEditing placeholder={`${s} URL`} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center gap-3">
              <SocialIcon href={data.twitter} label="X (Twitter)"><XIcon size={18} /></SocialIcon>
              <SocialIcon href={data.linkedin} label="LinkedIn"><Linkedin size={18} /></SocialIcon>
              <SocialIcon href={data.github} label="GitHub"><Github size={18} /></SocialIcon>
              <SocialIcon href={data.reddit} label="Reddit"><FaReddit /></SocialIcon>
              <SocialIcon href="mailto:joeloyewole13@gmail.com" label="Email"><Mail size={18} /></SocialIcon>
            </div>
            
            {/* NVIDIA Credential Badge — Green and Prominent */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm group hover:border-emerald-500/50 transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                NVIDIA 6G Developer Program — Active Member 2026
              </span>
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        {!isEditing && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown size={20} className="text-muted-foreground/40" />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
