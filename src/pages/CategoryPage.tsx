import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import SectionHeader from "@/components/SectionHeader";
import { getArticlesByCategory } from "@/data/mockArticles";

const CategoryPage = () => {
  const { name } = useParams();
  const categoryName = decodeURIComponent(name || "");
  const categoryArticles = getArticlesByCategory(categoryName);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Category header banner */}
      <div className="bg-foreground">
        <div className="container py-10 md:py-14">
          <div className="flex gap-2 mb-4">
            <span className="w-8 h-1 bg-pernambuco-blue" />
            <span className="w-8 h-1 bg-pernambuco-yellow" />
            <span className="w-8 h-1 bg-pernambuco-red" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-black text-background leading-none tracking-[-0.03em]">
            {categoryName}
          </h1>
          <p className="mt-3 font-sans text-sm text-background/40">
            {categoryArticles.length} {categoryArticles.length === 1 ? "artigo" : "artigos"} publicados
          </p>
        </div>
      </div>

      <main className="container py-10 md:py-14">
        {categoryArticles.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <p className="font-serif text-2xl italic text-muted-foreground leading-relaxed">
              A gráfica está silenciosa.<br />Nenhum artigo encontrado nesta categoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            {categoryArticles[0] && (
              <div className="md:col-span-7">
                <NewsCard article={categoryArticles[0]} variant="large" />
              </div>
            )}
            {categoryArticles.length > 1 && (
              <div className="md:col-span-5 flex flex-col gap-6">
                {categoryArticles.slice(1).map((a) => (
                  <NewsCard key={a.id} article={a} variant="horizontal" />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
