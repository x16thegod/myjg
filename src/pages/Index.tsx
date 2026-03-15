import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakingTicker from "@/components/BreakingTicker";
import HeroArticle from "@/components/HeroArticle";
import NewsCard from "@/components/NewsCard";
import SectionHeader from "@/components/SectionHeader";
import Newsletter from "@/components/Newsletter";
import { articles } from "@/data/mockArticles";

const Index = () => {
  const shortlist = articles.slice(1, 6);
  const sportsArticles = articles.filter((a) => a.category === "Esportes");
  const cultureArticles = articles.filter((a) => a.category === "Cultura");
  const opinionArticles = articles.filter((a) => a.category === "Opiniões");
  const projectArticles = articles.filter((a) => a.category === "Projetos");
  const interviewArticles = articles.filter((a) => a.category === "Entrevistas");
  const latestMix = articles.slice(1, 7);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreakingTicker />

      <main>
        {/* ===== FULL-BLEED HERO ===== */}
        <section>
          <HeroArticle />
        </section>

        {/* ===== MOST READ + LATEST — Bold grid ===== */}
        <section className="container py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12">
            {/* Latest news — 8 cols */}
            <div className="lg:col-span-8">
              <SectionHeader title="Últimas Notícias" href="/categoria/Not%C3%ADcias" accent="blue" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {latestMix[0] && (
                  <div className="md:col-span-2">
                    <NewsCard article={latestMix[0]} variant="large" />
                  </div>
                )}
                {latestMix.slice(1, 3).map((a) => (
                  <NewsCard key={a.id} article={a} />
                ))}
              </div>
            </div>

            {/* Most read sidebar — 4 cols */}
            <aside className="lg:col-span-4 mt-10 lg:mt-0 lg:border-l lg:border-foreground/8 lg:pl-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-[3px] w-10 bg-pernambuco-red" />
                <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Mais lidas
                </h2>
              </div>
              <div className="divide-y divide-foreground/8">
                {shortlist.map((article, i) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    variant="numbered"
                    number={i + 1}
                  />
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* ===== BLUE EDITORIAL BANNER ===== */}
        <section className="bg-pernambuco-blue relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pernambuco-yellow/5 -mt-20 -mr-20 rotate-12" />
          <div className="absolute bottom-0 left-[10%] w-2 h-2 bg-pernambuco-yellow" />
          <div className="absolute top-1/2 right-[15%] w-1 h-1 bg-pernambuco-yellow/30" />
          <div className="absolute bottom-[20%] right-[30%] w-40 h-px bg-pernambuco-yellow/10" />
          <div className="container py-14 md:py-20 relative z-10">
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-pernambuco-yellow/80 font-bold">
                Desde Recife, Pernambuco
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-black text-primary-foreground mt-3 leading-[1.05] tracking-[-0.02em]">
                Jornalismo feito por<br />quem vive a escola.
              </h2>
              <div className="flex gap-2 mt-6">
                <span className="w-10 h-1 bg-pernambuco-yellow" />
                <span className="w-10 h-1 bg-pernambuco-red" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== SPORTS + CULTURE — Split with color accents ===== */}
        <section className="stripe-pattern">
          <div className="container py-10 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Sports */}
              <div className="md:pr-10 md:border-r md:border-foreground/8 pb-10 md:pb-0">
                <SectionHeader title="Esportes" href="/categoria/Esportes" accent="red" />
                {sportsArticles.length > 0 ? (
                  <div className="space-y-6">
                    {sportsArticles.slice(0, 1).map((a) => (
                      <NewsCard key={a.id} article={a} variant="featured-side" />
                    ))}
                    {sportsArticles.slice(1, 3).map((a) => (
                      <NewsCard key={a.id} article={a} variant="compact" />
                    ))}
                  </div>
                ) : (
                  <p className="font-serif text-lg italic text-muted-foreground">
                    Nenhum artigo encontrado.
                  </p>
                )}
              </div>

              {/* Culture */}
              <div className="md:pl-10 pt-10 md:pt-0">
                <SectionHeader title="Cultura" href="/categoria/Cultura" accent="yellow" />
                {cultureArticles.length > 0 ? (
                  <div className="space-y-6">
                    {cultureArticles.slice(0, 1).map((a) => (
                      <NewsCard key={a.id} article={a} variant="featured-side" />
                    ))}
                    {cultureArticles.slice(1, 3).map((a) => (
                      <NewsCard key={a.id} article={a} variant="compact" />
                    ))}
                  </div>
                ) : (
                  <p className="font-serif text-lg italic text-muted-foreground">
                    Nenhum artigo encontrado.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===== OPINIONS — Bold editorial style ===== */}
        {opinionArticles.length > 0 && (
          <section className="bg-foreground text-background">
            <div className="container py-12 md:py-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[3px] w-10 bg-pernambuco-yellow" />
                <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-background/40">
                  Opiniões & Editoriais
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-5">
                  <div className="border-l-[4px] border-pernambuco-red pl-6 py-2">
                    <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-background/80">
                      "{opinionArticles[0].excerpt}"
                    </p>
                    <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.12em] text-pernambuco-yellow">
                      {opinionArticles[0].author} · Opinião
                    </span>
                  </div>
                </div>
                <div className="md:col-span-7 flex flex-col gap-6">
                  {opinionArticles.slice(0, 2).map((a) => (
                    <NewsCard key={a.id} article={a} variant="horizontal" invertColors />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== PROJECTS + INTERVIEWS — 3-column grid ===== */}
        {(projectArticles.length > 0 || interviewArticles.length > 0) && (
          <section className="container py-12 md:py-16">
            <SectionHeader title="Projetos & Entrevistas" accent="blue" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[...projectArticles, ...interviewArticles].slice(0, 3).map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* ===== NEWSLETTER ===== */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
