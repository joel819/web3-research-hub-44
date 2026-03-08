interface AvatarProps {
  name: string;
}

const Avatar = ({ name }: AvatarProps) => {
  const initials = name
    .split(/[\s_-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center mb-5 mx-auto">
      <span className="text-2xl font-bold text-primary font-mono">{initials || "??"}</span>
    </div>
  );
};

export default Avatar;
