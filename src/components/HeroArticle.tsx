import { Link } from "react-router-dom";
import { getFeaturedArticle } from "@/data/mockArticles";

const HeroArticle = () => {
  const article = getFeaturedArticle();

  return (
    <Link to={`/artigo/${article.id}`} className="group block">
      <article className="relative">
        {/* Full-bleed image with cinematic overlay */}
        <div className="relative overflow-hidden aspect-[16/10] md:aspect-[2.1/1] lg:aspect-[2.4/1]">
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover image-hover"
          />
          {/* Dramatic gradient overlay */}
          <div className="hero-gradient absolute inset-0" />
          
          {/* Yellow accent bar at top */}
          <div className="absolute top-0 left-0 w-20 h-1 bg-pernambuco-yellow" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14">
            <div className="max-w-3xl">
              <span className="category-tag-red mb-4 inline-block">
                {article.category}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[3.25rem] font-black leading-[1.05] tracking-[-0.03em] text-primary-foreground animate-fade-up">
                {article.title}
              </h1>
              <p className="mt-4 font-sans text-base md:text-lg text-primary-foreground/75 leading-relaxed max-w-2xl animate-fade-up-delay-1 hidden sm:block">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 animate-fade-up-delay-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-pernambuco-yellow font-bold">
                  Por {article.author}
                </span>
                <span className="text-primary-foreground/30">·</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-primary-foreground/50">
                  {article.date}
                </span>
                <span className="text-primary-foreground/30">·</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-primary-foreground/50">
                  {article.readTime} de leitura
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default HeroArticle;
