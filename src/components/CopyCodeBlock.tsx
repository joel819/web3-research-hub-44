import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyCodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CopyCodeBlock = ({ children, className }: CopyCodeBlockProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <div className="relative group">
      <pre
        ref={preRef}
        className={`rounded-xl border border-border/30 overflow-x-auto mb-6 text-sm font-mono bg-[#0d1117] p-4 ${className ?? ""}`}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-muted/80 hover:bg-muted border border-border/40 rounded-md p-1.5"
      >
        {copied ? (
          <Check size={13} className="text-primary" />
        ) : (
          <Copy size={13} className="text-muted-foreground" />
        )}
      </button>
    </div>
  );
};

export default CopyCodeBlock;
