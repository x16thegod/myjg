import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, User } from "lucide-react";
import Logo from "./Logo";
import { categories } from "@/data/mockArticles";
import { useAuth } from "@/contexts/AuthContext";

const HeaderAuthButton = () => {
  const { user, isAdmin, isJournalist } = useAuth();
  if (user) {
    return (
      <Link
        to="/painel"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-pernambuco-blue text-primary-foreground font-mono text-[10px] font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity"
      >
        <User size={13} />
        {isAdmin ? "Painel" : isJournalist ? "Painel" : "Minha Conta"}
      </Link>
    );
  }
  return (
    <Link
      to="/auth"
      className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] px-4 py-2 hover:text-primary transition-colors"
    >
      Entrar
    </Link>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className={`sticky top-0 z-50 bg-background transition-all duration-300 ${scrolled ? "shadow-[0_2px_30px_-8px_rgba(0,0,0,0.12)]" : ""}`}>
      {/* Pernambuco stripe */}
      <div className="editorial-rule-rainbow" />

      {/* Top dateline */}
      <div className="border-b border-foreground/5 hidden md:block">
        <div className="container flex items-center justify-between py-1.5">
          <span className="meta-text capitalize">{currentDate}</span>
          <div className="flex items-center gap-4">
            <span className="meta-text">Escola José Glicério · Recife, PE</span>
            <span className="w-1.5 h-1.5 bg-pernambuco-red animate-pulse-dot" />
          </div>
        </div>
      </div>

      {/* Logo bar */}
      <div className="border-b border-foreground/10">
        <div className="container flex items-center justify-between py-4 md:py-5">
          <button
            onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
            className="lg:hidden p-2 -ml-2 headline-hover"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Logo size="default" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}
              className="p-2 headline-hover"
              aria-label="Buscar"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <HeaderAuthButton />
          </div>
        </div>
      </div>

      {/* Search */}
      {searchOpen && (
        <div className="border-b border-foreground/10 bg-secondary/60 backdrop-blur-md">
          <div className="container py-4 flex items-center gap-3">
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Buscar artigos, autores, tópicos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent font-sans text-base outline-none placeholder:text-muted-foreground/60"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="meta-text shrink-0 hover:text-foreground transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="border-b border-foreground/10 hidden lg:block bg-foreground">
        <div className="container">
          <div className="flex items-center gap-0 overflow-x-auto -mx-1">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/categoria/${encodeURIComponent(cat)}`}
                className="relative whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-[0.08em] px-5 py-3 text-background/70 hover:text-accent transition-colors duration-200"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(var(--header-h,69px))] z-50 bg-foreground overflow-y-auto">
          <nav className="container py-10 flex flex-col gap-1">
            <span className="meta-text text-background/30 mb-6">Seções</span>
            {categories.map((cat, i) => (
              <Link
                key={cat}
                to={`/categoria/${encodeURIComponent(cat)}`}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-2xl font-bold py-2.5 text-background/80 hover:text-accent transition-colors"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {cat}
              </Link>
            ))}
            <div className="h-px w-full bg-background/10 mt-8 mb-4" />
            <span className="meta-text text-background/30 capitalize">{currentDate}</span>
            <div className="flex gap-2 mt-6">
              <span className="w-3 h-3 bg-pernambuco-blue" />
              <span className="w-3 h-3 bg-pernambuco-yellow" />
              <span className="w-3 h-3 bg-pernambuco-red" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
