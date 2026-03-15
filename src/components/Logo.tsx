const Logo = ({ size = "default", inverted = false }: { size?: "default" | "large" | "small"; inverted?: boolean }) => {
  const sizeMap = {
    small: { wrapper: "gap-0", title: "text-xl", label: "text-[7px] tracking-[0.3em]", dot: "w-1.5 h-1.5", stripe: "h-[2px]" },
    default: { wrapper: "gap-0.5", title: "text-[1.75rem]", label: "text-[9px] tracking-[0.35em]", dot: "w-2 h-2", stripe: "h-[3px]" },
    large: { wrapper: "gap-1", title: "text-5xl md:text-6xl", label: "text-[11px] md:text-xs tracking-[0.35em]", dot: "w-2.5 h-2.5 md:w-3 md:h-3", stripe: "h-1" },
  };

  const s = sizeMap[size];
  const textColor = inverted ? "text-background" : "text-foreground";
  const labelColor = inverted ? "text-background/40" : "text-muted-foreground";

  return (
    <div className={`flex flex-col items-start leading-none select-none ${s.wrapper}`}>
      <span className={`font-mono font-bold uppercase ${labelColor} ${s.label}`}>
        Jornal
      </span>
      <div className="flex items-end gap-1.5">
        <span className={`font-serif font-black tracking-[-0.04em] ${textColor} ${s.title}`}>
          Glicério
        </span>
        <div className="flex gap-[3px] mb-1.5 shrink-0">
          <span className={`${s.dot} bg-pernambuco-blue`} />
          <span className={`${s.dot} bg-pernambuco-yellow`} />
          <span className={`${s.dot} bg-pernambuco-red`} />
        </div>
      </div>
    </div>
  );
};

export default Logo;
