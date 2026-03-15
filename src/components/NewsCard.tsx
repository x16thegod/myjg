import { Link } from "react-router-dom";
import type { Article } from "@/data/mockArticles";

interface NewsCardProps {
  article: Article;
  variant?: "default" | "compact" | "horizontal" | "large" | "numbered" | "featured-side";
  number?: number;
  invertColors?: boolean;
}

const NewsCard = ({ article, variant = "default", number, invertColors = false }: NewsCardProps) => {
  const textColor = invertColors ? "text-primary-foreground" : "text-foreground";
  const mutedColor = invertColors ? "text-primary-foreground/50" : "text-muted-foreground";
  const dividerColor = invertColors ? "text-primary-foreground/20" : "text-foreground/15";
  const categoryColor = invertColors ? "text-pernambuco-yellow" : "text-primary";

  if (variant === "numbered") {
    return (
      <Link to={`/artigo/${article.id}`} className="group block">
        <article className="flex gap-4 py-5">
          <span className="shortlist-number">{String(number || 0).padStart(2, "0")}</span>
          <div className="flex flex-col gap-1.5 min-w-0 pt-0.5">
            <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${categoryColor}`}>
              {article.category}
            </span>
            <h3 className={`font-serif text-[17px] leading-[1.25] font-semibold headline-hover line-clamp-3 ${textColor}`}>
              {article.title}
            </h3>
            <div className={`flex items-center gap-2 meta-text mt-0.5 ${mutedColor}`}>
              <span>{article.author}</span>
              <span className={dividerColor}>|</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/artigo/${article.id}`} className="group block">
        <article className="flex flex-col gap-2 py-4">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${categoryColor}`}>
            {article.category}
          </span>
          <h3 className={`font-serif text-lg leading-[1.2] font-semibold headline-hover ${textColor}`}>
            {article.title}
          </h3>
          <div className={`flex items-center gap-2 meta-text ${mutedColor}`}>
            <span>{article.author}</span>
            <span className={dividerColor}>|</span>
            <span>{article.readTime}</span>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link to={`/artigo/${article.id}`} className="group block">
        <article className="flex gap-5">
          <div className="w-32 h-24 shrink-0 overflow-hidden bg-foreground/5 relative">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover image-hover"
              loading="lazy"
            />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-pernambuco-yellow" />
          </div>
          <div className="flex flex-col gap-1.5 min-w-0 justify-center">
            <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${categoryColor}`}>
              {article.category}
            </span>
            <h3 className={`font-serif text-[15px] leading-[1.3] font-semibold headline-hover line-clamp-2 ${textColor}`}>
              {article.title}
            </h3>
            <span className={`meta-text ${mutedColor}`}>{article.readTime}</span>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "large") {
    return (
      <Link to={`/artigo/${article.id}`} className="group block">
        <article className="flex flex-col gap-4">
          <div className="relative overflow-hidden bg-foreground/5">
            <img
              src={article.image}
              alt={article.title}
              className="aspect-[4/3] w-full object-cover image-hover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-pernambuco-blue" />
          </div>
          <div className="flex flex-col gap-2.5">
            <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${categoryColor}`}>
              {article.category}
            </span>
            <h3 className={`font-serif text-2xl md:text-[1.7rem] leading-[1.12] font-bold headline-hover ${textColor}`}>
              {article.title}
            </h3>
            <p className={`font-sans text-[15px] line-clamp-3 leading-relaxed ${mutedColor}`}>
              {article.excerpt}
            </p>
            <div className={`flex items-center gap-2 meta-text pt-1 ${mutedColor}`}>
              <span className={`font-semibold ${textColor}`}>{article.author}</span>
              <span className={dividerColor}>|</span>
              <span>{article.date}</span>
              <span className={dividerColor}>|</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "featured-side") {
    return (
      <Link to={`/artigo/${article.id}`} className="group block">
        <article className="relative overflow-hidden aspect-[3/4]">
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover image-hover"
            loading="lazy"
          />
          <div className="hero-gradient absolute inset-0" />
          <div className="absolute top-0 left-0 w-full h-1 bg-pernambuco-red" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-pernambuco-yellow mb-2">
              {article.category}
            </span>
            <h3 className="font-serif text-lg leading-[1.2] font-bold text-primary-foreground">
              {article.title}
            </h3>
            <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-primary-foreground/50">
              {article.author} · {article.readTime}
            </span>
          </div>
        </article>
      </Link>
    );
  }

  // default
  return (
    <Link to={`/artigo/${article.id}`} className="group block">
      <article className="flex flex-col gap-3">
        <div className="relative overflow-hidden bg-foreground/5">
          <img
            src={article.image}
            alt={article.title}
            className="aspect-video w-full object-cover image-hover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${categoryColor}`}>
            {article.category}
          </span>
          <h3 className={`font-serif text-xl leading-[1.2] font-semibold headline-hover ${textColor}`}>
            {article.title}
          </h3>
          <p className={`font-sans text-sm line-clamp-2 leading-relaxed ${mutedColor}`}>
            {article.excerpt}
          </p>
          <div className={`flex items-center gap-2 meta-text pt-0.5 ${mutedColor}`}>
            <span>{article.author}</span>
            <span className={dividerColor}>|</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
