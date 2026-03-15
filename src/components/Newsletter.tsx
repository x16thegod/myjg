import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Deep blue background with subtle pattern */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative container py-16 md:py-20">
        <div className="max-w-xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground/50">
            Newsletter
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-primary-foreground leading-tight">
            Fique por dentro de tudo
          </h2>
          <p className="mt-3 font-sans text-base text-primary-foreground/60 leading-relaxed">
            Receba as últimas notícias do Jornal Glicério diretamente no seu e-mail. Sem spam, apenas jornalismo estudantil de qualidade.
          </p>

          {submitted ? (
            <div className="mt-8 py-4 border border-primary-foreground/20">
              <p className="font-mono text-sm uppercase tracking-[0.1em] text-primary-foreground">
                ✓ Inscrição confirmada
              </p>
              <p className="font-sans text-sm text-primary-foreground/60 mt-1">
                Obrigado por se juntar à nossa comunidade.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 px-5 py-3.5 bg-primary-foreground/10 border border-primary-foreground/15 font-sans text-sm text-primary-foreground placeholder:text-primary-foreground/35 outline-none focus:border-primary-foreground/40 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-accent text-accent-foreground font-mono text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-accent/90 transition-all active:scale-[0.98]"
              >
                Assinar
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
