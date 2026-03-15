import { articles } from "@/data/mockArticles";
import { AlertTriangle } from "lucide-react";

const BreakingTicker = () => {
  const breaking = articles.filter((a) => a.breaking);
  if (breaking.length === 0) return null;

  const text = breaking.map((a) => a.title).join("     ◆     ");
  const doubled = `${text}     ◆     ${text}`;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-pernambuco-red via-pernambuco-red to-pernambuco-blue">
      {/* Animated scanline effect */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
      
      <div className="flex items-center h-11 relative z-10">
        {/* URGENTE badge with icon and glow */}
        <span className="bg-foreground px-5 h-full flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-pernambuco-yellow shrink-0 z-10 relative shadow-[4px_0_20px_rgba(0,0,0,0.4)]">
          <span className="relative flex items-center justify-center">
            <span className="absolute w-5 h-5 bg-pernambuco-red/30 rounded-full animate-ping" />
            <AlertTriangle size={13} className="relative text-pernambuco-red" strokeWidth={2.5} />
          </span>
          Urgente
        </span>

        {/* Ticker content */}
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <div className="ticker-scroll inline-block pl-8">
            <span className="font-sans text-[13px] font-semibold text-primary-foreground tracking-wide">
              {doubled}
            </span>
          </div>
        </div>

        {/* Fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-pernambuco-blue to-transparent z-10" />
      </div>
    </div>
  );
};

export default BreakingTicker;
