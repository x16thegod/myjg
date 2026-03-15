import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  href?: string;
  accent?: "blue" | "red" | "yellow" | "default";
}

const accentMap = {
  blue: "bg-pernambuco-blue",
  red: "bg-pernambuco-red",
  yellow: "bg-pernambuco-yellow",
  default: "bg-foreground",
};

const SectionHeader = ({ title, href, accent = "default" }: SectionHeaderProps) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-4">
      <div className={`h-[3px] w-10 ${accentMap[accent]}`} />
      <div className={`h-[3px] flex-1 ${accent === "default" ? "bg-foreground" : "bg-foreground/8"}`} />
    </div>
    <div className="flex items-end justify-between gap-4">
      <h2 className="font-serif text-2xl md:text-3xl font-bold leading-none">{title}</h2>
      {href && (
        <Link
          to={href}
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-primary hover:text-foreground transition-colors shrink-0 pb-0.5 group/link"
        >
          Ver tudo
          <span className="inline-block ml-1 transition-transform group-hover/link:translate-x-1">→</span>
        </Link>
      )}
    </div>
  </div>
);

export default SectionHeader;
