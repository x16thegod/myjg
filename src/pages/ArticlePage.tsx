import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import ShareButtons from "@/components/ShareButtons";
import { getArticleById, articles } from "@/data/mockArticles";

const ArticlePage = () => {
  const { id } = useParams();
  const article = getArticleById(id || "");

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-24 text-center max-w-xl mx-auto">
          <span className="meta-text">Erro 404</span>
          <h1 className="font-serif text-4xl md:text-5xl mt-4 mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed">
            A gráfica está silenciosa. Este artigo não existe ou foi removido.
          </p>
          <Link to="/" className="mt-8 inline-block font-mono text-[11px] text-primary uppercase tracking-[0.12em] hover:text-foreground transition-colors">
            ← Voltar ao início
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const paragraphs = article.body.split("\n\n");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero image full-bleed */}
        <div className="relative overflow-hidden aspect-[21/9] md:aspect-[3/1]">
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="hero-gradient absolute inset-0" />
          <div className="absolute top-0 left-0 w-full h-1 editorial-rule-rainbow" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container pb-8 md:pb-12">
              <span className="category-tag-blue mb-3 inline-block">{article.category}</span>
            </div>
          </div>
        </div>

        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Article content */}
            <article className="lg:col-span-8">
              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-black leading-[1.06] tracking-[-0.03em] animate-fade-up">
                {article.title}
              </h1>

              {/* Dek */}
              <p className="mt-5 font-sans text-xl text-muted-foreground leading-relaxed animate-fade-up-delay-1">
                {article.excerpt}
              </p>

              {/* Byline */}
              <div className="mt-5 flex items-center gap-3 animate-fade-up-delay-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-pernambuco-blue font-bold">
                  Por {article.author}
                </span>
                <span className="text-foreground/15">·</span>
                <span className="meta-text">{article.date}</span>
                <span className="text-foreground/15">·</span>
                <span className="meta-text">{article.readTime} de leitura</span>
              </div>

              {/* Color divider */}
              <div className="flex gap-1 my-8">
                <div className="h-[3px] w-8 bg-pernambuco-blue" />
                <div className="h-[3px] w-8 bg-pernambuco-yellow" />
                <div className="h-[3px] w-8 bg-pernambuco-red" />
              </div>

              {/* Body text */}
              <div className="max-w-[65ch]">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`font-sans text-[17px] leading-[1.8] text-foreground/85 mb-7 ${
                      i === 0 ? "drop-cap" : ""
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* End mark */}
              <div className="flex items-center gap-3 mt-10 mb-6">
                <div className="w-2 h-2 bg-pernambuco-blue" />
                <div className="w-2 h-2 bg-pernambuco-yellow" />
                <div className="w-2 h-2 bg-pernambuco-red" />
                <div className="editorial-rule flex-1" />
              </div>

              {/* Share bar */}
              <ShareButtons
                url={`${window.location.origin}/artigo/${article.id}`}
                title={article.title}
              />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-36 space-y-10">
                {/* Author */}
                <div className="p-6 bg-secondary/60">
                  <div className="h-[3px] w-10 bg-pernambuco-yellow mb-4" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Sobre o autor
                  </span>
                  <p className="font-serif text-xl font-bold mt-2">{article.author}</p>
                  <p className="font-sans text-sm text-muted-foreground mt-1 leading-relaxed">
                    Estudante-repórter do Jornal Glicério, cobrindo {article.category.toLowerCase()} e assuntos da comunidade escolar em Recife.
                  </p>
                </div>

                {/* Related */}
                {related.length > 0 && (
                  <div>
                    <div className="editorial-rule-heavy mb-4" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Mais em {article.category}
                    </span>
                    <div className="mt-4 space-y-5">
                      {related.map((a) => (
                        <NewsCard key={a.id} article={a} variant="horizontal" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
