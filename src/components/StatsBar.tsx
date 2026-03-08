import { useCountUp } from "@/hooks/useAnimations";
import EditableField from "./EditableField";

interface Stat {
  label: string;
  value: string;
}

interface StatsBarProps {
  stats: Stat[];
  onStatChange: (index: number, value: string) => void;
  isEditing: boolean;
}

const StatItem = ({ stat, isEditing, onChange }: { stat: Stat; isEditing: boolean; onChange: (v: string) => void }) => {
  const numericValue = parseInt(stat.value) || 0;
  const { count, ref } = useCountUp(numericValue, 1800);

  return (
    <div ref={ref} className="text-center px-4 py-6">
      {isEditing ? (
        <EditableField value={stat.value} onChange={onChange} isEditing placeholder="0" />
      ) : (
        <div className="text-4xl md:text-5xl font-bold font-mono text-primary glow-text mb-2">
          {count}
        </div>
      )}
      <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium">{stat.label}</div>
    </div>
  );
};

const StatsBar = ({ stats, onStatChange, isEditing }: StatsBarProps) => {
  return (
    <section className="relative py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass-card p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/30">
            {stats.map((stat, i) => (
              <StatItem key={i} stat={stat} isEditing={isEditing} onChange={(v) => onStatChange(i, v)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
