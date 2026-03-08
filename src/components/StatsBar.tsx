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

const StatsBar = ({ stats, onStatChange, isEditing }: StatsBarProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="glass-card glow-border p-6 text-center">
          <EditableField
            value={stat.value}
            onChange={(v) => onStatChange(i, v)}
            isEditing={isEditing}
            placeholder="0"
            renderView={(v) => (
              <div className="text-3xl md:text-4xl font-bold font-mono text-primary glow-text">{v}</div>
            )}
          />
          <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
